# DigitalOcean Worker Deployment

## 1. SSH into droplet

ssh root@YOUR_DROPLET_IP

## 2. Clone repo

mkdir -p /opt/octo
cd /opt/octo
git clone YOUR_GITHUB_REPO_URL .

## 3. Run server setup

bash deploy/digitalocean/setup-worker.sh

## 4. Create env file

cp deploy/digitalocean/.env.production.example .env.production
nano .env.production

Fill values.

## 5. Start worker

bash deploy/digitalocean/start-worker.sh

## 6. Check PM2

pm2 status
pm2 logs octo-worker

## 7. Check worker health

curl http://localhost:8080/health
