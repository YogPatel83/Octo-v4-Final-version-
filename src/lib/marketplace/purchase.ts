import { createSupabaseAdmin } from "@/lib/supabase/server";
import { calculateRevenueShare } from "./revenue-share";

export async function purchaseMarketplaceItem(input: {
  company_id: string;
  item_id: string;
  item_type: "skill" | "dataset";
  amount_cents: number;
}) {
  const supabase = createSupabaseAdmin();

  const split = calculateRevenueShare({
    amount_cents: input.amount_cents,
  });

  const { data, error } = await supabase
    .from("marketplace_orders")
    .insert({
      company_id: input.company_id,
      item_id: input.item_id,
      item_type: input.item_type,
      amount_cents: input.amount_cents,
      seller_amount_cents: split.seller_amount,
      platform_fee_cents: split.platform_fee,
      status: "completed",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    order: data,
    revenue_split: split,
  };
}
