# Website Security Guide for HKM Ministries

## 🚨 CRITICAL VULNERABILITIES FOUND

### 1. **EXPOSED API KEYS & SECRETS** (CRITICAL)
- ❌ `.env` and `.env.local` contain sensitive tokens exposed in repository
- ❌ TinaCMS tokens and API keys are visible
- ❌ Webhook secret is hardcoded in PHP file

### 2. **No HTTPS/SSL** (CRITICAL)
- ❌ Site runs on HTTP only (port 80)
- ❌ All data transmitted in plain text
- ❌ Vulnerable to man-in-the-middle attacks

### 3. **Weak Security Headers** (HIGH)
- ❌ Missing Content Security Policy (CSP)
- ❌ No Referrer-Policy
- ❌ Missing Permissions-Policy

### 4. **PHP Webhook Vulnerabilities** (HIGH)
- ❌ Limited input validation
- ❌ Command injection risk in deploy script
- ❌ No rate limiting

### 5. **Dependency Vulnerabilities** (MEDIUM)
- ❌ No automated security scanning
- ❌ Outdated packages may have vulnerabilities

---

## 🛡️ SECURITY IMPLEMENTATION PLAN

### Phase 1: IMMEDIATE ACTIONS (Do Today)

#### 1.1 Secure Environment Variables
```bash
# Remove .env files from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Regenerate all API keys and tokens
# - TinaCMS: https://app.tina.io
# - GitHub webhook secret: Generate new one
```

#### 1.2 Enable HTTPS with Let's Encrypt
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

#### 1.3 Update Nginx Configuration (see nginx-secure.conf)

#### 1.4 Secure Webhook
- Move secret to environment variable
- Add rate limiting
- Implement IP whitelist for GitHub

---

### Phase 2: ENHANCED SECURITY (This Week)

#### 2.1 Implement Security Headers
- Content Security Policy (CSP)
- Strict-Transport-Security (HSTS)
- Permissions-Policy
- Cross-Origin policies

#### 2.2 Add Web Application Firewall (WAF)
```bash
# Install ModSecurity with Nginx
sudo apt install libnginx-mod-security
```

#### 2.3 Set Up Automated Security Scanning
```bash
# Add to package.json
npm install --save-dev npm-audit-resolver
npm audit
```

#### 2.4 Implement Rate Limiting
- Limit API requests
- Protect against DDoS
- Throttle webhook calls

---

### Phase 3: ONGOING SECURITY (Monthly)

#### 3.1 Regular Updates
```bash
# Update dependencies monthly
npm audit fix
npm update

# Update system packages
sudo apt update && sudo apt upgrade
```

#### 3.2 Security Monitoring
- Set up fail2ban for intrusion detection
- Monitor nginx access/error logs
- Track failed authentication attempts

#### 3.3 Backup Strategy
- Daily automated backups
- Off-site backup storage
- Test restore procedures quarterly

---

## 🔒 SECURITY CHECKLIST

### Infrastructure Security
- [ ] Enable HTTPS/SSL with valid certificate
- [ ] Configure firewall (UFW/iptables)
- [ ] Disable unnecessary services
- [ ] Use non-root user for deployment
- [ ] Enable automatic security updates
- [ ] Set up fail2ban
- [ ] Configure SSH key-only authentication
- [ ] Change default SSH port

### Application Security
- [ ] Remove all secrets from code
- [ ] Use environment variables for sensitive data
- [ ] Implement Content Security Policy
- [ ] Add rate limiting
- [ ] Sanitize all user inputs
- [ ] Validate file uploads
- [ ] Implement CORS properly
- [ ] Add request size limits

### Code Security
- [ ] Run npm audit regularly
- [ ] Keep dependencies updated
- [ ] Remove unused dependencies
- [ ] Use security linters (ESLint security plugins)
- [ ] Implement input validation
- [ ] Use parameterized queries (if using database)
- [ ] Avoid eval() and dangerous functions

### Monitoring & Response
- [ ] Set up log monitoring
- [ ] Configure alerts for suspicious activity
- [ ] Create incident response plan
- [ ] Regular security audits
- [ ] Penetration testing (annually)
- [ ] Monitor SSL certificate expiration

---

## 🚀 QUICK WINS (30 Minutes)

1. **Add .env to .gitignore** (already done, but verify)
2. **Regenerate all API keys**
3. **Update security headers in Nginx**
4. **Enable HTTPS**
5. **Add rate limiting to webhook**
6. **Run npm audit and fix vulnerabilities**

---

## 📚 SECURITY RESOURCES

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Nginx Security Best Practices](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)

---

## 🆘 INCIDENT RESPONSE

If you suspect a security breach:

1. **Immediately**: Take site offline
2. **Rotate**: All API keys, tokens, passwords
3. **Investigate**: Check logs for unauthorized access
4. **Patch**: Fix the vulnerability
5. **Restore**: From clean backup if compromised
6. **Monitor**: Watch for continued attacks
7. **Document**: Record incident details

---

## 📞 SUPPORT

For security concerns:
- GitHub Security Advisories
- TinaCMS Support: https://tina.io/support/
- Nginx Security Mailing List
