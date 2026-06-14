import { NextResponse } from "next/server";
import { getDefaultBucket, getStorageAdmin } from "@/lib/storage/storage-admin";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.file_path) {
    return NextResponse.json({ error: "file_path is required." }, { status: 400 });
  }

  const bucket = body.bucket || getDefaultBucket();
  const storage = getStorageAdmin();

  const { data, error } = await storage
    .from(bucket)
    .createSignedUploadUrl(body.file_path);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    bucket,
    file_path: body.file_path,
    signed_upload: data,
  });
}
