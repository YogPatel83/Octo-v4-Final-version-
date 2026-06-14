import { NextResponse } from "next/server";
import { MODEL_CATALOG } from "@/lib/models/catalog";

export async function GET() {
  return NextResponse.json({ catalog: MODEL_CATALOG });
}
