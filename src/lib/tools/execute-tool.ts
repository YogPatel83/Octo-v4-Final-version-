import { actionNeedsApproval, findTool } from "@/lib/tools/catalog";

export async function executeToolAction(input: {
  tool_name: string;
  action: string;
  payload: Record<string, unknown>;
}) {
  const tool = findTool(input.tool_name);

  if (!tool) {
    return {
      ok: false,
      requires_approval: false,
      message: "Unsupported tool.",
    };
  }

  if (!tool.actions.includes(input.action)) {
    return {
      ok: false,
      requires_approval: false,
      message: "Unsupported tool action.",
    };
  }

  const requiresApproval = actionNeedsApproval(input.tool_name, input.action);

  if (requiresApproval) {
    return {
      ok: false,
      requires_approval: true,
      message: "This tool action requires human approval before execution.",
      tool_name: input.tool_name,
      action: input.action,
      payload: input.payload,
    };
  }

  return {
    ok: true,
    requires_approval: false,
    message: "Tool execution placeholder completed. Real Composio execution will be connected later.",
    tool_name: input.tool_name,
    action: input.action,
    payload: input.payload,
  };
}
