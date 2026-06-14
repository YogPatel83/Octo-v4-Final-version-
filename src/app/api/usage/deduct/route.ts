import { NextResponse } from "next/server";
import { deductCredits } from "@/lib/usage/credits";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || typeof body.amount !== "number") {
    return NextResponse.json(
      { error: "company_id and amount are required." },
      { status: 400 }
    );
  }

  const result = await deductCredits({
    company_id: body.company_id,
    amount: body.amount,
  });

  return NextResponse.json(result, {
    status: result.ok ? 200 : 402,
  });
}
