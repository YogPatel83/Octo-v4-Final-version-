import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { checkBudget } from "@/lib/budget/check-budget";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || typeof body.requested_amount_cents !== "number") {
    return NextResponse.json(
      { error: "company_id and requested_amount_cents are required." },
      { status: 400 }
    );
  }

  const budget = await checkBudget({
    company_id: body.company_id,
    requested_amount_cents: body.requested_amount_cents,
  });

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("approvals")
    .insert({
      company_id: body.company_id,
      title: body.title || "Budget approval request",
      description: body.description || `Requesting budget approval for ${body.requested_amount_cents} cents.`,
      approval_type: "budget_request",
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    budget,
    approval: data,
  });
}
