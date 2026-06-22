import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function requestMarketplaceRefund(input: {
  order_id?: string | null;
  marketplace_item_id?: string | null;
  buyer_company_id: string;
  seller_company_id?: string | null;
  requested_by_user_id?: string | null;
  amount_cents?: number;
  currency?: string;
  reason?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_refunds")
    .insert({
      order_id: input.order_id || null,
      marketplace_item_id: input.marketplace_item_id || null,
      buyer_company_id: input.buyer_company_id,
      seller_company_id: input.seller_company_id || null,
      requested_by_user_id: input.requested_by_user_id || null,
      amount_cents: input.amount_cents || 0,
      currency: input.currency || "USD",
      reason: input.reason || null,
      status: "requested",
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listMarketplaceRefunds(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_refunds")
    .select("*")
    .or(`buyer_company_id.eq.${companyId},seller_company_id.eq.${companyId}`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
