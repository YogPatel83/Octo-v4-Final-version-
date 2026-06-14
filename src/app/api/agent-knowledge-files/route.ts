import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const agentId = new URL(req.url).searchParams.get("agent_id");

  if (!agentId) {
    return NextResponse.json({ error: "Missing agent_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_knowledge_files")
    .select("*")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ files: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  if (!body.agent_id || !body.file_name || !body.file_url) {
    return NextResponse.json(
      { error: "agent_id, file_name, and file_url are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("agent_knowledge_files")
    .insert({
      agent_id: body.agent_id,
      file_name: body.file_name,
      file_url: body.file_url,
      file_type: body.file_type || null,
      status: body.status || "uploaded",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ file: data });
}
