import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createSecurityEvent } from "@/lib/security/security-events";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("security_events")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ events: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  const event = await createSecurityEvent({
    company_id: body.company_id || null,
    user_id: body.user_id || null,
    event_type: body.event_type,
    severity: body.severity || "medium",
    ip_address: body.ip_address || null,
    user_agent: body.user_agent || null,
    message: body.message || null,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ event });
}
