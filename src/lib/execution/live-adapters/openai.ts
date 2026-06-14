export async function executeOpenAIAdapter(input: {
  action: string;
  payload: Record<string, unknown>;
  api_key: string;
}) {
  const payload = input.payload || {};

  if (input.action === "image") {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${input.api_key}`,
      },
      body: JSON.stringify({
        model: payload.model || "gpt-image-1",
        prompt: payload.prompt,
        size: payload.size || "1024x1024",
      }),
    });

    const data = await res.json();

    return {
      ok: res.ok,
      status: res.ok ? "completed" : "failed",
      output: data,
      error: res.ok ? null : JSON.stringify(data),
    };
  }

  if (input.action === "tts") {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${input.api_key}`,
      },
      body: JSON.stringify({
        model: payload.model || "gpt-4o-mini-tts",
        voice: payload.voice || "alloy",
        input: payload.prompt || payload.text || "",
        format: payload.format || "mp3",
      }),
    });

    const arrayBuffer = await res.arrayBuffer();

    return {
      ok: res.ok,
      status: res.ok ? "completed" : "failed",
      output: {
        content_type: res.headers.get("content-type"),
        bytes: arrayBuffer.byteLength,
        base64: Buffer.from(arrayBuffer).toString("base64"),
      },
      error: res.ok ? null : Buffer.from(arrayBuffer).toString("utf8"),
    };
  }

  return {
    ok: false,
    status: "failed",
    output: null,
    error: `Unsupported OpenAI action: ${input.action}`,
  };
}
