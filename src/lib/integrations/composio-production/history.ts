import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function listComposioExecutionRuns(input: {
  company_id: string;
  limit?: number;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("composio_execution_runs")
    .select("*")
    .eq("company_id", input.company_id)
    .order("created_at", { ascending: false })
    .limit(input.limit || 100);

  if (error) throw new Error(error.message);

  return data || [];
}
