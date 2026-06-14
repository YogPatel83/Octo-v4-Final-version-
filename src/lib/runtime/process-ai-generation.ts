import { createSupabaseAdmin } from "@/lib/supabase/server";
import { updateRuntimeItem } from "./update-status";

export async function processAiGeneration(id: string) {
  const supabase = createSupabaseAdmin();

  const { data: item, error } = await supabase
    .from("ai_generations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  await updateRuntimeItem({
    table: "ai_generations",
    id,
    status: "running",
    output: {
      started_at: new Date().toISOString(),
    },
  });

  const output = {
    completed_at: new Date().toISOString(),
    type: item.type,
    provider: item.provider,
    model: item.model,
    prompt: item.prompt,
    message: "Generation worker completed structure-level execution. Real provider adapter can replace this output.",
  };

  return updateRuntimeItem({
    table: "ai_generations",
    id,
    status: "completed",
    output,
  });
}
