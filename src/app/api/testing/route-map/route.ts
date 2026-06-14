import { NextResponse } from "next/server";
import { BACKEND_ROUTE_MAP } from "@/lib/testing/route-map";

export async function GET() {
  return NextResponse.json({
    routes: BACKEND_ROUTE_MAP,
    count: BACKEND_ROUTE_MAP.length,
  });
}
