import { createSupabaseAdmin } from "@/lib/supabase/server";
import { checkEventIdempotency, recordWebhookEvent } from "@/lib/events/idempotency";

export async function processPaddleEvent(event: Record<string, any>) {
  const supabase = createSupabaseAdmin();

  const eventId = event.event_id || event.id || crypto.randomUUID();
  const eventType = event.event_type || event.type || "unknown";

  const idempotency = await checkEventIdempotency({
    provider: "paddle",
    event_id: eventId,
  });

  if (idempotency.already_processed) {
    return {
      skipped: true,
      reason: "Event already processed.",
      event_id: eventId,
    };
  }

  const data = event.data || {};
  const companyId = data.custom_data?.company_id;

  if (eventType.includes("subscription") && companyId) {
    await supabase.from("subscriptions").upsert({
      company_id: companyId,
      plan: data.custom_data?.plan || "free",
      status: data.status || "active",
      trial_ends_at: data.trial_ends_at || null,
    }, { onConflict: "company_id" });
  }

  if (eventType.includes("customer") && companyId) {
    await supabase.from("billing_customers").upsert({
      company_id: companyId,
      paddle_customer_id: data.id || data.customer_id || null,
      email: data.email || null,
    }, { onConflict: "company_id" });
  }

  const stored = await recordWebhookEvent({
    provider: "paddle",
    event_id: eventId,
    event_type: eventType,
    payload: event,
    status: "processed",
  });

  return {
    skipped: false,
    event_id: eventId,
    event_type: eventType,
    stored,
  };
}
