import { NextResponse } from "next/server";
import { resolveDataResidency } from "@/lib/enterprise/data-residency";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = resolveDataResidency({
    company_id: body.company_id,
    requested_region: body.requested_region || "GLOBAL",
  });

  return NextResponse.json({ data_residency: result });
}
