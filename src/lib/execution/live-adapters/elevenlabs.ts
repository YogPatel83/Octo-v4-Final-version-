export async function executeElevenLabsAdapter(input: {
  action: string;
  payload: Record<string, unknown>;
  api_key: string;
}) {
  const payload = input.payload || {};

  if (input.action === "tts" || input.action === "voice") {
    const voiceId = String(payload.voice_id || "21m00Tcm4TlvDq8ikWAM");

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "xi-api-key": input.api_key,
      },
      body: JSON.stringify({
        text: String(payload.prompt || payload.text || ""),
        model_id: payload.model || "eleven_multilingual_v2",
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
    error: `Unsupported ElevenLabs action: ${input.action}`,
  };
}
