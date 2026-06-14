import { NextResponse } from "next/server";
import { requestSellerPayout } from "@/lib/payouts/request-payout";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || typeof body.amount_cents !== "number") {
    return NextResponse.json(
      { error: "company_id and amount_cents are required." },
      { status: 400 }
    );
  }

  const result = await requestSellerPayout({
    company_id: body.company_id,
    amount_cents: body.amount_cents,
    payout_provider: body.payout_provider || "manual",
    metadata: body.metadata || {},
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
