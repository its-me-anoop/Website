# Documentation

The site of Flutterly Ltd — the product studio of Anoop Jose. Built
with Next.js 16 (App Router), React 19 and Tailwind CSS v4. The
marketing pages (home, GP practices, care homes, packages, free
audit, accessibility) run the warm editorial "Kiln" language; case-study
pages run the light "Porcelain" system with Framer Motion.

## Contents

- [Design Language — "Kiln"](./KILN.md) — marketing-site tokens, type,
  structure, signature moves, and the motion system.
- [Design System — "Porcelain"](./DESIGN-SYSTEM.md) — tokens,
  primitives, motion, and accessibility rules for case-study pages.
- [Demo-site CMS](./CMS.md) — schema-validated content layer feeding
  the GP and care-home demos (`content/` + `src/lib/cms/`).
- [Instant website audit](./AUDIT.md) — the `/audit` engine: safe
  fetching, the seven check categories, scoring, the API route and the
  report UI.
- [Research](./research/) — NHS standards checklist, GP-website supplier
  comparison, exemplar analysis, and the Willowbrook gap analysis.

## Architecture at a glance

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD, skip link
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Kiln homepage composition
│   ├── globals.css         # Design tokens + Tailwind theme + utilities
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots
│   ├── gp-websites/        # GP practice sector page
│   ├── care-home-websites/ # Care home sector page
│   ├── packages/           # Packages page
│   ├── free-audit/         # Free website audit landing page
│   ├── audit/              # Instant audit report (?url=…&sector=…), noindex
│   ├── api/audit/          # GET /api/audit — runs the audit engine
│   ├── accessibility/      # Accessibility statement
│   └── projects/           # Case-study subpages (sipli, artling)
├── components/
│   ├── kiln/               # Kiln marketing site (shell, nav, footer,
│   │                       # primitives, data, home/sectors/packages/audit)
│   ├── ui/                 # Porcelain primitives (Button, LiftCard, …)
│   ├── layout/             # Porcelain Navbar/Footer (case-study pages)
│   └── projects/           # Per-product landing UIs
├── fonts/                  # Self-hosted variable woff2 subsets
└── lib/
    ├── audit/              # Audit engine: url, guard, fetch, page, checks/, score, run
    ├── site.ts             # Single source of truth for SEO/site constants
    └── utils.ts            # cn() class merger
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (also typechecks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx vitest run` | Unit/component tests |
| `npm run cms:validate` | Validate all shipped demo content against the schemas |
| `npm run test:browser` | Headless-browser audit of every route (server on :3100) |
| `npm run test:a11y` | axe-core WCAG 2.2 A/AA audit of every route (server on :3100) |

## SEO

- Per-route `metadata` (title template, description, canonical, OpenGraph,
  Twitter) plus Person / Organization / WebSite JSON-LD in the root layout,
  with `SoftwareApplication` JSON-LD on product pages.
- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Shared constants come from `src/lib/site.ts` so details never drift.
- Marketing fonts (Zodiak, Switzer) are self-hosted woff2 files in
  `src/fonts/` with no CDN dependency; case-study pages stay on
  zero-payload system stacks.
