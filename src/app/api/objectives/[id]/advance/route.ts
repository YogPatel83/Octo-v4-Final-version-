import { NextResponse } from "next/server";
import { advanceObjective } from "@/lib/objectives/advance-objective";

export async function POST(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await advanceObjective(id);

  return NextResponse.json({ advancement: result });
}
