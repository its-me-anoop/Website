# Documentation

The site of Flutterly Ltd — the product studio of Anoop Jose. Built
with Next.js 16 (App Router), React 19 and Tailwind CSS v4. The
homepage runs the warm "Atelier" language (cream gallery, staggered
word reveals, fanned cards, pill chrome); case-study pages run the
light "Porcelain" system with Framer Motion.

## Contents

- [Design Language — "Atelier"](./ATELIER.md) — homepage tokens,
  signature moves, and the motion system.
- [Design System — "Porcelain"](./DESIGN-SYSTEM.md) — tokens,
  primitives, motion, and accessibility rules for case-study pages.

## Architecture at a glance

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD, skip link
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Atelier homepage composition
│   ├── globals.css         # Design tokens + Tailwind theme + utilities
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots
│   └── projects/           # Case-study subpages (sipli, artling)
├── components/
│   ├── home/atelier/       # Atelier homepage (nav, sections, primitives, data)
│   ├── ui/                 # Porcelain primitives (Button, LiftCard, …)
│   ├── layout/             # Porcelain Navbar/Footer (case-study pages)
│   └── projects/           # Per-product landing UIs
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
