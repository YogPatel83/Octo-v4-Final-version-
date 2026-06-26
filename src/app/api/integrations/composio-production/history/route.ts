import { NextResponse } from "next/server";
import { listComposioExecutionRuns } from "@/lib/integrations/composio-production/history";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const runs = await listComposioExecutionRuns({
    company_id: companyId,
    limit: Number(url.searchParams.get("limit") || 100),
  });

  return NextResponse.json({ runs });
}
