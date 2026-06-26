import { NextResponse } from "next/server";
import { generateSupabaseSchema } from "@/lib/build-automation/supabase/generate-schema";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const result = await generateSupabaseSchema({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    objective: body.objective,
    requirements: body.requirements || {},
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
