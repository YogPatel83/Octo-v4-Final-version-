import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getPlanLimits } from "@/lib/billing/plans";

export async function resetMonthlyCredits() {
  const supabase = createSupabaseAdmin();

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .in("status", ["active", "trial"]);

  if (error) throw new Error(error.message);

  const results = [];

  for (const sub of subscriptions || []) {
    const limits = getPlanLimits(sub.plan || "free");
    const credits = Number(limits.monthly_credits || 0);

    if (credits < 0) {
      results.push({
        company_id: sub.company_id,
        skipped: true,
        reason: "unlimited plan",
      });
      continue;
    }

    const { data, error: walletError } = await supabase
      .from("credit_wallets")
      .upsert(
        {
          company_id: sub.company_id,
          balance: credits,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "company_id" }
      )
      .select()
      .single();

    if (walletError) {
      results.push({
        company_id: sub.company_id,
        ok: false,
        error: walletError.message,
      });
    } else {
      results.push({
        company_id: sub.company_id,
        ok: true,
        wallet: data,
      });
    }
  }

  return results;
}
