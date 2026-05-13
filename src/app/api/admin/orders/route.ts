import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q");

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  let query = supabase
    .from("wholesale_orders")
    .select("*, wholesale_accounts!inner(company_name, contact_name, email, phone)")
    .order("created_at", { ascending: false });

  if (status === "active") {
    query = query.not("status", "in", "(\"draft\",\"completed\",\"cancelled\")");
  } else if (status) {
    query = query.eq("status", status);
  }
  if (q) query = query.or(`order_number.ilike.%${q}%,client_order_number.ilike.%${q}%,wholesale_accounts.company_name.ilike.%${q}%`);

  const { data, error } = await query.limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}
