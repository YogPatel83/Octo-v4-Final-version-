import { NextResponse } from "next/server";
import { upsertWorkerHeartbeat } from "@/lib/infrastructure/monitoring/worker-nodes";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.worker_name || !body.worker_secret) {
    return NextResponse.json(
      { error: "worker_name and worker_secret are required." },
      { status: 400 }
    );
  }

  const worker = await upsertWorkerHeartbeat({
    worker_name: body.worker_name,
    worker_secret: body.worker_secret,
    company_id: body.company_id || null,
    version: body.version || null,
    region: body.region || null,
    capabilities: body.capabilities || [],
    running_jobs: Number(body.running_jobs || 0),
    max_jobs: Number(body.max_jobs || 10),
    metadata: body.metadata || {},
  });

  return NextResponse.json({ worker });
}
