import { actionNeedsApproval } from "@/lib/tools/catalog";

export async function routeComposioAction(input: {
  agent_id: string;
  tool_name: string;
  action: string;
  payload: Record<string, unknown>;
}) {
  const requiresApproval = actionNeedsApproval(input.tool_name, input.action);

  if (requiresApproval) {
    return {
      ok: false,
      requires_approval: true,
      message: "Composio action blocked until human approval.",
      ...input,
    };
  }

  if (!process.env.COMPOSIO_API_KEY) {
    return {
      ok: false,
      requires_approval: false,
      message: "COMPOSIO_API_KEY missing. Add it to environment variables.",
      ...input,
    };
  }

  return {
    ok: true,
    requires_approval: false,
    message: "Composio action placeholder routed. Real Composio SDK call will be added after OAuth app setup.",
    ...input,
  };
}
