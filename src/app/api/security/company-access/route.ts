import { NextResponse } from "next/server";
import { userCanAccessCompany } from "@/lib/company/access";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.user_id || !body.company_id) {
    return NextResponse.json(
      { error: "user_id and company_id are required." },
      { status: 400 }
    );
  }

  const result = await userCanAccessCompany({
    user_id: body.user_id,
    company_id: body.company_id,
  });

  return NextResponse.json(result);
}
