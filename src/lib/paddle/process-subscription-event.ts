import { updateCompanySubscription } from "@/lib/subscriptions/update-subscription";

export async function processPaddleSubscriptionEvent(event: Record<string, any>) {
  const eventType = event.event_type || event.type || "unknown";
  const data = event.data || {};
  const custom = data.custom_data || {};

  const companyId = custom.company_id;

  if (!companyId) {
    return {
      handled: false,
      reason: "Missing custom_data.company_id",
      event_type: eventType,
    };
  }

  let status = data.status || "active";

  if (eventType.includes("canceled") || eventType.includes("cancelled")) {
    status = "cancelled";
  }

  if (eventType.includes("past_due")) {
    status = "past_due";
  }

  if (eventType.includes("payment_failed")) {
    status = "failed";
  }

  if (eventType.includes("paused")) {
    status = "paused";
  }

  if (eventType.includes("activated") || eventType.includes("created") || eventType.includes("updated")) {
    status = data.status || "active";
  }

  const subscription = await updateCompanySubscription({
    company_id: companyId,
    plan: custom.plan || data.custom_data?.plan || "pro",
    status,
    trial_ends_at: data.trial_ends_at || null,
    paddle_subscription_id: data.id || data.subscription_id || null,
    paddle_customer_id: data.customer_id || data.customer?.id || null,
    customer_email: data.customer?.email || data.email || null,
  });

  return {
    handled: true,
    event_type: eventType,
    company_id: companyId,
    subscription,
  };
}
