import { getCompanyModelKey } from "./model-keys";
import { saveGeneration } from "./save-generation";

export async function createGeneration(input: {
  company_id: string;
  user_id?: string | null;
  type: "image" | "video" | "tts" | "stt" | "music" | "three_d";
  provider: string;
  model: string;
  prompt?: string;
  input_url?: string | null;
  options?: Record<string, unknown>;
}) {
  const companyKey = await getCompanyModelKey(input.company_id, input.provider);

  const hasKey =
    Boolean(companyKey?.api_key) ||
    Boolean(process.env[`${input.provider.toUpperCase()}_API_KEY`]);

  const generation = await saveGeneration({
    company_id: input.company_id,
    user_id: input.user_id || null,
    type: input.type,
    provider: input.provider,
    model: input.model,
    prompt: input.prompt || null,
    input_url: input.input_url || null,
    status: hasKey ? "queued" : "missing_api_key",
    metadata: {
      options: input.options || {},
      byok_used: Boolean(companyKey?.api_key),
      base_url: companyKey?.base_url || null,
      note: hasKey
        ? "Generation queued. Provider execution worker can process this."
        : "Missing company BYOK key or platform provider key."
    }
  });

  return {
    generation,
    has_api_key: hasKey,
    byok_used: Boolean(companyKey?.api_key)
  };
}
