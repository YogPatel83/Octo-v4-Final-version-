import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeAgent } from "@/lib/agents/execute-agent";

export async function runSop(input: {
  sop_id: string;
  payload?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: sop, error: sopError } = await supabase
    .from("sops")
    .select("*")
    .eq("id", input.sop_id)
    .single();

  if (sopError) throw new Error(sopError.message);

  const steps = Array.isArray(sop.steps) ? sop.steps : [];
  const results = [];

  for (const step of steps) {
    if (!step.agent_id) {
      results.push({
        step,
        status: "skipped",
        reason: "No agent assigned.",
      });
      continue;
    }

    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("*")
      .eq("id", step.agent_id)
      .single();

    if (agentError) throw new Error(agentError.message);

    const result = await executeAgent({
      agent,
      task: {
        title: step.action || "Run SOP step",
        input: {
          sop_name: sop.name,
          payload: input.payload || {},
          previous_results: results,
        },
      },
    });

    results.push({
      step,
      status: "completed",
      result,
    });
  }

  return {
    sop,
    results,
  };
}
