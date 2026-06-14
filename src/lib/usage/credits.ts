import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getWallet(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("credit_wallets")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function deductCredits(input: {
  company_id: string;
  amount: number;
}) {
  const supabase = createSupabaseAdmin();

  const wallet = await getWallet(input.company_id);
  const balance = wallet?.balance || 0;

  if (balance < input.amount) {
    return {
      ok: false,
      reason: "Insufficient credits.",
      balance,
      required: input.amount,
    };
  }

  const nextBalance = balance - input.amount;

  const { data, error } = await supabase
    .from("credit_wallets")
    .upsert({
      company_id: input.company_id,
      balance: nextBalance,
      updated_at: new Date().toISOString(),
    }, { onConflict: "company_id" })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    ok: true,
    wallet: data,
  };
}
