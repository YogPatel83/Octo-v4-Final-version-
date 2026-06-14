import { NextResponse } from "next/server";
import { buildCompanyOS } from "@/lib/company-os/build-company-os";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await buildCompanyOS({
    company_id: body.company_id,
    objective: body.objective,
  });

  return NextResponse.json(result);
}
