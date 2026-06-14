import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ audit_events: data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  if (!body.company_id || !body.action) {
    return NextResponse.json({ error: "company_id and action are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      company_id: body.company_id,
      actor_id: body.actor_id || null,
      action: body.action,
      metadata: body.metadata || {},
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ audit_event: data });
}
