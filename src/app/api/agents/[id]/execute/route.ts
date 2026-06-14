import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeAgent } from "@/lib/agents/execute-agent";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("*")
    .eq("id", id)
    .single();

  if (agentError) {
    return NextResponse.json({ error: agentError.message }, { status: 500 });
  }

  const result = await executeAgent({
    agent,
    task: {
      title: body.title,
      input: body.input || {},
    },
  });

  return NextResponse.json({
    agent_id: id,
    result,
  });
}
