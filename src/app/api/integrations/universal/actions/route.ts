import { NextResponse } from "next/server";
import {
  createUniversalConnectorAction,
  listUniversalConnectorActions,
} from "@/lib/integrations/universal/actions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const actions = await listUniversalConnectorActions({
    company_id: companyId,
    connector_id: url.searchParams.get("connector_id"),
  });

  return NextResponse.json({ actions });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.connector_id || !body.name || !body.path) {
    return NextResponse.json(
      { error: "company_id, connector_id, name, and path are required." },
      { status: 400 }
    );
  }

  const action = await createUniversalConnectorAction({
    company_id: body.company_id,
    connector_id: body.connector_id,
    name: body.name,
    method: body.method || "POST",
    path: body.path,
    headers: body.headers || {},
    body_template: body.body_template || {},
  });

  return NextResponse.json({ action });
}
