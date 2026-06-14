export function getComposioApiKey() {
  const key = process.env.COMPOSIO_API_KEY;

  if (!key) {
    throw new Error("COMPOSIO_API_KEY is missing.");
  }

  return key;
}

export function getComposioBaseUrl() {
  return process.env.COMPOSIO_BASE_URL || "https://backend.composio.dev";
}
