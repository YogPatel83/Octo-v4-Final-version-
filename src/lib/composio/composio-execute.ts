import { getComposioApiKey, getComposioBaseUrl } from "./composio-client";

export async function executeComposioAction(input: {
  connected_account_id?: string | null;
  entity_id?: string | null;
  tool_slug: string;
  action_slug: string;
  arguments: Record<string, unknown>;
}) {
  const apiKey = getComposioApiKey();
  const baseUrl = getComposioBaseUrl();

  const payload = {
    connected_account_id: input.connected_account_id || undefined,
    entity_id: input.entity_id || undefined,
    tool_slug: input.tool_slug,
    action_slug: input.action_slug,
    arguments: input.arguments || {},
  };

  const res = await fetch(`${baseUrl}/api/v1/actions/execute`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  return {
    ok: res.ok,
    status: res.status,
    data,
    payload,
  };
}
