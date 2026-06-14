import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getSelfHostedSettings, shouldUseSelfHosted } from "./settings";

export async function checkSelfHostedHealth(companyId: string) {
  const supabase = createSupabaseAdmin();
  const settings = await getSelfHostedSettings(companyId);

  if (!shouldUseSelfHosted(settings)) {
    return {
      ok: false,
      reason: "Self-hosted worker not enabled.",
    };
  }

  const workerUrl = String(settings.worker_url).replace(/\/$/, "");

  try {
    const res = await fetch(`${workerUrl}/api/octo/self-hosted/health`, {
      method: "GET",
      headers: {
        "x-octo-worker-secret": settings.worker_secret || process.env.OCTO_WORKER_SECRET || "",
      },
    });

    const data = await res.json().catch(() => ({}));

    await supabase
      .from("private_deployment_settings")
      .update({
        last_health_status: res.ok ? "healthy" : "unhealthy",
        updated_at: new Date().toISOString(),
      })
      .eq("company_id", companyId);

    return {
      ok: res.ok,
      status: res.ok ? "healthy" : "unhealthy",
      response: data,
    };
  } catch (error) {
    await supabase
      .from("private_deployment_settings")
      .update({
        last_health_status: "unreachable",
        updated_at: new Date().toISOString(),
      })
      .eq("company_id", companyId);

    return {
      ok: false,
      status: "unreachable",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
