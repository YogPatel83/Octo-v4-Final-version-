import { NextResponse } from "next/server";
import { trustDevice } from "@/lib/security/device/device-trust";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.device_id) {
    return NextResponse.json({ error: "device_id is required." }, { status: 400 });
  }

  const device = await trustDevice({
    device_id: body.device_id,
    trusted: Boolean(body.trusted),
  });

  return NextResponse.json({ device });
}
