import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function planSwarms(input: {
  company_id: string;
  objective: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data: teams } = await supabase
    .from("teams")
    .select("*")
    .eq("company_id", input.company_id);

  const planned = (teams || []).map((team, index) => ({
    team_id: team.id,
    team_name: team.name,
    goal: team.goal,
    order: index + 1,
    assignment: `Contribute to objective: ${input.objective}`,
  }));

  return {
    company_id: input.company_id,
    objective: input.objective,
    swarm_count: planned.length,
    swarms: planned,
  };
}
