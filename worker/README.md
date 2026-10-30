# STK Push backend (Cloudflare Worker, free tier)
1. `npm i -g wrangler && wrangler login`
2. In this folder: `wrangler init otr-mpesa` and use worker.js as the entry file.
3. Secrets: `wrangler secret put DARAJA_KEY`, `DARAJA_SECRET`, `DARAJA_PASSKEY` (use NEW keys; revoke the old ones).
4. Vars in wrangler.toml: SHORTCODE, CALLBACK_URL, ALLOWED_ORIGIN = https://oldtimereligionministry.us.kg, DARAJA_BASE = https://api.safaricom.co.ke (production) or leave sandbox.
5. `wrangler deploy`, then paste the Worker URL into `api:` in index.html.
