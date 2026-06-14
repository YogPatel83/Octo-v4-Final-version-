import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeComposioAction } from "@/lib/composio/composio-execute";
import { composioActionNeedsApproval } from "@/lib/composio/safe-actions";
import { createAuditLog } from "@/lib/audit/log";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.tool_slug || !body.action_slug) {
    return NextResponse.json(
      {
        error: "company_id, tool_slug, and action_slug are required.",
      },
      { status: 400 }
    );
  }

  const needsApproval =
    body.force_approval === true ||
    composioActionNeedsApproval(body.action_slug);

  if (needsApproval && body.approved !== true) {
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("approvals")
      .insert({
        company_id: body.company_id,
        title: `Approve ${body.tool_slug}.${body.action_slug}`,
        description: JSON.stringify({
          tool_slug: body.tool_slug,
          action_slug: body.action_slug,
          arguments: body.arguments || {},
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
    tool_slug: body.tool_slug,
    action_slug: body.action_slug,
    arguments: body.arguments || {},
  });

  await createAuditLog({
    company_id: body.company_id,
    action: "composio_action_executed",
    metadata: {
      tool_slug: body.tool_slug,
      action_slug: body.action_slug,
      result_status: result.status,
    },
  });

  return NextResponse.json({
    executed: result.ok,
    result,
  });
}
