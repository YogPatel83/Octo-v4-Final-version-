import { NextResponse } from "next/server";
import { checkCompanyAccess } from "@/lib/subscriptions/access";

export async function GET(req: Request) {
  const companyId =
    new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json(
      { error: "company_id is required." },
      { status: 400 }
    );
  }

  const result =
    await checkCompanyAccess(companyId);

  return NextResponse.json(result);
}
