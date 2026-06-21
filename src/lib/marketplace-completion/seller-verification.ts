import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function submitSellerVerification(input: {
  company_id: string;
  user_id?: string | null;
  seller_type?: string;
  legal_name?: string | null;
  business_name?: string | null;
  country?: string | null;
  submitted_data?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_seller_verifications")
    .upsert(
      {
        company_id: input.company_id,
        user_id: input.user_id || null,
        seller_type: input.seller_type || "individual",
        legal_name: input.legal_name || null,
        business_name: input.business_name || null,
        country: input.country || null,
        status: "pending",
        payout_ready: false,
        submitted_data: input.submitted_data || {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getSellerVerification(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_seller_verifications")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}
