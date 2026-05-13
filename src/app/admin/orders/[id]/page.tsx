"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const statusLabel: Record<string, string> = {
  draft: "Draft", pending: "Pending Review", deposit_due: "Deposit Due", deposit_paid: "Deposit Paid",
  confirmed: "Confirmed", in_production: "In Production", shipped: "Shipped", completed: "Completed", cancelled: "Cancelled",
};

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [addons, setAddons] = useState<any[]>([]);
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [adjustedTotal, setAdjustedTotal] = useState<number | null>(null);
  const [adminNote, setAdminNote] = useState("");

  async function loadAll() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`);
      const data = await res.json();
      if (data.error) { setMsg(data.error); setLoading(false); return; }
      setOrder(data.order);
      setItems(data.items || []);
      setAddons(data.addons || []);
      setAccount(data.account);
      setAdjustedTotal(data.order?.order_total);
      setAdminNote(data.order?.admin_note || "");
      // Auto-set ETA default: 10 weeks after submit date (if no ETA yet and order is submitted)
      if (!data.order?.eta_date && data.order?.status !== "draft") {
        const baseDate = data.order?.ordered_at || data.order?.created_at;
        if (baseDate) {
          const eta = new Date(baseDate);
          eta.setDate(eta.getDate() + 70); // 10 weeks
          const etaStr = eta.toISOString().slice(0, 10);
          // Auto-save the default ETA
          fetch(`/api/admin/orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eta_date: etaStr }),
          }).then(r => r.json()).then(d => {
            if (d.order) setOrder(d.order);
          });
        }
      }
    } catch (e: any) {
      setMsg(e.message);
    }
    setLoading(false);
  }

  useEffect(() => { loadAll(); }, [id]);

  async function updateOrder(fields: any) {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (data.error) { setMsg(data.error); return; }
      loadAll();
    } catch (e: any) {
      setMsg(e.message);
    }
  }

  async function approve() {
    const total = adjustedTotal ?? order.order_total;
    await updateOrder({
      status: "deposit_due",
      order_total: Math.round(total * 100) / 100,
      deposit_amount: Math.round(total * 0.6 * 100) / 100,
      balance_amount: Math.round(total * 0.4 * 100) / 100,
    });
    setMsg("✅ Approved. Deposit invoice notification will be sent.");
  }

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8"><p className="text-stone">Loading...</p></div>;
  if (!order) return <div className="max-w-6xl mx-auto px-4 py-8"><p className="text-stone">Not found.</p></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm font-medium text-stone bg-white border border-border rounded-full hover:bg-warm hover:shadow-sm transition-all">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to All Orders
      </Link>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-3xl font-bold text-gray-900">{order.client_order_number || order.order_number}</h1>
        {order.client_order_number && <span className="text-xs text-stone/60 font-mono">VERA# {order.order_number}</span>}
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : order.status === "draft" ? "bg-gray-100 text-gray-600" : order.status === "deposit_due" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}`}>
          {statusLabel[order.status] || order.status}
        </span>
      </div>

      {/* Customer */}
      {account && (
        <div className="bg-white border border-border/60 rounded-xl shadow-sm p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Customer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-warm/50 rounded-lg p-3"><span className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Company</span><p className="font-semibold text-gray-900 mt-0.5">{account.company_name}</p></div>
            <div className="bg-warm/50 rounded-lg p-3"><span className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Contact</span><p className="font-semibold text-gray-900 mt-0.5">{account.contact_name}</p></div>
            <div className="bg-warm/50 rounded-lg p-3"><span className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Email</span><p className="font-semibold text-gray-900 mt-0.5">{account.email}</p></div>
            <div className="bg-warm/50 rounded-lg p-3"><span className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Phone</span><p className="font-semibold text-gray-900 mt-0.5">{account.phone || "—"}</p></div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-warm/50 rounded-lg p-3"><span className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Site Address</span><p className="font-semibold text-gray-900 mt-0.5">{order.site_address || "—"}</p></div>
            <div className="bg-warm/50 rounded-lg p-3"><span className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">ETA</span><p className="font-semibold text-gray-900 mt-0.5">{order.eta_date ? new Date(order.eta_date).toLocaleDateString("en-NZ") : "—"}</p></div>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="bg-white border border-border/60 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-3 bg-gray-50/60 border-b border-border/40">
          <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            Order Items ({items.length})
          </h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-green-bg/40 border-b border-border/40">
              {["#","Window","Product","Size","Colour","Frame","Louver","Area","Price"].map(h => <th key={h} className="text-left py-2.5 px-3 font-semibold text-green-dark text-[11px] uppercase tracking-wider">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, i: number) => (
              <tr key={item.id} className="border-b border-border/20 transition-colors hover:bg-warm/40">
                <td className="py-2.5 px-3 font-bold text-green text-sm">{i + 1}</td>
                <td className="py-2.5 px-3 text-gray-900 font-medium">{item.window_label || "—"}</td>
                <td className="py-2.5 px-3 text-stone">{item.wholesale_products?.name || "—"}</td>
                <td className="py-2.5 px-3 text-stone">{item.width_mm}×{item.height_mm}mm</td>
                <td className="py-2.5 px-3 text-stone">{item.colour || "—"}</td>
                <td className="py-2.5 px-3 text-stone">{item.frame_colour || "—"}</td>
                <td className="py-2.5 px-3 text-stone">{item.louver_size || "—"}</td>
                <td className="py-2.5 px-3 text-stone">{item.area_sqm?.toFixed(2)} m²</td>
                <td className="py-2.5 px-3 text-right font-bold text-gray-900">${Number(item.line_total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <div className="bg-white border-2 border-green/30 rounded-xl shadow-sm p-5 mb-8 max-w-sm ml-auto">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center"><span className="text-stone/80">Product Total</span><span className="font-semibold text-gray-900">${Number(order.product_total).toFixed(2)}</span></div>
          <div className="flex justify-between items-center pb-2 border-b border-border/40"><span className="text-stone/80">GST (15%)</span><span className="font-semibold text-gray-900">${(Number(order.product_total) * 0.15).toFixed(2)}</span></div>
          <div className="border-t border-border/20 pt-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-bold text-gray-900">Total</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-stone/60 uppercase tracking-wider">Adjust</span>
                <input type="number" value={adjustedTotal ?? ""} onChange={e => setAdjustedTotal(Number(e.target.value))}
                  className="w-24 px-2 py-1 border border-border/60 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-stone/70 mt-1.5 pt-1.5 border-t border-dashed border-border/40">
              <span><span className="font-semibold text-gray-900">${((adjustedTotal ?? order.order_total) * 0.6).toFixed(2)}</span> Deposit (60%)</span>
              <span><span className="font-semibold text-gray-900">${((adjustedTotal ?? order.order_total) * 0.4).toFixed(2)}</span> Balance (40%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin actions */}
      <div className="bg-white border border-border/60 rounded-xl shadow-sm p-5 mb-8">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Admin Actions
        </h2>
        <div className="space-y-4">
          {/* ETA + Batch */}
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">ETA Date <span className="text-stone/40 normal-case">(dd/mm/yyyy)</span></label>
              <input type="date" value={order.eta_date?.slice(0, 10) || ""} onChange={e => updateOrder({ eta_date: e.target.value || null })}
                className="w-full mt-1 px-3 py-2 border border-border/60 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all" /></div>
            <div><label className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Shipping Batch</label>
              <input value={order.shipping_batch || ""} onChange={e => updateOrder({ shipping_batch: e.target.value || null })}
                className="w-full mt-1 px-3 py-2 border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all" /></div>
            <div><label className="text-[10px] text-stone/70 uppercase tracking-wider font-semibold">Status</label>
              <select value={order.status} onChange={e => updateOrder({ status: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-border/60 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all">
                {Object.entries(statusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select></div>
          </div>
          {/* Admin note */}
          <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} onBlur={() => updateOrder({ admin_note: adminNote || null })}
            rows={2} placeholder="Internal admin note..."
            className="w-full px-3.5 py-2.5 border border-border/60 rounded-xl text-sm resize-y focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all" />
          {/* Approve button */}
          {order.status === "pending" && (
            <button onClick={approve} className="w-full sm:w-auto px-6 py-3 bg-green text-white font-bold text-sm rounded-xl hover:bg-green-600 transition-all shadow-sm">
              ✅ Approve &amp; Trigger Deposit Invoice
            </button>
          )}
          {msg && <div className={`p-3.5 rounded-xl text-sm ${msg.startsWith("✅") ? "bg-green-50 text-green-700 border border-green/20" : "bg-red-50 text-red-700 border border-red/20"}`}>{msg}</div>}
        </div>
      </div>

      {order.customer_note && (
        <div className="mt-6 p-4 bg-warm border border-border/60 rounded-xl text-sm">
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg className="w-3.5 h-3.5 text-stone/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
            <span className="text-xs font-semibold text-stone/70 uppercase tracking-wider">Customer Note</span>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{order.customer_note}</p>
        </div>
      )}
    </div>
  );
}
