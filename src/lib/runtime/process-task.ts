import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeAgent } from "@/lib/agents/execute-agent";
import { updateRuntimeItem } from "./update-status";

export async function processTask(id: string) {
  const supabase = createSupabaseAdmin();

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  await updateRuntimeItem({
    table: "tasks",
    id,
    status: "running",
    output: {
      started_at: new Date().toISOString(),
    },
  });

  let result: Record<string, unknown> = {
    message: "Task completed without assigned agent.",
    task_title: task.title,
  };

  if (task.agent_id) {
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("*")
      .eq("id", task.agent_id)
      .single();

    if (agentError) throw new Error(agentError.message);

    const agentResult = await executeAgent({
      agent,
      task: {
        title: task.title,
        input: task.input || {},
      },
    });

    result = {
      agent_id: agent.id,
      agent_name: agent.name,
      ...agentResult,
    };
  }

  return updateRuntimeItem({
    table: "tasks",
    id,
    status: "completed",
    output: {
      ...result,
      completed_at: new Date().toISOString(),
    },
  });
}
