import { createSupabaseAdmin } from "@/lib/supabase/server";
import { processCreditPurchaseWebhook } from "@/lib/credits/process-credit-webhook";
import { processPaddleSubscriptionEvent } from "@/lib/paddle/process-subscription-event";

type PaddleProcessResult = {
  handled: boolean;
  reason?: string;
  skipped?: boolean;
  event_type?: string;
  company_id?: string;
  subscription?: unknown;
  [key: string]: unknown;
};

export async function processUnifiedPaddleWebhook(event: Record<string, any>) {
  const supabase = createSupabaseAdmin();

  const eventId =
    event.event_id ||
    event.id ||
    event.data?.id ||
    crypto.randomUUID();

  const eventType =
    event.event_type ||
    event.type ||
    "unknown";

  const existing = await supabase
    .from("webhook_events")
    .select("*")
    .eq("provider", "paddle")
    .eq("event_id", eventId)
    .maybeSingle();

  if (existing.data) {
    return {
      received: true,
      skipped: true,
      reason: "Webhook already processed.",
    };
  }

  const creditResult = (await processCreditPurchaseWebhook(event)) as PaddleProcessResult;

  let subscriptionResult: PaddleProcessResult = {
    handled: false,
    reason: "Skipped because event was handled as credit pack or not subscription-related.",
  };

  if (!creditResult.handled) {
    subscriptionResult = (await processPaddleSubscriptionEvent(event)) as PaddleProcessResult;
  }

  const handled =
    Boolean(creditResult.handled) ||
    Boolean(subscriptionResult.handled);

  await supabase.from("webhook_events").insert({
    provider: "paddle",
    event_id: eventId,
    event_type: eventType,
    payload: event,
    status: handled ? "processed" : "ignored",
  });

  return {
    received: true,
    handled,
    credit_result: creditResult,
    subscription_result: subscriptionResult,
  };
}
