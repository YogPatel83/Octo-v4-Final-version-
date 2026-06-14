import { NextResponse } from "next/server";
import { getCompanyCounts } from "@/lib/usage/counts";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "Missing company_id." }, { status: 400 });
  }

  const counts = await getCompanyCounts(companyId);

  return NextResponse.json({ usage: counts });
}
