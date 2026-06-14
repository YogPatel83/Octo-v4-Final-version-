import { NextResponse } from "next/server";
import { companyHealth } from "@/lib/company-os/company-health";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await companyHealth(body.company_id);

  return NextResponse.json(result);
}
