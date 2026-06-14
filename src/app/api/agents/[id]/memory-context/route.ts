import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { buildRagContext } from "@/lib/rag/build-context";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const supabase = createSupabaseAdmin();

  const { data: agent, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const result = await buildRagContext({
    company_id: agent.company_id,
    agent_id: id,
    query: body.query,
    match_count: body.match_count || 8,
  });

  return NextResponse.json({
    agent_id: id,
    context: result,
  });
}
