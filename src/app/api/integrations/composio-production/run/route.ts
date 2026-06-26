import { NextResponse } from "next/server";
import { runComposioProductionAction } from "@/lib/integrations/composio-production/run-composio-action";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.action_name) {
    return NextResponse.json(
      { error: "company_id and action_name are required." },
      { status: 400 }
    );
  }

  const result = await runComposioProductionAction({
    company_id: body.company_id,
    connected_account_id: body.connected_account_id || null,
    app_name: body.app_name || null,
    action_name: body.action_name,
    payload: body.payload || {},
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
