import { createSupabaseAdmin } from "@/lib/supabase/server";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function saveCompanyKnowledgeItem(input: {
  company_id: string;
  source_table?: string | null;
  source_id?: string | null;
  knowledge_type?: string;
  title?: string | null;
  content: string;
  confidence?: number;
  tags?: string[];
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("company_knowledge_items")
    .insert({
      company_id: input.company_id,
      source_table: input.source_table || null,
      source_id: input.source_id || null,
      knowledge_type: input.knowledge_type || "general",
      title: input.title || null,
      content: input.content,
      confidence: input.confidence || 70,
      tags: input.tags || [],
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "company_knowledge_items",
    source_id: data.id,
    event_type: "knowledge_learned",
    title: input.title || "Knowledge learned",
    summary: input.content.slice(0, 500),
    outcome: "learned",
    importance: input.confidence || 70,
    metadata: {
      knowledge_type: input.knowledge_type || "general",
      tags: input.tags || [],
    },
  });

  return data;
}
