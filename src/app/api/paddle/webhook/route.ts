import { NextResponse } from "next/server";
import { processUnifiedPaddleWebhook } from "@/lib/paddle/process-webhook";
import { verifyPaddleSignature } from "@/lib/paddle/verify-signature";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature");

  const verification = verifyPaddleSignature({
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
