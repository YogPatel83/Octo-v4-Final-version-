import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAgentVersion } from "@/lib/versions/create-version";

export async function GET(req: Request) {
  const agentId = new URL(req.url).searchParams.get("agent_id");

  if (!agentId) {
    return NextResponse.json({ error: "agent_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_versions")
    .select("*")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ versions: data });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.agent_id || !body.snapshot) {
    return NextResponse.json({ error: "agent_id and snapshot are required." }, { status: 400 });
  }

  const version = await createAgentVersion({
    agent_id: body.agent_id,
    version_label: body.version_label,
    snapshot: body.snapshot,
  });

  return NextResponse.json({ version });
}
