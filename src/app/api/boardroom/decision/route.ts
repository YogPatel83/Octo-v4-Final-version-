import { NextResponse } from "next/server";
import { analyzeDecision } from "@/lib/boardroom/analyze-decision";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.title) {
    return NextResponse.json(
      { error: "company_id and title are required." },
      { status: 400 }
    );
  }

  const decision = await analyzeDecision({
    company_id: body.company_id,
    title: body.title,
    description: body.description,
    expected_revenue_cents: body.expected_revenue_cents,
    expected_savings_cents: body.expected_savings_cents,
    estimated_cost_cents: body.estimated_cost_cents,
    risk_level: body.risk_level || "medium",
  });

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("approvals")
    .insert({
      company_id: body.company_id,
      title: `Boardroom decision: ${body.title}`,
      description: JSON.stringify(decision),
      approval_type: "boardroom_decision",
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    decision,
    approval: data,
  });
}
