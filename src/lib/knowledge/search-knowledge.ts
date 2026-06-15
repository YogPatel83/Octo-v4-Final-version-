import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function searchCompanyKnowledge(input: {
  company_id: string;
  query?: string | null;
  knowledge_type?: string | null;
  limit?: number;
}) {
  const supabase = createSupabaseAdmin();

  let q = supabase
    .from("company_knowledge_items")
    .select("*")
    .eq("company_id", input.company_id)
    .order("confidence", { ascending: false })
    .limit(input.limit || 50);

  if (input.knowledge_type) {
    q = q.eq("knowledge_type", input.knowledge_type);
  }

  const { data, error } = await q;

  if (error) throw new Error(error.message);

  const query = (input.query || "").toLowerCase();

  if (!query) {
    return data || [];
  }

  return (data || []).filter((item) => {
    return (
      String(item.title || "").toLowerCase().includes(query) ||
      String(item.content || "").toLowerCase().includes(query) ||
      JSON.stringify(item.tags || []).toLowerCase().includes(query)
    );
  });
}
