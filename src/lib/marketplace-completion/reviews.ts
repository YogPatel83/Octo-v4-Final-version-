import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createMarketplaceReview(input: {
  marketplace_item_id: string;
  order_id?: string | null;
  company_id: string;
  user_id?: string | null;
  rating: number;
  title?: string | null;
  body?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const rating = Math.max(1, Math.min(5, Number(input.rating || 5)));

  const { data, error } = await supabase
    .from("marketplace_reviews")
    .insert({
      marketplace_item_id: input.marketplace_item_id,
      order_id: input.order_id || null,
      company_id: input.company_id,
      user_id: input.user_id || null,
      rating,
      title: input.title || null,
      body: input.body || null,
      status: "published",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listMarketplaceReviews(marketplaceItemId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_reviews")
    .select("*")
    .eq("marketplace_item_id", marketplaceItemId)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
