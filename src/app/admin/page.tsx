"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

const deliveryStages = ["confirmed", "in_production", "shipped", "completed"] as const;
function getDeliveryStage(status: string): number {
  return deliveryStages.indexOf(status as any);
}

function fmtDateCompact(d: string | null | undefined) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (query) params.set("q", query);
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    if (data.orders) setOrders(data.orders);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const draftCount = orders.filter(o => o.status === "draft").length;
  const depositDueCount = orders.filter(o => o.status === "deposit_due").length;
  const activeCount = orders.filter(o => !["draft", "completed", "cancelled"].includes(o.status)).length;
  const completedCount = orders.filter(o => o.status === "completed").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin — Orders</h1>
        <span className="text-xs text-stone/60">{orders.length} orders loaded</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-yellow-600">{pendingCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Pending</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-blue-600">{depositDueCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Deposit Due</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-green">{activeCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Active</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-gray-600">{draftCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Drafts</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-stone/40">{completedCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Completed</p>
        </div>
      </div>

      {/* Search + Quick filter */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search order # / customer..."
            className="flex-1 px-3 py-2 border border-border/60 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all"
            onKeyDown={e => e.key === "Enter" && load()} />
          <button onClick={load} disabled={loading}
            className="px-5 py-2 bg-gray-100 border border-border/60 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50">
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { key: "", label: "All Orders" },
            { key: "draft", label: "Draft" },
            { key: "pending", label: "Pending Review" },
            { key: "deposit_due", label: "Deposit Due" },
            { key: "active", label: "Active" },
            { key: "completed", label: "Completed" },
          ].map(btn => (
            <button key={btn.key} onClick={() => { setStatusFilter(btn.key); setTimeout(load, 0); }}
              className={`px-3.5 py-1.5 text-xs font-semibold border rounded-full transition-all ${
                (btn.key || "") === (statusFilter || "")
                  ? btn.key === "draft" ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : btn.key === "pending" ? "bg-yellow-600 text-white border-yellow-600 shadow-sm"
                  : btn.key === "deposit_due" ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : btn.key === "active" ? "bg-green text-white border-green shadow-sm"
                  : btn.key === "completed" ? "bg-stone/70 text-white border-stone/70 shadow-sm"
                  : "bg-green text-white border-green shadow-sm"
                  : "bg-white text-stone border-border/60 hover:bg-warm"
              }`}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-border/60 rounded-xl p-4 shadow-sm animate-pulse">
              <div className="flex justify-between mb-2">
                <div className="w-48 h-5 bg-gray-100 rounded" />
                <div className="w-20 h-5 bg-gray-100 rounded" />
              </div>
              <div className="w-72 h-3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Order cards */}
      {!loading && !orders.length && (
        <div className="bg-white border border-border/60 rounded-xl p-8 text-center shadow-sm">
          <p className="text-stone/60 text-sm">No orders found.</p>
          <p className="text-stone/40 text-xs mt-1">Try a different search or filter.</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((o: any) => {
            const ds = getDeliveryStage(o.status);
            const stageLabels = ["Confirmed", "In Production", "Shipped", "Completed"];
            const stageColors = ["bg-green-100 text-green-800", "bg-orange-100 text-orange-800", "bg-teal-100 text-teal-800", "bg-gray-100 text-gray-800"];
            return (
              <Link key={o.id} href={`/admin/orders/${o.id}`}
                className="block bg-white border border-border/60 rounded-xl p-4 hover:border-green/30 hover:shadow-sm transition-all">
                {/* Row 1: order info + status + total */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-semibold text-gray-900">{o.client_order_number || o.order_number}</span>
                    {o.client_order_number && <span className="text-[10px] text-stone/50 font-mono shrink-0">VERA# {o.order_number}</span>}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${statusColor[o.status] || "bg-gray-100 text-gray-600"}`}>
                      {statusLabel[o.status] || o.status}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 shrink-0 ml-3">${Number(o.order_total).toLocaleString()}</span>
                </div>
                {/* Row 2: customer + meta */}
                <div className="flex items-center gap-2 text-xs text-stone/70 mt-0.5">
                  <span className="font-medium text-gray-900">{o.wholesale_accounts?.company_name || "—"}</span>
                  <span className="text-stone/30">·</span>
                  <span>{o.status === "draft" ? "Created" : "Submit Date"}: {fmtDateCompact(o.ordered_at || o.created_at)}</span>
                  {o.eta_date && <>
                    <span className="text-stone/30">·</span>
                    <span>ETA: {new Date(o.eta_date).toLocaleDateString("en-NZ")}</span>
                  </>}
                  {o.shipping_batch && <>
                    <span className="text-stone/30">·</span>
                    <span>Batch: {o.shipping_batch}</span>
                  </>}
                </div>
                {/* Row 3: delivery progress bar */}
                {ds >= 0 && (
                  <div className="mt-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] text-stone/60 uppercase tracking-wider font-semibold">Delivery</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${stageColors[ds]}`}>{stageLabels[ds]}</span>
                    </div>
                    <div className="flex gap-1">
                      {stageLabels.map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= ds ? "bg-green" : "bg-gray-200"}`} />
                      ))}
                    </div>
                  </div>
                )}
                {/* Row 4: admin controls quick-links */}
                <div className="flex gap-3 mt-2 text-[10px] text-stone/40">
                  <a href={`/admin/orders/${o.id}`} className="hover:text-green transition-colors">View Details →</a>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
