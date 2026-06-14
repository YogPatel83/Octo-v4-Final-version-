import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createSupabaseAdmin();

  const { data } =
    await supabase
      .from("memory_entries")
      .select("*")
      .eq("company_id", body.company_id)
      .limit(100);

  return NextResponse.json({
    company_id: body.company_id,
    memories_analyzed:
      data?.length || 0,
    insights: [
      "Most frequent knowledge cluster detected.",
      "High value memories identified.",
      "Suggested workflow optimization available."
    ]
  });
}
