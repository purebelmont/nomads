"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function CertificatePanel({ userId }: { userId: string }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [purpose, setPurpose] = useState("제출용");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any>(null);
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
    const { data } = await supabase.from("employees").select("*").eq("user_id", userId).eq("active", true).order("department").order("name");
    setEmployees(data || []);
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

  const filtered = employees.filter(e => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.name?.toLowerCase().includes(q) || e.department?.toLowerCase().includes(q) || e.position?.toLowerCase().includes(q) || e.phone?.includes(q);
  });

  async function saveEmployee(f: any) {
    if (f.id) {
      await supabase.from("employees").update(f).eq("id", f.id);
    } else {
      await supabase.from("employees").insert({ ...f, user_id: userId, active: true });
    }
    setEditing(null);
    load();
  }

  async function deleteEmployee(id: number) {
    if (!confirm("이 직원을 삭제하시겠습니까?")) return;
    await supabase.from("employees").update({ active: false }).eq("id", id);
    if (selected?.id === id) setSelected(null);
    setEditing(null);
    load();
  }

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
  const inputClass = "w-full text-sm border border-[var(--border)] rounded-lg px-3 py-2 outline-none focus:border-[var(--primary)] bg-[var(--bg-input)]";

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold">재직증명서</h4>
        <div className="flex gap-2">
          <button onClick={() => setEditing({})} className="text-xs text-[var(--primary)] font-medium">+ 직원 추가</button>
          <button onClick={() => setEditCompany(!editCompany)} className="text-xs text-[var(--gray-500)] font-medium">
            {editCompany ? "닫기" : "⚙️ 회사정보"}
          </button>
        </div>
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
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}

      {/* Employee edit/add form */}
      {editing && (
        <div className="rounded-xl border border-[var(--primary)] p-4 mb-4 space-y-2 bg-[var(--bg-card)]">
          <div className="text-xs font-semibold text-[var(--primary)] mb-2">{editing.id ? "직원 수정" : "직원 추가"}</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-[var(--gray-500)]">이름 *</label>
              <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="홍길동" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">부서</label>
              <input value={editing.department || ""} onChange={(e) => setEditing({ ...editing, department: e.target.value })} placeholder="촬영팀" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">직위</label>
              <input value={editing.position || ""} onChange={(e) => setEditing({ ...editing, position: e.target.value })} placeholder="팀장" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">고용형태</label>
              <select value={editing.emp_type || "fulltime"} onChange={(e) => setEditing({ ...editing, emp_type: e.target.value })} className={inputClass}>
                <option value="fulltime">정규직</option>
                <option value="parttime">계약직</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">생년월일</label>
              <input value={editing.birth_date || ""} onChange={(e) => setEditing({ ...editing, birth_date: e.target.value })} placeholder="1990-01-01" className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">전화번호</label>
              <input value={editing.phone || ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} placeholder="010-1234-5678" className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-[var(--gray-500)]">주소</label>
              <input value={editing.address || ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} placeholder="서울시 강남구..." className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">입사일</label>
              <input type="date" value={editing.start_date || ""} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-[var(--gray-500)]">{editing.emp_type === "parttime" ? "시급" : "월급"}</label>
              <input type="number" value={editing.emp_type === "parttime" ? (editing.hourly_rate || "") : (editing.base_salary || "")} onChange={(e) => setEditing({ ...editing, ...(editing.emp_type === "parttime" ? { hourly_rate: e.target.value } : { base_salary: e.target.value }) })} className={inputClass} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => { if (!editing.name) return; saveEmployee(editing); }} className="flex-1 p-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-medium">저장</button>
            <button onClick={() => setEditing(null)} className="px-4 p-2.5 border border-[var(--border)] rounded-lg text-sm text-[var(--gray-500)]">취소</button>
            {editing.id && <button onClick={() => deleteEmployee(editing.id)} className="px-4 p-2.5 bg-red-500/10 text-red-500 rounded-lg text-sm font-medium">삭제</button>}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="이름, 부서, 직위로 검색..."
          className={inputClass}
        />
      </div>

      {/* Employee selection */}
      <div className="text-xs font-semibold text-[var(--gray-500)] mb-2">직원 선택 ({filtered.length}명)</div>
      {employees.length === 0 ? (
        <div className="text-center py-8 text-[var(--gray-400)]">
          <div className="text-3xl mb-2">📄</div>직원을 먼저 등록하세요
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-6 text-[var(--gray-400)] text-sm">검색 결과가 없습니다</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          {filtered.map((e) => (
            <div
              key={e.id}
              className={`p-3 rounded-xl border transition-all ${
                selected?.id === e.id
                  ? "border-[var(--primary)] bg-[var(--primary-light)]"
                  : "border-[var(--border)] hover:border-[var(--gray-300)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <button onClick={() => setSelected(e)} className="flex-1 text-left">
                  <div className="text-sm font-semibold">{e.name}</div>
                  <div className="text-xs text-[var(--gray-500)]">{e.department || ""} · {e.position}</div>
                </button>
                <div className="flex gap-1 shrink-0 ml-2">
                  <button onClick={() => setEditing(e)} className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg-hover)] text-[var(--gray-500)]">수정</button>
                  <button onClick={() => deleteEmployee(e.id)} className="text-[10px] px-2 py-1 rounded-md bg-red-500/10 text-red-500">삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <>
          {/* Purpose + Print */}
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
                <div style={{ textAlign: "center", marginBottom: 50 }}>
                  <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: 12 }}>재 직 증 명 서</h1>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 8 }}>Certificate of Employment</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>발급번호: {certNo}</div>
                </div>

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
                        <td style={{ border: "1px solid #333", padding: "10px 14px", width: row[2] ? "32%" : "82%" }} colSpan={row[2] ? 1 : 3}>{row[1]}</td>
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

                <div style={{ textAlign: "center", fontSize: 16, lineHeight: 2, margin: "40px 0" }}>
                  위 사람은 당사에 재직하고 있음을 증명합니다.
                </div>

                <div style={{ textAlign: "center", fontSize: 15, margin: "40px 0 50px" }}>
                  {dateStr}
                </div>

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
