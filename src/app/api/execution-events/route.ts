import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");
  const taskId = url.searchParams.get("task_id");

  if (!companyId) {
    return NextResponse.json({ error: "Missing company_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("execution_events")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (taskId) query = query.eq("task_id", taskId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ events: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("execution_events")
    .insert({
      company_id: body.company_id,
      task_id: body.task_id || null,
      event_type: body.event_type,
      message: body.message || null,
      metadata: body.metadata || {},
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ event: data });
}
