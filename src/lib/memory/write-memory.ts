import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createEmbedding } from "@/lib/memory/embeddings";

export async function writeMemory(input: {
  company_id: string;
  agent_id?: string | null;
  title?: string | null;
  content: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const embeddingResult = await createEmbedding(input.content);

  const { data: memory, error } = await supabase
    .from("memory_entries")
    .insert({
      company_id: input.company_id,
      agent_id: input.agent_id || null,
      title: input.title || null,
      content: input.content,
      metadata: {
        ...(input.metadata || {}),
        embedding_provider: embeddingResult.provider,
        embedding_model: embeddingResult.model,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (embeddingResult.embedding.length > 0) {
    await supabase.from("memory_vectors").insert({
      memory_id: memory.id,
      company_id: input.company_id,
      agent_id: input.agent_id || null,
      content: input.content,
      embedding: embeddingResult.embedding,
      metadata: input.metadata || {},
    });
  }

  return memory;
}
