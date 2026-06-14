import { NextResponse } from "next/server";
import { OCTO_PRICING } from "@/lib/pricing/plans";

export async function GET() {
  return NextResponse.json({ plans: OCTO_PRICING });
}
