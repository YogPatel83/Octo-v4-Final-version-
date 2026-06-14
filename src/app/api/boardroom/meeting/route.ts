import { NextResponse } from "next/server";
import { runBoardroomMeeting } from "@/lib/boardroom/meeting";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await runBoardroomMeeting({
    objective: body.objective,
    executives: body.executives || []
  });

  return NextResponse.json(result);
}
