import { createMediaRequest } from "./create-media-request";

export async function generateVideo(input: {
  company_id: string;
  user_id?: string | null;
  provider?: string;
  model?: string;
  prompt: string;
  reference_image_url?: string | null;
}) {
  const provider = input.provider || "google";
  const model = input.model || "veo";

  const request = await createMediaRequest({
    company_id: input.company_id,
    user_id: input.user_id || null,
    type: "video",
    provider,
    model,
    prompt: input.prompt,
    status: "queued",
    metadata: {
      reference_image_url: input.reference_image_url || null,
      note: "Video generation provider call will be connected through provider-specific API."
    }
  });

  return {
    request,
    message: "Video generation request created."
  };
}
