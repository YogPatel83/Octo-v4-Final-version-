export const TOOL_CATALOG = [
  {
    name: "gmail",
    label: "Gmail",
    actions: ["send_email", "read_email", "draft_email"],
    approval_required_actions: ["send_email"],
  },
  {
    name: "slack",
    label: "Slack",
    actions: ["send_message", "read_channel"],
    approval_required_actions: ["send_message"],
  },
  {
    name: "notion",
    label: "Notion",
    actions: ["create_page", "update_page", "read_page"],
    approval_required_actions: [],
  },
  {
    name: "twitter_x",
    label: "X / Twitter",
    actions: ["draft_post", "publish_post"],
    approval_required_actions: ["publish_post"],
  },
  {
    name: "instagram",
    label: "Instagram",
    actions: ["draft_post", "publish_post"],
    approval_required_actions: ["publish_post"],
  },
  {
    name: "google_drive",
    label: "Google Drive",
    actions: ["read_file", "create_file", "update_file"],
    approval_required_actions: ["update_file"],
  },
  {
    name: "github",
    label: "GitHub",
    actions: ["create_issue", "read_repo", "create_pr"],
    approval_required_actions: ["create_pr"],
  },
];

export function findTool(toolName: string) {
  return TOOL_CATALOG.find((tool) => tool.name === toolName);
}

export function actionNeedsApproval(toolName: string, action: string) {
  const tool = findTool(toolName);
  return Boolean(tool?.approval_required_actions.includes(action));
}
