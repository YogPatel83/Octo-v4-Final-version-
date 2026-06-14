import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function updateCompanySubscription(input: {
  company_id: string;
  plan?: string;
  status?: string;
  trial_ends_at?: string | null;
  paddle_subscription_id?: string | null;
  paddle_customer_id?: string | null;
  customer_email?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data: subscription, error: subError } = await supabase
    .from("subscriptions")
    .upsert(
      {
        company_id: input.company_id,
        plan: input.plan || "free",
        status: input.status || "active",
        trial_ends_at: input.trial_ends_at || null,
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (subError) throw new Error(subError.message);

  if (input.paddle_customer_id || input.customer_email) {
    await supabase.from("billing_customers").upsert(
      {
        company_id: input.company_id,
        paddle_customer_id: input.paddle_customer_id || null,
        email: input.customer_email || null,
      },
      { onConflict: "company_id" }
    );
  }

  return subscription;
}
