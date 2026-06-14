import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createBuildProject } from "@/lib/build/create-build-project";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_projects")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ projects: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.name || !body.objective) {
    return NextResponse.json(
      { error: "company_id, name, and objective are required." },
      { status: 400 }
    );
  }

  const project = await createBuildProject({
    company_id: body.company_id,
    name: body.name,
    objective: body.objective,
  });

  return NextResponse.json({ project });
}
