import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function listGitHubBuildAutomationHistory(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [connectionsRes, pushesRes] = await Promise.all([
    supabase
      .from("build_repository_connections")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false }),
    supabase
      .from("build_repository_pushes")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false }),
  ]);

  return {
    connections: connectionsRes.data || [],
    pushes: pushesRes.data || [],
  };
}
