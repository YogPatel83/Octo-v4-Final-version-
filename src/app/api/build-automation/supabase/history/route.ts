import { NextResponse } from "next/server";
import { listSupabaseSchemaGenerations } from "@/lib/build-automation/supabase/history";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const schemas = await listSupabaseSchemaGenerations(companyId);

  return NextResponse.json({ schemas });
}
