# Flutterly — Websites for GP practices and care homes

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). The marketing pages (home, GP practices,
care homes, packages, Clear Path, free audit, booking, accessibility) run
the ["Wayfinder" design language](./docs/WAYFINDER.md): the site behaves
like the signage in a well-run building, with a paper ground, sign-black
plates, one signal-yellow action colour, arrows that do the pointing, and
Atkinson Hyperlegible type designed for readers with low vision.
Case-study pages (`/projects/*`) keep the light
["Porcelain" system](./docs/DESIGN-SYSTEM.md), and five fictional
sample sites under `/demo/*` each carry their own sector-specific scope.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** for the case-study pages (single `LazyMotion`
  provider); the marketing pages use CSS motion and a small
  IntersectionObserver reveal
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow and axe-core accessibility audit
- **Self-hosted fonts**: Atkinson Hyperlegible Next and Mono as woff2 in
  `src/fonts/` (Zodiak and Switzer remain for the printed audit report);
  case-study and demo pages stay on system stacks

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
| `node scripts/render-brand-assets.mjs` | Re-render the social card and icons |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/WAYFINDER.md`](./docs/WAYFINDER.md) for the marketing language,
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
- **A fingerpost that works**: the homepage hero is a street sign whose
  arms swing out on load, and every arm is a real link to a page on one
  of the five sample sites.
- **Motion that means something**: directory rows that flip like
  split-flap plates, a process route line that fills with scroll, and a
  sign-plate curtain between pages, all off for reduced motion.
- **Sample directory**: an accessible tablist of the five sample sites,
  each listing the questions visitors arrive with and the page that
  answers them, with arrow-key navigation.
- **Accessibility as a feature**: WCAG 2.2 AA contrast on every pair,
  one `<h1>` per page, skip link, keyboard-operable menu and tabs,
  `prefers-reduced-motion` honoured everywhere, axe audited.
- **SEO**: per-route metadata, Person / Organization / Service / FAQ
  JSON-LD, sitemap and robots, shared constants in `src/lib/site.ts`.

© 2026 Flutterly Ltd.
