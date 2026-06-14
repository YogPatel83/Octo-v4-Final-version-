import { NextResponse } from "next/server";
import { resolveComposioAction } from "@/lib/composio/actions/action-map";
import { buildComposioPayload } from "@/lib/composio/actions/build-payload";
import { executeComposioAction } from "@/lib/composio/composio-execute";
import { composioActionNeedsApproval } from "@/lib/composio/safe-actions";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAuditLog } from "@/lib/audit/log";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.tool || !body.action) {
    return NextResponse.json(
      { error: "company_id, tool, and action are required." },
      { status: 400 }
    );
  }

  const actionSlug = resolveComposioAction(body.tool, body.action);

  if (!actionSlug) {
    return NextResponse.json(
      {
        error: "No mapped Composio action found.",
        tool: body.tool,
        action: body.action,
      },
      { status: 404 }
    );
  }

  const needsApproval =
    body.force_approval === true ||
    composioActionNeedsApproval(actionSlug);

  if (needsApproval && body.approved !== true) {
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("approvals")
      .insert({
        company_id: body.company_id,
        title: `Approve ${body.tool}.${body.action}`,
        description: JSON.stringify({
          tool: body.tool,
          action: body.action,
          composio_action_slug: actionSlug,
          payload: body.payload || {},
        }),
        approval_type: "composio_action",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      executed: false,
      requires_approval: true,
      approval: data,
    });
  }

  const result = await executeComposioAction({
    connected_account_id: body.connected_account_id || null,
    entity_id: body.entity_id || null,
    tool_slug: body.tool,
    action_slug: actionSlug,
    arguments: buildComposioPayload({
      tool: body.tool,
      action: body.action,
      payload: body.payload || {},
    }),
  });

  await createAuditLog({
    company_id: body.company_id,
    action: "composio_mapped_action_executed",
    metadata: {
      tool: body.tool,
      action: body.action,
      composio_action_slug: actionSlug,
      result_status: result.status,
    },
  });

  return NextResponse.json({
    executed: result.ok,
    tool: body.tool,
    action: body.action,
    composio_action_slug: actionSlug,
    result,
  });
}
