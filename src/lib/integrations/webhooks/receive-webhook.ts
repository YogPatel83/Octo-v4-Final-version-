import { createSupabaseAdmin } from "@/lib/supabase/server";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function receiveWebhookEvent(input: {
  webhook_id: string;
  payload: Record<string, unknown>;
  headers?: Record<string, unknown>;
  secret?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data: webhook, error: webhookError } = await supabase
    .from("webhook_builders")
    .select("*")
    .eq("id", input.webhook_id)
    .maybeSingle();

  if (webhookError) throw new Error(webhookError.message);

  if (!webhook) {
    return {
      ok: false,
      error: "Webhook not found.",
    };
  }

  if (webhook.secret && input.secret !== webhook.secret) {
    return {
      ok: false,
      error: "Invalid webhook secret.",
    };
  }

  const { data, error } = await supabase
    .from("webhook_builder_events")
    .insert({
      webhook_id: input.webhook_id,
      company_id: webhook.company_id,
      payload: input.payload || {},
      headers: input.headers || {},
      status: "received",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: webhook.company_id,
    source_table: "webhook_builder_events",
    source_id: data.id,
    event_type: "webhook_event_received",
    title: webhook.name,
    summary: "Webhook event received.",
    outcome: "received",
    importance: 60,
    metadata: {
      webhook_id: input.webhook_id,
    },
  });

  return {
    ok: true,
    event: data,
  };
}
