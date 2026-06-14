import { NextResponse } from "next/server";
import { resumeAfterApproval } from "@/lib/approvals/resume-after-approval";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const result = await resumeAfterApproval({
    approval_id: id,
  });

  return NextResponse.json(result);
}
