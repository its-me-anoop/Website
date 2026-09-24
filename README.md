# Flutterly — Websites for GP practices and care homes

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). The marketing pages (home, GP practices,
care homes, packages, Clear Path, free audit, booking, accessibility) run
the ["Signal" design language](./docs/SIGNAL.md): ink and warm paper,
one signal-yellow accent that doubles as the focus ring, Archivo
headlines over Atkinson Hyperlegible Next, and the audit bar as the
hero action.
Case-study pages (`/projects/*`) keep the light
["Porcelain" system](./docs/DESIGN-SYSTEM.md), and five fictional
sample sites under `/demo/*` each carry their own sector-specific scope.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** (single `LazyMotion` provider, `m` components,
  reduced-motion aware)
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow and axe-core accessibility audit
- **Self-hosted fonts**: Archivo and Atkinson Hyperlegible Next as woff2 in `src/fonts/` (Zodiak and Switzer remain for the
  printed audit report); case-study and demo pages stay on system stacks

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
| `npm run cms:validate` | Validate shipped demo content against the schemas |
| `npm run test:browser` | Headless-browser audit of every route (server on :3100) |
| `npm run test:a11y` | axe-core WCAG 2.2 A/AA audit of every route (server on :3100) |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/SIGNAL.md`](./docs/SIGNAL.md) for the marketing language,
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for the Porcelain
tokens used by the case-study pages, and [`DESIGN.md`](./DESIGN.md) for
the demo-site scopes.

## Highlights

- **The instant audit**: paste a website address into the audit bar,
  press the arrow, and `/audit` fetches the page server-side, runs about
  sixty checks across seven areas (accessibility, speed, search,
  content, mobile, security, local presence), and renders a scored,
  prioritised report with a sales section keyed to the weakest areas and
  a prefilled email for the written follow-up. The engine lives in
  `src/lib/audit/` (see [`docs/AUDIT.md`](./docs/AUDIT.md)); the API is
  `GET /api/audit?url=…`, rate-limited, SSRF-guarded, nothing stored.
  The bar is the hero action and the closing action on every page.
- **Vision lens**: the homepage hero can be viewed through blurred
  vision, cataracts, a phone in sunlight or no colour, with a lens that
  follows the pointer. The studio's argument, made by the page itself.
- **Live sample sites**: the five sample sites run inside the page,
  scaled into a frame, behind an accessible tablist with arrow keys.
- **Highlighter emphasis**: emphasised words get a yellow marker stroke
  that draws in with scroll, in CSS only.
- **Accessibility as a feature**: WCAG 2.2 AA contrast on every pair,
  one `<h1>` per page, skip link, keyboard-operable menu and tabs,
  `prefers-reduced-motion` honoured everywhere, axe audited.
- **SEO**: per-route metadata, Person / Organization / Service / FAQ
  JSON-LD, sitemap and robots, shared constants in `src/lib/site.ts`.

© 2026 Flutterly Ltd.
