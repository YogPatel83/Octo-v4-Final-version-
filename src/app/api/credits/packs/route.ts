import { NextResponse } from "next/server";
import { CREDIT_PACKS } from "@/lib/credits/packs";

export async function GET() {
  return NextResponse.json({ packs: CREDIT_PACKS });
}
