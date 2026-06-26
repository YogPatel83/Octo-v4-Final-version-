import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

function fillTemplate(value: unknown, variables: Record<string, unknown>): unknown {
  if (typeof value === "string") {
    return value.replace(/\{\{([^}]+)\}\}/g, (_, key) => String(variables[key.trim()] ?? ""));
  }

  if (Array.isArray(value)) {
    return value.map((item) => fillTemplate(item, variables));
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      output[key] = fillTemplate(item, variables);
    }
    return output;
  }

  return value;
}

export async function runUniversalConnectorAction(input: {
  company_id: string;
  connector_id: string;
  action_id: string;
  variables?: Record<string, unknown>;
  api_key?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const [{ data: connector }, { data: action }] = await Promise.all([
    supabase.from("universal_connectors").select("*").eq("id", input.connector_id).maybeSingle(),
    supabase.from("universal_connector_actions").select("*").eq("id", input.action_id).maybeSingle(),
  ]);

  if (!connector || !action) {
    return { ok: false, error: "Connector or action not found." };
  }

  const baseUrl = String(connector.base_url || "").replace(/\/$/, "");
  const path = String(action.path || "").startsWith("/")
    ? String(action.path || "")
    : `/${String(action.path || "")}`;

  const url = `${baseUrl}${path}`;
  const variables = input.variables || {};

  const headers = {
    "content-type": "application/json",
    ...(fillTemplate(action.headers || {}, variables) as Record<string, string>),
  };

  if (input.api_key) {
    headers.authorization = `Bearer ${input.api_key}`;
  }

  const body = fillTemplate(action.body_template || {}, variables);

  const { data: run, error: runError } = await supabase
    .from("universal_connector_runs")
    .insert({
      company_id: input.company_id,
      connector_id: input.connector_id,
      action_id: input.action_id,
      status: "running",
      request: {
        url,
        method: action.method || "POST",
        headers: { ...headers, authorization: input.api_key ? "[hidden]" : undefined },
        body,
      },
    })
    .select()
    .single();

  if (runError) throw new Error(runError.message);

  try {
    const res = await fetch(url, {
      method: String(action.method || "POST").toUpperCase(),
      headers,
      body: ["GET", "HEAD"].includes(String(action.method || "POST").toUpperCase())
        ? undefined
        : JSON.stringify(body),
    });

    const text = await res.text();
    let parsed: unknown = text;

    try {
      parsed = JSON.parse(text);
    } catch {}

    await supabase
      .from("universal_connector_runs")
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
      event_type: "universal_connector_action_run",
      entity_type: "universal_connector_runs",
      entity_id: run.id,
      action: "run_connector_action",
      severity: res.ok ? "info" : "medium",
      metadata: { connector_id: input.connector_id, action_id: input.action_id, http_status: res.status },
    });

    return {
      ok: res.ok,
      run_id: run.id,
      status: res.status,
      response: parsed,
    };
  } catch (error) {
    await supabase
      .from("universal_connector_runs")
      .update({
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
        updated_at: new Date().toISOString(),
      })
      .eq("id", run.id);

    return {
      ok: false,
      run_id: run.id,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
