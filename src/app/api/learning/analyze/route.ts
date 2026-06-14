import { NextResponse } from "next/server";
import { analyzeExecutionResults } from "@/lib/learning/analyze-results";

export async function POST(req: Request) {
  const body = await req.json();

  const analysis =
    analyzeExecutionResults({
      completed_tasks:
        body.completed_tasks || 0,
      failed_tasks:
        body.failed_tasks || 0,
      approvals_required:
        body.approvals_required || 0,
    });

  return NextResponse.json({
    analysis,
  });
}
