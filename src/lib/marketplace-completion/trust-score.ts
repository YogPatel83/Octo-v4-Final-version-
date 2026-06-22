import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function calculateMarketplaceTrustScore(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [verificationRes, reviewsRes, disputesRes, refundsRes] = await Promise.all([
    supabase
      .from("marketplace_seller_verifications")
      .select("*")
      .eq("company_id", companyId)
      .maybeSingle(),
    supabase
      .from("marketplace_reviews")
      .select("*")
      .eq("company_id", companyId),
    supabase
      .from("marketplace_disputes")
      .select("*")
      .or(`buyer_company_id.eq.${companyId},seller_company_id.eq.${companyId}`),
    supabase
      .from("marketplace_refunds")
      .select("*")
      .or(`buyer_company_id.eq.${companyId},seller_company_id.eq.${companyId}`),
  ]);

  const verification = verificationRes.data;
  const reviews = reviewsRes.data || [];
  const disputes = disputesRes.data || [];
  const refunds = refundsRes.data || [];

  const sellerVerified = verification?.status === "approved";
  const payoutReady = Boolean(verification?.payout_ready);

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviewCount;

  const disputeCount = disputes.length;
  const refundCount = refunds.length;

  let score = 50;

  if (sellerVerified) score += 20;
  if (payoutReady) score += 10;
  if (averageRating >= 4.5) score += 15;
  if (averageRating >= 4 && averageRating < 4.5) score += 10;
  if (reviewCount >= 10) score += 5;

  score -= disputeCount * 5;
  score -= refundCount * 4;

  score = Math.max(0, Math.min(100, Math.round(score)));

  const status =
    score >= 80 ? "trusted" :
    score >= 60 ? "good" :
    score >= 40 ? "watch" :
    "risk";

  const { data, error } = await supabase
    .from("marketplace_trust_scores")
    .upsert(
      {
        company_id: companyId,
        seller_verified: sellerVerified,
        payout_ready: payoutReady,
        average_rating: averageRating,
        review_count: reviewCount,
        dispute_count: disputeCount,
        refund_count: refundCount,
        trust_score: score,
        status,
        metadata: {
          verification,
        },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getMarketplaceTrustScore(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_trust_scores")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (data) return data;

  return calculateMarketplaceTrustScore(companyId);
}
