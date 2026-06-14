import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function delegateTask(taskId: string) {
  const supabase = createSupabaseAdmin();

  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .single();

  if (!task) {
    throw new Error("Task not found");
  }

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", task.company_id)
    .eq("status", "idle");

  const selectedAgent = agents?.[0];

  if (!selectedAgent) {
    return {
      delegated: false,
      reason: "No idle agents available"
    };
  }

  await supabase
    .from("tasks")
    .update({
      assigned_agent_id: selectedAgent.id,
      status: "assigned"
    })
    .eq("id", taskId);

  return {
    delegated: true,
    task_id: taskId,
    agent_id: selectedAgent.id
  };
}
