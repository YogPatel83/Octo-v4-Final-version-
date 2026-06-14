import { NextRequest } from "next/server";

export function requireInternalSecret(req: NextRequest) {
  const expected = process.env.OCTO_WORKER_SECRET;
  const received = req.headers.get("x-octo-worker-secret");

  return Boolean(expected && received === expected);
}

export function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
