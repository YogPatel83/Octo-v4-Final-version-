import { NextResponse } from "next/server";
import { createDelegationTree } from "@/lib/hierarchy/delegation-tree";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const tree = await createDelegationTree({
    company_id: body.company_id,
    objective: body.objective,
  });

  return NextResponse.json({ tree });
}
