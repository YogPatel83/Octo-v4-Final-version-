import { NextResponse } from "next/server";
import { checkCompanyPermission } from "@/lib/rbac/check-permission";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.user_id || !body.permission) {
    return NextResponse.json(
      { error: "company_id, user_id, and permission are required." },
      { status: 400 }
    );
  }

  const result = await checkCompanyPermission({
    company_id: body.company_id,
    user_id: body.user_id,
    permission: body.permission,
  });

  return NextResponse.json(result);
}
