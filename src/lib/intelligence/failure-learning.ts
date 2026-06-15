import { recordIntelligenceEvent } from "./record-event";

export async function learnFromFailure(input: {
  company_id: string;
  source_table: string;
  source_id: string;
  title?: string | null;
  error?: string | null;
  metadata?: Record<string, unknown>;
}) {
  return recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: input.source_table,
    source_id: input.source_id,
    event_type: "failure_learned",
    title: input.title || "Failure learned",
    summary: input.error || "A failure happened and was stored for future avoidance.",
    outcome: "failed",
    importance: 90,
    metadata: input.metadata || {},
  });
}
