import { createSupabaseAdmin } from "@/lib/supabase/server";
import { calculateMarketplaceTrustScore } from "./trust-score";

export async function markSellerPayoutReady(input: {
  company_id: string;
  payout_ready: boolean;
  review_notes?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_seller_verifications")
    .update({
      payout_ready: input.payout_ready,
      status: input.payout_ready ? "approved" : "pending",
      review_notes: input.review_notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", input.company_id)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  const trust = await calculateMarketplaceTrustScore(input.company_id);

  return {
    verification: data,
    trust,
  };
}
