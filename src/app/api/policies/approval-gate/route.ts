import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { evaluateExecutionPolicy } from "@/lib/policies/evaluate-policy";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.action_type || !body.title) {
    return NextResponse.json(
      { error: "company_id, action_type, and title are required." },
      { status: 400 }
    );
  }

  const policy = evaluateExecutionPolicy({
    action_type: body.action_type,
    amount_cents: body.amount_cents,
    risk_level: body.risk_level,
  });

  if (!policy.requires_approval) {
    return NextResponse.json({
      allowed: true,
      policy,
      approval: null,
    });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("approvals")
    .insert({
      company_id: body.company_id,
      title: body.title,
      description: body.description || JSON.stringify(policy),
      approval_type: body.action_type,
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    allowed: false,
    policy,
    approval: data,
  });
}
