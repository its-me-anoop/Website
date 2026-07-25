# Documentation

The site of Flutterly Ltd — the product studio of Anoop Jose. Built
with Next.js 16 (App Router), React 19 and Tailwind CSS v4. Every
Flutterly-branded route — marketing pages, case studies and policies —
runs the warm, editorial "Aurum" language over one shared animated
ground. The two sample client sites under `/demo/*` keep their own
scoped palettes on purpose.

## Contents

- [Design Language — "Aurum"](./AURUM.md) — tokens, the shared
  ground, the night inversion, the effects kit, signature moves and
  the motion system.
- [Design System — "Porcelain"](./DESIGN-SYSTEM.md) — the light
  system the case-study markup was built on; its semantic tokens are
  now remapped onto the Aurum paper per product scope.

## Architecture at a glance

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, JSON-LD, skip link
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Aurum homepage composition
│   ├── globals.css         # Design tokens + Tailwind theme + utilities
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots
│   ├── gp-websites/        # GP practice sector page
│   ├── care-home-websites/ # Care home sector page
│   ├── packages/           # Packages page
│   ├── free-audit/         # Free website audit page
│   ├── accessibility/      # Accessibility statement
│   └── projects/           # Case-study subpages (sipli, artling)
├── components/
│   ├── fx/                 # Effects kit (ground, particles, reveals,
│   │                       # plates, device frames, tilt, magnetism,
│   │                       # marquee, count-up)
│   ├── aurum/              # The site itself (shell, nav, footer, legal,
│   │                       # primitives, data, home/sectors/packages/audit)
│   ├── ui/                 # Primitives used by the case studies
│   ├── demos/              # The two sample client sites
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
| `npm run test:contrast` | WCAG 2.2 AA contrast audit of every rendered text node |

## SEO

- Per-route `metadata` (title template, description, canonical, OpenGraph,
  Twitter) plus Person / Organization / WebSite JSON-LD in the root layout,
  with `SoftwareApplication` JSON-LD on product pages.
- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Shared constants come from `src/lib/site.ts` so details never drift.
- Fonts are self-hosted latin variable subsets — Bricolage Grotesque
  (with its optical-size axis) and Figtree, ~97KB, no CDN dependency.
  Syne is loaded without preload for the care-home demo alone.
