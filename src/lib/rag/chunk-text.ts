export function chunkText(text: string, chunkSize = 1200) {
  const clean = text.replace(/\s+/g, " ").trim();
  const chunks: string[] = [];

  for (let i = 0; i < clean.length; i += chunkSize) {
    chunks.push(clean.slice(i, i + chunkSize));
  }

  return chunks.filter(Boolean);
}
