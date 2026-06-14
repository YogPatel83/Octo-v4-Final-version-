import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getCreditBalance } from "./balance";
import { getCreditCost } from "./costs";

export async function checkCredits(input: {
  company_id: string;
  action: string;
  byok_used?: boolean;
}) {
  const wallet = await getCreditBalance(input.company_id);
  const cost = getCreditCost(input.action, input.byok_used || false);

  return {
    allowed: Number(wallet.balance || 0) >= cost,
    balance: Number(wallet.balance || 0),
    cost,
    shortfall: Math.max(0, cost - Number(wallet.balance || 0)),
  };
}

export async function deductCredits(input: {
  company_id: string;
  action: string;
  source: string;
  source_id?: string | null;
  byok_used?: boolean;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();
  const check = await checkCredits({
    company_id: input.company_id,
    action: input.action,
    byok_used: input.byok_used || false,
  });

  if (!check.allowed) {
    return {
      ok: false,
      blocked: true,
      reason: "insufficient_credits",
      ...check,
    };
  }

  const nextBalance = check.balance - check.cost;

  const { data: wallet, error: walletError } = await supabase
    .from("credit_wallets")
    .update({
      balance: nextBalance,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", input.company_id)
    .select()
    .single();

  if (walletError) throw new Error(walletError.message);

  const { data: ledger, error: ledgerError } = await supabase
    .from("usage_ledger")
    .insert({
      company_id: input.company_id,
      source: input.source,
      source_id: input.source_id || null,
      action: input.action,
      credits_charged: check.cost,
      byok_used: input.byok_used || false,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (ledgerError) throw new Error(ledgerError.message);

  return {
    ok: true,
    blocked: false,
    cost: check.cost,
    previous_balance: check.balance,
    new_balance: nextBalance,
    wallet,
    ledger,
  };
}
