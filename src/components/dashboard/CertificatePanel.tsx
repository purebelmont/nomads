"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function CertificatePanel({ userId }: { userId: string }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [purpose, setPurpose] = useState("제출용");
  const printRef = useRef<HTMLDivElement>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: "NOMADS COMPANY",
    ceo: "",
    bizNo: "",
    address: "",
    phone: "",
  });
  const [editCompany, setEditCompany] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("employees").select("*").eq("user_id", userId).eq("active", true).order("name");
    setEmployees(data || []);
    // Load company info from profile
    const { data: p } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (p) {
      setCompanyInfo(prev => ({
        ...prev,
        name: p.business_name || "NOMADS COMPANY",
        address: p.business_address || "",
        phone: p.business_phone || "",
      }));
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const certNo = `NC-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${selected?.id || "000"}`;

  function handlePrint() {
    const content = printRef.current;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>재직증명서</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Noto Sans KR', sans-serif; padding: 40px; color: #000; background: #fff; }
        @media print { body { padding: 20px; } }
      </style></head><body>${content.innerHTML}</body></html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  }

  const EMP_TYPES: Record<string, string> = { fulltime: "정규직", parttime: "계약직" };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold">재직증명서</h4>
        <button onClick={() => setEditCompany(!editCompany)} className="text-xs text-[var(--primary)] font-medium">
          {editCompany ? "닫기" : "⚙️ 회사정보"}
        </button>
      </div>

      {/* Company info editor */}
      {editCompany && (
        <div className="rounded-xl border border-[var(--border)] p-4 mb-4 space-y-2">
          <div className="text-xs font-semibold text-[var(--gray-500)] mb-2">회사 정보 설정</div>
          {[
            { label: "회사명", key: "name" },
            { label: "대표자", key: "ceo" },
            { label: "사업자등록번호", key: "bizNo" },
            { label: "주소", key: "address" },
            { label: "전화", key: "phone" },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center gap-2">
              <label className="text-xs text-[var(--gray-500)] w-24 shrink-0">{label}</label>
              <input
                value={(companyInfo as any)[key]}
                onChange={(e) => setCompanyInfo({ ...companyInfo, [key]: e.target.value })}
                className="flex-1 text-sm border border-[var(--border)] rounded-lg px-3 py-2 outline-none focus:border-[var(--primary)] bg-[var(--bg-input)]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Employee selection */}
      <div className="text-xs font-semibold text-[var(--gray-500)] mb-2">직원 선택</div>
      {employees.length === 0 ? (
        <div className="text-center py-8 text-[var(--gray-400)]">
          <div className="text-3xl mb-2">📄</div>직원을 먼저 등록하세요 (급여 탭)
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {employees.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selected?.id === e.id
                  ? "border-[var(--primary)] bg-[var(--primary-light)]"
                  : "border-[var(--border)] hover:border-[var(--gray-300)]"
              }`}
            >
              <div className="text-sm font-semibold">{e.name}</div>
              <div className="text-xs text-[var(--gray-500)]">{e.department || ""} {e.position}</div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <>
          {/* Purpose */}
          <div className="flex items-center gap-2 mb-4">
            <label className="text-xs text-[var(--gray-500)] shrink-0">용도</label>
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="flex-1 text-sm border border-[var(--border)] rounded-lg px-3 py-2 outline-none focus:border-[var(--primary)] bg-[var(--bg-input)]"
              placeholder="제출용, 대출용, 비자 신청용 등"
            />
            <button onClick={handlePrint} className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg shrink-0">
              🖨️ 출력
            </button>
          </div>

          {/* Certificate Preview */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden">
            <div ref={printRef}>
              <div style={{ padding: "60px 50px", fontFamily: "'Noto Sans KR', sans-serif", color: "#000", background: "#fff", maxWidth: 700, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 50 }}>
                  <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: 12 }}>재 직 증 명 서</h1>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 8 }}>Certificate of Employment</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>발급번호: {certNo}</div>
                </div>

                {/* Employee Info Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 40, fontSize: 14 }}>
                  <tbody>
                    {[
                      ["성 명", selected.name, "생년월일", selected.birth_date || "-"],
                      ["주 소", selected.address || "-", "", ""],
                      ["부 서", selected.department || "-", "직 위", selected.position || "-"],
                      ["재직기간", selected.start_date ? `${selected.start_date} ~ 현재` : "-", "고용형태", EMP_TYPES[selected.emp_type] || "정규직"],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td style={{ border: "1px solid #333", padding: "10px 14px", fontWeight: 600, background: "#f5f5f5", width: "18%", textAlign: "center" }}>{row[0]}</td>
                        <td style={{ border: "1px solid #333", padding: "10px 14px", width: row[2] ? "32%" : "82%", ...(row[2] ? {} : { colSpan: 3 }) }} colSpan={row[2] ? 1 : 3}>{row[1]}</td>
                        {row[2] && <td style={{ border: "1px solid #333", padding: "10px 14px", fontWeight: 600, background: "#f5f5f5", width: "18%", textAlign: "center" }}>{row[2]}</td>}
                        {row[3] !== undefined && row[2] && <td style={{ border: "1px solid #333", padding: "10px 14px", width: "32%" }}>{row[3]}</td>}
                      </tr>
                    ))}
                    <tr>
                      <td style={{ border: "1px solid #333", padding: "10px 14px", fontWeight: 600, background: "#f5f5f5", textAlign: "center" }}>용 도</td>
                      <td style={{ border: "1px solid #333", padding: "10px 14px" }} colSpan={3}>{purpose}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Statement */}
                <div style={{ textAlign: "center", fontSize: 16, lineHeight: 2, margin: "40px 0" }}>
                  위 사람은 당사에 재직하고 있음을 증명합니다.
                </div>

                {/* Date */}
                <div style={{ textAlign: "center", fontSize: 15, margin: "40px 0 50px" }}>
                  {dateStr}
                </div>

                {/* Company Info */}
                <div style={{ textAlign: "center", lineHeight: 2, fontSize: 14 }}>
                  {companyInfo.name && <div style={{ fontSize: 18, fontWeight: 700 }}>{companyInfo.name}</div>}
                  {companyInfo.address && <div>{companyInfo.address}</div>}
                  {companyInfo.bizNo && <div>사업자등록번호: {companyInfo.bizNo}</div>}
                  {companyInfo.phone && <div>TEL: {companyInfo.phone}</div>}
                  {companyInfo.ceo && (
                    <div style={{ marginTop: 20, fontSize: 16 }}>
                      대표이사 &nbsp;&nbsp; <strong style={{ fontSize: 18 }}>{companyInfo.ceo}</strong> &nbsp;&nbsp; <span style={{ color: "#999" }}>(인)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
