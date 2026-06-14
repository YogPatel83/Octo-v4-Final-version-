export const SUPPORTED_TOOL_CATEGORIES = [
  "gmail",
  "slack",
  "notion",
  "google_drive",
  "twitter_x",
  "instagram",
  "discord",
  "telegram",
  "github",
  "stripe",
  "shopify",
  "zapier",
];

export function isSupportedTool(tool: string) {
  return SUPPORTED_TOOL_CATEGORIES.includes(tool);
}
