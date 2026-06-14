import { createMediaRequest } from "./create-media-request";

export async function generateImage(input: {
  company_id: string;
  user_id?: string | null;
  provider?: string;
  model?: string;
  prompt: string;
}) {
  const provider = input.provider || "google";
  const model = input.model || "gemini-image";

  const request = await createMediaRequest({
    company_id: input.company_id,
    user_id: input.user_id || null,
    type: "image",
    provider,
    model,
    prompt: input.prompt,
    status: "queued",
    metadata: {
      note: "Image generation provider call will be connected through provider-specific API."
    }
  });

  return {
    request,
    message: "Image generation request created."
  };
}
