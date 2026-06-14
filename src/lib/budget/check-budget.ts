import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function checkBudget(input: {
  company_id: string;
  requested_amount_cents: number;
}) {
  const supabase = createSupabaseAdmin();

  const { data: wallet } = await supabase
    .from("credit_wallets")
    .select("*")
    .eq("company_id", input.company_id)
    .maybeSingle();

  const balance = wallet?.balance || 0;

  return {
    company_id: input.company_id,
    requested_amount_cents: input.requested_amount_cents,
    available_balance: balance,
    allowed: balance >= input.requested_amount_cents,
    requires_approval: input.requested_amount_cents > 0,
  };
}
