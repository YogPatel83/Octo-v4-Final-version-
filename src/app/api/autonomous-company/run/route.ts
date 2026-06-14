import { NextResponse } from "next/server";
import { runAutonomousCompany } from "@/lib/autonomous-company/run-autonomous-company";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const result = await runAutonomousCompany({
    company_id: body.company_id,
    objective: body.objective,
  });

  return NextResponse.json({ autonomous_company: result });
}
