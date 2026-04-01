"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminAuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError("이메일 또는 비밀번호가 맞지 않습니다."); setLoading(false); return; }
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="bg-dark-gray rounded-2xl border border-border p-8 w-full max-w-[400px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider text-white">NOMADS</h1>
          <p className="text-sm text-text-secondary mt-2">
            {mode === "register" ? "관리자 계정 생성" : "관리자 로그인"}
          </p>
        </div>

        {error && (
          <div className="bg-accent/20 text-accent text-sm p-3 rounded-lg mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-1">이름</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="관리자 이름" required
                className="w-full p-3 bg-mid-gray border border-border rounded-lg text-sm text-white outline-none focus:border-accent"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-1">이메일</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nomadscompany.co.kr" required
              className="w-full p-3 bg-mid-gray border border-border rounded-lg text-sm text-white outline-none focus:border-accent"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-1">비밀번호</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상" required minLength={6}
              className="w-full p-3 bg-mid-gray border border-border rounded-lg text-sm text-white outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full p-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium text-sm disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : mode === "register" ? "계정 생성" : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-4">
          {mode === "register" ? (
            <>이미 계정이 있으신가요? <button onClick={() => setMode("login")} className="text-accent">로그인</button></>
          ) : (
            <>계정이 없으신가요? <button onClick={() => setMode("register")} className="text-accent">계정 생성</button></>
          )}
        </p>
      </div>
    </div>
  )
}
