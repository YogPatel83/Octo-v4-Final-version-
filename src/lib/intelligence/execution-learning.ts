import { createSupabaseAdmin } from "@/lib/supabase/server";
import { recordIntelligenceEvent } from "./record-event";

export async function learnFromExecution(input: {
  company_id: string;
  source_table: string;
  source_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data: source } = await supabase
    .from(input.source_table)
    .select("*")
    .eq("id", input.source_id)
    .maybeSingle();

  if (!source) {
    return {
      learned: false,
      reason: "Source not found.",
    };
  }

  const status = source.status || "unknown";
  const success = ["completed", "approved", "success"].includes(status);
  const failed = ["failed", "rejected", "error"].includes(status);

  const event = await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: input.source_table,
    source_id: input.source_id,
    event_type: success ? "execution_success" : failed ? "execution_failure" : "execution_observed",
    title: source.title || source.name || `${input.source_table} execution`,
    summary: source.result || source.summary || source.description || null,
    outcome: status,
    importance: success ? 75 : failed ? 85 : 40,
    metadata: {
      source,
    },
  });

  return {
    learned: true,
    event,
  };
}
