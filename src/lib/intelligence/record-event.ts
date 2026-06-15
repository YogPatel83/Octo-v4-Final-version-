import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function recordIntelligenceEvent(input: {
  company_id: string;
  source_table?: string | null;
  source_id?: string | null;
  event_type: string;
  title?: string | null;
  summary?: string | null;
  sentiment?: string | null;
  outcome?: string | null;
  importance?: number;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("intelligence_events")
    .insert({
      company_id: input.company_id,
      source_table: input.source_table || null,
      source_id: input.source_id || null,
      event_type: input.event_type,
      title: input.title || null,
      summary: input.summary || null,
      sentiment: input.sentiment || null,
      outcome: input.outcome || null,
      importance: input.importance || 50,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
