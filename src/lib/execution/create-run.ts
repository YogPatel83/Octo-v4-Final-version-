import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createExecutionRun(input: {
  company_id: string;
  source_table: string;
  source_id: string;
  provider?: string | null;
  action?: string | null;
  input?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("execution_runs")
    .insert({
      company_id: input.company_id,
      source_table: input.source_table,
      source_id: input.source_id,
      provider: input.provider || null,
      action: input.action || null,
      status: "queued",
      input: input.input || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
