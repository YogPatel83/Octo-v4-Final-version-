#!/usr/bin/env bash
set -e

APP_DIR="/opt/octo"

cd "$APP_DIR"

if [ ! -f "$APP_DIR/.env.production" ]; then
  echo "Missing $APP_DIR/.env.production"
  echo "Create it from deploy/digitalocean/.env.production.example"
  exit 1
fi

set -a
source "$APP_DIR/.env.production"
set +a

pm2 start "$APP_DIR/deploy/digitalocean/ecosystem.config.cjs"
pm2 save
pm2 startup systemd -u "$USER" --hp "$HOME" || true

echo "DONE: Octo worker started with PM2."
pm2 status
