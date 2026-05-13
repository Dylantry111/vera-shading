import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const [order, items, addons, account] = await Promise.all([
    supabase.from("wholesale_orders").select("*").eq("id", id).single(),
    supabase.from("wholesale_order_items").select("*, wholesale_products(name)").eq("order_id", id),
    supabase.from("wholesale_addons").select("*"),
    supabase.from("wholesale_accounts").select("*"),
  ]);

  if (order.error) {
    return NextResponse.json({ error: order.error.message }, { status: 500 });
  }

  // Find the matching account
  const acct = (account.data || []).find(a => a.id === order.data.account_id) || null;

  return NextResponse.json({
    order: order.data,
    items: items.data || [],
    addons: addons.data || [],
    account: acct,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from("wholesale_orders")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}
