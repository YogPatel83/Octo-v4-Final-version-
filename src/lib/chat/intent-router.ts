export function detectChatIntent(message: string) {
  const text = message.toLowerCase();

  if (
    text.includes("build me") ||
    text.includes("create company") ||
    text.includes("start company")
  ) {
    return "builder";
  }

  if (
    text.includes("generate image") ||
    text.includes("create image") ||
    text.includes("logo") ||
    text.includes("render")
  ) {
    return "generate_image";
  }

  if (
    text.includes("generate video") ||
    text.includes("create video") ||
    text.includes("launch video")
  ) {
    return "generate_video";
  }

  if (
    text.includes("supplier") ||
    text.includes("source parts") ||
    text.includes("find vendor")
  ) {
    return "supplier_task";
  }

  if (
    text.includes("finance") ||
    text.includes("budget") ||
    text.includes("roi")
  ) {
    return "finance_task";
  }

  if (
    text.includes("employee") ||
    text.includes("notice") ||
    text.includes("announcement")
  ) {
    return "employee_notice";
  }

  return "general_task";
}
