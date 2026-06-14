import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function checkCompanyAccess(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (!subscription) {
    return {
      allowed: false,
      reason: "No subscription found.",
      read_only: true,
    };
  }

  const now = new Date();

  if (
    subscription.status === "trial" &&
    subscription.trial_ends_at &&
    new Date(subscription.trial_ends_at) < now
  ) {
    return {
      allowed: false,
      reason: "Trial expired.",
      read_only: true,
    };
  }

  if (
    subscription.status === "past_due" ||
    subscription.status === "failed" ||
    subscription.status === "cancelled"
  ) {
    return {
      allowed: false,
      reason: subscription.status,
      read_only: true,
    };
  }

  return {
    allowed: true,
    reason: "active",
    read_only: false,
  };
}
