"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCustomersPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  async function loadAccounts() {
    const res = await fetch("/api/admin/customers");
    const data = await res.json();
    if (data.accounts) setAccounts(data.accounts);
    setLoading(false);
  }

  useEffect(() => { loadAccounts(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true); setMessage("");
    try {
      const res = await fetch("/api/admin/create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, company_name: companyName, contact_name: contactName, phone: phone || null, address: address || null, notes: notes || null }),
      });
      const data = await res.json();
      if (!res.ok) { setMessage(`Error: ${data.error}`); } else {
        setMessage(`✅ Account created for ${contactName}`);
        setEmail(""); setPassword(""); setCompanyName(""); setContactName(""); setPhone(""); setAddress(""); setNotes("");
        loadAccounts();
      }
    } catch (err: any) { setMessage(`Error: ${err.message}`); }
    setCreating(false);
  }

  const filtered = search ? accounts.filter((a: any) =>
    a.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    a.contact_name?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase())
  ) : accounts;

  const totalRevenue = accounts.reduce((s: number, a: any) => s + (a._total_spend || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Accounts</h1>
          <p className="text-stone text-sm mt-1">{accounts.length} accounts · ${totalRevenue.toLocaleString()} total revenue</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2 bg-green text-white text-sm font-semibold rounded hover:bg-green-600 transition-all">
          {showForm ? "Cancel" : "+ New Account"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-white border border-border rounded p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Create New Account</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-white" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input type="text" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-white" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-white" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input type="text" required value={contactName} onChange={e => setContactName(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-white" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-white" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-white" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm resize-y" /></div>
            {message && <div className={`p-3 rounded text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message}</div>}
            <button type="submit" disabled={creating} className="px-6 py-2.5 bg-green text-white font-semibold text-sm rounded hover:bg-green-600 disabled:opacity-50">
              {creating ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..."
        className="w-full px-3 py-2 border border-border rounded text-sm bg-white mb-4" />

      {/* Accounts table */}
      <div className="bg-white border border-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Orders</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Spend</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a: any) => (
              <tr key={a.id} className="border-b border-border/50 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">
                  <Link href={`/admin/orders?q=${encodeURIComponent(a.company_name || "")}`} className="text-green hover:underline">{a.company_name}</Link>
                </td>
                <td className="py-3 px-4 text-stone">{a.contact_name}</td>
                <td className="py-3 px-4 text-stone">{a.email}</td>
                <td className="py-3 px-4 text-center font-semibold text-gray-900">{a._order_count || 0}</td>
                <td className="py-3 px-4 text-right font-semibold">${(a._total_spend || 0).toLocaleString()}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${a.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {a.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4 text-stone">{new Date(a.created_at).toLocaleDateString("en-NZ")}</td>
              </tr>
            ))}
            {!filtered.length && !loading && <tr><td colSpan={7} className="py-8 text-center text-stone text-sm">No accounts.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
