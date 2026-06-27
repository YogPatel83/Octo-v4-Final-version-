import { NextResponse } from "next/server";
import { listWorkerNodes } from "@/lib/infrastructure/monitoring/worker-nodes";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");
  const workers = await listWorkerNodes(companyId);
  return NextResponse.json({ workers });
}
