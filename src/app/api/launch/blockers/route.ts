import { NextResponse } from "next/server";
import { runFinalLaunchCheck } from "@/lib/launch/final-check";

export async function GET() {
  const result = await runFinalLaunchCheck();

  return NextResponse.json({
    blockers: result.blockers
  });
}
