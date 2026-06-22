import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function buildMemoryRelationships(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [memoryRes, knowledgeRes, decisionsRes, patternsRes] = await Promise.all([
    supabase.from("memory_entries").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(100),
    supabase.from("company_knowledge_items").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(100),
    supabase.from("company_decision_memory").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(100),
    supabase.from("company_learning_patterns").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(100),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You identify relationships between company memories, knowledge, decisions, and patterns. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Find useful relationships.

Return JSON only:
{
  "relationships": [
    {
      "from_type": "memory|knowledge|decision|pattern",
      "from_id": "...",
      "to_type": "memory|knowledge|decision|pattern",
      "to_id": "...",
      "relationship_type": "supports|contradicts|caused|similar_to|improves|depends_on|prefers|avoids",
      "strength": 0-100,
      "summary": "..."
    }
  ]
}

Memory:
${JSON.stringify(memoryRes.data || []).slice(0, 10000)}

Knowledge:
${JSON.stringify(knowledgeRes.data || []).slice(0, 10000)}

Decisions:
${JSON.stringify(decisionsRes.data || []).slice(0, 10000)}

Patterns:
${JSON.stringify(patternsRes.data || []).slice(0, 10000)}
`,
      },
    ],
  });

  let parsed: any = { relationships: [] };

  try {
    parsed = JSON.parse(response.content || '{"relationships":[]}');
  } catch {
    parsed = { relationships: [] };
  }

  const saved = [];

  for (const rel of parsed.relationships || []) {
    if (!rel.from_type || !rel.to_type || !rel.relationship_type) continue;

    const { data, error } = await supabase
      .from("memory_relationships")
      .insert({
        company_id: companyId,
        from_type: rel.from_type,
        from_id: rel.from_id || null,
        to_type: rel.to_type,
        to_id: rel.to_id || null,
        relationship_type: rel.relationship_type,
        strength: rel.strength || 50,
        summary: rel.summary || null,
        metadata: {
          source: "memory_relationship_builder",
        },
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    saved.push(data);
  }

  await recordIntelligenceEvent({
    company_id: companyId,
    event_type: "memory_relationships_built",
    title: "Memory relationships built",
    summary: `${saved.length} memory relationships were discovered.`,
    outcome: "completed",
    importance: 80,
    metadata: {
      count: saved.length,
    },
  });

  return {
    relationships_created: saved.length,
    relationships: saved,
  };
}
