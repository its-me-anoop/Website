# Flutterly

The marketing + portfolio website for **Flutterly Ltd** — a UK app & web
development studio based in Reading. Designed and engineered around the
["Obsidian Studio" design system](./docs/DESIGN-SYSTEM.md): a refined dark
theme with generous whitespace, a single citron accent, framer-motion
choreography, and a WebGL shader background.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** for animation + route transitions
- **three.js / React Three Fiber** for the shader field
- **Vitest** + Testing Library for tests
- **Outfit** (bundled local) display font + system font stacks (no build-time
  webfont fetch)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (typechecks too) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx vitest run` | Run the test suite |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview and
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for tokens, primitives,
motion, and accessibility guidelines.

## Highlights

- **Design system** in `src/app/globals.css` mapped to Tailwind utilities.
- **Reusable primitives** in `src/components/ui/` (`Button`, `SectionHeader`,
  `SpotlightCard`, `Reveal`, `Marquee`, `PhoneFrame`).
- **Performant WebGL background** that lazy-loads, falls back to CSS, and
  respects `prefers-reduced-motion`.
- **SEO**: metadata + JSON-LD structured data, sitemap, robots, semantic HTML,
  and an accessible, reduced-motion-aware UI.

© 2026 Flutterly Ltd.
