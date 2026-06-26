import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";
import { githubApi } from "./github-api";

function cleanRepoName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function createGitHubRepository(input: {
  company_id: string;
  build_project_id?: string | null;
  repository_name: string;
  description?: string | null;
  private?: boolean;
  github_token?: string | null;
}) {
  const supabase = createSupabaseAdmin();
  const repoName = cleanRepoName(input.repository_name);

  const result = await githubApi({
    path: "/user/repos",
    method: "POST",
    token: input.github_token || null,
    body: {
      name: repoName,
      description: input.description || "Created by Octo.",
      private: input.private !== false,
      auto_init: true,
    },
  });

  const repoUrl =
    typeof result.data === "object" && result.data && "html_url" in result.data
      ? String((result.data as Record<string, unknown>).html_url)
      : null;

  const { data, error } = await supabase
    .from("build_repository_connections")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || null,
      provider: "github",
      repository_name: repoName,
      repository_url: repoUrl,
      default_branch: "main",
      status: result.ok ? "created" : "failed",
      metadata: {
        github_response: result.data,
        http_status: result.status,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    actor_type: "system",
    event_type: "github_repository_creation",
    entity_type: "build_repository_connections",
    entity_id: data.id,
    action: "create_github_repository",
    severity: result.ok ? "info" : "medium",
    metadata: {
      repository_name: repoName,
      repository_url: repoUrl,
      http_status: result.status,
    },
  });

  return {
    ok: result.ok,
    repository: data,
    github: result.data,
    error: result.error,
  };
}
