# Documentation

The portfolio site of Anoop Jose — developer & designer, founder of Flutterly
Ltd. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and
Framer Motion, in an Apple-inspired light design language.

## Contents

- [Design System — "Porcelain"](./DESIGN-SYSTEM.md) — tokens, primitives,
  motion, and accessibility rules. Start here before building UI.

## Architecture at a glance

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, JSON-LD, skip link
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Homepage composition
│   ├── globals.css         # Design tokens + Tailwind theme + utilities
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots
│   └── projects/           # Case-study subpages (sipli, artling)
├── components/
│   ├── ui/                 # Design-system primitives (Button, LiftCard, …)
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Homepage sections (Hero, FeaturedWork, …)
│   └── projects/           # Per-product landing UIs
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

## SEO

- Per-route `metadata` (title template, description, canonical, OpenGraph,
  Twitter) plus Person / Organization / WebSite JSON-LD in the root layout,
  with `SoftwareApplication` JSON-LD on product pages.
- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Shared constants come from `src/lib/site.ts` so details never drift.
- System font stacks → zero font payload, no render-blocking webfont fetch.
