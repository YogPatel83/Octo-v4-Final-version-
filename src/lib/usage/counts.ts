import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getCompanyCounts(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [agents, teams, workflows, tasks] = await Promise.all([
    supabase.from("agents").select("id", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("teams").select("id", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("workflows").select("id", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("company_id", companyId),
  ]);

  return {
    agents: agents.count || 0,
    teams: teams.count || 0,
    workflows: workflows.count || 0,
    monthly_tasks: tasks.count || 0,
  };
}
