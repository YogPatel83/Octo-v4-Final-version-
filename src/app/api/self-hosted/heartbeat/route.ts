import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("private_deployment_settings")
    .update({
      last_heartbeat_at: new Date().toISOString(),
      last_health_status: "healthy",
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", body.company_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("self_hosted_worker_events").insert({
    company_id: body.company_id,
    worker_url: data.worker_url || null,
    event_type: "heartbeat",
    status: "healthy",
    metadata: body.metadata || {},
  });

  return NextResponse.json({ ok: true, settings: data });
}
