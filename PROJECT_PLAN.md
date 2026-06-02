# Crystal Group — Website Migration & Launch Plan

## Total Page Count

| Category | Count | Status |
|---|---|---|
| Pages already live | 22 | Done |
| New pages to build (solutions, utility, legal) | 17 | Pending |
| Blog listing + 24 migrated posts | 25 | Pending |
| Case study entries (3 done + 23 new) | 26 | 3 done, 23 pending |
| Landing pages via admin panel | 9 | Pending |
| **Grand Total** | **99 pages** | |

---

## Phase 1 — Pre-Launch Infrastructure
> No new pages. Foundational setup before DNS cutover.

| Task | Details | Status |
|---|---|---|
| Configure 301 redirects | All legacy URLs → new slugs (see redirect table below) | 🔲 |
| GA4 analytics | Install tracking on all pages | 🔲 |
| Google Ads tag | Global site tag on all pages | 🔲 |
| Microsoft Clarity | Heatmap/session recording | 🔲 |
| Contact form | Wire to backend API, set API URL on Netlify | 🔲 |
| Image compression | Optimise all assets before go-live | 🔲 |

### Redirect Table (RETIRE → Target)
| Old URL | New URL |
|---|---|
| /jobs/ | /careers/ |
| /job-openings/ | /careers/ |
| /gallery/ | /impact/ |
| /blast-freezer-/ | /store/blast-freezer/ |
| /sitemap/ | /sitemap-index.xml/ |
| /pharmaceutical-2/ | /impact/ |
| /case-studies/ | /impact/ |
| /case-studies/* | /impact/:splat |

---

## Phase 2 — High-Priority SEO Pages
> Highest organic impressions on legacy site. Build first for immediate SEO recovery.

| # | Page | New Slug | Impressions | Status |
|---|---|---|---|---|
| 1 | Tunnel Containers | `/store/tunnel-containers/` | 78,533 | 🔲 |
| 2 | Cold Rooms | `/store/cold-rooms/` | 11,892 | 🔲 |
| 3 | Open Top Containers | `/store/open-top-containers/` | 9,025 | 🔲 |
| 4 | Hard Top Containers | `/store/hard-top-containers/` | 8,145 | 🔲 |

---

## Phase 3 — Remaining Solution Pages
> Full parity with legacy site solution pages.

| # | Page | New Slug | Clicks | Status |
|---|---|---|---|---|
| 5 | Dry Fabricated | `/store/dry-fabricated/` | 40 | 🔲 |
| 6 | Freight Forwarding | `/move/freight-forwarding/` | 9 | 🔲 |
| 7 | Super Freezer | `/store/super-freezer/` | 5 | 🔲 |
| 8 | Super Store | `/store/super-store/` | 3 | 🔲 |
| 9 | Office Containers | `/store/office-containers/` | 1 | 🔲 |
| 10 | Accessories | `/store/accessories/` | 4 | 🔲 |
| 11 | Dry Containers | `/store/dry-containers/` | — | 🔲 |
| 12 | AMC Spareparts | `/store/amc-spareparts/` | 4 | 🔲 |
| 13 | Bhubaneswar Location | `/locations/bhubaneswar/` | 33 | 🔲 |

---

## Phase 4 — Blog System
> Build blog infrastructure and migrate all 24 posts from legacy site.

| # | Task / Post | New Slug | Clicks | Status |
|---|---|---|---|---|
| — | Blog listing page | `/blog/` | — | 🔲 |
| — | Dynamic routing `[slug].astro` | — | — | 🔲 |
| 1 | Rajasthan Logistics Corridor | `/blog/rajasthan-logistics-corridor/` | 171 | 🔲 |
| 2 | Container Cafes India | `/blog/container-cafes-india/` | 45 | 🔲 |
| 3 | Q-Commerce Boom India | `/blog/q-commerce-boom-india/` | 7 | 🔲 |
| 4 | Ice Cream Logistics | `/blog/ice-cream-logistics/` | 2 | 🔲 |
| 5 | Cold Storage Revolution | `/blog/cold-storage-revolution/` | 3 | 🔲 |
| 6 | Reefer Container Guide | `/blog/reefer-container-guide/` | 10 | 🔲 |
| 7 | IoT Cold Chain 2025 | `/blog/iot-cold-chain-2025/` | 2 | 🔲 |
| 8 | Built-to-Suit Solutions 2025 | `/blog/built-to-suit-solutions-2025/` | 4 | 🔲 |
| 9 | India Cold Chain 2026 | `/blog/india-cold-chain-2026/` | 4 | 🔲 |
| 10 | Plant Protein Market India | `/blog/plant-protein-market-india/` | 3 | 🔲 |
| 11 | AMC Benefits Cold Chain | `/blog/amc-benefits-cold-chain/` | 3 | 🔲 |
| 12 | Delhi Logistics Transformation | `/blog/delhi-logistics-transformation/` | 1 | 🔲 |
| 13 | Q-Commerce Trust Compliance | `/blog/q-commerce-trust-compliance/` | — | 🔲 |
| 14 | Blast Freezer Guide | `/blog/blast-freezer-guide/` | — | 🔲 |
| 15 | Dairy Export Logistics | `/blog/dairy-export-logistics/` | — | 🔲 |
| 16 | Shrimp Farming Logistics | `/blog/shrimp-farming-logistics/` | — | 🔲 |
| 17 | India Bangladesh Trade | `/blog/india-bangladesh-trade-logistics/` | — | 🔲 |
| 18 | Weather Resilient Warehousing | `/blog/weather-resilient-warehousing/` | 1 | 🔲 |
| 19 | Sustainable Cold Warehousing | `/blog/sustainable-cold-warehousing/` | — | 🔲 |
| 20 | Dry Container Second Life | `/blog/dry-container-second-life/` | — | 🔲 |
| 21 | Reefer Transportation Guide | `/blog/reefer-transportation-guide/` | — | 🔲 |
| 22 | Geopolitical Impact Cold Chain | `/blog/geopolitical-impact-cold-chain/` | — | 🔲 |
| 23 | Hidden Costs Slow Cold Storage | `/blog/hidden-costs-slow-cold-storage/` | — | 🔲 |
| 24 | Container Reliability Cold Chain | `/blog/container-reliability-cold-chain/` | — | 🔲 |

---

## Phase 5 — Utility & Legal Pages

| # | Page | New Slug | Clicks | Status |
|---|---|---|---|---|
| 1 | Container Loading Calculator | `/solve/loading-calculator/` | 26 | 🔲 |
| 2 | Pallet Guide | `/solve/pallet-guide/` | 1 | 🔲 |
| 3 | Pallet Guide — Blast Freezer | `/solve/pallet-guide-blast-freezer/` | — | 🔲 |
| 4 | Pallet Guide — Super Freezer | `/solve/pallet-guide-super-freezer/` | 1 | 🔲 |
| 5 | Pallet Guide — Superstore | `/solve/pallet-guide-superstore/` | — | 🔲 |
| 6 | Privacy Policy | `/privacy-policy/` | — | 🔲 |
| 7 | Terms & Conditions | `/terms-conditions/` | 1 | 🔲 |

---

## Phase 6 — Case Studies Expansion
> Routing already built. Add data entries + hero images. Extracted raw content saved in `scripts/extracted_case_studies.json`.

### Already Done (3)
| # | Title | Slug | Status |
|---|---|---|---|
| 1 | Pharma-Grade Warehouse at JNPT | auto-generated from title | ✅ |
| 2 | Q-Commerce: 3 Cities in 90 Days | auto-generated from title | ✅ |
| 3 | Cold Storage for Frozen Food Manufacturer | auto-generated from title | ✅ |

### To Add (23)
| # | Title | New Slug | Clicks | Status |
|---|---|---|---|---|
| 4 | QSR/FMCG Reefer Trucks | `/impact/qsr-fmcg-reefer-trucks/` | 19 | 🔲 |
| 5 | Frozen Dessert Truck Solution | `/impact/frozen-dessert-truck-solution/` | 18 | 🔲 |
| 6 | Pharma R&D Truck | `/impact/pharma-rd-truck/` | 6 | 🔲 |
| 7 | Dairy Solutions | `/impact/dairy-solutions/` | 4 | 🔲 |
| 8 | Modular Warehouse Efficiency | `/impact/modular-warehouse-efficiency/` | 3 | 🔲 |
| 9 | Q-Commerce Cold Storage | `/impact/q-commerce-cold-storage/` | 2 | 🔲 |
| 10 | Food Delivery Storage | `/impact/food-delivery-storage/` | 2 | 🔲 |
| 11 | Vimala Feeds | `/impact/vimala-feeds/` | 2 | 🔲 |
| 12 | Petrochemical Storage Qatar | `/impact/petrochemical-storage-qatar/` | 2 | 🔲 |
| 13 | Laurus Labs | `/impact/laurus-labs/` | — | 🔲 |
| 14 | Blast Freezer Assam | `/impact/blast-freezer-assam/` | — | 🔲 |
| 15 | Reefer Plasma Hyderabad | `/impact/reefer-plasma-hyderabad/` | — | 🔲 |
| 16 | Pharma Superstore Compliance | `/impact/pharma-superstore-compliance/` | — | 🔲 |
| 17 | Chemical Temperature Compliance | `/impact/chemical-temperature-compliance/` | — | 🔲 |
| 18 | Dry Containers Tourism | `/impact/dry-containers-tourism/` | — | 🔲 |
| 19 | Rapid Reefer Pharma | `/impact/rapid-reefer-pharma/` | — | 🔲 |
| 20 | PCM Pad Storage | `/impact/pcm-pad-storage/` | — | 🔲 |
| 21 | 1000 sqft Cold Storage | `/impact/1000-sqft-cold-storage/` | — | 🔲 |
| 22 | Cold Storage Telangana | `/impact/cold-storage-telangana/` | — | 🔲 |
| 23 | Chemical Storage Maharashtra | `/impact/chemical-storage-maharashtra/` | — | 🔲 |
| 24 | Custom Access Cabin | `/impact/custom-access-cabin/` | — | 🔲 |
| 25 | ISKCON Security Cabin | `/impact/temple-security-cabin/` | — | 🔲 |
| 26 | Dry Container Tyre Manufacturer | `/impact/dry-container-tyre-mfg/` | — | 🔲 |

---

## Phase 7 — Landing Pages
> Created via Crystal Admin panel. No code changes required. Match slugs to active Google Ads campaigns.

| # | Region / Campaign | New Slug | Clicks | Status |
|---|---|---|---|---|
| 1 | Karnataka | `/lp/karnataka/` | 11 | 🔲 |
| 2 | Andhra Pradesh | `/lp/andhra-pradesh/` | 11 | 🔲 |
| 3 | Gujarat | `/lp/gujarat/` | 10 | 🔲 |
| 4 | Tamil Nadu | `/lp/tamil-nadu/` | 6 | 🔲 |
| 5 | Maharashtra | `/lp/maharashtra/` | 3 | 🔲 |
| 6 | Freight Forwarding LP | `/lp/freight-forwarding/` | 3 | 🔲 |
| 7 | Telangana | `/lp/telangana/` | 1 | 🔲 |
| 8 | Bhubaneswar | `/lp/bhubaneswar/` | — | 🔲 |
| 9 | UAE | `/lp/uae/` | — | 🔲 |

---

## Phase 8 — QA & Go-Live

| Task | Status |
|---|---|
| Cross-device testing (mobile, tablet, desktop) | 🔲 |
| Lighthouse performance audit (target: 90+ score) | 🔲 |
| Verify all 301 redirects | 🔲 |
| Submit sitemap to Google Search Console | 🔲 |
| DNS cutover → crystalgroup.in → Netlify | 🔲 |
| Post-launch: monitor GSC for crawl errors | 🔲 |

---

## URL Taxonomy Reference

| Section | Pattern | Example |
|---|---|---|
| Store (products) | `/store/[product]/` | `/store/tunnel-containers/` |
| Move (logistics) | `/move/[service]/` | `/move/freight-forwarding/` |
| Build | `/build/[service]/` | `/build/built-to-suit/` |
| Process | `/process/` | `/process/` |
| Impact (case studies) | `/impact/[slug]/` | `/impact/laurus-labs/` |
| Blog | `/blog/[slug]/` | `/blog/rajasthan-logistics-corridor/` |
| Solve (tools) | `/solve/[tool]/` | `/solve/loading-calculator/` |
| Landing pages | `/lp/[region]/` | `/lp/karnataka/` |
| Locations | `/locations/[city]/` | `/locations/bhubaneswar/` |
