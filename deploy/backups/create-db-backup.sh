#!/usr/bin/env bash
set -e

BACKUP_DIR="${BACKUP_DIR:-/opt/octo/backups}"
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"

mkdir -p "$BACKUP_DIR"

if [ -z "$SUPABASE_DB_URL" ]; then
  echo "Missing SUPABASE_DB_URL"
  exit 1
fi

echo "Creating database backup..."
pg_dump "$SUPABASE_DB_URL" > "$BACKUP_DIR/octo-db-$TIMESTAMP.sql"

gzip "$BACKUP_DIR/octo-db-$TIMESTAMP.sql"

echo "DONE: Backup created at $BACKUP_DIR/octo-db-$TIMESTAMP.sql.gz"
