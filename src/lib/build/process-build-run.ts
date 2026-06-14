import { createSupabaseAdmin } from "@/lib/supabase/server";
import { githubAdapter, supabaseProjectAdapter, vercelAdapter, domainAdapter } from "./provider-adapters";

export async function processBuildRun(runId: string) {
  const supabase = createSupabaseAdmin();

  const { data: run, error } = await supabase
    .from("build_runs")
    .select("*")
    .eq("id", runId)
    .single();

  if (error) throw new Error(error.message);

  if (run.status === "waiting_for_approval") {
    return {
      skipped: true,
      reason: "Waiting for human approval.",
      run,
    };
  }

  await supabase
    .from("build_runs")
    .update({
      status: "running",
      updated_at: new Date().toISOString(),
    })
    .eq("id", runId);

  let output: Record<string, unknown> = {};

  if (run.action === "plan_app") {
    output = {
      app_plan: {
        objective: run.input?.objective,
        suggested_mvp: true,
        preview_first: true,
        human_approval_required_for_deploy: true,
      },
    };
  } else if (run.action === "generate_files") {
    output = {
      files_generated: true,
      note: "Generated files should be written to repository workspace by a code-writing adapter.",
    };
  } else if (run.action === "generate_schema") {
    output = {
      schema_generated: true,
      note: "Schema SQL generated. Applying schema requires approval.",
    };
  } else if (run.action === "create_preview") {
    output = {
      preview_url: run.input?.preview_url || null,
      note: "Preview should be created before public deployment.",
    };
  } else if (String(run.action).includes("github")) {
    output = await githubAdapter({
      action: run.action,
      token: process.env.GITHUB_TOKEN || null,
      payload: run.input || {},
    });
  } else if (String(run.action).includes("supabase")) {
    output = await supabaseProjectAdapter({
      action: run.action,
      service_role_key: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
      payload: run.input || {},
    });
  } else if (String(run.action).includes("vercel")) {
    output = await vercelAdapter({
      action: run.action,
      token: process.env.VERCEL_TOKEN || null,
      payload: run.input || {},
    });
  } else if (String(run.action).includes("domain")) {
    output = await domainAdapter({
      action: run.action,
      token: process.env.DOMAIN_PROVIDER_API_KEY || null,
      payload: run.input || {},
    });
  } else {
    output = {
      message: "Build run completed.",
      action: run.action,
    };
  }

  const { data: updated, error: updateError } = await supabase
    .from("build_runs")
    .update({
      status: "completed",
      output,
      updated_at: new Date().toISOString(),
    })
    .eq("id", runId)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  return updated;
}
