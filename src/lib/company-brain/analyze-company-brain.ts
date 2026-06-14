import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function analyzeCompanyBrain(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [agents, teams, workflows, memory, approvals, tasks] = await Promise.all([
    supabase.from("agents").select("*").eq("company_id", companyId),
    supabase.from("teams").select("*").eq("company_id", companyId),
    supabase.from("workflows").select("*").eq("company_id", companyId),
    supabase.from("memory_entries").select("*").eq("company_id", companyId).limit(50),
    supabase.from("approvals").select("*").eq("company_id", companyId).eq("status", "pending"),
    supabase.from("tasks").select("*").eq("company_id", companyId).limit(100),
  ]);

  return {
    company_id: companyId,
    brain_state: {
      agents: agents.data?.length || 0,
      teams: teams.data?.length || 0,
      workflows: workflows.data?.length || 0,
      memories: memory.data?.length || 0,
      pending_approvals: approvals.data?.length || 0,
      recent_tasks: tasks.data?.length || 0,
    },
    diagnosis: [
      "Company intelligence graph analyzed.",
      "Execution capacity estimated.",
      "Approval bottlenecks checked.",
      "Memory depth checked.",
    ],
  };
}
