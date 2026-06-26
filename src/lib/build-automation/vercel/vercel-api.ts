export async function vercelApi(input: {
  path: string;
  method?: string;
  token?: string | null;
  body?: Record<string, unknown>;
}) {
  const token = input.token || process.env.VERCEL_TOKEN;

  if (!token) {
    return {
      ok: false,
      status: 500,
      data: null,
      error: "VERCEL_TOKEN is missing.",
    };
  }

  const res = await fetch(`https://api.vercel.com${input.path}`, {
    method: input.method || "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: input.body ? JSON.stringify(input.body) : undefined,
  });

  const text = await res.text();
  let data: unknown = text;

  try {
    data = JSON.parse(text);
  } catch {}

  return {
    ok: res.ok,
    status: res.status,
    data,
    error: res.ok ? null : text,
  };
}
