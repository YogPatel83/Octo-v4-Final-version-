import { NextResponse } from "next/server";
import { TOOL_CATALOG } from "@/lib/tools/catalog";

export async function GET() {
  return NextResponse.json({
    tools: TOOL_CATALOG,
  });
}
