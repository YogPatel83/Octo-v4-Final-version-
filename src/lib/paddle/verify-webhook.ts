import crypto from "crypto";

export function verifyPaddleWebhook(
  rawBody: string,
  signature: string
) {
  const secret =
    process.env.PADDLE_WEBHOOK_SECRET;

  if (!secret) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return expected === signature;
}
