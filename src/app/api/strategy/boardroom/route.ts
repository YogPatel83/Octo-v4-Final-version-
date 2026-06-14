import { NextResponse } from "next/server";
import { createStrategy } from "@/lib/strategy/create-strategy";
import { runBoardroomMeeting } from "@/lib/boardroom/meeting";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const strategy = createStrategy({
    company_id: body.company_id,
    objective: body.objective,
    timeframe: body.timeframe || "30_days",
  });

  const boardroom = await runBoardroomMeeting({
    objective: body.objective,
    executives: body.executives || [
      "CEO Agent",
      "Finance Agent",
      "Operations Agent",
      "Marketing Agent",
    ],
  });

  return NextResponse.json({
    strategy,
    boardroom,
  });
}
