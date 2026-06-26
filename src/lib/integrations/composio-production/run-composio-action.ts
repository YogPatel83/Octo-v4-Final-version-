import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

export async function runComposioProductionAction(input: {
  company_id: string;
  connected_account_id?: string | null;
  app_name?: string | null;
  action_name: string;
  payload?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: run, error: runError } = await supabase
    .from("composio_execution_runs")
    .insert({
      company_id: input.company_id,
      connected_account_id: input.connected_account_id || null,
      app_name: input.app_name || null,
      action_name: input.action_name,
      payload: input.payload || {},
      status: "running",
    })
    .select()
    .single();

  if (runError) throw new Error(runError.message);

  const apiKey = process.env.COMPOSIO_API_KEY;

  if (!apiKey) {
    await supabase
      .from("composio_execution_runs")
      .update({
        status: "failed",
        error: "COMPOSIO_API_KEY is missing.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", run.id);

    return {
      ok: false,
      run_id: run.id,
      error: "COMPOSIO_API_KEY is missing.",
    };
  }

  try {
    const res = await fetch("https://backend.composio.dev/api/v2/actions/execute", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        action: input.action_name,
        connectedAccountId: input.connected_account_id || undefined,
        input: input.payload || {},
      }),
    });

    const text = await res.text();

    let parsed: unknown = text;

    try {
      parsed = JSON.parse(text);
    } catch {}

    await supabase
      .from("composio_execution_runs")
      .update({
        status: res.ok ? "completed" : "failed",
        response: {
          http_status: res.status,
          body: parsed,
        },
        error: res.ok ? null : text,
        updated_at: new Date().toISOString(),
      })
      .eq("id", run.id);

    await createAdvancedAuditEvent({
      company_id: input.company_id,
      actor_type: "system",
      event_type: "composio_action_executed",
      entity_type: "composio_execution_runs",
      entity_id: run.id,
      action: input.action_name,
      severity: res.ok ? "info" : "medium",
      metadata: {
        app_name: input.app_name || null,
        connected_account_id: input.connected_account_id || null,
        http_status: res.status,
      },
    });

    return {
      ok: res.ok,
      run_id: run.id,
      status: res.status,
      response: parsed,
    };
  } catch (error) {
    await supabase
      .from("composio_execution_runs")
      .update({
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown Composio error.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", run.id);

    return {
      ok: false,
      run_id: run.id,
      error: error instanceof Error ? error.message : "Unknown Composio error.",
    };
  }
}
