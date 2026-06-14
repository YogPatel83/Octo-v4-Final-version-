import { NextResponse } from "next/server";
import { createExportRequest } from "@/lib/enterprise/export-request";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await createExportRequest({
    company_id: body.company_id,
    requested_by: body.requested_by || null,
    export_type: body.export_type || "full_company_export",
  });

  return NextResponse.json(result);
}
