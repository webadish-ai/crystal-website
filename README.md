# Crystal Group — Website

Marketing website for Crystal Logistic Cool Chain Ltd. Built with Astro, React, and Tailwind CSS. Deployed on Vercel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 |
| UI Components | React 19 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion, GSAP |
| Deployment | Vercel |
| Content | JSON files in `src/data/` |
| Blog | Astro Content Collections (`src/content/blog/`) |

---

## Prerequisites

- Node.js 20+
- npm 10+

---

## Local Development

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:4321`.

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
/
├── public/              # Static assets (fonts, images, videos, PDFs)
├── src/
│   ├── components/      # React + Astro components
│   │   ├── core/        # Shared UI primitives (Button, Nav, animations)
│   │   ├── home/        # Homepage sections
│   │   ├── company/     # About, Careers, Contact, Impact pages
│   │   ├── build/       # Built-to-Suit pages
│   │   ├── solutions/   # Move, Solve, Food Processing pages
│   │   └── store/       # Store pages (Cold Storage, Reefer, etc.)
│   ├── content/
│   │   └── blog/        # Blog posts as Markdown files
│   ├── data/            # JSON content files + local media
│   ├── hooks/           # React hooks (useCmsData, etc.)
│   ├── layouts/         # Astro layout wrappers
│   ├── pages/           # Astro pages — each file = one URL route
│   └── styles/          # Global CSS
├── vercel.json          # 301 redirects for old WordPress URLs
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## Deployment

Auto-deploys on every push to `main` via Vercel.

- **Repo:** `webadish-ai/crystal-website`
- **Build command:** `npm run build`
- **Output directory:** `dist`

---

## Content Management

Page content is stored as JSON in `src/data/`. Blog posts are Markdown files in `src/content/blog/`. The admin panel manages landing pages and enquiries separately.

Admin panel repo: `webadish-ai/crystal-admin`
