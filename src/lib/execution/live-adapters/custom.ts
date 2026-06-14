export async function executeCustomAdapter(input: {
  action: string;
  payload: Record<string, unknown>;
  api_key?: string | null;
  base_url?: string | null;
}) {
  if (!input.base_url) {
    return {
      ok: false,
      status: "failed",
      output: null,
      error: "Missing custom base_url.",
    };
  }

  const res = await fetch(input.base_url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: input.api_key ? `Bearer ${input.api_key}` : "",
    },
    body: JSON.stringify({
      action: input.action,
      payload: input.payload,
    }),
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
    output: data,
    error: res.ok ? null : `HTTP ${res.status}`,
  };
}
