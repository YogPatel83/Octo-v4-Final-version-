import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    status: "placeholder",
    message: "Real Supabase signed upload URL will be added later.",
    bucket: process.env.SUPABASE_STORAGE_BUCKET || "octo-files",
    file_name: body.file_name,
  });
}
