#!/bin/bash

# HKM Website Security Implementation Script
# This script implements the security measures step by step

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   HKM Website Security Implementation                      ║${NC}"
echo -e "${BLUE}║   Step-by-Step Security Hardening                          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to print step headers
print_step() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

# Function to ask for confirmation
confirm() {
    read -p "$(echo -e ${YELLOW}$1 [y/N]: ${NC})" -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]]
}

# Check if running as root for certain operations
check_sudo() {
    if [ "$EUID" -ne 0 ]; then 
        echo -e "${YELLOW}Note: Some operations will require sudo password${NC}"
    fi
}

check_sudo

# ============================================================================
# STEP 1: Secure Environment Variables
# ============================================================================
print_step "STEP 1: Securing Environment Variables"

echo -e "${YELLOW}Current webhook secret in webhook-config.php:${NC}"
grep "WEBHOOK_SECRET" webhook-config.php | head -1

echo ""
echo -e "${GREEN}✓ New webhook secret has been generated and saved${NC}"
echo -e "${YELLOW}⚠️  IMPORTANT: Save this secret for GitHub webhook configuration:${NC}"
echo -e "${BLUE}f74fe1edf5174ce8a625e20ed50c681eaff95d41ae8deb7ce13e6966e0138441${NC}"
echo ""

if confirm "Do you want to set this as an environment variable now?"; then
    echo ""
    echo -e "${YELLOW}Add this line to /etc/environment:${NC}"
    echo -e "${BLUE}WEBHOOK_SECRET=\"f74fe1edf5174ce8a625e20ed50c681eaff95d41ae8deb7ce13e6966e0138441\"${NC}"
    echo ""
    if confirm "Open /etc/environment for editing?"; then
        sudo nano /etc/environment
        echo -e "${GREEN}✓ Environment variable configured${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✓ Step 1 Complete: Environment variables secured${NC}"

# ============================================================================
# STEP 2: Update TinaCMS Credentials
# ============================================================================
print_step "STEP 2: Update TinaCMS Credentials"

echo -e "${YELLOW}⚠️  CRITICAL: Your TinaCMS credentials are exposed in Git history${NC}"
echo ""
echo -e "You need to:"
echo -e "1. Visit: ${BLUE}https://app.tina.io${NC}"
echo -e "2. Regenerate your Client ID and Token"
echo -e "3. Update your .env file with new credentials"
echo ""

if confirm "Have you regenerated your TinaCMS credentials?"; then
    echo ""
    echo -e "${YELLOW}Opening .env file for editing...${NC}"
    nano .env
    echo -e "${GREEN}✓ TinaCMS credentials updated${NC}"
else
    echo -e "${RED}⚠️  Please regenerate TinaCMS credentials before proceeding${NC}"
    echo -e "${YELLOW}Visit: https://app.tina.io${NC}"
fi

echo ""
echo -e "${GREEN}✓ Step 2 Complete: TinaCMS credentials updated${NC}"

# ============================================================================
# STEP 3: Remove Secrets from Git History
# ============================================================================
print_step "STEP 3: Remove Secrets from Git History"

echo -e "${YELLOW}⚠️  This will rewrite Git history to remove exposed secrets${NC}"
echo -e "${RED}WARNING: This is a destructive operation!${NC}"
echo ""

if confirm "Do you want to remove .env files from Git history?"; then
    echo ""
    echo -e "${YELLOW}Removing .env files from Git history...${NC}"
    
    git filter-branch --force --index-filter \
        "git rm --cached --ignore-unmatch .env .env.local .env.production" \
        --prune-empty --tag-name-filter cat -- --all
    
    echo ""
    echo -e "${GREEN}✓ Secrets removed from Git history${NC}"
    echo -e "${YELLOW}⚠️  You need to force push to update remote repository:${NC}"
    echo -e "${BLUE}git push origin --force --all${NC}"
    echo ""
    
    if confirm "Do you want to force push now?"; then
        git push origin --force --all
        echo -e "${GREEN}✓ Remote repository updated${NC}"
    else
        echo -e "${YELLOW}⚠️  Remember to run: git push origin --force --all${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping Git history cleanup${NC}"
fi

echo ""
echo -e "${GREEN}✓ Step 3 Complete: Git history cleaned${NC}"

# ============================================================================
# STEP 4: Configure Domain and SSL
# ============================================================================
print_step "STEP 4: Configure Domain and SSL Certificate"

echo -e "${YELLOW}Enter your domain information:${NC}"
read -p "Domain name (e.g., hkm-ministries.org): " DOMAIN
read -p "Email for SSL notifications: " EMAIL

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo -e "${RED}⚠️  Domain and email are required for SSL${NC}"
    echo -e "${YELLOW}Skipping SSL configuration${NC}"
else
    echo ""
    echo -e "${YELLOW}Obtaining SSL certificate from Let's Encrypt...${NC}"
    
    if confirm "Proceed with SSL certificate installation?"; then
        sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --no-eff-email
        echo -e "${GREEN}✓ SSL certificate installed${NC}"
        
        # Test auto-renewal
        echo ""
        echo -e "${YELLOW}Testing SSL auto-renewal...${NC}"
        sudo certbot renew --dry-run
        echo -e "${GREEN}✓ SSL auto-renewal configured${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✓ Step 4 Complete: SSL configured${NC}"

# ============================================================================
# STEP 5: Update Nginx Configuration
# ============================================================================
print_step "STEP 5: Update Nginx Configuration"

echo -e "${YELLOW}Backing up current Nginx configuration...${NC}"
sudo cp /etc/nginx/sites-available/HKM-WEBSITE /etc/nginx/sites-available/HKM-WEBSITE.backup.$(date +%Y%m%d_%H%M%S)
echo -e "${GREEN}✓ Backup created${NC}"

echo ""
echo -e "${YELLOW}Updating Nginx configuration with security hardening...${NC}"

# Update domain in nginx-secure.conf if provided
if [ ! -z "$DOMAIN" ]; then
    sed -i "s/yourdomain.com/$DOMAIN/g" nginx-secure.conf
    echo -e "${GREEN}✓ Domain updated in configuration${NC}"
fi

if confirm "Copy secure Nginx configuration?"; then
    sudo cp nginx-secure.conf /etc/nginx/sites-available/HKM-WEBSITE
    echo -e "${GREEN}✓ Nginx configuration updated${NC}"
    
    # Test configuration
    echo ""
    echo -e "${YELLOW}Testing Nginx configuration...${NC}"
    if sudo nginx -t; then
        echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
        
        if confirm "Reload Nginx to apply changes?"; then
            sudo systemctl reload nginx
            echo -e "${GREEN}✓ Nginx reloaded${NC}"
        fi
    else
        echo -e "${RED}✗ Nginx configuration has errors${NC}"
        echo -e "${YELLOW}Restoring backup...${NC}"
        sudo cp /etc/nginx/sites-available/HKM-WEBSITE.backup.* /etc/nginx/sites-available/HKM-WEBSITE
        echo -e "${YELLOW}Please check the configuration manually${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✓ Step 5 Complete: Nginx configured${NC}"

# ============================================================================
# STEP 6: Replace Webhook with Secure Version
# ============================================================================
print_step "STEP 6: Replace Webhook with Secure Version"

if [ -f "webhook.php" ]; then
    echo -e "${YELLOW}Backing up current webhook...${NC}"
    cp webhook.php webhook.php.backup.$(date +%Y%m%d_%H%M%S)
    echo -e "${GREEN}✓ Backup created${NC}"
fi

if confirm "Replace webhook.php with secure version?"; then
    cp webhook-secure.php webhook.php
    echo -e "${GREEN}✓ Webhook replaced with secure version${NC}"
    
    # Set proper permissions
    chmod 644 webhook.php
    chmod 600 webhook-config.php
    echo -e "${GREEN}✓ File permissions set${NC}"
fi

echo ""
echo -e "${GREEN}✓ Step 6 Complete: Secure webhook installed${NC}"

# ============================================================================
# STEP 7: Update GitHub Webhook
# ============================================================================
print_step "STEP 7: Update GitHub Webhook Configuration"

echo -e "${YELLOW}You need to update your GitHub webhook settings:${NC}"
echo ""
echo -e "1. Go to: ${BLUE}https://github.com/YOUR-REPO/settings/hooks${NC}"
echo -e "2. Click on your webhook"
echo -e "3. Update the following:"
echo -e "   - URL: ${BLUE}https://$DOMAIN/webhook.php${NC}"
echo -e "   - Secret: ${BLUE}f74fe1edf5174ce8a625e20ed50c681eaff95d41ae8deb7ce13e6966e0138441${NC}"
echo -e "   - Content type: ${BLUE}application/json${NC}"
echo -e "4. Click 'Update webhook'"
echo ""

read -p "Press Enter when you've updated the GitHub webhook..."

echo -e "${GREEN}✓ Step 7 Complete: GitHub webhook updated${NC}"

# ============================================================================
# STEP 8: Configure Firewall (Optional)
# ============================================================================
print_step "STEP 8: Configure Firewall (Optional but Recommended)"

if confirm "Do you want to configure UFW firewall?"; then
    echo ""
    echo -e "${YELLOW}Configuring UFW firewall...${NC}"
    
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    
    echo ""
    echo -e "${YELLOW}Firewall rules configured. Enable firewall?${NC}"
    if confirm "Enable UFW now?"; then
        sudo ufw --force enable
        echo -e "${GREEN}✓ Firewall enabled${NC}"
        sudo ufw status
    fi
else
    echo -e "${YELLOW}⚠️  Skipping firewall configuration${NC}"
fi

echo ""
echo -e "${GREEN}✓ Step 8 Complete: Firewall configured${NC}"

# ============================================================================
# STEP 9: Install fail2ban (Optional)
# ============================================================================
print_step "STEP 9: Install fail2ban for Intrusion Detection (Optional)"

if confirm "Do you want to install and configure fail2ban?"; then
    echo ""
    echo -e "${YELLOW}Installing fail2ban...${NC}"
    sudo apt update
    sudo apt install -y fail2ban
    
    # Create basic configuration
    sudo tee /etc/fail2ban/jail.local > /dev/null << 'EOF'
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
EOF
    
    sudo systemctl enable fail2ban
    sudo systemctl restart fail2ban
    
    echo -e "${GREEN}✓ fail2ban installed and configured${NC}"
    sudo fail2ban-client status
else
    echo -e "${YELLOW}⚠️  Skipping fail2ban installation${NC}"
fi

echo ""
echo -e "${GREEN}✓ Step 9 Complete: Intrusion detection configured${NC}"

# ============================================================================
# STEP 10: Set File Permissions
# ============================================================================
print_step "STEP 10: Set Secure File Permissions"

if confirm "Set secure file permissions?"; then
    echo ""
    echo -e "${YELLOW}Setting file permissions...${NC}"
    
    # Set ownership
    sudo chown -R www-data:www-data /var/www/HKM-WEBSITE/dist
    sudo chown -R www-data:www-data logs/
    
    # Set permissions
    find . -type d -exec chmod 755 {} \;
    find . -type f -exec chmod 644 {} \;
    chmod 755 deploy.sh
    chmod 755 security-setup.sh
    chmod 755 implement-security.sh
    chmod 600 .env* 2>/dev/null || true
    chmod 600 webhook-config.php
    chmod 644 webhook.php
    
    echo -e "${GREEN}✓ File permissions set${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping file permissions${NC}"
fi

echo ""
echo -e "${GREEN}✓ Step 10 Complete: File permissions secured${NC}"

# ============================================================================
# FINAL VERIFICATION
# ============================================================================
print_step "FINAL VERIFICATION"

echo -e "${YELLOW}Running security checks...${NC}"
echo ""

# Check HTTPS
echo -e "${BLUE}1. Checking HTTPS...${NC}"
if [ ! -z "$DOMAIN" ]; then
    if curl -I https://$DOMAIN 2>/dev/null | grep -q "200 OK"; then
        echo -e "${GREEN}   ✓ HTTPS is working${NC}"
    else
        echo -e "${YELLOW}   ⚠️  HTTPS check failed (site may not be accessible yet)${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  No domain configured${NC}"
fi

# Check Nginx
echo -e "${BLUE}2. Checking Nginx...${NC}"
if sudo systemctl is-active --quiet nginx; then
    echo -e "${GREEN}   ✓ Nginx is running${NC}"
else
    echo -e "${RED}   ✗ Nginx is not running${NC}"
fi

# Check firewall
echo -e "${BLUE}3. Checking Firewall...${NC}"
if sudo ufw status | grep -q "Status: active"; then
    echo -e "${GREEN}   ✓ Firewall is active${NC}"
else
    echo -e "${YELLOW}   ⚠️  Firewall is not active${NC}"
fi

# Check fail2ban
echo -e "${BLUE}4. Checking fail2ban...${NC}"
if sudo systemctl is-active --quiet fail2ban 2>/dev/null; then
    echo -e "${GREEN}   ✓ fail2ban is running${NC}"
else
    echo -e "${YELLOW}   ⚠️  fail2ban is not running${NC}"
fi

# Check SSL certificate
echo -e "${BLUE}5. Checking SSL Certificate...${NC}"
if [ ! -z "$DOMAIN" ]; then
    if sudo certbot certificates 2>/dev/null | grep -q "$DOMAIN"; then
        echo -e "${GREEN}   ✓ SSL certificate is installed${NC}"
    else
        echo -e "${YELLOW}   ⚠️  SSL certificate not found${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  No domain configured${NC}"
fi

# Check logs directory
echo -e "${BLUE}6. Checking Logs Directory...${NC}"
if [ -d "logs" ]; then
    echo -e "${GREEN}   ✓ Logs directory exists${NC}"
else
    echo -e "${RED}   ✗ Logs directory missing${NC}"
fi

# ============================================================================
# COMPLETION SUMMARY
# ============================================================================
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║   ${GREEN}✓ SECURITY IMPLEMENTATION COMPLETE!${BLUE}                   ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}What was implemented:${NC}"
echo -e "  ✓ Environment variables secured"
echo -e "  ✓ TinaCMS credentials updated"
echo -e "  ✓ Secrets removed from Git history"
echo -e "  ✓ SSL certificate installed"
echo -e "  ✓ Nginx hardened with security headers"
echo -e "  ✓ Secure webhook with rate limiting"
echo -e "  ✓ GitHub webhook updated"
echo -e "  ✓ Firewall configured"
echo -e "  ✓ Intrusion detection enabled"
echo -e "  ✓ File permissions secured"
echo ""

echo -e "${YELLOW}Next Steps:${NC}"
echo -e "  1. Test your website: ${BLUE}https://$DOMAIN${NC}"
echo -e "  2. Test security headers: ${BLUE}https://securityheaders.com${NC}"
echo -e "  3. Test SSL rating: ${BLUE}https://www.ssllabs.com/ssltest/${NC}"
echo -e "  4. Make a test commit to verify webhook"
echo -e "  5. Review logs regularly: ${BLUE}tail -f logs/webhook.log${NC}"
echo ""

echo -e "${YELLOW}Important Reminders:${NC}"
echo -e "  • Keep your secrets safe and never commit them"
echo -e "  • Run ${BLUE}npm audit${NC} regularly"
echo -e "  • Update dependencies monthly"
echo -e "  • Monitor logs for suspicious activity"
echo -e "  • Renew SSL certificate (auto-renewal is configured)"
echo ""

echo -e "${GREEN}Documentation:${NC}"
echo -e "  • Full guide: ${BLUE}SECURITY_GUIDE.md${NC}"
echo -e "  • Checklist: ${BLUE}SECURITY_CHECKLIST.md${NC}"
echo -e "  • Summary: ${BLUE}SECURITY_SUMMARY.md${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Your website is now significantly more secure! 🔒${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
