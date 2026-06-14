import { NextRequest } from "next/server";
import { ok, unauthorized } from "@/lib/http/json";
import { requireInternalSecret, getClientIp } from "@/lib/security/api-guard";
import { simpleRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const limit = simpleRateLimit({
    key: `internal-guard:${ip}`,
    limit: 20,
    windowMs: 60_000,
  });

  if (!limit.allowed) {
    return unauthorized("Rate limit exceeded.");
  }

  if (!requireInternalSecret(req)) {
    return unauthorized("Invalid internal secret.");
  }

  return ok({
    ok: true,
    ip,
    rate_limit: limit,
  });
}
