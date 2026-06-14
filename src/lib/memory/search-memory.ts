import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createEmbedding } from "@/lib/memory/embeddings";

export async function searchMemory(input: {
  company_id: string;
  query: string;
  agent_id?: string | null;
  match_count?: number;
}) {
  const supabase = createSupabaseAdmin();

  const embeddingResult = await createEmbedding(input.query);

  if (embeddingResult.embedding.length === 0) {
    const fallback = await supabase
      .from("memory_entries")
      .select("*")
      .eq("company_id", input.company_id)
      .ilike("content", `%${input.query}%`)
      .limit(input.match_count || 8);

    if (fallback.error) throw new Error(fallback.error.message);
    return fallback.data || [];
  }

  const { data, error } = await supabase.rpc("match_memory_vectors", {
    query_embedding: embeddingResult.embedding,
    target_company_id: input.company_id,
    target_agent_id: input.agent_id || null,
    match_count: input.match_count || 8,
  });

  if (error) throw new Error(error.message);

  return data || [];
}
