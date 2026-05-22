# Laguna Art Advisory

A [Next.js](https://nextjs.org) gallery + checkout site for Laguna Art Advisory.

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Required environment variables

| Variable | Used for |
|---|---|
| `STRIPE_SECRET_KEY` | Server-side Stripe API calls (checkout, webhooks) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe.js on the client |
| `STRIPE_WEBHOOK_SECRET` | Verifies `/api/webhook` requests are really from Stripe |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public read access to `artworks` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only — full DB access (used by API routes + scripts) |
| `RESEND_API_KEY` | Transactional email (sale notifications, inquiry forwarding) |
| `NEXT_PUBLIC_APP_URL` | Optional — overrides the auto-detected host for Stripe redirects |

## Stripe webhook setup (CRITICAL)

Sales will **not** be recorded in the database and **no email will be sent**
unless a live webhook endpoint is registered in Stripe pointing at this app.

### One-time setup

1. **Stripe Dashboard → Developers → Webhooks → Add endpoint**
   - Make sure you are in **Live mode** (top-left toggle), not Test mode.
2. **Endpoint URL:** `https://lagunaartadvisory.com/api/webhook`
3. **Events to send:** at minimum
   - `checkout.session.completed`
   - (recommended later: `checkout.session.async_payment_succeeded`,
     `payment_intent.payment_failed`)
4. Stripe will reveal a **signing secret** that starts with `whsec_…`.
   Copy it.
5. In **Vercel → Project → Settings → Environment Variables**, set
   `STRIPE_WEBHOOK_SECRET` to that value for the **Production** environment.
   Redeploy so the new env var takes effect.
6. Back in Stripe → click the endpoint → **Send test webhook** →
   `checkout.session.completed`. You should see a 200 response in Stripe and
   a `🎨 Sale Complete` email land in `Info@lagartadvisory.com` and
   `jasonburnell98@gmail.com`.

### Sanity check from CLI

```bash
node --env-file=.env.local -e "
const Stripe = require('stripe');
const s = new Stripe(process.env.STRIPE_SECRET_KEY);
s.webhookEndpoints.list({ limit: 5 }).then(r => console.log(r.data));
"
```

If that prints an empty array in live mode, the endpoint is not registered
and no sale will be auto-recorded.

## Database

The schema lives in `supabase/seed.sql` and migrations in
`supabase/migrations/`. Run each file in the Supabase SQL Editor when setting
up a fresh project or applying a new migration.

Tables:

- **`artworks`** — gallery inventory. Soft-flagged `sold = true` when a sale
  completes (drives the gallery's "available / sold" badge).
- **`sales`** — authoritative, append-only sale history. Persists even if the
  corresponding artwork is later deleted or renamed. Includes shipping
  address, customer phone, and a JSON snapshot of the artwork at sale time.

## Useful scripts

```bash
# Remove an artwork from the gallery (does NOT touch sales history)
node scripts/remove-artwork.mjs <artwork_id>

# Backfill a sale that wasn't captured by the webhook
# (e.g. because the webhook wasn't registered yet)
node scripts/backfill-sale.mjs <stripe_session_id>

# Sync newly-added artist folders into supabase
node scripts/sync-new-artists.mjs
```

## Deploy

Hosted on Vercel — pushing to `main` triggers a production deploy.
Remember to set all env vars in the Vercel dashboard for both Preview and
Production environments.
