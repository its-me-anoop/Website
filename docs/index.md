# Flutterly — Documentation

The marketing + portfolio site for Flutterly Ltd, a UK app & web development
studio. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4,
Framer Motion, and a WebGL shader background (three.js / React Three Fiber).

## Contents

- [Design System — "Obsidian Studio"](./DESIGN-SYSTEM.md) — tokens, primitives,
  motion, and accessibility rules. Start here before building UI.

## Architecture at a glance

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, JSON-LD, fonts
│   ├── template.tsx        # Route transition wrapper
│   ├── page.tsx            # Homepage composition
│   ├── globals.css         # Design tokens + Tailwind theme + utilities
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots
│   └── projects/           # Case-study subpages (sipli, artling)
├── components/
│   ├── ui/                 # Design-system primitives (Button, Reveal, …)
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Homepage sections (Hero, Services, …)
│   ├── visual/             # ShaderBackground + ShaderField (WebGL)
│   └── projects/           # Per-product landing UIs
├── lib/
│   ├── site.ts             # Single source of truth for SEO/site constants
│   └── utils.ts            # cn() class merger
└── fonts/                  # Bundled Outfit display font
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
  Twitter) plus Organization / WebSite / ProfessionalService JSON-LD in the
  root layout, with `SoftwareApplication` JSON-LD on product pages.
- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Shared constants come from `src/lib/site.ts` so details never drift.
