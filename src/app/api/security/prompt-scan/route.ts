import { NextResponse } from "next/server";
import { scanPromptForInjection } from "@/lib/security/prompt-injection";
import { createSecurityEvent } from "@/lib/security/security-events";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.text) {
    return NextResponse.json({ error: "text is required." }, { status: 400 });
  }

  const result = scanPromptForInjection(body.text);

  if (!result.safe) {
    await createSecurityEvent({
      company_id: body.company_id || null,
      user_id: body.user_id || null,
      event_type: "prompt_injection_detected",
      severity: "high",
      message: result.message,
      metadata: {
        matches: result.matches,
      },
    });
  }

  return NextResponse.json(result, { status: result.safe ? 200 : 400 });
}
