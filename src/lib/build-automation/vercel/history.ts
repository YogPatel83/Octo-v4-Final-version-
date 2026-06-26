import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function listBuildDeployments(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_deployments")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
