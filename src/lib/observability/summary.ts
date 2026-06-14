import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getObservabilitySummary(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [queued, running, completed, failed, approvals] = await Promise.all([
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("company_id", companyId).eq("status", "queued"),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("company_id", companyId).eq("status", "running"),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("company_id", companyId).eq("status", "completed"),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("company_id", companyId).eq("status", "failed"),
    supabase.from("approvals").select("id", { count: "exact", head: true }).eq("company_id", companyId).eq("status", "pending"),
  ]);

  return {
    company_id: companyId,
    tasks: {
      queued: queued.count || 0,
      running: running.count || 0,
      completed: completed.count || 0,
      failed: failed.count || 0,
    },
    approvals: {
      pending: approvals.count || 0,
    },
    health:
      (failed.count || 0) > 10
        ? "critical"
        : (queued.count || 0) > 50
          ? "busy"
          : "normal",
  };
}
