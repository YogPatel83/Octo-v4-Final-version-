import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function enforceBudget(input: {
  company_id: string;
  amount_cents: number;
  reason: string;
}) {
  const supabase = createSupabaseAdmin();

  if (input.amount_cents <= 0) {
    return {
      allowed: true,
      requires_approval: false,
      reason: "No money involved.",
    };
  }

  const { data: approval, error } = await supabase
    .from("approvals")
    .insert({
      company_id: input.company_id,
      title: `Budget approval required`,
      description: `${input.reason}. Requested amount: ${input.amount_cents} cents.`,
      approval_type: "budget",
      status: "pending",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    allowed: false,
    requires_approval: true,
    approval,
  };
}
