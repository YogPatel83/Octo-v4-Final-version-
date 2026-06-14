import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { saveOctoPlan } from "@/lib/builder/save-octo-plan";

export async function POST(req: Request) {
  const user = await requireAuth(req);
  const body = await req.json();

  if (!body.objective) {
    return NextResponse.json(
      { error: "objective is required." },
      { status: 400 }
    );
  }

  const result = await saveOctoPlan({
    owner_id: user.id,
    objective: body.objective,
    company_name: body.company_name,
    industry: body.industry,
  });

  return NextResponse.json(result);
}
