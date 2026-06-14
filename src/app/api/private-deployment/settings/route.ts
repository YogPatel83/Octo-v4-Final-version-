import { NextResponse } from "next/server";
import {
  getPrivateDeploymentSettings,
  upsertPrivateDeploymentSettings,
} from "@/lib/private-deployment/settings";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const settings = await getPrivateDeploymentSettings(companyId);

  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const settings = await upsertPrivateDeploymentSettings({
    company_id: body.company_id,
    deployment_mode: body.deployment_mode || "octo_cloud",
    self_hosted_enabled: body.self_hosted_enabled || false,
    server_url: body.server_url || null,
    worker_url: body.worker_url || null,
    billing_mode: body.billing_mode || "octo_credits",
    model_mode: body.model_mode || "platform_or_byok",
    status: body.status || "configured",
    metadata: body.metadata || {},
  });

  return NextResponse.json({ settings });
}
