import { NextResponse } from "next/server";
import { learnCustomerPreferences } from "@/lib/intelligence-expansion/preferences/customer-learning";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await learnCustomerPreferences(body.company_id);

  return NextResponse.json(result);
}
