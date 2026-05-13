import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  try {
    const { email, password, company_name, contact_name, phone, address, notes } = await request.json();

    if (!email || !password || !company_name || !contact_name) {
      return NextResponse.json({ error: "Email, password, company name, and contact name are required." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 1. Create auth user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { company_name, contact_name },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Create wholesale account record
    const { error: accountError } = await supabase.from("wholesale_accounts").insert({
      auth_user_id: authUser.user.id,
      email,
      company_name,
      contact_name,
      phone: phone || null,
      address: address || null,
      notes: notes || null,
    });

    if (accountError) {
      // Rollback: delete the auth user
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return NextResponse.json({ error: accountError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Account created for ${contact_name} at ${company_name}.`,
      user: { email, id: authUser.user.id },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
