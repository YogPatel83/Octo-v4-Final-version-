import { NextResponse } from "next/server";
import { createOAuthConnectionRequest } from "@/lib/integrations/oauth/oauth-request";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.provider) {
    return NextResponse.json(
      { error: "company_id and provider are required." },
      { status: 400 }
    );
  }

  const request = await createOAuthConnectionRequest({
    company_id: body.company_id,
    provider: body.provider,
    connection_name: body.connection_name || null,
    scopes: body.scopes || [],
    auth_url: body.auth_url || null,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ request });
}
