import { getPaddleConfig } from "./config";

export async function paddleApi(input: {
  path: string;
  method?: "GET" | "POST" | "PATCH";
  body?: Record<string, unknown>;
}) {
  const config = getPaddleConfig();

  if (!config.apiKey) {
    throw new Error("PADDLE_API_KEY is missing.");
  }

  const baseUrl =
    config.environment === "production"
      ? "https://api.paddle.com"
      : "https://sandbox-api.paddle.com";

  const res = await fetch(`${baseUrl}${input.path}`, {
    method: input.method || "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.apiKey}`,
    },
    body: input.body ? JSON.stringify(input.body) : undefined,
  });

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      data,
    };
  }

  return {
    ok: true,
    status: res.status,
    data,
  };
}
