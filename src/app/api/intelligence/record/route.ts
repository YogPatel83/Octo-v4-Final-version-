import { NextResponse } from "next/server";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";
import { recordDecisionMemory } from "@/lib/intelligence/decision-memory";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.type) {
    return NextResponse.json(
      { error: "company_id and type are required." },
      { status: 400 }
    );
  }

  if (body.type === "decision") {
    const decision = await recordDecisionMemory({
      company_id: body.company_id,
      decision_type: body.decision_type || "general",
      user_choice: body.user_choice,
      rejected_choice: body.rejected_choice || null,
      reason: body.reason || null,
      confidence: body.confidence || 50,
      metadata: body.metadata || {},
    });

    return NextResponse.json({ decision });
  }

  const event = await recordIntelligenceEvent({
    company_id: body.company_id,
    source_table: body.source_table || null,
    source_id: body.source_id || null,
    event_type: body.event_type || body.type,
    title: body.title || null,
    summary: body.summary || null,
    sentiment: body.sentiment || null,
    outcome: body.outcome || null,
    importance: body.importance || 50,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ event });
}
