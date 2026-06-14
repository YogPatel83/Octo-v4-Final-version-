import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/credits/deduct";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.action || !body.source) {
    return NextResponse.json(
      { error: "company_id, action, and source are required." },
      { status: 400 }
    );
  }

  const result = await deductCredits({
    company_id: body.company_id,
    action: body.action,
    source: body.source,
    source_id: body.source_id || null,
    byok_used: body.byok_used || false,
    metadata: body.metadata || {},
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 402 });
}
