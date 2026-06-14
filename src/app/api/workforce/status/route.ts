import { NextResponse } from "next/server";
import { workforceStatus } from "@/lib/workforce/status";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await workforceStatus(body.company_id);

  return NextResponse.json(result);
}
