import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function calculateSellerBalance(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: orders, error: ordersError } = await supabase
    .from("marketplace_orders")
    .select("*")
    .eq("seller_company_id", companyId)
    .eq("status", "completed");

  if (ordersError) throw new Error(ordersError.message);

  const { data: payouts, error: payoutsError } = await supabase
    .from("seller_payouts")
    .select("*")
    .eq("company_id", companyId)
    .in("status", ["pending", "paid"]);

  if (payoutsError) throw new Error(payoutsError.message);

  const earned = (orders || []).reduce(
    (sum, order) => sum + Number(order.seller_amount_cents || 0),
    0
  );

  const alreadyRequested = (payouts || []).reduce(
    (sum, payout) => sum + Number(payout.amount_cents || 0),
    0
  );

  const available = Math.max(0, earned - alreadyRequested);

  return {
    company_id: companyId,
    earned_cents: earned,
    already_requested_cents: alreadyRequested,
    available_cents: available,
  };
}
