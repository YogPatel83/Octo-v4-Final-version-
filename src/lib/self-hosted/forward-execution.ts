import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getSelfHostedSettings, shouldUseSelfHosted } from "./settings";

export async function forwardExecutionToSelfHosted(input: {
  company_id: string;
  execution_type: "runtime" | "execution" | "build" | "scheduler";
  payload: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();
  const settings = await getSelfHostedSettings(input.company_id);

  if (!shouldUseSelfHosted(settings)) {
    return {
      forwarded: false,
      reason: "Self-hosted worker not enabled.",
    };
  }

  const workerUrl = String(settings.worker_url).replace(/\/$/, "");
  const workerSecret = settings.worker_secret || process.env.OCTO_WORKER_SECRET || "";

  const res = await fetch(`${workerUrl}/api/octo/self-hosted/execute`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-octo-worker-secret": workerSecret,
    },
    body: JSON.stringify({
      company_id: input.company_id,
      execution_type: input.execution_type,
      payload: input.payload,
    }),
  });

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  await supabase.from("self_hosted_worker_events").insert({
    company_id: input.company_id,
    worker_url: workerUrl,
    event_type: `forward_${input.execution_type}`,
    status: res.ok ? "forwarded" : "failed",
    metadata: {
      response: data,
      http_status: res.status,
    },
  });

  return {
    forwarded: res.ok,
    worker_url: workerUrl,
    status: res.status,
    response: data,
  };
}
