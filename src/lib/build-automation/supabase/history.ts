import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function listSupabaseSchemaGenerations(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_schema_generations")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
