# GitHub Webhook Auto-Deployment Setup

Your HKM website can now automatically deploy when you push to GitHub!

## 🎯 What's Been Set Up

1. **Deployment Script** (`deploy.sh`) - Automatically pulls changes and rebuilds
2. **Webhook Handler** (`webhook.php`) - Listens for GitHub push events
3. **Secret Token** - Secures the webhook communication

## 🔧 GitHub Webhook Configuration

To enable automatic deployments, configure the webhook in your GitHub repository:

### Step 1: Go to GitHub Repository Settings

1. Open https://github.com/KIAI-JOSE/HKM-WEBSITE
2. Click **Settings** → **Webhooks** → **Add webhook**

### Step 2: Configure the Webhook

**Payload URL:**
```
https://hkm-ministries.loca.lt/webhook.php
```
(Or your actual domain if you have one)

**Content type:**
```
application/json
```

**Secret:**
```
319dc14bdd411f34194987788c281dbff4257bd04ff8d228208bba6fd1a2af73
```

**Which events would you like to trigger this webhook?**
- Select: **Just the push event**

**Active:**
- ✅ Check this box

### Step 3: Save

Click **Add webhook**

## 🚀 How It Works

1. You make changes locally and commit
2. You push to GitHub: `git push origin main-hkm`
3. GitHub sends a webhook to your server
4. The webhook triggers the deployment script
5. Your site automatically updates!

## 📝 Manual Deployment

If you need to deploy manually, run:

```bash
bash /var/www/HKM-WEBSITE/deploy.sh
```

## 🔍 Troubleshooting

### Check webhook logs:
```bash
tail -f /var/www/HKM-WEBSITE/webhook.log
```

### Test the deployment script:
```bash
bash /var/www/HKM-WEBSITE/deploy.sh
```

### Verify webhook.php is accessible:
Visit: https://hkm-ministries.loca.lt/webhook.php
(You should see an error about invalid signature - that's normal!)

## 🔐 Security Notes

- The webhook secret is stored in `webhook.php`
- Keep this secret secure and don't share it publicly
- GitHub uses this secret to verify webhook authenticity

## ⚡ Quick Deploy Workflow

Now your workflow is super simple:

```bash
# 1. Make changes via TinaCMS or edit files
# 2. Commit changes
git add -A
git commit -m "Update content"

# 3. Push to GitHub
git push origin main-hkm

# 4. Wait ~30 seconds - your site auto-updates! 🎉
```

No more manual server commands needed!
