import { NextResponse } from "next/server";
import { COMPOSIO_ACTION_MAP } from "@/lib/composio/actions/action-map";

export async function GET() {
  return NextResponse.json({
    action_map: COMPOSIO_ACTION_MAP,
  });
}
