# Website — Astro + React

Static marketing website built with Astro, React, and Tailwind CSS. Deployed on Netlify with a hybrid static/SSR output for landing pages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) |
| UI Components | React 19 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion, GSAP |
| Deployment | Netlify (static + SSR adapter) |
| Content | JSON files in `src/data/` |
| Dynamic pages | `src/pages/[slug].astro` — fetches from Admin API at build time |

---

## Prerequisites

- Node.js 20+
- npm 10+

---

## Installation

```bash
npm install
```

---

## Development

```bash
npm run dev
```

Starts the local dev server at `http://localhost:4321`.

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
/
├── public/              # Static assets (fonts, images, videos, PDFs)
│   └── images/
├── src/
│   ├── components/      # React + Astro components
│   │   ├── core/        # Shared UI primitives (Button, Nav, animations, etc.)
│   │   ├── home/        # Homepage section components
│   │   ├── company/     # About, Careers, Contact, Impact pages
│   │   ├── build/       # Build service pages (BTS, EPC)
│   │   ├── solutions/   # Solutions pages (Move, Solve, Process)
│   │   └── store/       # Store pages (Cold Storage, Reefer, etc.)
│   ├── data/            # JSON content files + local media
│   │   ├── images/      # Per-section local images (imported at build time)
│   │   └── lp/          # Landing page JSON data
│   ├── hooks/           # React hooks (useCmsData, useEnquiry, etc.)
│   ├── layouts/         # Astro layout wrappers (Layout.astro)
│   ├── pages/           # Astro pages — each file = one URL route
│   └── types/           # TypeScript type definitions
├── admin/               # Admin panel (see admin/README.md)
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Environment Variables

### Netlify Dashboard

Set these under **Site > Settings > Environment variables** in Netlify:

| Variable | Description |
|---|---|
| `API_URL` | URL of the admin backend (e.g. `https://admin.yourdomain.com`) — used by `[slug].astro` to fetch landing page data at build time |

No `.env` file is needed for the website itself. All other config is in `astro.config.mjs`.

---

## Deployment

The site deploys automatically via Netlify on every push to `main`.

- Build command: `npm run build`
- Publish directory: `dist`
- The Netlify adapter handles SSR for the `[slug].astro` dynamic route.

---

## Content Management

Static page content is stored as JSON files in `src/data/`. Landing pages are managed via the Admin panel and fetched at build time from the Admin API.

To trigger a rebuild after content changes, use the Netlify build hook configured in the admin backend's `.env`.
