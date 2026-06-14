export async function executeStabilityAdapter(input: {
  action: string;
  payload: Record<string, unknown>;
  api_key: string;
}) {
  const payload = input.payload || {};

  if (input.action === "image") {
    const form = new FormData();
    form.append("prompt", String(payload.prompt || ""));
    form.append("output_format", String(payload.output_format || "png"));

    const res = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        authorization: `Bearer ${input.api_key}`,
        accept: "application/json",
      },
      body: form,
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.ok ? "completed" : "failed",
      output: data,
      error: res.ok ? null : JSON.stringify(data),
    };
  }

  return {
    ok: false,
    status: "failed",
    output: null,
    error: `Unsupported Stability action: ${input.action}`,
  };
}
