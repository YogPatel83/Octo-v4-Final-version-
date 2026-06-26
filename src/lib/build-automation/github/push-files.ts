import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";
import { githubApi } from "./github-api";

function toBase64(content: string) {
  return Buffer.from(content, "utf8").toString("base64");
}

function extractOwnerRepo(repositoryUrl: string) {
  const clean = repositoryUrl.replace("https://github.com/", "").replace(".git", "");
  const [owner, repo] = clean.split("/");
  return { owner, repo };
}

export async function pushFilesToGitHub(input: {
  company_id: string;
  build_project_id?: string | null;
  repository_connection_id: string;
  files: Array<{ path: string; content: string }>;
  commit_message?: string;
  branch?: string;
  github_token?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data: connection, error: connectionError } = await supabase
    .from("build_repository_connections")
    .select("*")
    .eq("id", input.repository_connection_id)
    .maybeSingle();

  if (connectionError) throw new Error(connectionError.message);

  if (!connection?.repository_url) {
    return {
      ok: false,
      error: "Repository connection not found or missing repository_url.",
    };
  }

  const { owner, repo } = extractOwnerRepo(connection.repository_url);
  const branch = input.branch || connection.default_branch || "main";

  const { data: pushRun, error: pushError } = await supabase
    .from("build_repository_pushes")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || connection.build_project_id || null,
      repository_connection_id: input.repository_connection_id,
      status: "running",
      branch,
      files: input.files.map((file) => ({ path: file.path })),
      commit_message: input.commit_message || "Update files from Octo",
    })
    .select()
    .single();

  if (pushError) throw new Error(pushError.message);

  const results = [];

  for (const file of input.files) {
    const path = file.path.replace(/^\/+/, "");

    const existing = await githubApi({
      path: `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
      method: "GET",
      token: input.github_token || null,
    });

    let sha: string | undefined;

    if (
      existing.ok &&
      typeof existing.data === "object" &&
      existing.data &&
      "sha" in existing.data
    ) {
      sha = String((existing.data as Record<string, unknown>).sha);
    }

    const result = await githubApi({
      path: `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`,
      method: "PUT",
      token: input.github_token || null,
      body: {
        message: input.commit_message || "Update files from Octo",
        content: toBase64(file.content),
        branch,
        sha,
      },
    });

    results.push({
      path,
      ok: result.ok,
      status: result.status,
      response: result.data,
      error: result.error,
    });
  }

  const ok = results.every((item) => item.ok);

  await supabase
    .from("build_repository_pushes")
    .update({
      status: ok ? "completed" : "failed",
      response: { results },
      error: ok ? null : "One or more files failed to push.",
      updated_at: new Date().toISOString(),
    })
    .eq("id", pushRun.id);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    actor_type: "system",
    event_type: "github_files_pushed",
    entity_type: "build_repository_pushes",
    entity_id: pushRun.id,
    action: "push_files_to_github",
    severity: ok ? "info" : "medium",
    metadata: {
      repository_connection_id: input.repository_connection_id,
      file_count: input.files.length,
    },
  });

  return {
    ok,
    push_id: pushRun.id,
    results,
  };
}
