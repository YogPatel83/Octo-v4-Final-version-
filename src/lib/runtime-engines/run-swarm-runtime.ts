import { createSupabaseAdmin } from "@/lib/supabase/server";
import { runAgentRuntime } from "./run-agent";

export async function runSwarmRuntime(input: {
  team_id: string;
  objective: string;
  payload?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("*")
    .eq("id", input.team_id)
    .single();

  if (teamError) throw new Error(teamError.message);

  const { data: links, error: linksError } = await supabase
    .from("team_agents")
    .select("*")
    .eq("team_id", input.team_id);

  if (linksError) throw new Error(linksError.message);

  const results = [];

  for (const link of links || []) {
    const result = await runAgentRuntime({
      agent_id: link.agent_id,
      title: input.objective,
      payload: {
        team_id: input.team_id,
        team_name: team.name,
        team_goal: team.goal,
        ...(input.payload || {}),
      },
    });

    results.push(result);
  }

  await supabase.from("execution_events").insert({
    company_id: team.company_id,
    event_type: "swarm_runtime_completed",
    message: input.objective,
    metadata: {
      team_id: team.id,
      results_count: results.length,
    },
  });

  return {
    team,
    results,
  };
}
