#!/usr/bin/env bash
set -e

APP_DIR="/opt/octo"

echo "Updating server..."
sudo apt update -y
sudo apt install -y curl git nginx

echo "Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

echo "Installing PM2..."
sudo npm install -g pm2

echo "Creating app directory..."
sudo mkdir -p "$APP_DIR"
sudo chown -R "$USER:$USER" "$APP_DIR"

echo "Copy your repo files into /opt/octo before running start-worker.sh"
echo "DONE: Server base setup complete."
