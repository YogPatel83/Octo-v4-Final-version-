import { NextResponse } from "next/server";
import { generateSkillFromCompanyLearning } from "@/lib/intelligence/skills/generate-skill";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await generateSkillFromCompanyLearning({
    company_id: body.company_id,
    objective: body.objective || null,
  });

  return NextResponse.json(result);
}
