import { NextResponse } from "next/server";
import { restoreCompanyBackup } from "@/lib/security/recovery/company-backup";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.backup_id) {
    return NextResponse.json({ error: "backup_id is required." }, { status: 400 });
  }

  const result = await restoreCompanyBackup({
    backup_id: body.backup_id,
    restored_by_user_id: body.restored_by_user_id || null,
    restore_notes: body.restore_notes || null,
  });

  return NextResponse.json(result);
}
