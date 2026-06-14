import { createSupabaseAdmin } from "@/lib/supabase/server";
import { calculateSellerBalance } from "./calculate-balance";

export async function requestSellerPayout(input: {
  company_id: string;
  amount_cents: number;
  payout_provider?: string;
  metadata?: Record<string, unknown>;
}) {
  const balance = await calculateSellerBalance(input.company_id);

  if (input.amount_cents <= 0) {
    return {
      ok: false,
      reason: "Amount must be greater than zero.",
      balance,
    };
  }

  if (input.amount_cents > balance.available_cents) {
    return {
      ok: false,
      reason: "Requested payout exceeds available balance.",
      balance,
    };
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("seller_payouts")
    .insert({
      company_id: input.company_id,
      amount_cents: input.amount_cents,
      status: "pending",
      payout_provider: input.payout_provider || "manual",
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    ok: true,
    payout: data,
    balance,
  };
}
