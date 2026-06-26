import { NextResponse } from "next/server";
import { learnSupplierPreferences } from "@/lib/intelligence-expansion/preferences/supplier-learning";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await learnSupplierPreferences(body.company_id);

  return NextResponse.json(result);
}
