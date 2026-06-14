import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createSkillVersion } from "@/lib/versions/create-version";

export async function GET(req: Request) {
  const skillId = new URL(req.url).searchParams.get("skill_id");

  if (!skillId) {
    return NextResponse.json({ error: "skill_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("skill_versions")
    .select("*")
    .eq("skill_id", skillId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ versions: data });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.skill_id || !body.snapshot) {
    return NextResponse.json({ error: "skill_id and snapshot are required." }, { status: 400 });
  }

  const version = await createSkillVersion({
    skill_id: body.skill_id,
    version_label: body.version_label,
    snapshot: body.snapshot,
  });

  return NextResponse.json({ version });
}
