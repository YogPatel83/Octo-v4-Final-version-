import { NextResponse } from "next/server";
import { orchestrateCompany } from "@/lib/orchestrator/orchestrate";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective required" },
      { status: 400 }
    );
  }

  const result = await orchestrateCompany({
    company_id: body.company_id,
    objective: body.objective
  });

  return NextResponse.json(result);
}
