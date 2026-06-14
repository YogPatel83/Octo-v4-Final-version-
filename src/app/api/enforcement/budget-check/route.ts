import { NextResponse } from "next/server";
import { enforceBudget } from "@/lib/enforcement/budget-enforcement";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || typeof body.amount_cents !== "number") {
    return NextResponse.json(
      { error: "company_id and amount_cents are required." },
      { status: 400 }
    );
  }

  const result = await enforceBudget({
    company_id: body.company_id,
    amount_cents: body.amount_cents,
    reason: body.reason || "Business action requires spending approval",
  });

  return NextResponse.json(result);
}
