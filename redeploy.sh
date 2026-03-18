#!/bin/bash
cd /var/www/maxi-studio
git reset --hard
git pull origin main
npm install
npm run build

# Lancer ou reloader PM2 (zero downtime)
pm2 describe maxi-studio &>/dev/null && pm2 reload maxi-studio || pm2 start /var/www/maxi-studio/.output/server/index.mjs --name maxi-studio
pm2 save
pm2 startup systemd -u $USER_NAME --hp /home/$USER_NAME
