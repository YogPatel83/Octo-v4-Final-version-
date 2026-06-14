import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function orchestrateCompany(input: {
  company_id: string;
  objective: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", input.company_id);

  const { data: teams } = await supabase
    .from("teams")
    .select("*")
    .eq("company_id", input.company_id);

  const { data: workflows } = await supabase
    .from("workflows")
    .select("*")
    .eq("company_id", input.company_id);

  return {
    company_id: input.company_id,
    objective: input.objective,
    available_agents: agents || [],
    available_teams: teams || [],
    available_workflows: workflows || [],
    execution_strategy: {
      priority: [
        "teams",
        "agents",
        "workflows"
      ],
      mode: "autonomous"
    }
  };
}
