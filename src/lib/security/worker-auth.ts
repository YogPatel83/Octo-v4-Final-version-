import { NextRequest } from "next/server";

export function verifyWorkerRequest(req: NextRequest) {
  const expected = process.env.OCTO_WORKER_SECRET;
  const received = req.headers.get("x-octo-worker-secret");

  return Boolean(expected && received === expected);
}
