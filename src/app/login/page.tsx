"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    router.push("/portal");
    router.refresh();
  }

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md brand-card rounded-[28px] p-8 md:p-10 shadow-[0_16px_40px_rgba(20,20,20,0.05)]">
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.28em] text-stone font-semibold">Client Portal</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">Trade Partner Login</h1>
          <p className="text-stone text-sm mt-2 leading-6">Secure access for approved VERA trade customers.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-[#bdbdbd] transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-[#bdbdbd] transition-all" />
          </div>

          {error && <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full px-6 py-3.5 rounded-2xl bg-[#181818] text-white font-semibold hover:bg-[#2a2a2a] transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-stone mt-6 leading-6">
          Need access? <a href="/contact" className="text-[#181818] underline underline-offset-2">Contact us</a> to become a trade partner.
        </p>
      </div>
    </div>
  );
}
