export async function executeGoogleAdapter(input: {
  action: string;
  payload: Record<string, unknown>;
  api_key: string;
}) {
  const payload = input.payload || {};
  const model = String(payload.model || "gemini-2.5-flash");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${input.api_key}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: String(payload.prompt || payload.text || ""),
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  return {
    ok: res.ok,
    status: res.ok ? "completed" : "failed",
    output: data,
    error: res.ok ? null : JSON.stringify(data),
  };
}
