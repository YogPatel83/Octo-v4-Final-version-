import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function workforceStatus(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { count: agents } = await supabase
    .from("agents")
    .select("id", { count: "exact", head: true })
    .eq("company_id", companyId);

  const { count: teams } = await supabase
    .from("teams")
    .select("id", { count: "exact", head: true })
    .eq("company_id", companyId);

  const { count: workflows } = await supabase
    .from("workflows")
    .select("id", { count: "exact", head: true })
    .eq("company_id", companyId);

  return {
    company_id: companyId,
    agents: agents || 0,
    teams: teams || 0,
    workflows: workflows || 0,
    workforce_health:
      (agents || 0) > 0
        ? "active"
        : "needs_setup"
  };
}
