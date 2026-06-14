import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createBuildRun } from "@/lib/build/create-build-run";

export async function GET(req: Request) {
  const projectId = new URL(req.url).searchParams.get("build_project_id");

  if (!projectId) {
    return NextResponse.json({ error: "build_project_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_runs")
    .select("*")
    .eq("build_project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ runs: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.build_project_id || !body.action) {
    return NextResponse.json(
      { error: "company_id, build_project_id, and action are required." },
      { status: 400 }
    );
  }

  const run = await createBuildRun({
    company_id: body.company_id,
    build_project_id: body.build_project_id,
    action: body.action,
    input: body.input || {},
  });

  return NextResponse.json({ run });
}
