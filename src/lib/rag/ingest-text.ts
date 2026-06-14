import { writeMemory } from "@/lib/memory/write-memory";
import { chunkText } from "@/lib/rag/chunk-text";

export async function ingestTextToMemory(input: {
  company_id: string;
  agent_id?: string | null;
  title?: string | null;
  text: string;
  source?: string | null;
}) {
  const chunks = chunkText(input.text);

  const written = [];

  for (let index = 0; index < chunks.length; index++) {
    const memory = await writeMemory({
      company_id: input.company_id,
      agent_id: input.agent_id || null,
      title: `${input.title || "Document"} — chunk ${index + 1}`,
      content: chunks[index],
      metadata: {
        source: input.source || null,
        chunk_index: index,
        total_chunks: chunks.length,
        type: "rag_chunk",
      },
    });

    written.push(memory);
  }

  return {
    chunks_created: written.length,
    memories: written,
  };
}
