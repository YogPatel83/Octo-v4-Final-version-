import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function buildCompanySummary(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [
    agents,
    tasks,
    approvals,
    workflows
  ] = await Promise.all([
    supabase.from("agents").select("*").eq("company_id", companyId),
    supabase.from("tasks").select("*").eq("company_id", companyId),
    supabase.from("approvals").select("*").eq("company_id", companyId),
    supabase.from("workflows").select("*").eq("company_id", companyId)
  ]);

  return {
    agents: agents.data?.length || 0,
    tasks: tasks.data?.length || 0,
    approvals: approvals.data?.length || 0,
    workflows: workflows.data?.length || 0
  };
}
