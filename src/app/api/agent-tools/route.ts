import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { isSupportedTool } from "@/lib/composio/tools";

export async function GET(req: Request) {
  const agentId = new URL(req.url).searchParams.get("agent_id");

  if (!agentId) {
    return NextResponse.json({ error: "Missing agent_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_tools")
    .select("*")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ tools: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  if (!body.agent_id || !body.tool_name) {
    return NextResponse.json({ error: "agent_id and tool_name are required." }, { status: 400 });
  }

  if (!isSupportedTool(body.tool_name)) {
    return NextResponse.json({ error: "Unsupported tool." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agent_tools")
    .insert({
      agent_id: body.agent_id,
      tool_name: body.tool_name,
      config: body.config || {},
      status: body.status || "not_connected",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ tool: data });
}
