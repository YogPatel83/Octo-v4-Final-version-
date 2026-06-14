import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getPrivateDeploymentSettings(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("private_deployment_settings")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function upsertPrivateDeploymentSettings(input: {
  company_id: string;
  deployment_mode?: "octo_cloud" | "self_hosted" | "hybrid";
  self_hosted_enabled?: boolean;
  server_url?: string | null;
  worker_url?: string | null;
  billing_mode?: "octo_credits" | "self_hosted_runtime_credits";
  model_mode?: "platform_or_byok" | "byok_only" | "local_models";
  status?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("private_deployment_settings")
    .upsert(
      {
        company_id: input.company_id,
        deployment_mode: input.deployment_mode || "octo_cloud",
        self_hosted_enabled: input.self_hosted_enabled || false,
        server_url: input.server_url || null,
        worker_url: input.worker_url || null,
        billing_mode: input.billing_mode || "octo_credits",
        model_mode: input.model_mode || "platform_or_byok",
        status: input.status || "configured",
        metadata: input.metadata || {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
