import crypto from "crypto";

function parsePaddleSignature(header: string) {
  const parts = header.split(";").map((part) => part.trim());
  const parsed: Record<string, string> = {};

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key && value) parsed[key] = value;
  }

  return parsed;
}

export function verifyPaddleSignature(input: {
  rawBody: string;
  signature: string | null;
  secret?: string | null;
}) {
  const secret = input.secret || process.env.PADDLE_WEBHOOK_SECRET;

  if (!secret) {
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

  const parsed = parsePaddleSignature(input.signature);
  const timestamp = parsed.ts;
  const receivedSignature = parsed.h1;

  if (!timestamp || !receivedSignature) {
    return {
      ok: false,
      reason: "Invalid paddle-signature header.",
    };
  }

  const signedPayload = `${timestamp}:${input.rawBody}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "hex");
  const received = Buffer.from(receivedSignature, "hex");

  if (expected.length !== received.length) {
    return {
      ok: false,
      reason: "Signature length mismatch.",
    };
  }

  const valid = crypto.timingSafeEqual(expected, received);

  return {
    ok: valid,
    reason: valid ? "Verified." : "Invalid Paddle signature.",
  };
}
