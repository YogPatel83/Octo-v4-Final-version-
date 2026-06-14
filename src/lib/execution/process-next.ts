import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createExecutionRun } from "./create-run";
import { processExecutionRun } from "./process-run";

export async function ensureRunsForQueuedItems() {
  const supabase = createSupabaseAdmin();

  const created = [];

  const { data: generations } = await supabase
    .from("ai_generations")
    .select("*")
    .eq("status", "queued")
    .limit(5);

  for (const item of generations || []) {
    const run = await createExecutionRun({
      company_id: item.company_id,
      source_table: "ai_generations",
      source_id: item.id,
      provider: item.provider,
      action: item.type,
      input: item,
    });

    created.push(run);
  }

  const { data: externalRequests } = await supabase
    .from("external_api_requests")
    .select("*")
    .eq("status", "queued")
    .limit(5);

  for (const item of externalRequests || []) {
    const run = await createExecutionRun({
      company_id: item.company_id,
      source_table: "external_api_requests",
      source_id: item.id,
      provider: item.provider,
      action: item.action,
      input: item,
    });

    created.push(run);
  }

  return created;
}

export async function processNextExecutionRun() {
  const supabase = createSupabaseAdmin();

  await ensureRunsForQueuedItems();

  const { data: run, error } = await supabase
    .from("execution_runs")
    .select("*")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!run) {
    return {
      processed: false,
      reason: "No queued execution runs.",
    };
  }

  const result = await processExecutionRun(run.id);

  return {
    processed: true,
    result,
  };
}
