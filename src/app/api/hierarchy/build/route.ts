import { NextResponse } from "next/server";
import { buildAgentHierarchy } from "@/lib/hierarchy/build-hierarchy";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const hierarchy = await buildAgentHierarchy(body.company_id);

  return NextResponse.json({ hierarchy });
}
