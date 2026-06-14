import { NextResponse } from "next/server";
import { BACKEND_ROUTES } from "@/lib/docs/backend-routes";

export async function GET() {
  return NextResponse.json({
    routes: BACKEND_ROUTES
  });
}
