# Octo DigitalOcean Worker

## Required env

NEXT_PUBLIC_APP_URL=
OCTO_WORKER_SECRET=

## Setup

npm install
npm install -g pm2
pm2 start deploy/digitalocean/ecosystem.config.cjs
pm2 save
pm2 logs octo-worker
