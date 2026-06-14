import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");
  const agentId = url.searchParams.get("agent_id");

  if (!companyId) {
    return NextResponse.json({ error: "Missing company_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("memory_entries")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (agentId) query = query.eq("agent_id", agentId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ memory: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("memory_entries")
    .insert({
      company_id: body.company_id,
      agent_id: body.agent_id || null,
      title: body.title || null,
      content: body.content,
      metadata: body.metadata || {},
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ memory: data });
}
