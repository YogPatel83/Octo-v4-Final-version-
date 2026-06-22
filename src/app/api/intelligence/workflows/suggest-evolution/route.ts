import { NextResponse } from "next/server";
import { suggestWorkflowEvolution } from "@/lib/intelligence-expansion/evolution/suggest-workflow-evolution";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.workflow_id) {
    return NextResponse.json(
      { error: "company_id and workflow_id are required." },
      { status: 400 }
    );
  }

  const result = await suggestWorkflowEvolution({
    company_id: body.company_id,
    workflow_id: body.workflow_id,
  });

  return NextResponse.json(result);
}
