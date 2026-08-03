# Documentation

- [GP Websites CMS foundation](./GP-CMS.md) — reusable architecture, Vercel
  deployment model, workspace isolation and upgrade strategy.

The site of Flutterly Limited, a digital delivery company led by Anoop Jose.
Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4. The
marketing pages (home, GP practices, care homes, packages, free
audit) run the clean healthcare-service "Bloom" language; case-study
pages run the light "Porcelain" system with Framer Motion.

## Contents

- [Design Language — "Bloom"](./BLOOM.md) — marketing-site tokens,
  structure, signature moves, and the motion system.
- [Design System — "Porcelain"](./DESIGN-SYSTEM.md) — tokens,
  primitives, motion, and accessibility rules for case-study pages.

## Architecture at a glance

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD, skip link
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Bloom homepage composition
│   ├── globals.css         # Design tokens + Tailwind theme + utilities
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots
│   ├── gp-websites/        # GP practice sector page
│   ├── care-home-websites/ # Care home sector page
│   ├── packages/           # Packages page
│   ├── free-audit/         # Free website audit page
│   ├── services/           # Full digital delivery offer
│   ├── business-email/     # Email and collaboration setup
│   ├── social-media-marketing/ # Campaign and content support
│   ├── cookie-policy/      # Cookie and local-storage transparency
│   ├── cms/                # Shared GP CMS route adapters
│   ├── practice/           # Branded public-practice route adapter
│   ├── accessibility/      # Accessibility statement
│   └── projects/           # Case-study subpages (sipli, artling)
├── components/
│   ├── bloom/              # Bloom marketing site (shell, nav, footer,
│   │                       # primitives, data, home/sectors/packages/audit)
│   ├── privacy/            # Global consent notice and preference controls
│   ├── ui/                 # Porcelain primitives (Button, LiftCard, …)
│   ├── layout/             # Porcelain Navbar/Footer (case-study pages)
│   └── projects/           # Per-product landing UIs
├── data/gp-cms/            # Fictional host-owned workspace configuration
├── features/gp-cms/        # Extractable core, admin and public renderer
├── fonts/                  # Self-hosted variable woff2 subsets
└── lib/
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
| `npm run test:browser` | Headless-browser audit of every route |

## SEO

- Per-route `metadata` (title template, description, canonical, OpenGraph,
  Twitter) plus Person / Organization / WebSite JSON-LD in the root layout,
  with `SoftwareApplication` JSON-LD on product pages.
- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Shared constants come from `src/lib/site.ts` so details never drift.
- Homepage fonts are self-hosted latin variable subsets (~97KB, no CDN
  dependency); case-study pages stay on zero-payload system stacks.
