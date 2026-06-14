import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createExecutionEvent } from "@/lib/workers/task-events";

export async function markTaskFailed(input: {
  task_id: string;
  error_message: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: task, error: readError } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", input.task_id)
    .single();

  if (readError) throw new Error(readError.message);

  const attempts = Number(task.output?.attempts || 0) + 1;

  const { data, error } = await supabase
    .from("tasks")
    .update({
      status: attempts >= 3 ? "failed" : "queued",
      output: {
        ...(task.output || {}),
        attempts,
        last_error: input.error_message,
        failed_at: new Date().toISOString(),
        metadata: input.metadata || {},
      },
    })
    .eq("id", input.task_id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await createExecutionEvent({
    company_id: task.company_id,
    task_id: task.id,
    event_type: attempts >= 3 ? "task_failed" : "task_retry_scheduled",
    message: input.error_message,
    metadata: {
      attempts,
      ...input.metadata,
    },
  });

  return data;
}
