import { createSupabaseAdmin } from "@/lib/supabase/server";
import { recordIntelligenceEvent } from "./record-event";

export async function recordDecisionMemory(input: {
  company_id: string;
  decision_type: string;
  user_choice: string;
  rejected_choice?: string | null;
  reason?: string | null;
  confidence?: number;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("company_decision_memory")
    .insert({
      company_id: input.company_id,
      decision_type: input.decision_type,
      user_choice: input.user_choice,
      rejected_choice: input.rejected_choice || null,
      reason: input.reason || null,
      confidence: input.confidence || 50,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "company_decision_memory",
    source_id: data.id,
    event_type: "decision_learned",
    title: `Decision learned: ${input.decision_type}`,
    summary: `User chose: ${input.user_choice}`,
    outcome: "learned",
    importance: input.confidence || 50,
    metadata: input.metadata || {},
  });

  return data;
}
