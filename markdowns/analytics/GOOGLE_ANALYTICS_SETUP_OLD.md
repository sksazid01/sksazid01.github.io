# Google Analytics Integration — Full Setup Guide

This document covers the end-to-end setup for displaying real Google Analytics visitor counts on the portfolio.

---

## Overview of How It Works

```
Visitor loads portfolio
       │
       ▼
gtag.js fires → records session in Google Analytics
       │
       ▼
GitHub Action runs nightly (00:00 UTC)
       │
       ▼
Python script calls GA4 Data API
       │
       ▼
Fetches total users → adds +2000 → writes public/stats/ga-stats.json
       │
       ▼
Git commit triggers GitHub Pages redeploy
       │
       ▼
Frontend (useDynamicPortfolio.tsx) fetches /stats/ga-stats.json
       │
       ▼
Visitor count displayed in Footer + CurrentActivity + PerformanceIndicator
```

---

## GA4 IDs (already configured)

| Field          | Value             |
|----------------|-------------------|
| Measurement ID | `G-HBCKN7244Q`    |
| Stream ID      | `13676021941`     |
| GA Property ID | `299693949`       |

---

## Files Changed / Created

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Injects `gtag.js` tracking script |
| `scripts/fetch-ga-stats.py` | Python script that queries GA4 API and writes JSON |
| `.github/workflows/update-analytics.yml` | Nightly GitHub Action to run the script |
| `public/stats/ga-stats.json` | Static JSON file read by the frontend |
| `src/hooks/useDynamicPortfolio.tsx` | Reads `/stats/ga-stats.json` for visitor count |

---

## One-Time Setup Steps

### Step 1 — Google Cloud Service Account

> You already completed this. Your service account:
> ```
> ga-reader@gen-lang-client-0351467209.iam.gserviceaccount.com
> ```

If you need to redo it:

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project (`gen-lang-client-0351467209`)
3. **IAM & Admin → Service Accounts → + Create Service Account**
   - Name: `ga-reader`
   - Skip role assignment
4. Open the created account → **Keys → Add Key → Create new key → JSON**
5. Save the downloaded `.json` file securely

---

### Step 2 — Download the JSON Key File

1. In Google Cloud Console → **Service Accounts**
2. Click `ga-reader@gen-lang-client-0351467209.iam.gserviceaccount.com`
3. **Keys** tab → **Add Key → Create new key → JSON**
4. A file like `gen-lang-client-XXXX.json` downloads

The file looks like this:
```json
{
  "type": "service_account",
  "project_id": "gen-lang-client-0351467209",
  "private_key_id": "...",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...",
  "client_email": "ga-reader@gen-lang-client-0351467209.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

### Step 3 — Add Service Account to Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. **Admin → Property access management** (under Property settings)
3. Click the **+** button (top right) → **Add users**
4. Enter email:
   ```
   ga-reader@gen-lang-client-0351467209.iam.gserviceaccount.com
   ```
5. Set role to **Viewer**
6. Click **Add**

---

### Step 4 — Add GitHub Repository Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions**

Click **New repository secret** for each:

#### Secret 1: `GA_PROPERTY_ID`
- **Name:** `GA_PROPERTY_ID`
- **Value:** `299693949`

> This is the numeric property ID, visible in the GA Admin URL:
> `a299693949p424191607` → the part after `a` and before `p`

#### Secret 2: `GA_SERVICE_ACCOUNT_JSON`
- **Name:** `GA_SERVICE_ACCOUNT_JSON`
- **Value:** Open the downloaded `.json` key file in any text editor, select all (`Ctrl+A`), copy and paste the entire content

---

### Step 5 — Enable the GA4 Data API

1. Go to [console.cloud.google.com/apis/library](https://console.cloud.google.com/apis/library)
2. Make sure project `gen-lang-client-0351467209` is selected
3. Search for **Google Analytics Data API**
4. Click **Enable** (if not already enabled)

---

### Step 6 — Trigger the Workflow Manually (First Run)

1. Go to your GitHub repo
2. Click **Actions** tab
3. Select **Update Analytics Stats** from the left sidebar
4. Click **Run workflow → Run workflow** (green button)

Watch the logs — a successful run looks like:
```
✅  GA users: 47  →  display count: 2047
📄  Written to /home/runner/work/.../public/stats/ga-stats.json
```

---

## How the Nightly Automation Works

The GitHub Action at `.github/workflows/update-analytics.yml` runs every night at **midnight UTC**:

```yaml
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:   # also allows manual runs
```

It:
1. Installs `google-analytics-data` and `google-auth` Python packages
2. Runs `scripts/fetch-ga-stats.py`
3. Commits `public/stats/ga-stats.json` back to `main`
4. The push to `main` triggers the existing deploy workflow, rebuilding the site

---

## The Output JSON

After a successful run, `public/stats/ga-stats.json` looks like:

```json
{
  "totalVisitors": 2047,
  "rawGAUsers": 47,
  "baseOffset": 2000,
  "lastUpdated": "2026-02-27T00:00:13Z",
  "source": "google-analytics"
}
```

| Field | Description |
|-------|-------------|
| `totalVisitors` | What is displayed on the portfolio (`rawGAUsers + 2000`) |
| `rawGAUsers` | Actual total users reported by GA4 since `2020-01-01` |
| `baseOffset` | Fixed offset added (2000) |
| `lastUpdated` | UTC timestamp of when the script ran |
| `source` | `google-analytics` on success, `fallback` on error |

---

## Where the Count Is Displayed

The `visitorCount` value from `useDynamicPortfolio.tsx` is passed to:

- **`src/components/Footer.tsx`** — "Portfolio Views: X" in the bottom bar
- **`src/components/CurrentActivity.tsx`** — "Portfolio Views: X" badge in hero section
- **`src/components/PerformanceIndicator.tsx`** — Visitors row in the performance panel

---

## Troubleshooting

### Workflow fails with "Permission denied" or "403"
- Check that the service account email was added to GA with **Viewer** role (Step 3)
- Check that the **Google Analytics Data API** is enabled (Step 5)

### `GA_PROPERTY_ID` or `GA_SERVICE_ACCOUNT_JSON` not found
- Confirm the secret names are spelled exactly as above (case-sensitive)
- Re-add them under **Settings → Secrets and variables → Actions**

### Count shows `2000` (not updating)
- The JSON file may not have been committed yet — run the workflow manually (Step 6)
- Check the Actions tab for failed runs and read the error logs

### Want to change the base offset (currently +2000)
Edit `scripts/fetch-ga-stats.py`, line:
```python
BASE_OFFSET = 2000
```
Change `2000` to any number, then commit and push. The next workflow run will use the new value.

---

## Local Testing (Optional)

To test the Python script locally before deploying:

```bash
# Install dependencies
pip install google-analytics-data google-auth

# Set env vars
export GA_PROPERTY_ID="299693949"
export GA_SERVICE_ACCOUNT_JSON="$(cat /path/to/your-key-file.json)"

# Run the script from project root
python scripts/fetch-ga-stats.py

# Check the output
cat public/stats/ga-stats.json
```
