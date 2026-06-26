import { NextResponse } from "next/server";
import { addBuildDomain } from "@/lib/build-automation/domains/domain-management";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.domain) {
    return NextResponse.json(
      { error: "company_id and domain are required." },
      { status: 400 }
    );
  }

  const domain = await addBuildDomain({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    domain: body.domain,
    provider: body.provider || "vercel",
  });

  return NextResponse.json({ domain });
}
