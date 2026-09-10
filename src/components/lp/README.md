# Reefer container landing pages (`/lp/<state>/`)

Google Ads landing pages for the reefer-container rental campaigns — one per
state, each targeted by its own Search campaign in the "Bunty Budhrani" Google
Ads account (customer id `1190960543`). These pages are **paid-traffic funnels**:
keep them distraction-free (no site header/nav, single conversion goal = the
lead form).

## Files

| Path | What it is |
|---|---|
| `src/pages/lp/[slug].astro` | Route. Hardcoded `LP_PAGES` map + `getStaticPaths()`. **Add a state in BOTH places** (the import/map entry and the `getStaticPaths` list). |
| `src/components/lp/ReeferLP.tsx` | The whole page. One React component, `client:load`, shared by every state. |
| `src/data/lp/<slug>.json` | Per-state content (heading, pricing, cities, serve items, meta). |
| `src/layouts/LandingLayout.astro` | Minimal shell — `<head>` + `<slot/>`, no header/footer. Do not add site chrome here. |

Active states: `punjab`, `telangana`, `karnataka`, `andhra-pradesh`, `gujarat`,
`maharashtra`, `tamil-nadu`, `bhubaneswar`, `uae`.

> **Stray JSON files** in `src/data/lp/` (`bnglr.json`, `mht.json`, `karnata.json`,
> `punjb.json`, `ker.json`, `assam.json`, `reefer-karnataka.json`) are abandoned
> drafts — **not** referenced by `[slug].astro`. Don't rely on or edit them; a
> cleanup PR to delete them would be welcome.

## Two layouts

`ReeferLP.tsx` branches on `LIVE_LAYOUT_STATES.has(location)`:

**"Live-exact" layout** (Punjab, Telangana, Karnataka, Andhra Pradesh, Gujarat,
Maharashtra, Tamil Nadu) — rebuilt to match each state's real
`crystalgroup.in/rent-buy-reefer-containers-landing-page-<state>/` page:

1. Sticky top bar: **WhatsApp + Call Us** (both green, `#25D366`)
2. Hero — 2 columns: heading + spec line + **2 pricing chips (Rental / Purchase, no Lease)** + disclaimer on the left, the **lead form directly beside it** on the right. No image carousel, no "peek card", no separate form section.
3. "Buy or Rent 20ft & 40ft Refrigerated Containers with fast delivery across `{state}`" + `Ideal for Cold Storage, Pharma, Food & Logistics` + city-pin line (first 4 of `cities`), then the **product gallery** (6 category photos).
4. Why Choose Our Reefer Containers? + We Serve (two columns)
5. Testimonials (Dr. Reddy's, Lupin Labs, ITC)
6. Minimal footer (logo + copyright)

**Original layout** (`bhubaneswar`, `uae`) — hero with image carousel + separate
form section + stats bar + serve-items marquee + gallery + why-choose. Kept
because:
- **Bhubaneswar** has no live page (its old URL 301-redirects to Gujarat's).
- **UAE** live page is a structurally different template (GCC-focused, AED
  pricing, different form fields and services). Converting it is a separate task.

To move a state onto the live-exact layout, add its `location` string to
`LIVE_LAYOUT_STATES` and, in its JSON, cut `hero_pricing` to 2 entries
(`Rental Starts at` / `Purchase Starts at`).

## Client-agreed constraints (do not "fix" these back)

- **No site header / nav / full footer.** These pages must not link out to the
  main site until the visitor converts. The only links on the page are WhatsApp,
  `tel:`, and the in-page `#enquire` anchor.
- **Sticky bar = WhatsApp + Call Us, both green.** No "Get a Quote" scroll button
  there, no floating bottom-corner call bubble (matches the live site).
- **Mobile: the form must be above the fold.** The live-exact hero hides the
  disclaimer/large chrome on mobile and stacks form directly under the pricing.
  Verify at 390×844 — heading + pricing + the first form fields visible with no
  scroll. Don't add tall elements above the form on mobile.
- **Pricing is `₹1,300/day` rental, `₹7,50,000` purchase** — a fixed national
  indicative figure, same on every state's live page. Not per-state.

## Lead form

`LeadForm` (in `ReeferLP.tsx`) POSTs to
`${import.meta.env.PUBLIC_API_URL}/api/enquiries/submit` — the crystal-admin
backend at `https://admin.crystalgroup.in` (Node/Express/SQLite on its own VPS,
**not** Vercel). Public endpoint, rate-limited 10/IP/hour, **requires `name` +
`email`** (phone/company/service/message optional). `company` carries the
selected city; `service` is `Reefer Container — <state>`.

`PUBLIC_API_URL` is set to `https://admin.crystalgroup.in` in Vercel for both
Production and Preview. If the form silently "succeeds" with no DB row, that env
var is the first thing to check.

## Live-site bugs — do NOT copy them

Several live WordPress pages were cloned from Tamil Nadu's page and never fully
re-localised:

- **Andhra Pradesh, Telangana, Punjab** live pages show Tamil Nadu's city-pin
  line ("Chennai • Coimbatore • Vellore • Tiruchirappalli") instead of their
  own. Karnataka and Maharashtra are correct.
- The Andhra Pradesh live page's hero subheading literally says "…across Andhra
  Pradesh" and got copy-pasted onto Punjab verbatim.

When matching a live page, use that state's **real** cities (from its JSON
`cities` array) and name — never the buggy text.

## Assets

- Hero carousel photos (original-layout states only):
  `public/images/lp/landing-slider-img{1-4}.webp` — real branded Crystal reefer
  photos pulled from the live site.
- Product gallery: `public/images/lp/products/{meat-seafood,dairy,pharma,chemical,fmcg,fruits-vegetables}.webp`
  — labels are burned into the images; render them plain, no caption overlay.

## Adding / editing a state

1. Create `src/data/lp/<slug>.json` (copy an existing one; keep the same keys).
2. Register it in `src/pages/lp/[slug].astro` — import, `LP_PAGES` entry, and
   `getStaticPaths()` entry.
3. Add the old WordPress URL → `/lp/<slug>/` redirect to `vercel.json`
   (`"redirects"` array — **not** `public/_redirects`, which is inert on Vercel).
4. `npm run build` and check `dist/client/lp/<slug>/index.html`.
5. For a real visual check: `npx astro dev` (not `astro preview` — the Vercel
   adapter blocks it) and screenshot at both 390×844 and ~1440px. The first
   screenshot often catches Framer Motion mid-fade; re-shoot or check computed
   styles.

## Deploy

Push to `main` — Vercel's GitHub integration auto-builds and deploys to
`dev.crystalgroup.in` (and `crystalgroup.in` once DNS is cut over). No manual
`vercel --prod` needed. `dev.crystalgroup.in` is the current preview of the new
site; the apex domain still serves the old WordPress site until DNS cutover.
