import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Trade Portal | VERA" };

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

function fmtDate(d: string | null | undefined) {
  return d ? new Date(d).toLocaleDateString("en-NZ") : "—";
}

function fmtDateCompact(d: string | null | undefined) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" });
}

export default async function PortalDashboard(props: { searchParams?: Promise<{ q?: string; status?: string }> }) {
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: account } = await supabase.from("wholesale_accounts").select("*").eq("auth_user_id", user.id).single();

  let query = supabase.from("wholesale_orders").select("*").eq("account_id", account?.id).order("created_at", { ascending: false });

  const sq = searchParams?.q;
  if (sq) query = query.or(`order_number.ilike.%${sq}%,client_order_number.ilike.%${sq}%`);

  const statusFilter = searchParams?.status;
  if (statusFilter === "active") {
    query = query.not("status", "in", "(\"draft\",\"completed\",\"cancelled\")");
  } else if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  const { data: orders } = await query.limit(50);

  const draftCount = orders?.filter(o => o.status === "draft").length || 0;
  const pendingCount = orders?.filter(o => o.status === "pending").length || 0;
  const activeCount = orders?.filter(o => !["draft", "completed", "cancelled"].includes(o.status)).length || 0;
  const completedCount = orders?.filter(o => o.status === "completed").length || 0;

  // Delivery progress: 5 stages for active orders
  const deliveryStages = ["confirmed", "in_production", "shipped", "completed"] as const;
  function getDeliveryProgress(status: string): { stage: number; total: number } {
    const idx = deliveryStages.indexOf(status as any);
    return { stage: idx >= 0 ? idx : -1, total: deliveryStages.length };
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {account?.contact_name || "Trade Partner"}</h1>
        <p className="text-stone text-sm">{account?.company_name} · {account?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-gray-900">{draftCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Drafts</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-yellow-600">{pendingCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Pending Review</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-green">{activeCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Active Orders</p>
        </div>
        <div className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
          <span className="text-3xl font-bold text-stone/40">{completedCount}</span>
          <p className="text-[10px] text-stone/70 uppercase tracking-widest font-semibold mt-1">Completed</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Link href="/portal/orders/new" className="px-6 py-2.5 bg-green text-white font-bold text-sm rounded-xl hover:bg-green-600 transition-all shadow-sm">
          <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          New Order
        </Link>
      </div>

      {/* Quick status filter */}
      <form className="mb-6" method="GET">
        <div className="flex gap-2 mb-2">
          <input name="q" defaultValue={searchParams?.q || ""} placeholder="Search order number or PO..." className="flex-1 px-3 py-2 border border-border/60 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green/40 transition-all" />
          <button className="px-4 py-2 bg-gray-100 border border-border/60 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all">Search</button>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { key: "", label: "All Orders", cls: searchParams?.status ? "bg-white text-stone border-border/60 hover:bg-warm" : "bg-green text-white border-green shadow-sm" },
            { key: "draft", label: "Draft", cls: searchParams?.status === "draft" ? "bg-gray-900 text-white border-gray-900 shadow-sm" : "bg-white text-stone border-border/60 hover:bg-warm" },
            { key: "pending", label: "Pending Review", cls: searchParams?.status === "pending" ? "bg-yellow-600 text-white border-yellow-600 shadow-sm" : "bg-white text-stone border-border/60 hover:bg-warm" },
            { key: "active", label: "Active Orders", cls: searchParams?.status === "active" ? "bg-green text-white border-green shadow-sm" : "bg-white text-stone border-border/60 hover:bg-warm" },
            { key: "completed", label: "Completed", cls: searchParams?.status === "completed" ? "bg-stone/70 text-white border-stone/70 shadow-sm" : "bg-white text-stone border-border/60 hover:bg-warm" },
          ].map(btn => (
            <a key={btn.key} href={(() => {
                const p = new URLSearchParams();
                if (btn.key) p.set("status", btn.key);
                if (searchParams?.q) p.set("q", searchParams.q);
                const qs = p.toString();
                return qs ? `/portal?${qs}` : "/portal";
              })()}
              className={`px-3.5 py-1.5 text-xs font-semibold border rounded-full transition-all inline-block ${btn.cls}`}>
              {btn.label}
            </a>
          ))}
          {searchParams?.q && <input type="hidden" name="q" value={searchParams.q} />}
        </div>
      </form>

      {/* Order list */}
      {!orders?.length ? (
        <div className="bg-white border border-border rounded p-8 text-center">
          <p className="text-stone text-sm mb-4">No orders yet.</p>
          <Link href="/portal/orders/new" className="text-green font-semibold text-sm underline">Place your first order</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => (
            <Link key={order.id} href={`/portal/orders/${order.id}`}
              className="block bg-white border border-border/60 rounded-xl p-4 hover:border-green/30 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 text-lg">{order.client_order_number || order.order_number}</span>
                  {order.client_order_number && <span className="text-[10px] text-stone/50 font-mono">VERA# {order.order_number}</span>}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] || "bg-gray-100 text-gray-600"}`}>{statusLabel[order.status] || order.status}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">${Number(order.order_total).toLocaleString()}</span>
              </div>
              <div className="flex text-stone/60 text-xs mt-1.5 gap-4">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {order.status === "draft" ? "Created" : "Submit Date"}: {fmtDateCompact(order.ordered_at || order.created_at)}
                </span>
                {order.eta_date && <span className="flex items-center gap-1">ETA: {new Date(order.eta_date).toLocaleDateString("en-NZ")}</span>}
                {order.shipping_batch && <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0a1 1 0 01-1 1h-2m3-1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-2m-9 6a2 2 0 100-4 2 2 0 000 4zm9-2a2 2 0 100-4 2 2 0 000 4z" /></svg>
                  Batch: {order.shipping_batch}</span>}
              </div>
              {/* Delivery progress bar — only for orders in delivery pipeline */}
              {((() => { const p = getDeliveryProgress(order.status); return p.stage >= 0; })()) && (() => {
                const p = getDeliveryProgress(order.status);
                const stageLabels = ["Confirmed", "In Production", "Shipped", "Completed"];
                return (
                  <div className="mt-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] text-stone/60 uppercase tracking-wider font-semibold">Delivery</span>
                      <span className="text-[10px] text-stone/40">{stageLabels[p.stage]}</span>
                    </div>
                    <div className="flex gap-1">
                      {stageLabels.map((_, i) => (
                        <div key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${i <= p.stage ? "bg-green" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
