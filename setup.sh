#!/bin/bash
set -e

echo "🚀 Début de l'installation du serveur Nuxt"

# -----------------------------
# 1. Mise à jour et install de base
# -----------------------------
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx build-essential
sudo apt install certbot python3-certbot-nginx
# -----------------------------
# 2. Installer Node via NVM
# -----------------------------
echo "🌱 Installation de Node.js via NVM"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20
node -v
npm -v

# -----------------------------
# 3. Installer PM2
# -----------------------------
echo "🛡 Installation de PM2"
npm install -g pm2

# -----------------------------
# 4. Déployer le projet depuis Git
# -----------------------------
echo "📂 Clonage du projet Nuxt"
cd /var/www || sudo mkdir -p /var/www
sudo chown $USER:$USER /var/www
cd /var/www

if [ ! -d "maxi-studio" ]; then
    git clone git@github.com:ArvalF/maxi-studio.git maxi-studio
fi

cd maxi-studio
git reset --hard
git pull origin main

# -----------------------------
# 5. Installer dépendances et build
# -----------------------------
echo "📦 Installation des dépendances et build Nuxt"
npm install
npm run build

# -----------------------------
# 6. Lancer l'application avec PM2
# -----------------------------
echo "🚀 Lancement de Nuxt avec PM2"
pm2 start .output/server/index.mjs --name maxi-studio || pm2 restart maxi-studio
pm2 save
pm2 startup

# -----------------------------
# 7. Configurer Nginx
# -----------------------------
echo "🌐 Configuration Nginx pour Nuxt"
sudo tee /etc/nginx/sites-available/maxi-studio >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80; 
    server_name maxistudio.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
sudo certbot --nginx -d maxistudio.fr

#  doit ajouter pour gérer l'IPV6 
# listen 443 ssl;
# listen [::]:443 ssl;

sudo ln -sf /etc/nginx/sites-available/maxi-studio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo "✅ Installation terminée ! Ton site devrait être accessible sur http://TON_DOMAINE"