import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function openMarketplaceDispute(input: {
  order_id?: string | null;
  marketplace_item_id?: string | null;
  buyer_company_id: string;
  seller_company_id?: string | null;
  opened_by_user_id?: string | null;
  reason: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_disputes")
    .insert({
      order_id: input.order_id || null,
      marketplace_item_id: input.marketplace_item_id || null,
      buyer_company_id: input.buyer_company_id,
      seller_company_id: input.seller_company_id || null,
      opened_by_user_id: input.opened_by_user_id || null,
      reason: input.reason,
      status: "open",
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listMarketplaceDisputes(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_disputes")
    .select("*")
    .or(`buyer_company_id.eq.${companyId},seller_company_id.eq.${companyId}`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
