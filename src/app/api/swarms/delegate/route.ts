import { NextResponse } from "next/server";
import { delegateTask } from "@/lib/swarms/delegate-task";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.task_id) {
    return NextResponse.json(
      { error: "task_id required" },
      { status: 400 }
    );
  }

  const result = await delegateTask(body.task_id);

  return NextResponse.json(result);
}
