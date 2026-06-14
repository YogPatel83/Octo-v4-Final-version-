import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function runCompanyCycle(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("id", companyId)
    .single();

  if (!company) {
    throw new Error("Company not found.");
  }

  const { data: objectives } = await supabase
    .from("objectives")
    .select("*")
    .eq("company_id", companyId)
    .eq("status", "active");

  const generatedTasks = [];

  for (const objective of objectives || []) {
    const { data: task } = await supabase
      .from("tasks")
      .insert({
        company_id: companyId,
        title: `Autopilot Objective Review: ${objective.title}`,
        status: "queued",
        risk_level: "low",
      })
      .select()
      .single();

    if (task) {
      generatedTasks.push(task);
    }
  }

  await supabase.from("audit_logs").insert({
    company_id: companyId,
    action: "autopilot_cycle_executed",
    metadata: {
      generated_tasks: generatedTasks.length,
    },
  });

  return {
    company,
    generated_tasks: generatedTasks,
    objectives: objectives || [],
  };
}
