import { NextResponse } from "next/server";
import {
  createMarketplaceReview,
  listMarketplaceReviews,
} from "@/lib/marketplace-completion/reviews";

export async function GET(req: Request) {
  const marketplaceItemId = new URL(req.url).searchParams.get("marketplace_item_id");

  if (!marketplaceItemId) {
    return NextResponse.json(
      { error: "marketplace_item_id is required." },
      { status: 400 }
    );
  }

  const reviews = await listMarketplaceReviews(marketplaceItemId);

  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.marketplace_item_id || !body.company_id || !body.rating) {
    return NextResponse.json(
      { error: "marketplace_item_id, company_id, and rating are required." },
      { status: 400 }
    );
  }

  const review = await createMarketplaceReview({
    marketplace_item_id: body.marketplace_item_id,
    order_id: body.order_id || null,
    company_id: body.company_id,
    user_id: body.user_id || null,
    rating: Number(body.rating),
    title: body.title || null,
    body: body.body || null,
  });

  return NextResponse.json({ review });
}
