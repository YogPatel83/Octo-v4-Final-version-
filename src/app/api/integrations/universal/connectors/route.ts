import { NextResponse } from "next/server";
import {
  createUniversalConnector,
  listUniversalConnectors,
} from "@/lib/integrations/universal/connectors";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const connectors = await listUniversalConnectors(companyId);
  return NextResponse.json({ connectors });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.name) {
    return NextResponse.json({ error: "company_id and name are required." }, { status: 400 });
  }

  const connector = await createUniversalConnector({
    company_id: body.company_id,
    name: body.name,
    connector_type: body.connector_type || "custom",
    auth_type: body.auth_type || "api_key",
    base_url: body.base_url || null,
    config: body.config || {},
    metadata: body.metadata || {},
  });

  return NextResponse.json({ connector });
}
