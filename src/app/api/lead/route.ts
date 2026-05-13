import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendApiKey = process.env.RESEND_API_KEY;

function buildEmailHtml(body: any): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1A2A32; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #B8924B; margin: 0; font-size: 20px;">🏢 VERA — New Trade Enquiry</h1>
      </div>
      <div style="background: #FAF9F6; padding: 24px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B6B6B; width: 140px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A;">${body.full_name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B;">Company</td>
              <td style="padding: 8px 0; color: #1A1A1A;">${body.company || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B;">Phone</td>
              <td style="padding: 8px 0; color: #1A1A1A;">${body.phone || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B;">Email</td>
              <td style="padding: 8px 0; color: #1A1A1A;">${body.email || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B;">Business Type</td>
              <td style="padding: 8px 0; color: #1A1A1A;">${body.business_type || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B6B6B;">Interested in</td>
              <td style="padding: 8px 0; color: #1A1A1A;">${body.product_interest || "—"}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-weight: 600; color: #1A1A1A;">Message:</p>
          <p style="margin: 0; color: #6B6B6B; white-space: pre-wrap;">${body.message || "—"}</p>
        </div>
        <p style="margin-top: 16px; color: #999; font-size: 12px;">
          Received ${new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })}
        </p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, company, phone, email, business_type, product_interest, message, source_url } = body;

    if (!full_name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error } = await supabase.from("leads").insert({
      workspace_id: "00000000-0000-0000-0000-000000000001",
      full_name: full_name.trim(),
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      product_interest: product_interest || null,
      message: [`Company: ${company || "—"}`, `Business type: ${business_type || "—"}`, `Message: ${message || "—"}`].join("\n"),
      source_url: source_url || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
    }

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const notifyEmail = process.env.NOTIFICATION_EMAIL || "dylan@shutterstudio.co.nz";
        await resend.emails.send({
          from: "VERA <onboarding@resend.dev>",
          to: [notifyEmail],
          subject: `VERA Trade Enquiry from ${full_name.trim()}${company ? ` — ${company}` : ""}`,
          html: buildEmailHtml(body),
        });
      } catch (mailErr) {
        console.error("Email notification failed:", mailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
