import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  const body = await req.json();

  const key = body.key || req.headers.get("x-forwarded-for") || "unknown";

  const result = rateLimit({
    key,
    limit: Number(body.limit || 60),
    window_ms: Number(body.window_ms || 60000),
  });

  return NextResponse.json(result, { status: result.allowed ? 200 : 429 });
}
