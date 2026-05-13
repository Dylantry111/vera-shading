"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface Product { id: string; name: string; material: string; price_per_sqm: number; }
interface Addon { id: string; name: string; price_type: string; price: number; }
interface ProductOption { product_id: string; field: string; option_name: string; }
interface Account { company_name: string; contact_name: string; email: string; phone: string; address: string; }

const LOUVER = ["63mm", "76mm", "89mm", "114mm"];
const TILT_ROD = ["Back Hidden", "Front Center", "Front Side", "Inner Concealed"];
const IN_OUT = ["In Fit", "Out Fit", "Make Size"];
function ceil2(n: number) { return Math.ceil(n * 100) / 100; }

interface RowData { id: number; window: string; width: number; height: number; productId: string; panel: number; layout: string; vt: string; ht: string; frame: string; midrail: string; louver: string; colour: string; tilt: string; inout: string; special: string; addonIds: string[]; }
const EMPTY = (id: number): RowData => ({ id, window: "", width: 0, height: 0, productId: "", panel: 0, layout: "", vt: "", ht: "", frame: "", midrail: "", louver: "", colour: "", tilt: "", inout: "", special: "", addonIds: [] });

export default function NewOrderPageWrapper() {
  return <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><p className="text-stone">Loading...</p></div>}><NewOrderPage /></Suspense>;
}

function NewOrderPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const editId = sp?.get("edit") || null;
  const supabase = createClient();
  const tblRef = useRef<HTMLTableElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const [rows, setRows] = useState<RowData[]>(() => Array.from({ length: 10 }, (_, i) => EMPTY(i)));
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [showAddonFor, setShowAddonFor] = useState<number | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRowIdx, setSelectedRowIdx] = useState(-1);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const [selR1, setSelR1] = useState(-1); const [selC1, setSelC1] = useState(-1); const [selR2, setSelR2] = useState(-1); const [selC2, setSelC2] = useState(-1);
  const dragging = useRef(false); const fillDrag = useRef<{ r: number; c: number } | null>(null); const fillGoing = useRef(false);
  const noArrow = "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

  const productMap = products.reduce<Record<string, Product>>((m, p) => { m[p.id] = p; return m; }, {});

  function frameOptions(pid: string) { return productOptions.filter(o => o.product_id === pid && o.field === "frame" && !o.option_name.includes("After Cutting")); }
  function colourOptions(pid: string) { return productOptions.filter(o => o.product_id === pid && o.field === "colour"); }

  useEffect(() => {
    Promise.all([
      supabase.from("wholesale_products").select("*").eq("active", true).order("sort_order"),
      supabase.from("wholesale_addons").select("*").eq("active", true).order("sort_order"),
      supabase.from("wholesale_product_options").select("*").order("sort_order"),
      supabase.auth.getUser().then(async ({ data: { user } }) => {
        if (!user) return null;
        const { data } = await supabase.from("wholesale_accounts").select("company_name,contact_name,email,phone,address").eq("auth_user_id", user.id).single();
        return data;
      }),
    ]).then(async ([a, b, c, acct]) => {
      if (a.data) setProducts(a.data);
      if (b.data) setAddons(b.data);
      if (c.data) setProductOptions(c.data);
      if (acct) setAccount(acct);

      // Load draft for editing
      if (editId) {
        const { data: order } = await supabase.from("wholesale_orders").select("*").eq("id", editId).single();
        if (order && order.status === "draft") {
          setDraftId(order.id);
          setOrderNumber(order.client_order_number || "");
          setSiteAddress(order.site_address || "");
          setNote(order.customer_note || "");
          const { data: items } = await supabase.from("wholesale_order_items").select("*").eq("order_id", editId).order("sort_order");
          if (items && items.length > 0) {
            const loaded = items.map((item, i) => ({
              id: i, window: item.window_label || "", width: item.width_mm || 0, height: item.height_mm || 0,
              productId: item.product_id || "", panel: item.panel_qty || 0, layout: item.layout_code || "",
              vt: item.vt_post || "", ht: item.ht_post || "", frame: item.frame_colour || "", midrail: item.mid_rail || "",
              louver: item.louver_size || "", colour: item.colour || "", tilt: item.tilt_rod || "", inout: item.in_out_fit || "",
              special: item.special_request || "", addonIds: item.selected_addon_ids || [],
            }));
            setRows([...loaded, ...Array.from({ length: Math.max(0, 10 - loaded.length) }, (_, i) => EMPTY(loaded.length + i))]);
          }
        }
      }
      setLoading(false);
    });
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast.visible) {
      const t = setTimeout(() => setToast({ message: '', visible: false }), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function deleteRow(idx: number) {
    if (idx < 0 || idx >= rows.length) return;
    const rowNum = idx + 1;
    setRows(p => {
      const n = p.filter((_, i) => i !== idx);
      if (n.length < 1) return [EMPTY(0)];
      // 保持最少 3 个空行用于新增，删除时自动缩短
      const emptyCount = Math.max(0, 3 - n.filter(r => r.productId && r.width > 0).length);
      while (n.length < 3) n.push(EMPTY(n.length));
      return n;
    });
    setSelectedRowIdx(-1);
    setToast({ message: `Row ${rowNum} deleted. Rows shifted up.`, visible: true });
  }

  function update(idx: number, field: keyof RowData, val: any) {
    setRows(p => { const n = [...p]; (n[idx] as any)[field] = val;
      if (field === "productId" && val) { for (let i = idx - 1; i >= 0; i--) { if (n[i].productId === val) { n[idx].frame = n[i].frame; n[idx].louver = n[i].louver; n[idx].colour = n[i].colour; n[idx].tilt = n[i].tilt; n[idx].inout = n[i].inout; break; } } }
      return n;
    });
  }

  function calc(r: RowData) {
    const p = productMap[r.productId]; const raw = (r.width && r.height) ? (r.width * r.height) / 1_000_000 : 0;
    const rawArea = raw > 0 ? ceil2(raw) : 0;
    // 窗户最小平方数 0.5
    const area = rawArea > 0 ? Math.max(0.5, rawArea) : 0;
    const up = p ? p.price_per_sqm : 0; const pl = area * up; let at = 0;
    for (const id of r.addonIds) { const a = addons.find(x => x.id === id); if (!a) continue; if (a.price_type === "per_window") at += a.price; else if (a.price_type === "per_sqm_fixed") at += a.price * area; else if (a.price_type === "per_sqm_percent") at += pl * (a.price / 100); }
    return { area, up, pl, at, lt: pl + at };
  }

  const calcs = rows.map(r => ({ ...r, ...calc(r) }));
  const totalArea = calcs.reduce((s, r) => s + r.area, 0);
  // 订单总平方数最小 1
  const areaScale = totalArea > 0 && totalArea < 1 ? 1 / totalArea : 1;
  const totalP = calcs.reduce((s, r) => s + r.pl, 0) * areaScale;
  const totalA = calcs.reduce((s, r) => s + r.at, 0);
  const gst = ceil2(totalP * 0.15); const grandT = ceil2(totalP + totalA + gst); const dep = ceil2(grandT * 0.6); const bal = ceil2(grandT * 0.4);
  const hasContent = rows.some(r => r.productId && r.width > 0 && r.height > 0);
  const groupedAddons = addons.reduce<Record<string, Addon[]>>((acc, a) => { (acc[(a as any).category] = acc[(a as any).category] || []).push(a); return acc; }, {});

  async function save(status: "draft" | "pending") {
    if (status === "pending" && !orderNumber.trim()) { setMsg("Client Order Number is required."); return; }
    if (!hasContent) { setMsg("Fill in at least one row."); return; }
    setSubmitting(true); setMsg("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMsg("Login expired."); setSubmitting(false); return; }
    const { data: acct } = await supabase.from("wholesale_accounts").select("id").eq("auth_user_id", user.id).single();
    if (!acct) { setMsg("Account not found."); setSubmitting(false); return; }

    const orderPayload: Record<string, any> = {
      account_id: acct.id, client_order_number: orderNumber.trim() || null, site_address: siteAddress.trim() || null,
      status, product_total: Math.round(totalP * 100) / 100, addon_total: Math.round(totalA * 100) / 100,
      order_total: Math.round(grandT * 100) / 100, deposit_amount: Math.round(dep * 100) / 100,
      balance_amount: Math.round(bal * 100) / 100, customer_note: note || null,
    };
    if (status === "pending") orderPayload.ordered_at = new Date().toISOString();

    let orderId = draftId;
    if (draftId) {
      // Update existing draft
      const { error } = await supabase.from("wholesale_orders").update(orderPayload).eq("id", draftId);
      if (error) { setMsg(error.message); setSubmitting(false); return; }
      // Delete old items, then re-insert
      const { error: delErr } = await supabase.from("wholesale_order_items").delete().eq("order_id", draftId);
      if (delErr) { setMsg("删除旧行失败，已终止保存: " + delErr.message); setSubmitting(false); return; }
    } else {
      const orderNum = `VERA-${Date.now().toString(36).toUpperCase()}`;
      const { error: oe, data: order } = await supabase.from("wholesale_orders").insert({ ...orderPayload, order_number: orderNum }).select().single();
      if (oe) { setMsg(oe.message); setSubmitting(false); return; }
      orderId = order.id;
    }

    // Insert items
    for (const r of calcs) {
      if (!r.productId || !r.width || !r.height) continue;
      // special_request 只存用户输入的自由文本，不附加 addon 信息（addon 已经单独存在 selected_addon_ids 字段）
      const spec = r.special || null;
      await supabase.from("wholesale_order_items").insert({
        order_id: orderId, product_id: r.productId, window_label: r.window, width_mm: r.width, height_mm: r.height,
        panel_qty: r.panel || null, area_sqm: r.area, unit_price: r.up, line_total: Math.round(r.lt * 100) / 100,
        layout_code: r.layout || null, vt_post: r.vt || null, ht_post: r.ht || null, frame_colour: r.frame || null,
        mid_rail: r.midrail || null, louver_size: r.louver || null, colour: r.colour || null, tilt_rod: r.tilt || null,
        in_out_fit: r.inout || null, special_request: spec, selected_addon_ids: r.addonIds, sort_order: r.id,
      });
    }
    setSubmitting(false);
    router.push(`/portal/orders/${orderId}`);
  }

  // Selection handlers
  function isSel(r: number, c: number) { if (selR1 < 0) return false; const minR = Math.min(selR1, selR2), maxR = Math.max(selR1, selR2), minC = Math.min(selC1, selC2), maxC = Math.max(selC1, selC2); return r >= minR && r <= maxR && c >= minC && c <= maxC; }
  useEffect(() => { const up = () => { if (fillGoing.current && fillDrag.current) { const fr = fillDrag.current.r, fc = fillDrag.current.c; if (fc >= 0 && fc <= 14) { const fields: (keyof RowData)[] = ["window","width","height","productId","panel","layout","vt","ht","midrail","frame","louver","colour","tilt","inout","special"]; const f = fields[fc]; const r2 = Math.max(fr, selR2); const src = rows[fr][f]; setRows(p => { const n = p.map(r => ({ ...r })); for (let i = fr + 1; i <= r2; i++) (n[i] as any)[f] = src; return n; }); } fillDrag.current = null; } fillGoing.current = false; dragging.current = false; }; window.addEventListener("mouseup", up); return () => window.removeEventListener("mouseup", up); });
  useEffect(() => { const h = async (e: KeyboardEvent) => {
      // Delete key with row selected
      if ((e.key === "Delete" || e.key === "Backspace") && selectedRowIdx >= 0 && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement)) {
        e.preventDefault();
        deleteRow(selectedRowIdx);
        return;
      }
      const ctrl = e.ctrlKey || e.metaKey; if (!ctrl || selR1 < 0) return; const fields: (keyof RowData)[] = ["window","width","height","productId","panel","layout","vt","ht","midrail","frame","louver","colour","tilt","inout","special"]; const r1 = Math.min(selR1, selR2), r2 = Math.max(selR1, selR2), c1 = Math.min(selC1, selC2), c2 = Math.max(selC1, selC2); if (e.key === "c" || e.key === "C") { e.preventDefault(); const lines: string[] = []; for (let r = r1; r <= r2; r++) { const vals: string[] = []; for (let c = c1; c <= c2; c++) vals.push(String(rows[r][fields[c]] ?? "")); lines.push(vals.join("\t")); } await navigator.clipboard.writeText(lines.join("\n")); } if (e.key === "v" || e.key === "V") { e.preventDefault(); const text = await navigator.clipboard.readText(); if (!text) return; const lines = text.split("\n").filter(l => l.trim()); setRows(p => { const n = p.map(r => ({ ...r })); lines.forEach((line, ri) => { const tr = r1 + ri; if (tr >= n.length) return; line.split("\t").forEach((val, ci) => { const fc = c1 + ci; if (fc < 0 || fc >= fields.length) return; const f = fields[fc]; if (f === "width" || f === "height" || f === "panel") (n[tr] as any)[f] = Number(val) || 0; else (n[tr] as any)[f] = val; }); }); return n; }); } }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); });

  function nav(e: React.KeyboardEvent, r: number, c: number) {
    const lastC = 14; let nr = r, nc = c;
    if (e.key === "Tab") { e.preventDefault(); nc = e.shiftKey ? c - 1 : c + 1; if (nc < 0) { nc = lastC; nr--; } if (nc > lastC) { nc = 0; nr++; } }
    if (e.key === "Enter") { e.preventDefault(); nc = c + 1; if (nc > lastC) { nc = 0; nr++; } }
    if (e.key === "ArrowDown") { e.preventDefault(); nr = Math.min(r + 1, rows.length - 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); nr = Math.max(r - 1, 0); }
    if (e.key === "ArrowLeft" && c > 0) { e.preventDefault(); nc = c - 1; }
    if (e.key === "ArrowRight" && c < lastC) { e.preventDefault(); nc = c + 1; }
    if (nr !== r || nc !== c) { const el = tblRef.current?.querySelector<HTMLElement>(`[data-r="${nr}"][data-c="${nc}"]`); el?.focus(); if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.select(); }
  }

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-8"><p className="text-stone">Loading...</p></div>;

  return (
    <div className="w-full px-3 py-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-3">{draftId ? "Edit Draft" : "New Order"}</h1>

        {/* Customer Info (auto-filled, readonly) */}
        <div className="bg-white border-2 border-green rounded p-3 mb-3">
          <div className="text-[10px] font-semibold text-stone uppercase mb-2">Account Information</div>
          {account ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div><label className="text-[10px] text-stone">Company</label><p className="text-sm font-medium text-gray-900 px-2 py-1.5">{account.company_name}</p></div>
              <div><label className="text-[10px] text-stone">Contact</label><p className="text-sm font-medium text-gray-900 px-2 py-1.5">{account.contact_name}</p></div>
              <div><label className="text-[10px] text-stone">Phone</label><p className="text-sm font-medium text-gray-900 px-2 py-1.5">{account.phone || "—"}</p></div>
              <div><label className="text-[10px] text-stone">Email</label><p className="text-sm font-medium text-gray-900 px-2 py-1.5">{account.email}</p></div>
            </div>
          ) : <p className="text-sm text-stone">Loading...</p>}
        </div>

        {/* Order Info */}
        <div className="bg-white border border-border rounded p-3 mb-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[10px] text-stone">Client Order Number <span className="text-red-400">*</span></label>
              <input value={orderNumber} onChange={e => setOrderNumber(e.target.value)} className="w-full px-2 py-1.5 text-sm border border-border rounded bg-white" placeholder="e.g. PO-2026-001" /></div>
            <div><label className="text-[10px] text-stone">Site Address</label>
              <input value={siteAddress} onChange={e => setSiteAddress(e.target.value)} className="w-full px-2 py-1.5 text-sm border border-border rounded bg-white" placeholder="Optional" /></div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border border-border rounded bg-white" style={{ minWidth: "1500px" }}>
          <table ref={tblRef} className="w-full text-xs border-collapse">
            <thead><tr className="bg-gray-50 text-[9px] font-semibold text-stone uppercase tracking-wider sticky top-0 z-10">
              <th className="border border-border px-1 py-1 text-left w-9 min-w-[36px]">#</th>
              <th className="border border-border px-1 py-1 text-left w-[130px] min-w-[130px]">Window</th>
              <th className="border border-border px-1 py-1 text-left w-[65px] min-w-[65px]">Width</th>
              <th className="border border-border px-1 py-1 text-left w-[65px] min-w-[65px]">Height</th>
              <th className="border border-border px-1 py-1 text-left w-[170px] min-w-[170px]">Product</th>
              <th className="border border-border px-1 py-1 text-left w-[55px] min-w-[55px]">Panel</th>
              <th className="border border-border px-1 py-1 text-left w-[70px] min-w-[70px]">Layout</th>
              <th className="border border-border px-1 py-1 text-left w-[55px] min-w-[55px]">VT</th>
              <th className="border border-border px-1 py-1 text-left w-[55px] min-w-[55px]">HT</th>
              <th className="border border-border px-1 py-1 text-left w-[60px] min-w-[60px]">Midrail</th>
              <th className="border border-border px-1 py-1 text-left w-[130px] min-w-[130px]">Frame</th>
              <th className="border border-border px-1 py-1 text-left w-[80px] min-w-[80px]">Louver</th>
              <th className="border border-border px-1 py-1 text-left w-[130px] min-w-[130px]">Colour</th>
              <th className="border border-border px-1 py-1 text-left w-[110px] min-w-[110px]">Tilt Rod</th>
              <th className="border border-border px-1 py-1 text-left w-[85px] min-w-[85px]">In/Out</th>
              <th className="border border-border px-1 py-1 text-left w-[150px] min-w-[150px]">Special</th>
              <th className="border border-border px-1 py-1 text-right w-[85px] min-w-[85px]">Price</th>
            </tr></thead>
            <tbody onFocus={(e) => { const el = e.target as HTMLElement; const tr = el.closest("tr"); if (tr && tr.parentElement) { const idx = Array.from(tr.parentElement.children).indexOf(tr); setSelR1(idx); setSelC1(0); setSelR2(idx); setSelC2(0); } }} tabIndex={-1}>
              {rows.map((r, ri) => {
                const c = calc(r); const sel = isSel(ri, -1); const isRowSelected = selectedRowIdx === ri;
                return <tr key={r.id} className={`${ri % 2 === 0 ? "bg-white" : "bg-gray-50/30"} ${isRowSelected ? "outline outline-2 outline-red-400 -outline-offset-1" : ""}`}>
                  <td className={`border border-border p-0 text-center select-none cursor-pointer ${isRowSelected ? "bg-red-100" : sel ? "bg-green/20" : ""}`}
                    onClick={() => setSelectedRowIdx(prev => prev === ri ? -1 : ri)}
                    title={isRowSelected ? "Click to deselect. Then press Del key or click Delete button." : "Click to select entire row"}>
                    <span className="text-green font-bold text-xs">{ri + 1}</span>
                    {isRowSelected && <span className="block text-[8px] text-red-500 font-semibold leading-tight">× DEL</span>}
                  </td>
                  {(["window","width","height","productId","panel","layout","vt","ht","midrail","frame","louver","colour","tilt","inout","special"] as (keyof RowData)[]).map((f, ci) => {
                    const s = isSel(ri, ci); const single = selR1 === selR2 && selC1 === selC2 && selR1 === ri && selC1 === ci;
                    const val = r[f] as string | number;
                    const isSelect = f === "productId" || f === "frame" || f === "louver" || f === "colour" || f === "tilt" || f === "inout";
                    const isNum = f === "width" || f === "height" || f === "panel";

                    let content: React.ReactNode = null;
                    if (f === "productId") {
                      const sp = productMap[val as string];
                      content = <div className="flex flex-col"><select value={val as string} data-r={ri} data-c={ci}
                        onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        className="w-full text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 cursor-pointer font-semibold" style={{ padding: 0, height: "1.3em", lineHeight: "1.3em" }}
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }}>
                        <option value=""></option>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                        {sp && <span className="text-[9px] text-stone/60 leading-none px-0.5">{sp.material} Shutters</span>}</div>;
                    } else if (f === "frame") {
                      const opts = frameOptions(r.productId);
                      content = <select value={val as string} data-r={ri} data-c={ci} onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        className="w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 cursor-pointer"
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }}>
                        <option value=""></option>{opts.map(o => <option key={o.option_name} value={o.option_name}>{o.option_name}</option>)}</select>;
                    } else if (f === "colour") {
                      const opts = colourOptions(r.productId);
                      content = <select value={val as string} data-r={ri} data-c={ci} onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        className="w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 cursor-pointer"
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }}>
                        <option value=""></option>{opts.map(o => <option key={o.option_name} value={o.option_name}>{o.option_name}</option>)}</select>;
                    } else if (f === "louver") {
                      content = <select value={val as string} data-r={ri} data-c={ci} onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        className="w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 cursor-pointer"
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }}>
                        <option value=""></option>{LOUVER.map(o => <option key={o} value={o}>{o}</option>)}</select>;
                    } else if (f === "tilt") {
                      content = <select value={val as string} data-r={ri} data-c={ci} onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        className="w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 cursor-pointer"
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }}>
                        <option value=""></option>{TILT_ROD.map(o => <option key={o} value={o}>{o}</option>)}</select>;
                    } else if (f === "inout") {
                      content = <select value={val as string} data-r={ri} data-c={ci} onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        className="w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 cursor-pointer"
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }}>
                        <option value=""></option>{IN_OUT.map(o => <option key={o} value={o}>{o}</option>)}</select>;
                    } else if (f === "special") {
                      const names = r.addonIds.map(id => addons.find(a => a.id === id)?.name || id).join(", ");
                      const display = [val as string, names ? "Add-ons: " + names : ""].filter(Boolean).join("\n");
                      content = <div className="flex items-start gap-0.5"><textarea value={display} readOnly rows={Math.max(1, display.split("\n").length)}
                        className="flex-1 px-1 py-2 text-xs border-0 bg-transparent resize-none cursor-pointer focus:outline-none focus:bg-green/10 min-h-[2.5em]" onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }} />
                        <button onClick={e => { e.stopPropagation(); setShowAddonFor(ri); }} className="shrink-0 px-1.5 py-1 bg-green/10 text-green text-[9px] rounded hover:bg-green/20 mt-1">+</button></div>;
                    } else if (isNum) {
                      content = <input type="number" min="0" value={val || ""} data-r={ri} data-c={ci} onChange={e => update(ri, f, Number(e.target.value))} onKeyDown={e => nav(e, ri, ci)}
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }} className={`w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10 ${noArrow}`} />;
                    } else {
                      content = <input value={val as string} data-r={ri} data-c={ci} onChange={e => update(ri, f, e.target.value)} onKeyDown={e => nav(e, ri, ci)}
                        onClick={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); }} className="w-full px-1 py-2 text-xs border-0 bg-transparent focus:outline-none focus:bg-green/10" />;
                    }

                    return <td key={ci} className={`border border-border p-0 relative ${s ? "bg-green/20" : ""}`}
                      onMouseDown={e => { setSelR1(ri); setSelC1(ci); setSelR2(ri); setSelC2(ci); dragging.current = true; }}
                      onMouseOver={() => { if (dragging.current) { setSelR2(ri); setSelC2(ci); } }}>
                      {content}{single && !dragging.current && !fillGoing.current &&
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green cursor-crosshair z-10" style={{ transform: "translate(1px,1px)" }}
                          onMouseDown={e => { e.stopPropagation(); e.preventDefault(); fillDrag.current = { r: ri, c: ci }; fillGoing.current = true; }} />}
                    </td>;
                  })}
                  <td className={`border border-border p-0 text-right ${isSel(ri, 15) ? "bg-green/20" : ""}`}
                    onMouseDown={e => { setSelR1(ri); setSelC1(15); setSelR2(ri); setSelC2(15); dragging.current = true; }}
                    onMouseOver={() => { if (dragging.current) { setSelR2(ri); setSelC2(15); } }}>
                    {c.lt > 0 && <span className="px-1 font-semibold text-green">${c.lt.toFixed(2)}</span>}
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 mt-2 mb-3 flex-wrap items-center">
          <button onClick={() => setRows(p => [...p, EMPTY(p.length)])} className="px-3 py-1 bg-gray-100 border border-border text-xs font-medium rounded hover:bg-gray-200">+ Add Row</button>
          <button onClick={() => setRows(p => p.length > 1 ? p.slice(0, -1) : p)} className="px-3 py-1 bg-gray-100 border border-border text-xs font-medium rounded hover:bg-gray-200">- Remove Last</button>
          {selectedRowIdx >= 0 && (
            <button onClick={() => deleteRow(selectedRowIdx)} className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600 transition-all shadow-sm animate-pulse-fast">
              🗑 Delete Row {selectedRowIdx + 1}
            </button>
          )}
        </div>

        {showAddonFor !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowAddonFor(null)}>
          <div className="bg-white rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-semibold text-gray-900 mb-3">Add-ons — Row {showAddonFor + 1}</p>
            {Object.entries(groupedAddons).map(([cat, items]) => <div key={cat} className="mb-2">{items.map(a => { const checked = rows[showAddonFor]?.addonIds.includes(a.id); return <label key={a.id} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={checked || false} onChange={() => { setRows(p => { const n = p.map(r => ({ ...r })); const row = n[showAddonFor]; row.addonIds = row.addonIds.includes(a.id) ? row.addonIds.filter(id => id !== a.id) : [...row.addonIds, a.id]; return n; }); }} className="accent-green" />
              <span className="text-sm text-gray-700">{a.name}</span><span className="text-xs text-stone ml-auto">{a.price_type === "per_window" ? `$${a.price}/w` : a.price_type === "per_sqm_fixed" ? `$${a.price}/m²` : `${a.price}%`}</span>
            </label>; })}</div>)}
            <button onClick={() => setShowAddonFor(null)} className="mt-2 px-4 py-1.5 bg-green text-white text-sm font-semibold rounded hover:bg-green-600 w-full">Done</button>
          </div>
        </div>}

        <div className="bg-white border-2 border-green rounded p-3 mt-3 max-w-xs ml-auto">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-stone">Product</span><span className="font-semibold">${totalP.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-stone">GST (15%)</span><span className="font-semibold">${gst.toFixed(2)}</span></div>
            <div className="border-t border-border pt-1 flex justify-between font-bold text-lg"><span>Total</span><span className="text-green">${grandT.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs text-stone"><span>Deposit 60%</span><span className="font-semibold text-gray-900">${dep.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs text-stone"><span>Balance 40%</span><span className="font-semibold text-gray-900">${bal.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="mt-3 max-w-md mx-auto">
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Order note..." className="w-full px-3 py-2 border border-border rounded text-sm resize-y mb-3" />
          {msg && <div className="p-3 rounded text-sm mb-3 bg-red-50 text-red-700">{msg}</div>}
          <div className="flex gap-3">
            <button onClick={() => save("draft")} disabled={submitting}
              className="flex-1 px-6 py-3 border-2 border-green text-green font-semibold rounded hover:bg-green-50 transition-all disabled:opacity-50">
              {submitting ? "Saving..." : "Save as Draft"}</button>
            <button onClick={() => save("pending")} disabled={submitting || !orderNumber.trim()}
              className="flex-1 px-6 py-3 bg-green text-white font-semibold rounded hover:bg-green-600 transition-all disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Order"}</button>
          </div>
        </div>

        {/* Toast notification */}
        {toast.visible && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl shadow-lg animate-slide-up flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}
