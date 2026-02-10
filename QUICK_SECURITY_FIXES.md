# Quick Security Fixes (30 Minutes)

## 🚀 Start Here - Most Critical Issues

### 1. Remove Secrets from Git (5 min)
```bash
cd HKM-WEBSITE

# Remove from git tracking
git rm --cached .env .env.local .env.production

# Commit the removal
git commit -m "Remove sensitive environment files"
git push

# Clean git history (IMPORTANT!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env .env.local .env.production" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

### 2. Regenerate All Secrets (5 min)
```bash
# Generate new webhook secret
openssl rand -hex 32

# Copy .env.example to .env
cp .env.example .env

# Edit with your new secrets
nano .env
```

**Get new TinaCMS credentials:**
- Visit: https://app.tina.io
- Regenerate Client ID and Token
- Update in .env file

### 3. Enable HTTPS (10 min)
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 4. Update Nginx Config (5 min)
```bash
# Backup current config
sudo cp /etc/nginx/sites-available/hkm-website /etc/nginx/sites-available/hkm-website.backup

# Copy secure config
sudo cp nginx-secure.conf /etc/nginx/sites-available/hkm-website

# Edit domain name in config
sudo nano /etc/nginx/sites-available/hkm-website
# Replace "yourdomain.com" with your actual domain

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Secure Webhook (3 min)
```bash
# Set webhook secret as environment variable
echo 'export WEBHOOK_SECRET="your-new-secret-here"' | sudo tee -a /etc/environment

# Replace webhook file
mv webhook.php webhook.php.old
cp webhook-secure.php webhook.php

# Create logs directory
mkdir -p logs
sudo chown -R www-data:www-data logs
```

### 6. Update GitHub Webhook (2 min)
1. Go to: https://github.com/your-repo/settings/hooks
2. Click on your webhook
3. Update "Secret" with your new WEBHOOK_SECRET
4. Change URL to HTTPS: `https://yourdomain.com/webhook.php`
5. Save

---

## ✅ Verification (5 min)

### Test HTTPS
```bash
curl -I https://yourdomain.com
# Should return 200 OK with security headers
```

### Test HTTP Redirect
```bash
curl -I http://yourdomain.com
# Should return 301 redirect to HTTPS
```

### Test Webhook
```bash
# Make a small commit and push
git commit --allow-empty -m "Test webhook"
git push

# Check webhook logs
tail -f logs/webhook.log
```

### Check Security Headers
Visit: https://securityheaders.com
Enter your domain - aim for A rating

### Check SSL Rating
Visit: https://www.ssllabs.com/ssltest/
Enter your domain - aim for A+ rating

---

## 🎯 You're Done!

Your website now has:
- ✅ HTTPS encryption
- ✅ Secure headers
- ✅ Protected secrets
- ✅ Secure webhook
- ✅ Rate limiting
- ✅ IP whitelisting

---

## 📋 Next Steps (Optional but Recommended)

Run the full security setup:
```bash
sudo bash security-setup.sh
```

This will add:
- Firewall (UFW)
- Intrusion detection (fail2ban)
- Automatic security updates
- Log rotation
- SSH hardening

---

## 🆘 Troubleshooting

### Nginx won't start
```bash
# Check for errors
sudo nginx -t

# View error log
sudo tail -f /var/log/nginx/error.log
```

### SSL certificate issues
```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew
```

### Webhook not working
```bash
# Check PHP-FPM is running
sudo systemctl status php8.1-fpm

# Check webhook logs
tail -f logs/webhook.log
tail -f logs/webhook-error.log
```

### Site not accessible
```bash
# Check Nginx is running
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check firewall
sudo ufw status
```

---

## 📞 Need Help?

Check the full guides:
- `SECURITY_GUIDE.md` - Complete security documentation
- `SECURITY_CHECKLIST.md` - Detailed checklist
- `security-setup.sh` - Automated setup script

---

**Time to complete:** ~30 minutes
**Difficulty:** Beginner-friendly
**Impact:** High security improvement
