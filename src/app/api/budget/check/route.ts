import { NextResponse } from "next/server";
import { checkBudget } from "@/lib/budget/check-budget";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || typeof body.requested_amount_cents !== "number") {
    return NextResponse.json(
      { error: "company_id and requested_amount_cents are required." },
      { status: 400 }
    );
  }

  const result = await checkBudget({
    company_id: body.company_id,
    requested_amount_cents: body.requested_amount_cents,
  });

  return NextResponse.json(result);
}
