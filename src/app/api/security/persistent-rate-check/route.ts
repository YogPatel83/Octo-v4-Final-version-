import { NextResponse } from "next/server";
import { persistentRateLimit } from "@/lib/security/persistent-rate-limit/db-rate-limit";

export async function POST(req: Request) {
  const body = await req.json();

  const key = body.key || req.headers.get("x-forwarded-for") || "unknown";

  const result = await persistentRateLimit({
    key,
    limit: Number(body.limit || 60),
    window_ms: Number(body.window_ms || 60000),
    company_id: body.company_id || null,
    user_id: body.user_id || null,
    ip_address: body.ip_address || req.headers.get("x-forwarded-for") || null,
    route: body.route || null,
  });

  return NextResponse.json(result, { status: result.allowed ? 200 : 429 });
}
