import { NextResponse } from "next/server";
import { runCompanyCycle } from "@/lib/autopilot/run-company-cycle";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id is required." },
      { status: 400 }
    );
  }

  const result = await runCompanyCycle(body.company_id);

  return NextResponse.json({
    autopilot: result,
  });
}
