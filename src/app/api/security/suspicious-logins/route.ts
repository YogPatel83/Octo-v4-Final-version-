import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");
  const userId = url.searchParams.get("user_id");

  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("suspicious_login_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (companyId) query = query.eq("company_id", companyId);
  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ events: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.event_id || !body.status) {
    return NextResponse.json({ error: "event_id and status are required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("suspicious_login_events")
    .update({
      status: body.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.event_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ event: data });
}
