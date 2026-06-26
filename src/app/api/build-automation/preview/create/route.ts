import { NextResponse } from "next/server";
import { createPreviewEnvironment } from "@/lib/build-automation/preview/preview-environment";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.preview_url) {
    return NextResponse.json(
      { error: "company_id and preview_url are required." },
      { status: 400 }
    );
  }

  const preview = await createPreviewEnvironment({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    deployment_id: body.deployment_id || null,
    preview_url: body.preview_url,
    expires_at: body.expires_at || null,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ preview });
}
