import { NextResponse } from "next/server";
import { runCrossProjectLearning } from "@/lib/intelligence-expansion/cross-project-learning";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const report = await runCrossProjectLearning(body.company_id);

  return NextResponse.json({ report });
}
