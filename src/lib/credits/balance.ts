import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getCreditBalance(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("credit_wallets")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) {
    const { data: created, error: createError } = await supabase
      .from("credit_wallets")
      .insert({
        company_id: companyId,
        balance: 0,
      })
      .select()
      .single();

    if (createError) throw new Error(createError.message);

    return created;
  }

  return data;
}
