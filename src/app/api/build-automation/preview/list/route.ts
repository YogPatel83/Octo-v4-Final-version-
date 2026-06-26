import { NextResponse } from "next/server";
import { listPreviewEnvironments } from "@/lib/build-automation/preview/preview-environment";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const previews = await listPreviewEnvironments(companyId);

  return NextResponse.json({ previews });
}
