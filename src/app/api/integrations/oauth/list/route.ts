import { NextResponse } from "next/server";
import { listOAuthConnectionRequests } from "@/lib/integrations/oauth/oauth-request";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const requests = await listOAuthConnectionRequests(companyId);

  return NextResponse.json({ requests });
}
