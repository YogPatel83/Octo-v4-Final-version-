import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createObjective } from "@/lib/objectives/create-objective";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("objectives")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ objectives: data });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.title) {
    return NextResponse.json(
      { error: "company_id and title are required." },
      { status: 400 }
    );
  }

  const objective = await createObjective({
    company_id: body.company_id,
    title: body.title,
    description: body.description || null,
    timeframe: body.timeframe || "90_days",
    status: body.status || "active",
    metadata: body.metadata || {},
  });

  return NextResponse.json({ objective });
}
