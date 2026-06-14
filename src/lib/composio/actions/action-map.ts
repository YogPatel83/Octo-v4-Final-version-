export const COMPOSIO_ACTION_MAP = {
  gmail: {
    send_email: "GMAIL_SEND_EMAIL",
    draft_email: "GMAIL_CREATE_EMAIL_DRAFT",
    read_email: "GMAIL_FETCH_EMAILS",
  },
  slack: {
    send_message: "SLACK_SENDS_A_MESSAGE_TO_A_SLACK_CHANNEL",
    read_channel: "SLACK_FETCH_CONVERSATION_HISTORY",
  },
  discord: {
    send_message: "DISCORD_SEND_MESSAGE",
  },
  notion: {
    create_page: "NOTION_CREATE_PAGE",
    update_page: "NOTION_UPDATE_PAGE",
    read_page: "NOTION_FETCH_PAGE",
  },
  google_drive: {
    read_file: "GOOGLEDRIVE_GET_FILE",
    upload_file: "GOOGLEDRIVE_UPLOAD_FILE",
    search_files: "GOOGLEDRIVE_SEARCH_FILES",
  },
  twitter_x: {
    create_post: "TWITTER_CREATION_OF_A_POST",
    read_profile: "TWITTER_GET_USER_BY_USERNAME",
  },
  instagram: {
    create_post: "INSTAGRAM_CREATE_MEDIA",
    publish_post: "INSTAGRAM_PUBLISH_MEDIA",
  },
  whatsapp: {
    send_message: "WHATSAPP_SEND_MESSAGE",
  },
} as const;

export type OctoToolName = keyof typeof COMPOSIO_ACTION_MAP;

export function resolveComposioAction(tool: string, action: string) {
  const toolMap = COMPOSIO_ACTION_MAP[tool as OctoToolName];

  if (!toolMap) return null;

  return (toolMap as Record<string, string>)[action] || null;
}
