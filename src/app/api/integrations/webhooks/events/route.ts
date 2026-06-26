import { NextResponse } from "next/server";
import { receiveWebhookEvent } from "@/lib/integrations/webhooks/receive-webhook";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const webhookId = url.searchParams.get("webhook_id");
  const secret = req.headers.get("x-octo-webhook-secret");

  if (!webhookId) {
    return NextResponse.json({ error: "webhook_id is required." }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const result = await receiveWebhookEvent({
    webhook_id: webhookId,
    payload: body,
    headers,
    secret,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 401 });
}
