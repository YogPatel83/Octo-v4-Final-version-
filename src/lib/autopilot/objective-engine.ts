import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function processObjectives(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: objectives } = await supabase
    .from("objectives")
    .select("*")
    .eq("company_id", companyId)
    .eq("status", "active");

  const createdTasks = [];

  for (const objective of objectives || []) {
    const { data: task } = await supabase
      .from("tasks")
      .insert({
        company_id: companyId,
        title: `Objective Execution: ${objective.title}`,
        description: objective.description || null,
        status: "queued",
        source: "autopilot",
      })
      .select()
      .single();

    if (task) {
      createdTasks.push(task);
    }
  }

  return {
    objectives: objectives?.length || 0,
    tasks_created: createdTasks.length,
  };
}
