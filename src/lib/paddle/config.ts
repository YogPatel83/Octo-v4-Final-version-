export function getPaddleConfig() {
  return {
    apiKey: process.env.PADDLE_API_KEY,
    webhookSecret: process.env.PADDLE_WEBHOOK_SECRET,
    clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox",
  };
}
