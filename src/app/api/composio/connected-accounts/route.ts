import { NextResponse } from "next/server";
import { getComposioApiKey, getComposioBaseUrl } from "@/lib/composio/composio-client";

export async function GET(req: Request) {
  const entityId = new URL(req.url).searchParams.get("entity_id");
  const apiKey = getComposioApiKey();
  const baseUrl = getComposioBaseUrl();

  const url = entityId
    ? `${baseUrl}/api/v1/connectedAccounts?entity_id=${encodeURIComponent(entityId)}`
    : `${baseUrl}/api/v1/connectedAccounts`;

  const res = await fetch(url, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  return NextResponse.json({
    ok: res.ok,
    status: res.status,
    connected_accounts: data,
  });
}
