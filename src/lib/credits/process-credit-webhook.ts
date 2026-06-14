import { createSupabaseAdmin } from "@/lib/supabase/server";
import { addCreditsToWallet } from "./add-credits";

export async function processCreditPurchaseWebhook(event: Record<string, any>) {
  const data = event.data || {};
  const custom = data.custom_data || {};

  if (custom.type !== "credit_pack") {
    return {
      handled: false,
      reason: "Not a credit pack event.",
    };
  }

  const companyId = custom.company_id;
  const purchaseId = custom.credit_purchase_id;
  const credits = Number(custom.credits || 0);
  const transactionId = data.id || data.transaction_id || event.event_id || event.id;

  if (!companyId || !purchaseId || !credits) {
    return {
      handled: false,
      reason: "Missing company_id, credit_purchase_id, or credits.",
    };
  }

  const supabase = createSupabaseAdmin();

  const { data: existing } = await supabase
    .from("credit_purchases")
    .select("*")
    .eq("id", purchaseId)
    .maybeSingle();

  if (existing?.status === "paid") {
    return {
      handled: true,
      skipped: true,
      reason: "Credit purchase already fulfilled.",
    };
  }

  await supabase
    .from("credit_purchases")
    .update({
      status: "paid",
      paddle_transaction_id: transactionId || null,
      metadata: {
        ...(existing?.metadata || {}),
        fulfilled_at: new Date().toISOString(),
        event,
      },
    })
    .eq("id", purchaseId);

  const wallet = await addCreditsToWallet({
    company_id: companyId,
    credits,
    reason: "credit_pack_purchase",
    metadata: {
      purchase_id: purchaseId,
      transaction_id: transactionId || null,
    },
  });

  return {
    handled: true,
    company_id: companyId,
    credits_added: credits,
    wallet,
  };
}
