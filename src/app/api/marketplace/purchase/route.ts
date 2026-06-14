import { NextResponse } from "next/server";
import { purchaseMarketplaceItem } from "@/lib/marketplace/purchase";

export async function POST(req: Request) {
  const body = await req.json();

  if (
    !body.company_id ||
    !body.item_id ||
    !body.item_type ||
    typeof body.amount_cents !== "number"
  ) {
    return NextResponse.json(
      {
        error: "company_id, item_id, item_type, amount_cents required",
      },
      { status: 400 }
    );
  }

  const result = await purchaseMarketplaceItem({
    company_id: body.company_id,
    item_id: body.item_id,
    item_type: body.item_type,
    amount_cents: body.amount_cents,
  });

  return NextResponse.json(result);
}
