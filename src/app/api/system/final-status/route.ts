import { NextResponse } from "next/server";
import { getFinalBackendStatus } from "@/lib/system/final-status";

export async function GET() {
  return NextResponse.json(getFinalBackendStatus());
}
