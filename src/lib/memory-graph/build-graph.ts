import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function buildMemoryGraph(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: memories } = await supabase
    .from("memory_entries")
    .select("*")
    .eq("company_id", companyId);

  const nodes = [];
  const edges = [];

  for (const memory of memories || []) {
    nodes.push({
      id: memory.id,
      title: memory.title,
      type: "memory"
    });
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push({
        source: nodes[i].id,
        target: nodes[j].id,
        relationship: "related"
      });
    }
  }

  return {
    company_id: companyId,
    nodes,
    edges
  };
}
