import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function retryFailedRuntimeItems() {
  const supabase = createSupabaseAdmin();

  const tables = ["ai_generations", "external_api_requests", "tasks"] as const;
  const results: Record<string, number> = {};

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .update({
        status: "queued",
        updated_at: new Date().toISOString(),
      })
      .eq("status", "failed")
      .select();

    if (error) throw new Error(error.message);

    results[table] = data?.length || 0;
  }

  return results;
}
