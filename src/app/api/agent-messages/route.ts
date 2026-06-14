import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAgentMessage } from "@/lib/messages/create-agent-message";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");
  const teamId = url.searchParams.get("team_id");
  const taskId = url.searchParams.get("task_id");
  const agentId = url.searchParams.get("agent_id");

  if (!companyId) {
    return NextResponse.json({ error: "Missing company_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("agent_messages")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (teamId) query = query.eq("team_id", teamId);
  if (taskId) query = query.eq("task_id", taskId);
  if (agentId) query = query.or(`from_agent_id.eq.${agentId},to_agent_id.eq.${agentId}`);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ messages: data });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.message) {
    return NextResponse.json(
      { error: "company_id and message are required." },
      { status: 400 }
    );
  }

  const message = await createAgentMessage({
    company_id: body.company_id,
    from_agent_id: body.from_agent_id || null,
    to_agent_id: body.to_agent_id || null,
    team_id: body.team_id || null,
    task_id: body.task_id || null,
    message: body.message,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ message });
}
