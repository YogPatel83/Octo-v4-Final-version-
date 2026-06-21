import { NextResponse } from "next/server";
import {
  listMarketplaceDisputes,
  openMarketplaceDispute,
} from "@/lib/marketplace-completion/disputes";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const disputes = await listMarketplaceDisputes(companyId);

  return NextResponse.json({ disputes });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.buyer_company_id || !body.reason) {
    return NextResponse.json(
      { error: "buyer_company_id and reason are required." },
      { status: 400 }
    );
  }

  const dispute = await openMarketplaceDispute({
    order_id: body.order_id || null,
    marketplace_item_id: body.marketplace_item_id || null,
    buyer_company_id: body.buyer_company_id,
    seller_company_id: body.seller_company_id || null,
    opened_by_user_id: body.opened_by_user_id || null,
    reason: body.reason,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ dispute });
}
