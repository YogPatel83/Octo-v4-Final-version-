import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function addCreditsToWallet(input: {
  company_id: string;
  credits: number;
  reason: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select("*")
    .eq("company_id", input.company_id)
    .maybeSingle();

  const current = Number(wallet?.balance || 0);
  const next = current + input.credits;

  const { data, error } = await supabase
    .from("credit_wallets")
    .upsert(
      {
        company_id: input.company_id,
        balance: next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  await supabase.from("usage_ledger").insert({
    company_id: input.company_id,
    source: "credit_wallet",
    action: "credits_added",
    credits_charged: -Math.abs(input.credits),
    metadata: {
      reason: input.reason,
      previous_balance: current,
      new_balance: next,
      ...(input.metadata || {}),
    },
  });

  return data;
}
