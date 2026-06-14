import { NextResponse } from "next/server";
import { resolveComposioAction } from "@/lib/composio/actions/action-map";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.tool || !body.action) {
    return NextResponse.json(
      { error: "tool and action are required." },
      { status: 400 }
    );
  }

  const actionSlug = resolveComposioAction(body.tool, body.action);

  if (!actionSlug) {
    return NextResponse.json(
      {
        ok: false,
        error: "No mapped Composio action found for this tool/action.",
        tool: body.tool,
        action: body.action,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    tool: body.tool,
    action: body.action,
    composio_action_slug: actionSlug,
    note: "Mapping found. Real execution uses /api/composio/execute-mapped.",
  });
}
