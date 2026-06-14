import { NextResponse } from "next/server";
import { processUnifiedPaddleWebhook } from "@/lib/paddle/process-webhook";

function verifyPaddleWebhookBasic(input: {
  rawBody: string;
  signature: string | null;
}) {
  if (!process.env.PADDLE_WEBHOOK_SECRET) {
    return {
      ok: false,
      reason: "PADDLE_WEBHOOK_SECRET missing.",
    };
  }

  if (!input.signature) {
    return {
      ok: false,
      reason: "Missing paddle-signature header.",
    };
  }

  return {
    ok: true,
    reason: "Signature header present.",
  };
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature");

  const verification = verifyPaddleWebhookBasic({
    rawBody,
    signature,
  });

  if (!verification.ok) {
    return NextResponse.json({ error: verification.reason }, { status: 401 });
  }

  const event = JSON.parse(rawBody || "{}");
  const processed = await processUnifiedPaddleWebhook(event);

  return NextResponse.json({
    received: true,
    verification,
    processed,
  });
}
