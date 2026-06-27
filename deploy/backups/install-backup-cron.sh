#!/usr/bin/env bash
set -e

APP_DIR="${APP_DIR:-/opt/octo}"
CRON_FILE="/tmp/octo-backup-cron"

cat > "$CRON_FILE" <<CRON
0 3 * * * cd $APP_DIR && /bin/bash deploy/backups/create-db-backup.sh >> /opt/octo/backups/backup.log 2>&1
CRON

crontab "$CRON_FILE"
rm "$CRON_FILE"

echo "DONE: Daily 3AM backup cron installed."
