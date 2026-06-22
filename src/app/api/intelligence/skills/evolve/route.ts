import { NextResponse } from "next/server";
import { evolveGeneratedSkill } from "@/lib/intelligence-expansion/evolution/evolve-skill";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.generated_skill_id) {
    return NextResponse.json(
      { error: "company_id and generated_skill_id are required." },
      { status: 400 }
    );
  }

  const result = await evolveGeneratedSkill({
    company_id: body.company_id,
    generated_skill_id: body.generated_skill_id,
  });

  return NextResponse.json(result);
}
