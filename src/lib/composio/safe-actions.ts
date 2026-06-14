export const COMPOSIO_HIGH_RISK_ACTION_WORDS = [
  "send",
  "publish",
  "post",
  "delete",
  "payment",
  "transfer",
  "invite",
  "remove",
  "update",
  "create",
];

export function composioActionNeedsApproval(actionSlug: string) {
  const lower = actionSlug.toLowerCase();

  return COMPOSIO_HIGH_RISK_ACTION_WORDS.some((word) => lower.includes(word));
}
