import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createChatAction } from "@/lib/chat/create-chat-action";

export async function POST(req: Request) {
  const user = await requireAuth(req);
  const body = await req.json();

  if (!body.message) {
    return NextResponse.json(
      { error: "message is required." },
      { status: 400 }
    );
  }

  const action = await createChatAction({
    user_id: user.id,
    company_id: body.company_id || null,
    message: body.message,
  });

  const supabase = createSupabaseAdmin();

  if (body.company_id) {
    await supabase.from("memory_entries").insert({
      company_id: body.company_id,
      title: "Chat message",
      content: body.message,
      metadata: {
        intent: action.intent,
        response: action.response,
        source: "chat",
      },
    });
  }

  return NextResponse.json({
    message: body.message,
    action,
  });
}
