"use client";
import { useState } from "react";

type BusinessType = "builder" | "designer" | "retail" | "developer" | "other";

const BUSINESS_OPTIONS: { value: BusinessType | ""; label: string }[] = [
  { value: "", label: "Please select..." },
  { value: "builder", label: "Builder / Contractor" },
  { value: "designer", label: "Interior Designer" },
  { value: "retail", label: "Retail Shop" },
  { value: "developer", label: "Property Developer" },
  { value: "other", label: "Other" },
];

const PRODUCT_INTEREST = [
  "VERA Base — PVC Shutters",
  "VERA Prime — PVC Premium Shutters",
  "VERA Pino — Pinewood Shutters",
  "VERA Classic — Basswood Shutters",
  "VERA Signature — Ashwood Shutters",
  "Not Sure / All Ranges",
];

export default function ContactForm() {
  const [form, setForm] = useState({ full_name: "", company: "", phone: "", email: "", business_type: "", product_interest: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(key: string, value: string) { setForm(p => ({ ...p, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.full_name.trim()) { setErrorMsg("Please enter your name."); return; }
    setStatus("sending"); setErrorMsg("");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source_url: window.location.href }) });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ full_name: "", company: "", phone: "", email: "", business_type: "", product_interest: "", message: "" });
    } catch { setStatus("error"); setErrorMsg("Something went wrong. Please try again."); }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-xl font-bold text-ink">Thank You</h3>
        <p className="mt-2 text-stone">We&apos;ll be in touch shortly with trade pricing and product information.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Name <span className="text-red-400">*</span></label>
        <input type="text" required value={form.full_name} onChange={e => handleChange("full_name", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors" placeholder="Your full name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Company / Business Name</label>
        <input type="text" value={form.company} onChange={e => handleChange("company", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors" placeholder="Your company name" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={e => handleChange("phone", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors" placeholder="021 123 4567" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email</label>
          <input type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors" placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Business Type</label>
        <select value={form.business_type} onChange={e => handleChange("business_type", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors">
          {BUSINESS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Interested in</label>
        <select value={form.product_interest} onChange={e => handleChange("product_interest", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors">
          <option value="">Please select...</option>
          {PRODUCT_INTEREST.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink mb-1">Message (optional)</label>
        <textarea rows={4} value={form.message} onChange={e => handleChange("message", e.target.value)} className="w-full px-4 py-2.5 rounded border border-border bg-warm text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green transition-colors resize-y" placeholder="Tell us about your business..." />
      </div>
      {status === "error" && <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{errorMsg}</div>}
      <button type="submit" disabled={status === "sending"} className="w-full px-6 py-3 rounded bg-green text-white font-semibold hover:bg-green-light transition-all disabled:opacity-50">Submit Trade Enquiry</button>
    </form>
  );
}
