import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { buildKnowledgeRelationships } from "@/lib/knowledge/relationships";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createSupabaseAdmin();

  const { data: memories } =
    await supabase
      .from("memory_entries")
      .select("*")
      .eq("company_id", body.company_id);

  const relationships =
    buildKnowledgeRelationships(
      memories || []
    );

  return NextResponse.json({
    relationships,
  });
}
