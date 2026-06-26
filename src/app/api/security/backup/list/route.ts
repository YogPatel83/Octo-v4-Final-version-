import { NextResponse } from "next/server";
import { listCompanyBackups } from "@/lib/security/recovery/company-backup";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const backups = await listCompanyBackups(companyId);

  return NextResponse.json({ backups });
}
