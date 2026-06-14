export function verifyPaddleWebhookPlaceholder(input: {
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
      reason: "Missing Paddle signature header.",
    };
  }

  return {
    ok: true,
    reason: "Placeholder verification passed. Replace with official Paddle signature verification before production.",
  };
}
