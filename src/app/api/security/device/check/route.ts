import { NextResponse } from "next/server";
import { checkDeviceTrust } from "@/lib/security/device/device-trust";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await checkDeviceTrust({
    user_id: body.user_id || null,
    company_id: body.company_id || null,
    ip_address: body.ip_address || req.headers.get("x-forwarded-for") || null,
    user_agent: body.user_agent || req.headers.get("user-agent") || null,
    device_name: body.device_name || null,
  });

  return NextResponse.json(result);
}
