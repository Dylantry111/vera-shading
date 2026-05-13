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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Trade Partner Login</h1>
          <p className="text-stone text-sm mt-1">VERA Shading Solutions wholesale portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green" />
          </div>

          {error && <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full px-6 py-3 bg-green text-white font-semibold rounded hover:bg-green-light transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-stone mt-6">
          Not registered? <a href="/contact" className="text-green underline">Contact us</a> to become a trade partner.
        </p>
      </div>
    </div>
  );
}
