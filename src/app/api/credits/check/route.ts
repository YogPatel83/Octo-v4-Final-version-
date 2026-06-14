import { NextResponse } from "next/server";
import { checkCredits } from "@/lib/credits/deduct";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.action) {
    return NextResponse.json(
      { error: "company_id and action are required." },
      { status: 400 }
    );
  }

  const result = await checkCredits({
    company_id: body.company_id,
    action: body.action,
    byok_used: body.byok_used || false,
  });

  if (!result.allowed) {
    return NextResponse.json(
      {
        ...result,
        message:
          "You’re out of credits. New work is paused until you upgrade, buy credits, or add your own API key.",
      },
      { status: 402 }
    );
  }

  return NextResponse.json(result);
}
