import { NextResponse } from "next/server";
import { createWorkforce } from "@/lib/workforce/create-workforce";

export async function POST(req: Request) {
  const body = await req.json();

  const workforce = createWorkforce({
    company_id: body.company_id,
    objective: body.objective,
  });

  return NextResponse.json(workforce);
}
