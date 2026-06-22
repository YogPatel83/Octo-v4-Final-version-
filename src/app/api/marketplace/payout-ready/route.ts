import { NextResponse } from "next/server";
import { markSellerPayoutReady } from "@/lib/marketplace-completion/payout-ready";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await markSellerPayoutReady({
    company_id: body.company_id,
    payout_ready: Boolean(body.payout_ready),
    review_notes: body.review_notes || null,
  });

  return NextResponse.json(result);
}
