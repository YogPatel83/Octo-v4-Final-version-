import { NextResponse } from "next/server";
import { scanFileSecurity } from "@/lib/security/file-scan/scan-file";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.file_name) {
    return NextResponse.json(
      { error: "company_id and file_name are required." },
      { status: 400 }
    );
  }

  const result = await scanFileSecurity({
    company_id: body.company_id,
    file_id: body.file_id || null,
    file_name: body.file_name,
    mime_type: body.mime_type || null,
    size_bytes: body.size_bytes || null,
    extracted_text: body.extracted_text || null,
  });

  return NextResponse.json(result, { status: result.allowed ? 200 : 400 });
}
