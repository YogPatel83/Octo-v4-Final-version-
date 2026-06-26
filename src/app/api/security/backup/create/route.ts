import { NextResponse } from "next/server";
import { createCompanyBackup } from "@/lib/security/recovery/company-backup";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const backup = await createCompanyBackup({
    company_id: body.company_id,
    created_by_user_id: body.created_by_user_id || null,
  });

  return NextResponse.json({ backup });
}
