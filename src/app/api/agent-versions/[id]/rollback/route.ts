import { NextResponse } from "next/server";
import { rollbackAgentVersion } from "@/lib/versions/rollback";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const agent = await rollbackAgentVersion(id);

  return NextResponse.json({ agent });
}
