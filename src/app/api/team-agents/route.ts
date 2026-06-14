import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const teamId = new URL(req.url).searchParams.get("team_id");

  if (!teamId) {
    return NextResponse.json({ error: "Missing team_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("team_agents")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ team_agents: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("team_agents")
    .insert({
      team_id: body.team_id,
      agent_id: body.agent_id,
      role: body.role || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ team_agent: data });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  const { error } = await supabase
    .from("team_agents")
    .delete()
    .eq("team_id", body.team_id)
    .eq("agent_id", body.agent_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
