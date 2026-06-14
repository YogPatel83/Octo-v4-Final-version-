export async function executeGenericRestAdapter(input: {
  provider: string;
  action: string;
  payload: Record<string, unknown>;
  api_key?: string | null;
  base_url?: string | null;
}) {
  const endpoint = String(input.payload.endpoint || input.base_url || "");

  if (!endpoint) {
    return {
      ok: false,
      status: "failed",
      output: null,
      error: "endpoint or base_url is required.",
    };
  }

  const method = String(input.payload.method || "POST").toUpperCase();

  const res = await fetch(endpoint, {
    method,
    headers: {
      "content-type": "application/json",
      authorization: input.api_key ? `Bearer ${input.api_key}` : "",
      ...((input.payload.headers as Record<string, string>) || {}),
    },
    body:
      method === "GET"
        ? undefined
        : JSON.stringify(input.payload.body || input.payload),
  });

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  return {
    ok: res.ok,
    status: res.ok ? "completed" : "failed",
    output: {
      provider: input.provider,
      action: input.action,
      endpoint,
      response: data,
    },
    error: res.ok ? null : `HTTP ${res.status}`,
  };
}
