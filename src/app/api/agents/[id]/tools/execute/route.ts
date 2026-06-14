import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeToolAction } from "@/lib/tools/execute-tool";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  if (!body.tool_name || !body.action) {
    return NextResponse.json(
      { error: "tool_name and action are required." },
      { status: 400 }
    );
  }

  const { data: tool, error } = await supabase
    .from("agent_tools")
    .select("*")
    .eq("agent_id", id)
    .eq("tool_name", body.tool_name)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!tool) {
    return NextResponse.json(
      { error: "This tool is not connected to the agent." },
      { status: 400 }
    );
  }

  const result = await executeToolAction({
    tool_name: body.tool_name,
    action: body.action,
    payload: body.payload || {},
  });

  return NextResponse.json({
    agent_id: id,
    tool_id: tool.id,
    result,
  });
}
