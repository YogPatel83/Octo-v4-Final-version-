import { NextResponse } from "next/server";
import { runUniversalConnectorAction } from "@/lib/integrations/universal/run-action";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.connector_id || !body.action_id) {
    return NextResponse.json(
      { error: "company_id, connector_id, and action_id are required." },
      { status: 400 }
    );
  }

  const result = await runUniversalConnectorAction({
    company_id: body.company_id,
    connector_id: body.connector_id,
    action_id: body.action_id,
    variables: body.variables || {},
    api_key: body.api_key || null,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
