import mammoth from "mammoth";
import Papa from "papaparse";

type PdfParseFunction = (buffer: Buffer) => Promise<{
  text?: string;
}>;

export async function extractTextFromBuffer(input: {
  buffer: Buffer;
  file_name: string;
  mime_type?: string;
}) {
  const name = input.file_name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const pdfParseModule = await import("pdf-parse");

    const pdfParse =
      ((pdfParseModule as unknown as { default?: PdfParseFunction }).default ||
        (pdfParseModule as unknown as PdfParseFunction));

    const parsed = await pdfParse(input.buffer);
    return parsed.text || "";
  }

  if (name.endsWith(".docx")) {
    const parsed = await mammoth.extractRawText({
      buffer: input.buffer,
    });

    return parsed.value || "";
  }

  if (name.endsWith(".csv")) {
    const csvText = input.buffer.toString("utf8");
    const parsed = Papa.parse<Record<string, unknown>>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return JSON.stringify(parsed.data, null, 2);
  }

  if (name.endsWith(".txt") || name.endsWith(".md")) {
    return input.buffer.toString("utf8");
  }

  return input.buffer.toString("utf8");
}

export async function extractTextFromUrl(input: {
  file_url: string;
  file_name: string;
  mime_type?: string;
}) {
  const res = await fetch(input.file_url);

  if (!res.ok) {
    throw new Error(`Failed to fetch file: ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();

  return extractTextFromBuffer({
    buffer: Buffer.from(arrayBuffer),
    file_name: input.file_name,
    mime_type: input.mime_type,
  });
}
