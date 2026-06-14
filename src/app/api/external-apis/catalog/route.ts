import { NextResponse } from "next/server";
import { EXTERNAL_API_CATALOG } from "@/lib/external-apis/catalog";

export async function GET() {
  return NextResponse.json({ catalog: EXTERNAL_API_CATALOG });
}
