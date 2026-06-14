import { createSupabaseAdmin } from "@/lib/supabase/server";
import { processAiGeneration } from "./process-ai-generation";
import { processExternalApiRequest } from "./process-external-api";
import { processTask } from "./process-task";

async function getNextQueued(table: "ai_generations" | "external_api_requests" | "tasks") {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function processRuntimeQueue() {
  const processed = [];

  const aiGeneration = await getNextQueued("ai_generations");
  if (aiGeneration) {
    const result = await processAiGeneration(aiGeneration.id);
    processed.push({ type: "ai_generation", result });
  }

  const externalApi = await getNextQueued("external_api_requests");
  if (externalApi) {
    const result = await processExternalApiRequest(externalApi.id);
    processed.push({ type: "external_api_request", result });
  }

  const task = await getNextQueued("tasks");
  if (task) {
    const result = await processTask(task.id);
    processed.push({ type: "task", result });
  }

  return {
    processed_count: processed.length,
    processed,
  };
}
