import { createSupabaseAdmin } from "@/lib/supabase/server";
import { extractKnowledgeFromText } from "./extract-knowledge";
import { saveCompanyKnowledgeItem } from "./save-knowledge";

export async function learnFromDataset(input: {
  company_id: string;
  source_table: string;
  source_id: string;
  text?: string | null;
  objective?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data: run, error: runError } = await supabase
    .from("dataset_learning_runs")
    .insert({
      company_id: input.company_id,
      dataset_id: input.source_table === "datasets" ? input.source_id : null,
      file_id: input.source_table === "files" ? input.source_id : null,
      status: "running",
      output: {},
    })
    .select()
    .single();

  if (runError) throw new Error(runError.message);

  let text = input.text || "";

  if (!text) {
    const { data: source } = await supabase
      .from(input.source_table)
      .select("*")
      .eq("id", input.source_id)
      .maybeSingle();

    text =
      source?.extracted_text ||
      source?.content ||
      source?.description ||
      source?.text ||
      "";
  }

  if (!text) {
    await supabase
      .from("dataset_learning_runs")
      .update({
        status: "failed",
        error: "No text found for dataset learning.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", run.id);

    return {
      learned: false,
      reason: "No text found.",
    };
  }

  const extracted = await extractKnowledgeFromText({
    text,
    objective: input.objective || null,
  });

  const saved = [];

  for (const item of extracted.items) {
    if (!item.content) continue;

    const knowledge = await saveCompanyKnowledgeItem({
      company_id: input.company_id,
      source_table: input.source_table,
      source_id: input.source_id,
      knowledge_type: item.knowledge_type || "general",
      title: item.title || "Learned knowledge",
      content: item.content,
      confidence: item.confidence || 70,
      tags: item.tags || [],
      metadata: {
        learning_run_id: run.id,
      },
    });

    saved.push(knowledge);
  }

  await supabase
    .from("dataset_learning_runs")
    .update({
      status: "completed",
      extracted_items: saved.length,
      output: {
        saved_count: saved.length,
        raw: extracted.raw,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", run.id);

  return {
    learned: true,
    run_id: run.id,
    saved_count: saved.length,
    items: saved,
  };
}
