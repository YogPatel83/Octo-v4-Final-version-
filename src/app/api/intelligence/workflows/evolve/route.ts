import { NextResponse } from "next/server";
import { evolveWorkflow } from "@/lib/intelligence/workflows/evolve-workflow";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.workflow_id) {
    return NextResponse.json(
      { error: "company_id and workflow_id are required." },
      { status: 400 }
    );
  }

  const result = await evolveWorkflow({
    company_id: body.company_id,
    workflow_id: body.workflow_id,
  });

  return NextResponse.json({ report: result });
}
