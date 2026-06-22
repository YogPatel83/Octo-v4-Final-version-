import { NextResponse } from "next/server";
import {
  calculateMarketplaceTrustScore,
  getMarketplaceTrustScore,
} from "@/lib/marketplace-completion/trust-score";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const trust = await getMarketplaceTrustScore(companyId);

  return NextResponse.json({ trust });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const trust = await calculateMarketplaceTrustScore(body.company_id);

  return NextResponse.json({ trust });
}
