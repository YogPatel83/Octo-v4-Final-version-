import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createPreviewEnvironment(input: {
  company_id: string;
  build_project_id?: string | null;
  deployment_id?: string | null;
  preview_url: string;
  expires_at?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_preview_environments")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || null,
      deployment_id: input.deployment_id || null,
      preview_url: input.preview_url,
      status: "active",
      expires_at: input.expires_at || null,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listPreviewEnvironments(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_preview_environments")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
