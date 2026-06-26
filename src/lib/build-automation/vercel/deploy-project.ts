import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";
import { vercelApi } from "./vercel-api";

function cleanProjectName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function deployVercelProject(input: {
  company_id: string;
  build_project_id?: string | null;
  repository_connection_id?: string | null;
  project_name: string;
  git_repository?: {
    type: "github";
    repo: string;
  } | null;
  environment?: "preview" | "production";
  approved_by_user_id?: string | null;
  vercel_token?: string | null;
}) {
  const supabase = createSupabaseAdmin();
  const projectName = cleanProjectName(input.project_name);

  const { data: deploymentRun, error: createError } = await supabase
    .from("build_deployments")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || null,
      repository_connection_id: input.repository_connection_id || null,
      provider: "vercel",
      project_name: projectName,
      status: "running",
      environment: input.environment || "preview",
      approved_by_user_id: input.approved_by_user_id || null,
    })
    .select()
    .single();

  if (createError) throw new Error(createError.message);

  const result = await vercelApi({
    path: "/v13/deployments",
    method: "POST",
    token: input.vercel_token || null,
    body: {
      name: projectName,
      target: input.environment === "production" ? "production" : "preview",
      gitSource: input.git_repository
        ? {
            type: input.git_repository.type,
            repo: input.git_repository.repo,
            ref: "main",
          }
        : undefined,
    },
  });

  const deploymentUrl =
    typeof result.data === "object" && result.data && "url" in result.data
      ? `https://${String((result.data as Record<string, unknown>).url)}`
      : null;

  await supabase
    .from("build_deployments")
    .update({
      status: result.ok ? "deployed" : "failed",
      deployment_url: deploymentUrl,
      preview_url: deploymentUrl,
      response: {
        http_status: result.status,
        body: result.data,
      },
      error: result.error,
      updated_at: new Date().toISOString(),
    })
    .eq("id", deploymentRun.id);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    user_id: input.approved_by_user_id || null,
    actor_type: "system",
    event_type: "vercel_deployment_created",
    entity_type: "build_deployments",
    entity_id: deploymentRun.id,
    action: "deploy_to_vercel",
    severity: result.ok ? "info" : "medium",
    metadata: {
      project_name: projectName,
      deployment_url: deploymentUrl,
      environment: input.environment || "preview",
      http_status: result.status,
    },
  });

  return {
    ok: result.ok,
    deployment_id: deploymentRun.id,
    deployment_url: deploymentUrl,
    response: result.data,
    error: result.error,
  };
}
