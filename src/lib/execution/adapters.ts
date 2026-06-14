import { executeOpenAIAdapter } from "./live-adapters/openai";
import { executeGoogleAdapter } from "./live-adapters/google";
import { executeElevenLabsAdapter } from "./live-adapters/elevenlabs";
import { executeCustomAdapter } from "./live-adapters/custom";
import { executeStabilityAdapter } from "./live-adapters/stability";
import { executeHiggsfieldAdapter } from "./live-adapters/higgsfield";
import { executeTwilioAdapter } from "./live-adapters/twilio";
import { executeSocialAdapter } from "./live-adapters/social";
import { executeLogisticsAdapter } from "./live-adapters/logistics";
import { executeGenericRestAdapter } from "./live-adapters/generic-rest";

const SOCIAL_PROVIDERS = [
  "whatsapp",
  "instagram",
  "facebook",
  "twitter",
  "twitter_x",
  "linkedin",
];

const LOGISTICS_PROVIDERS = [
  "shiprocket",
  "dhl",
  "fedex",
  "ups",
];

const GENERIC_REST_PROVIDERS = [
  "alibaba",
  "indiamart",
  "figma",
  "canva",
  "dropbox",
  "onedrive",
  "ga4",
  "mixpanel",
  "posthog",
  "mesh_y",
  "meshy",
  "tripo",
  "linkedin_ads",
  "tiktok_ads",
];

export async function executeProviderAdapter(input: {
  provider: string;
  action: string;
  payload: Record<string, unknown>;
  api_key?: string | null;
  base_url?: string | null;
}) {
  if (
    !input.api_key &&
    input.provider !== "mock" &&
    input.provider !== "custom_rest_api"
  ) {
    return {
      ok: false,
      status: "missing_api_key",
      output: null,
      error: `Missing API key for ${input.provider}`,
    };
  }

  if (input.provider === "mock") {
    return {
      ok: true,
      status: "completed",
      output: {
        provider: "mock",
        action: input.action,
        payload: input.payload,
        message: "Mock execution completed.",
      },
      error: null,
    };
  }

  if (input.provider === "openai") {
    return executeOpenAIAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key || "",
    });
  }

  if (input.provider === "google") {
    return executeGoogleAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key || "",
    });
  }

  if (input.provider === "elevenlabs") {
    return executeElevenLabsAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key || "",
    });
  }

  if (input.provider === "stability") {
    return executeStabilityAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key || "",
    });
  }

  if (input.provider === "higgsfield") {
    return executeHiggsfieldAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key,
      base_url: input.base_url || process.env.HIGGSFIELD_API_URL || null,
    });
  }

  if (input.provider === "twilio") {
    return executeTwilioAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key || "",
    });
  }

  if (SOCIAL_PROVIDERS.includes(input.provider)) {
    return executeSocialAdapter({
      provider: input.provider,
      action: input.action,
      payload: input.payload,
      api_key: input.api_key,
      base_url: input.base_url,
    });
  }

  if (LOGISTICS_PROVIDERS.includes(input.provider)) {
    return executeLogisticsAdapter({
      provider: input.provider,
      action: input.action,
      payload: input.payload,
      api_key: input.api_key,
      base_url: input.base_url,
    });
  }

  if (GENERIC_REST_PROVIDERS.includes(input.provider)) {
    return executeGenericRestAdapter({
      provider: input.provider,
      action: input.action,
      payload: input.payload,
      api_key: input.api_key,
      base_url: input.base_url,
    });
  }

  if (input.provider === "custom_rest_api") {
    return executeCustomAdapter({
      action: input.action,
      payload: input.payload,
      api_key: input.api_key,
      base_url: input.base_url,
    });
  }

  return {
    ok: false,
    status: "failed",
    output: null,
    error: `No live adapter registered for provider: ${input.provider}`,
  };
}
