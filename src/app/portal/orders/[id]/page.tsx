"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const statusLabel: Record<string, string> = {
  draft: "Draft", pending: "Pending Review", deposit_due: "Deposit Due", deposit_paid: "Deposit Paid",
  confirmed: "Confirmed", in_production: "In Production", shipped: "Shipped", completed: "Completed", cancelled: "Cancelled",
};
const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600", pending: "bg-yellow-100 text-yellow-800",
  deposit_due: "bg-blue-100 text-blue-800", deposit_paid: "bg-purple-100 text-purple-800",
  confirmed: "bg-green-100 text-green-800", in_production: "bg-orange-100 text-orange-800",
  shipped: "bg-teal-100 text-teal-800", completed: "bg-gray-100 text-gray-800", cancelled: "bg-red-100 text-red-600",
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const supabase = createClient();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: ord } = await supabase.from("wholesale_orders").select("*").eq("id", id).single();
      if (!ord) { setLoading(false); return; }
      setOrder(ord);
      const [itms, acct] = await Promise.all([
        supabase.from("wholesale_order_items").select("*, wholesale_products(name)").eq("order_id", id),
        ord.account_id ? supabase.from("wholesale_accounts").select("*").eq("id", ord.account_id).single() : null,
      ]);
      if (itms.data) setItems(itms.data);
      if (acct?.data) setAccount(acct.data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-8"><p className="text-stone">Loading...</p></div>;
  if (!order) return <div className="max-w-5xl mx-auto px-4 py-8"><p className="text-stone">Not found.</p></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/portal" className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm font-medium text-stone bg-white border border-border rounded-full hover:bg-warm hover:shadow-sm transition-all">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900">{order.client_order_number || order.order_number}</h1>
          {order.client_order_number && <span className="text-xs text-stone/60 font-mono">VERA# {order.order_number}</span>}
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[order.status] || "bg-gray-100 text-gray-600"}`}>
            {statusLabel[order.status] || order.status}
          </span>
          {order.status === "draft" && (
            <Link href={`/portal/orders/new?edit=${order.id}`} className="px-5 py-2 bg-green text-white font-bold text-sm rounded-lg hover:bg-green-600 transition-all shadow-sm">✏️ Edit Draft</Link>
          )}
        </div>
      </div>

      {/* Status timeline / ETA / Batch */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-stone/30" />
            <span className="text-[10px] text-stone uppercase tracking-widest font-semibold">Status</span>
          </div>
          <p className="font-semibold text-gray-900 mt-1.5 text-base">{statusLabel[order.status] || order.status}</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-stone/30" />
            <span className="text-[10px] text-stone uppercase tracking-widest font-semibold">ETA</span>
          </div>
          <p className="font-semibold text-gray-900 mt-1.5 text-base">{order.eta_date ? new Date(order.eta_date).toLocaleDateString("en-NZ") : "—"}</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-stone/30" />
            <span className="text-[10px] text-stone uppercase tracking-widest font-semibold">Shipping Batch</span>
          </div>
          <p className="font-semibold text-gray-900 mt-1.5 text-base">{order.shipping_batch || "—"}</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-stone/30" />
            <span className="text-[10px] text-stone uppercase tracking-widest font-semibold">Site Address</span>
          </div>
          <p className="font-semibold text-gray-900 mt-1.5 text-base">{order.site_address || "—"}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white border border-border/60 rounded-xl shadow-sm overflow-hidden mb-8">
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
          <div className="flex justify-between items-center py-1"><span className="text-base font-bold text-gray-900">Total</span><span className="text-xl font-bold text-green">${Number(order.order_total).toFixed(2)}</span></div>
          <div className="flex justify-between items-center text-xs text-stone/70 pt-1 border-t border-dashed border-border/40"><span>Deposit (60%)</span><span className="font-semibold text-gray-900">${Number(order.deposit_amount).toFixed(2)}</span></div>
          <div className="flex justify-between items-center text-xs text-stone/70"><span>Balance (40%)</span><span className="font-semibold text-gray-900">${Number(order.balance_amount).toFixed(2)}</span></div>
        </div>
      </div>

      {order.customer_note && (
        <div className="mt-6 p-4 bg-warm border border-border/60 rounded-xl text-sm">
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg className="w-3.5 h-3.5 text-stone/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
            <span className="text-xs font-semibold text-stone/70 uppercase tracking-wider">Order Note</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{order.customer_note}</p>
        </div>
      )}
    </div>
  );
}
