import { NextResponse } from "next/server";
import { rollbackSkillVersion } from "@/lib/versions/rollback";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const skill = await rollbackSkillVersion(id);

  return NextResponse.json({ skill });
}
