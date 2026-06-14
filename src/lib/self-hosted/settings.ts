import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getSelfHostedSettings(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("private_deployment_settings")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export function shouldUseSelfHosted(settings: any) {
  return Boolean(
    settings &&
    settings.self_hosted_enabled === true &&
    settings.worker_url &&
    (settings.deployment_mode === "self_hosted" || settings.deployment_mode === "hybrid")
  );
}
