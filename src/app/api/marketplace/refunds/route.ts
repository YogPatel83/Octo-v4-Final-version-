import { NextResponse } from "next/server";
import {
  listMarketplaceRefunds,
  requestMarketplaceRefund,
} from "@/lib/marketplace-completion/refunds";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const refunds = await listMarketplaceRefunds(companyId);

  return NextResponse.json({ refunds });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.buyer_company_id) {
    return NextResponse.json({ error: "buyer_company_id is required." }, { status: 400 });
  }

  const refund = await requestMarketplaceRefund({
    order_id: body.order_id || null,
    marketplace_item_id: body.marketplace_item_id || null,
    buyer_company_id: body.buyer_company_id,
    seller_company_id: body.seller_company_id || null,
    requested_by_user_id: body.requested_by_user_id || null,
    amount_cents: Number(body.amount_cents || 0),
    currency: body.currency || "USD",
    reason: body.reason || null,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ refund });
}
