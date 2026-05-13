import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Get all accounts with order counts and totals
  const { data: accounts, error } = await supabase
    .from("wholesale_accounts")
    .select(`
      *,
      wholesale_orders!inner(
        order_total,
        status
      )
    `)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Aggregate per account
  const result = (accounts as any[]).reduce((acc, row) => {
    const id = row.id;
    if (!acc[id]) {
      acc[id] = {
        id: row.id, company_name: row.company_name, contact_name: row.contact_name,
        email: row.email, phone: row.phone, address: row.address, notes: row.notes,
        active: row.active, created_at: row.created_at,
        _order_count: 0, _total_spend: 0,
      };
    }
    acc[id]._order_count += 1;
    acc[id]._total_spend += Number(row.wholesale_orders?.order_total || 0);
    return acc;
  }, {} as Record<string, any>);

  return NextResponse.json({ accounts: Object.values(result) });
}
