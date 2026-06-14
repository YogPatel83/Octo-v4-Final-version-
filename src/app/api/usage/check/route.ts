import { NextResponse } from "next/server";
import { getWallet } from "@/lib/usage/credits";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const wallet = await getWallet(body.company_id);

  return NextResponse.json({
    company_id: body.company_id,
    wallet,
    has_credits: (wallet?.balance || 0) > 0,
  });
}
