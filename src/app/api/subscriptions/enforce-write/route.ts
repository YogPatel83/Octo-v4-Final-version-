import { NextResponse } from "next/server";
import { checkCompanyAccess } from "@/lib/subscriptions/access";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id is required." },
      { status: 400 }
    );
  }

  const access = await checkCompanyAccess(body.company_id);

  if (!access.allowed || access.read_only) {
    return NextResponse.json(
      {
        allowed: false,
        read_only: true,
        reason: access.reason,
      },
      { status: 402 }
    );
  }

  return NextResponse.json({
    allowed: true,
    read_only: false,
    reason: access.reason,
  });
}
