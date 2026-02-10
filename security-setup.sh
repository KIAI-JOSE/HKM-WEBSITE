#!/bin/bash

# HKM Website Security Setup Script
# Run this script to implement security measures

set -e

echo "🔒 HKM Website Security Setup"
echo "=============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing required packages...${NC}"
apt update
apt install -y ufw fail2ban certbot python3-certbot-nginx

echo -e "${GREEN}✓ Packages installed${NC}"
echo ""

echo -e "${YELLOW}Step 2: Configuring firewall (UFW)...${NC}"
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo -e "${GREEN}✓ Firewall configured${NC}"
echo ""

echo -e "${YELLOW}Step 3: Setting up fail2ban...${NC}"
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10

[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
EOF

systemctl enable fail2ban
systemctl restart fail2ban

echo -e "${GREEN}✓ Fail2ban configured${NC}"
echo ""

echo -e "${YELLOW}Step 4: Creating log directory...${NC}"
mkdir -p /var/www/HKM-WEBSITE/logs
chown -R www-data:www-data /var/www/HKM-WEBSITE/logs
chmod 755 /var/www/HKM-WEBSITE/logs

echo -e "${GREEN}✓ Log directory created${NC}"
echo ""

echo -e "${YELLOW}Step 5: Setting up log rotation...${NC}"
cat > /etc/logrotate.d/hkm-website << 'EOF'
/var/www/HKM-WEBSITE/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        systemctl reload nginx > /dev/null 2>&1 || true
    endscript
}
EOF

echo -e "${GREEN}✓ Log rotation configured${NC}"
echo ""

echo -e "${YELLOW}Step 6: Securing file permissions...${NC}"
chown -R www-data:www-data /var/www/HKM-WEBSITE
find /var/www/HKM-WEBSITE -type d -exec chmod 755 {} \;
find /var/www/HKM-WEBSITE -type f -exec chmod 644 {} \;
chmod 755 /var/www/HKM-WEBSITE/deploy.sh
chmod 600 /var/www/HKM-WEBSITE/.env*
chmod 600 /var/www/HKM-WEBSITE/webhook-config.php

echo -e "${GREEN}✓ File permissions secured${NC}"
echo ""

echo -e "${YELLOW}Step 7: Configuring automatic security updates...${NC}"
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

echo -e "${GREEN}✓ Automatic updates enabled${NC}"
echo ""

echo -e "${YELLOW}Step 8: Hardening SSH (optional)...${NC}"
read -p "Do you want to harden SSH configuration? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Backup original config
    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
    
    # Apply hardening
    sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
    
    echo -e "${GREEN}✓ SSH hardened (root login disabled, password auth disabled)${NC}"
    echo -e "${YELLOW}⚠️  Make sure you have SSH key access before restarting SSH!${NC}"
    
    read -p "Restart SSH now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        systemctl restart sshd
        echo -e "${GREEN}✓ SSH restarted${NC}"
    fi
fi
echo ""

echo -e "${YELLOW}Step 9: Setting up SSL certificate...${NC}"
read -p "Enter your domain name (e.g., example.com): " DOMAIN
if [ ! -z "$DOMAIN" ]; then
    read -p "Enter your email for SSL notifications: " EMAIL
    if [ ! -z "$EMAIL" ]; then
        certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --no-eff-email
        echo -e "${GREEN}✓ SSL certificate installed${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping SSL setup (no email provided)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping SSL setup (no domain provided)${NC}"
fi
echo ""

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Security Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Generate new API keys and secrets"
echo "2. Update .env file with new credentials"
echo "3. Set WEBHOOK_SECRET environment variable"
echo "4. Replace webhook.php with webhook-secure.php"
echo "5. Update nginx config with nginx-secure.conf"
echo "6. Run: npm audit fix"
echo "7. Test your website thoroughly"
echo ""
echo -e "${YELLOW}Important Commands:${NC}"
echo "- Check firewall status: sudo ufw status"
echo "- Check fail2ban status: sudo fail2ban-client status"
echo "- View banned IPs: sudo fail2ban-client status sshd"
echo "- Check SSL certificate: sudo certbot certificates"
echo "- Renew SSL: sudo certbot renew --dry-run"
echo ""
echo -e "${GREEN}Stay secure! 🔒${NC}"
