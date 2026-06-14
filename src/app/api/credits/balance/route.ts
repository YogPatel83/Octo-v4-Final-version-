import { NextResponse } from "next/server";
import { getCreditBalance } from "@/lib/credits/balance";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const wallet = await getCreditBalance(companyId);

  return NextResponse.json({ wallet });
}
