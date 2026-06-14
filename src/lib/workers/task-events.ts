import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createExecutionEvent(input: {
  company_id: string;
  task_id?: string | null;
  event_type: string;
  message?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("execution_events")
    .insert({
      company_id: input.company_id,
      task_id: input.task_id || null,
      event_type: input.event_type,
      message: input.message || null,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) {
    console.error("Execution event failed:", error.message);
    return null;
  }

  return data;
}
