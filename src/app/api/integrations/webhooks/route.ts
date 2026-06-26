import { NextResponse } from "next/server";
import {
  createWebhookBuilder,
  listWebhookBuilders,
} from "@/lib/integrations/webhooks/webhook-builder";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const webhooks = await listWebhookBuilders(companyId);

  return NextResponse.json({ webhooks });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.name) {
    return NextResponse.json(
      { error: "company_id and name are required." },
      { status: 400 }
    );
  }

  const webhook = await createWebhookBuilder({
    company_id: body.company_id,
    name: body.name,
    description: body.description || null,
    method: body.method || "POST",
    schema: body.schema || {},
    metadata: body.metadata || {},
  });

  return NextResponse.json({ webhook });
}
