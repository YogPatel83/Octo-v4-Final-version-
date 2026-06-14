import { NextResponse } from "next/server";
import { estimatePlanMargin } from "@/lib/pricing/plans";

export async function POST(req: Request) {
  const body = await req.json();

  const result = estimatePlanMargin({
    price_cents: body.price_cents || 0,
    estimated_ai_cost_cents: body.estimated_ai_cost_cents || 0,
  });

  return NextResponse.json(result);
}
