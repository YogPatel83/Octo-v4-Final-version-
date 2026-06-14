import { NextResponse } from "next/server";
import { processObjectives } from "@/lib/autopilot/objective-engine";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id required" },
      { status: 400 }
    );
  }

  const result = await processObjectives(body.company_id);

  return NextResponse.json(result);
}
