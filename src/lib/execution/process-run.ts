import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeProviderAdapter } from "./adapters";
import { getExternalApiKey } from "@/lib/external-apis/keys";
import { getCompanyModelKey } from "@/lib/models/model-keys";
import { deductCredits } from "@/lib/credits/deduct";
import { getCreditActionForSource } from "@/lib/credits/action-map";
import { detectByokForExecution } from "@/lib/credits/detect-byok";

export async function processExecutionRun(runId: string) {
  const supabase = createSupabaseAdmin();

  const { data: run, error } = await supabase
    .from("execution_runs")
    .select("*")
    .eq("id", runId)
    .single();

  if (error) throw new Error(error.message);

  let key = null;

  if (run.source_table === "external_api_requests") {
    key = await getExternalApiKey(
      run.company_id,
      String(run.input?.category || "custom"),
      run.provider || "custom_rest_api"
    );
  }

  if (run.source_table === "ai_generations") {
    key = await getCompanyModelKey(run.company_id, run.provider || "openai");
  }

  const byokDetection = await detectByokForExecution({
    company_id: run.company_id,
    source_table: run.source_table,
    source_id: run.source_id,
    provider: run.provider,
    input: run.input || {},
  });

  const byokUsed = Boolean(byokDetection.byok_used);

  const creditAction = getCreditActionForSource({
    source_table: run.source_table,
    action: run.action,
    type: run.input?.type,
  });

  const creditResult = await deductCredits({
    company_id: run.company_id,
    action: creditAction,
    source: "execution_run",
    source_id: run.id,
    byok_used: byokUsed,
    metadata: {
      provider: run.provider,
      source_table: run.source_table,
      source_id: run.source_id,
      byok_detection: byokDetection,
    },
  });

  if (!creditResult.ok) {
    const { data: blocked } = await supabase
      .from("execution_runs")
      .update({
        status: "blocked_insufficient_credits",
        error:
          "You’re out of credits. Upgrade, buy credits, or add your own API key to continue.",
        output: {
          credits: creditResult,
          byok_detection: byokDetection,
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", runId)
      .select()
      .single();

    await supabase
      .from(run.source_table)
      .update({
        status: "blocked_insufficient_credits",
        updated_at: new Date().toISOString(),
      })
      .eq("id", run.source_id);

    return blocked;
  }

  await supabase
    .from("execution_runs")
    .update({
      status: "running",
      attempts: Number(run.attempts || 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", runId);

  const result = await executeProviderAdapter({
    provider: run.provider || byokDetection.provider || "mock",
    action: run.action || "execute",
    payload: run.input || {},
    api_key: key?.api_key || null,
    base_url: key?.base_url || null,
  });

  const finalStatus = result.ok ? "completed" : "failed";

  const { data: updated, error: updateError } = await supabase
    .from("execution_runs")
    .update({
      status: finalStatus,
      output: {
        ...((result.output as Record<string, unknown>) || {}),
        credits: creditResult,
        byok_used: byokUsed,
        byok_detection: byokDetection,
      },
      error: result.error || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", runId)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  await supabase
    .from(run.source_table)
    .update({
      status: finalStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", run.source_id);

  return updated;
}
