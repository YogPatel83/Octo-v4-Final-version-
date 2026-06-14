import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createTaskPlan } from "@/lib/planning/create-task-plan";

export async function advanceObjective(objectiveId: string) {
  const supabase = createSupabaseAdmin();

  const { data: objective, error } = await supabase
    .from("objectives")
    .select("*")
    .eq("id", objectiveId)
    .single();

  if (error) throw new Error(error.message);

  const plan = createTaskPlan({
    company_id: objective.company_id,
    objective: objective.title,
  });

  return {
    objective,
    next_plan: plan,
  };
}
