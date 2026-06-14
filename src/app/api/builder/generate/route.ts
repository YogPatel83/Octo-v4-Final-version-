import { NextResponse } from "next/server";
import { generateOctoPlan } from "@/lib/builder/generate-octo-plan";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.objective) {
    return NextResponse.json({ error: "objective is required." }, { status: 400 });
  }

  const plan = generateOctoPlan({
    objective: body.objective,
    company_name: body.company_name,
    industry: body.industry,
  });

  return NextResponse.json({ plan });
}
