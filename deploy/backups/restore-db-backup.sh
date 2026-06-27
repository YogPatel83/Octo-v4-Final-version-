#!/usr/bin/env bash
set -e

if [ -z "$SUPABASE_DB_URL" ]; then
  echo "Missing SUPABASE_DB_URL"
  exit 1
fi

if [ -z "$BACKUP_FILE" ]; then
  echo "Missing BACKUP_FILE"
  echo "Example: BACKUP_FILE=/opt/octo/backups/octo-db.sql.gz ./restore-db-backup.sh"
  exit 1
fi

echo "WARNING: This restores a database backup."
echo "This can overwrite current production data."
echo "Type RESTORE to continue:"
read CONFIRM

if [ "$CONFIRM" != "RESTORE" ]; then
  echo "Restore cancelled."
  exit 0
fi

if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_FILE" | psql "$SUPABASE_DB_URL"
else
  psql "$SUPABASE_DB_URL" < "$BACKUP_FILE"
fi

echo "DONE: Restore completed."
