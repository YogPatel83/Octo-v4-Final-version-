import { NextResponse } from "next/server";
import { evolveCompany } from "@/lib/evolution/evolve-company";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id required" },
      { status: 400 }
    );
  }

  const result =
    await evolveCompany(body.company_id);

  return NextResponse.json({
    evolution: result
  });
}
