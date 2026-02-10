# Security Implementation Checklist

## 🚨 CRITICAL - Do Immediately

### 1. Secure Your Secrets
- [ ] **Remove .env files from Git history**
  ```bash
  cd HKM-WEBSITE
  git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch .env .env.local .env.production" \
    --prune-empty --tag-name-filter cat -- --all
  git push origin --force --all
  ```

- [ ] **Regenerate ALL API keys and tokens**
  - [ ] TinaCMS Client ID: https://app.tina.io
  - [ ] TinaCMS Token: https://app.tina.io
  - [ ] GitHub Webhook Secret: Generate new 64-char random string
  - [ ] Any other API keys

- [ ] **Create new .env file from template**
  ```bash
  cp .env.example .env
  # Edit .env with your new secrets
  nano .env
  ```

- [ ] **Set webhook secret as environment variable**
  ```bash
  # Add to /etc/environment or ~/.bashrc
  export WEBHOOK_SECRET="your-new-secret-here"
  ```

### 2. Enable HTTPS
- [ ] **Install Certbot**
  ```bash
  sudo apt update
  sudo apt install certbot python3-certbot-nginx
  ```

- [ ] **Get SSL certificate**
  ```bash
  sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
  ```

- [ ] **Test auto-renewal**
  ```bash
  sudo certbot renew --dry-run
  ```

### 3. Update Nginx Configuration
- [ ] **Backup current config**
  ```bash
  sudo cp /etc/nginx/sites-available/hkm-website /etc/nginx/sites-available/hkm-website.backup
  ```

- [ ] **Replace with secure config**
  ```bash
  sudo cp nginx-secure.conf /etc/nginx/sites-available/hkm-website
  # Edit domain names in the file
  sudo nano /etc/nginx/sites-available/hkm-website
  ```

- [ ] **Test and reload**
  ```bash
  sudo nginx -t
  sudo systemctl reload nginx
  ```

### 4. Secure Webhook
- [ ] **Replace webhook.php with webhook-secure.php**
  ```bash
  mv webhook.php webhook.php.old
  mv webhook-secure.php webhook.php
  ```

- [ ] **Create logs directory**
  ```bash
  mkdir -p logs
  sudo chown -R www-data:www-data logs
  ```

- [ ] **Update GitHub webhook settings**
  - Go to GitHub repo → Settings → Webhooks
  - Update secret to match your new WEBHOOK_SECRET
  - Ensure URL is HTTPS

---

## 🛡️ HIGH PRIORITY - Do This Week

### 5. Run Security Setup Script
- [ ] **Execute automated security setup**
  ```bash
  sudo bash security-setup.sh
  ```

### 6. Audit Dependencies
- [ ] **Check for vulnerabilities**
  ```bash
  npm audit
  ```

- [ ] **Fix vulnerabilities**
  ```bash
  npm audit fix
  npm audit fix --force  # If needed
  ```

- [ ] **Update outdated packages**
  ```bash
  npm outdated
  npm update
  ```

### 7. Configure Firewall
- [ ] **Enable UFW**
  ```bash
  sudo ufw enable
  sudo ufw status
  ```

- [ ] **Verify rules**
  - SSH allowed
  - HTTP/HTTPS allowed
  - All other ports blocked

### 8. Set Up Fail2ban
- [ ] **Verify fail2ban is running**
  ```bash
  sudo systemctl status fail2ban
  ```

- [ ] **Check banned IPs**
  ```bash
  sudo fail2ban-client status
  ```

### 9. Secure File Permissions
- [ ] **Set correct ownership**
  ```bash
  sudo chown -R www-data:www-data /var/www/HKM-WEBSITE
  ```

- [ ] **Set correct permissions**
  ```bash
  find /var/www/HKM-WEBSITE -type d -exec chmod 755 {} \;
  find /var/www/HKM-WEBSITE -type f -exec chmod 644 {} \;
  chmod 755 /var/www/HKM-WEBSITE/deploy.sh
  chmod 600 /var/www/HKM-WEBSITE/.env*
  ```

---

## 📋 MEDIUM PRIORITY - Do This Month

### 10. Enable Automatic Updates
- [ ] **Configure unattended-upgrades**
  ```bash
  sudo apt install unattended-upgrades
  sudo dpkg-reconfigure -plow unattended-upgrades
  ```

### 11. Set Up Monitoring
- [ ] **Configure log monitoring**
- [ ] **Set up email alerts for security events**
- [ ] **Monitor SSL certificate expiration**

### 12. Backup Strategy
- [ ] **Set up automated daily backups**
- [ ] **Test backup restoration**
- [ ] **Store backups off-site**

### 13. Security Headers Testing
- [ ] **Test security headers**
  - Visit: https://securityheaders.com
  - Enter your domain
  - Aim for A+ rating

- [ ] **Test SSL configuration**
  - Visit: https://www.ssllabs.com/ssltest/
  - Enter your domain
  - Aim for A+ rating

### 14. Content Security Policy
- [ ] **Review and adjust CSP in nginx-secure.conf**
- [ ] **Test CSP doesn't break functionality**
- [ ] **Monitor CSP violations**

---

## 🔄 ONGOING - Monthly Tasks

### 15. Regular Maintenance
- [ ] **Update dependencies**
  ```bash
  npm update
  npm audit
  ```

- [ ] **Update system packages**
  ```bash
  sudo apt update && sudo apt upgrade
  ```

- [ ] **Review access logs**
  ```bash
  sudo tail -f /var/log/nginx/hkm-access.log
  ```

- [ ] **Review error logs**
  ```bash
  sudo tail -f /var/log/nginx/hkm-error.log
  ```

- [ ] **Check fail2ban bans**
  ```bash
  sudo fail2ban-client status nginx-http-auth
  ```

### 16. Security Audits
- [ ] **Review user access**
- [ ] **Check for unauthorized changes**
- [ ] **Verify backup integrity**
- [ ] **Test disaster recovery plan**

---

## ✅ Verification Tests

After implementing security measures, verify everything works:

### Test 1: HTTPS Redirect
```bash
curl -I http://yourdomain.com
# Should return 301 redirect to HTTPS
```

### Test 2: Security Headers
```bash
curl -I https://yourdomain.com
# Should show security headers
```

### Test 3: Webhook
```bash
# Trigger a test webhook from GitHub
# Check logs: tail -f logs/webhook.log
```

### Test 4: SSL Certificate
```bash
sudo certbot certificates
# Should show valid certificate
```

### Test 5: Firewall
```bash
sudo ufw status
# Should show active with correct rules
```

---

## 📞 Emergency Contacts

If you detect a security breach:

1. **Immediately take site offline**
   ```bash
   sudo systemctl stop nginx
   ```

2. **Rotate all credentials**
3. **Check logs for unauthorized access**
4. **Restore from clean backup**
5. **Document the incident**

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security](https://infosec.mozilla.org/guidelines/web_security)
- [Let's Encrypt Docs](https://letsencrypt.org/docs/)
- [Nginx Security](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)

---

**Last Updated:** February 10, 2026
**Review Date:** March 10, 2026
