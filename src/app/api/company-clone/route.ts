import { NextResponse } from "next/server";
import { cloneCompany } from "@/lib/company/clone-company";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id required" },
      { status: 400 }
    );
  }

  const result = await cloneCompany(body.company_id);

  return NextResponse.json(result);
}
