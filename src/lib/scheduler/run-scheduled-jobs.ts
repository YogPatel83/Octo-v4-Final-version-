import { createSupabaseAdmin } from "@/lib/supabase/server";
import { runCompanyCycle } from "@/lib/autopilot/run-company-cycle";
import { createNotification } from "@/lib/notifications/create-notification";

export async function runScheduledJobs() {
  const supabase = createSupabaseAdmin();

  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .limit(25);

  if (error) throw new Error(error.message);

  const results = [];

  for (const company of companies || []) {
    try {
      const cycle = await runCompanyCycle(company.id);

      await createNotification({
        company_id: company.id,
        title: "Autopilot cycle completed",
        message: `Octo reviewed objectives and created ${cycle.generated_tasks.length} tasks.`,
        type: "autopilot_notification",
      });

      results.push({
        company_id: company.id,
        ok: true,
        cycle,
      });
    } catch (error) {
      results.push({
        company_id: company.id,
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return {
    companies_checked: companies?.length || 0,
    results,
  };
}
