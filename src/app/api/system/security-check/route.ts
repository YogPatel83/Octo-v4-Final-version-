import { NextRequest } from "next/server";
import { ok, unauthorized } from "@/lib/http/json";
import { requireInternalSecret } from "@/lib/security/api-guard";

export async function POST(req: NextRequest) {
  if (!requireInternalSecret(req)) {
    return unauthorized("Invalid internal secret.");
  }

  return ok({
    ok: true,
    security: "internal secret accepted",
    checked_at: new Date().toISOString(),
  });
}
