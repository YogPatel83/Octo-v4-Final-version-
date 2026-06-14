import { NextResponse } from "next/server";
import { getComposioApiKey, getComposioBaseUrl } from "@/lib/composio/composio-client";

export async function GET() {
  const apiKey = getComposioApiKey();
  const baseUrl = getComposioBaseUrl();

  const res = await fetch(`${baseUrl}/api/v1/tools`, {
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
    tools: data,
  });
}
