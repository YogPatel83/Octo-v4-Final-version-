import { NextResponse } from "next/server";
import { analyzeDepartmentIntelligence } from "@/lib/intelligence-expansion/departments/department-intelligence";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await analyzeDepartmentIntelligence(body.company_id);

  return NextResponse.json(result);
}
