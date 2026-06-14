import { NextResponse } from "next/server";
import { saveOctoPlan } from "@/lib/builder/save-octo-plan";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.owner_id || !body.objective) {
    return NextResponse.json(
      { error: "owner_id and objective are required." },
      { status: 400 }
    );
  }

  const result = await saveOctoPlan({
    owner_id: body.owner_id,
    objective: body.objective,
    company_name: body.company_name,
    industry: body.industry,
  });

  return NextResponse.json(result);
}
