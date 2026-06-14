import { NextResponse } from "next/server";
import { userCanAccessResource } from "@/lib/security/resource-access";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.user_id || !body.table || !body.resource_id) {
    return NextResponse.json(
      { error: "user_id, table, and resource_id are required." },
      { status: 400 }
    );
  }

  const result = await userCanAccessResource({
    user_id: body.user_id,
    table: body.table,
    resource_id: body.resource_id,
    company_field: body.company_field || "company_id",
  });

  return NextResponse.json(result);
}
