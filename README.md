# Old Time Religion (OTR) Ministry website

Seventh-day Adventist student ministry, Moi University, Eldoret, Kenya. Static site hosted on GitHub Pages.

## Edit content
Open `js/main.js` and change the `const C = {...}` block at the top: phone, email, address, YouTube link,
M-Pesa Paybill/Till, weekly programme and leaders.

## Deploy
Push to `main`. In the repo go to Settings > Pages > Source: GitHub Actions. The workflow in `.github/workflows/static.yml` publishes the site.
`CNAME` holds the custom domain; delete it if you won't use one.

## Live M-Pesa STK Push (optional)
See `worker/README.md`. Never commit API keys or passwords; store them as Worker secrets.
