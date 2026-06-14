import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeAgent } from "@/lib/agents/execute-agent";
import { searchMemory } from "@/lib/memory/search-memory";
import { writeMemory } from "@/lib/memory/write-memory";

export async function runSwarm(input: {
  team_id: string;
  objective: string;
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

  const agentIds = links.map((link) => link.agent_id);

  const { data: agents, error: agentsError } = await supabase
    .from("agents")
    .select("*")
    .in("id", agentIds);

  if (agentsError) throw new Error(agentsError.message);

  const memories = await searchMemory({
    company_id: team.company_id,
    query: input.objective,
    match_count: 6,
  });

  const results = [];

  for (const agent of agents || []) {
    const result = await executeAgent({
      agent,
      task: {
        title: input.objective,
        input: {
          team_name: team.name,
          team_goal: team.goal,
          relevant_memory: memories,
        },
      },
    });

    results.push({
      agent_id: agent.id,
      agent_name: agent.name,
      role: agent.role,
      result,
    });

    await writeMemory({
      company_id: team.company_id,
      agent_id: agent.id,
      title: `Swarm result: ${input.objective}`,
      content: result.content,
      metadata: {
        team_id: team.id,
        objective: input.objective,
        provider: result.provider,
        model: result.model,
      },
    });
  }

  return {
    team,
    objective: input.objective,
    memory_used: memories,
    results,
  };
}
