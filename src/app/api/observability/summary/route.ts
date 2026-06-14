import { NextResponse } from "next/server";
import { getObservabilitySummary } from "@/lib/observability/summary";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const summary = await getObservabilitySummary(companyId);

  return NextResponse.json({ summary });
}
