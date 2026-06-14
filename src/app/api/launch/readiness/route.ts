import { NextResponse } from "next/server";
import { runLaunchChecks } from "@/lib/launch/checks";

export async function GET() {
  const checks = await runLaunchChecks();

  return NextResponse.json(checks, {
    status: checks.ready_for_frontend_integration ? 200 : 503,
  });
}
