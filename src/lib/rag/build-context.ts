import { searchMemory } from "@/lib/memory/search-memory";

export async function buildRagContext(input: {
  company_id: string;
  agent_id?: string | null;
  query: string;
  match_count?: number;
}) {
  const memories = await searchMemory({
    company_id: input.company_id,
    agent_id: input.agent_id || null,
    query: input.query,
    match_count: input.match_count || 8,
  });

  const context = (memories || [])
    .map((item: any, index: number) => {
      const content = item.content || item.memory_content || "";
      return `Memory ${index + 1}:\n${content}`;
    })
    .join("\n\n---\n\n");

  return {
    query: input.query,
    memory_count: memories.length,
    memories,
    context,
  };
}
