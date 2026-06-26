import { NextResponse } from "next/server";
import { markSupabaseSchemaApplied } from "@/lib/build-automation/supabase/mark-applied";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.schema_generation_id) {
    return NextResponse.json(
      { error: "company_id and schema_generation_id are required." },
      { status: 400 }
    );
  }

  const schema = await markSupabaseSchemaApplied({
    company_id: body.company_id,
    schema_generation_id: body.schema_generation_id,
    applied_by_user_id: body.applied_by_user_id || null,
  });

  return NextResponse.json({ schema });
}
