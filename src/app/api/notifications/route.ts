import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications/create-notification";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("company_id", companyId)
    .in("action", ["notification", "autopilot_notification"])
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ notifications: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.title || !body.message) {
    return NextResponse.json(
      { error: "company_id, title, and message are required." },
      { status: 400 }
    );
  }

  const notification = await createNotification({
    company_id: body.company_id,
    title: body.title,
    message: body.message,
    type: body.type || "notification",
    metadata: body.metadata || {},
  });

  return NextResponse.json({ notification });
}
