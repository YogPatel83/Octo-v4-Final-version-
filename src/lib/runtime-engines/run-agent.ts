import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeAgent } from "@/lib/agents/execute-agent";

export async function runAgentRuntime(input: {
  agent_id: string;
  title: string;
  payload?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: agent, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", input.agent_id)
    .single();

  if (error) throw new Error(error.message);

  const result = await executeAgent({
    agent,
    task: {
      title: input.title,
      input: input.payload || {},
    },
  });

  await supabase.from("execution_events").insert({
    company_id: agent.company_id,
    event_type: "agent_runtime_completed",
    message: input.title,
    metadata: {
      agent_id: agent.id,
      result,
    },
  });

  return {
    agent,
    result,
  };
}
