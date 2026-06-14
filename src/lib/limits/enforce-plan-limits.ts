import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getPlanLimits } from "@/lib/billing/plans";

export async function getCompanyPlan(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.plan || "free";
}

export async function getLimitStatus(companyId: string) {
  const supabase = createSupabaseAdmin();
  const plan = await getCompanyPlan(companyId);
  const limits = getPlanLimits(plan);

  const [agents, teams, workflows, tasks] = await Promise.all([
    supabase.from("agents").select("*", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("teams").select("*", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("workflows").select("*", { count: "exact", head: true }).eq("company_id", companyId),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("company_id", companyId),
  ]);

  return {
    plan,
    limits,
    usage: {
      agents: agents.count || 0,
      teams: teams.count || 0,
      workflows: workflows.count || 0,
      monthly_tasks: tasks.count || 0,
    },
  };
}

export async function enforcePlanLimit(input: {
  company_id: string;
  resource: "agents" | "teams" | "workflows" | "monthly_tasks";
}) {
  const status = await getLimitStatus(input.company_id);
  const limit = Number(status.limits[input.resource] ?? 0);
  const used = Number(status.usage[input.resource] ?? 0);

  if (limit === -1) {
    return {
      allowed: true,
      unlimited: true,
      ...status,
    };
  }

  const allowed = used < limit;

  return {
    allowed,
    unlimited: false,
    resource: input.resource,
    used,
    limit,
    remaining: Math.max(0, limit - used),
    message: allowed
      ? "Allowed."
      : `Plan limit reached for ${input.resource}. Upgrade your plan to continue.`,
    ...status,
  };
}
