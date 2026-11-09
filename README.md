# Flutterly — Your digital side, sorted.

The site of **Flutterly Ltd**, the one-person studio of **Anoop Jose**
(Reading, UK) for **websites, apps, IT support, social media and SEO**,
with a specialism in accessible healthcare websites.

The marketing pages (home, services, GP practices, care homes, packages,
Clear Path, free audit, booking, accessibility) run the
["Sorted" design language](./docs/SORTED.md): chalk and navy, flat
colour, one typeface (Archivo), five colours that code the five
services, and small 3D scenes built from plain DOM. The home page opens
on a sorting table where twelve pieces of a digital side arrive
scattered and drop into rows, fixed. Case-study pages (`/projects/*`)
keep the light ["Porcelain" system](./docs/DESIGN-SYSTEM.md) for their
content inside the Flutterly bar and footer (`ProductShell`), and five
fictional sample sites under `/demo/*` each carry their own
sector-specific scope.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** (single `LazyMotion` provider, `m` components,
  reduced-motion aware)
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow and axe-core accessibility audit
- **Self-hosted fonts**: Archivo (variable weight and width) as woff2 in
  `src/fonts/`, for the marketing pages and the printed audit report;
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
| `npm run test:contrast` | Worst-case contrast of hero and closing-band text (server on :3100) |
| `node scripts/og-card.mjs` | Re-render the two social cards |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/SORTED.md`](./docs/SORTED.md) for the marketing language,
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
- **The sorting table**: the home hero is twelve tiles (website, domain,
  email, backups, Wi-Fi, search…) that arrive scattered in 3D with a
  problem showing, then drop into rows with it fixed. A switch flips the
  table back to "as found". Plain DOM and CSS: it plays without
  JavaScript and the first paint is the finished layout.
- **A colour for each service**: cobalt, flame, jade, pink and sun
  follow Websites, Apps, IT support, Social media and SEO from the card
  index on the home page to each service's own page.
- **3D that means something**: an audit page pulled apart into its seven
  scored layers, captures of live sites on slabs that turn to face you,
  a staff pass on a lanyard for the one-person studio, and route
  changes that flip like a departure board. All of it stops under
  reduced motion.
- **Showcase tabs**: an accessible tablist of the five sample sites,
  each swung into place as a turned browser slab with its phone, a
  five-up picker row, and arrow-key navigation.
- **Accessibility as a feature**: WCAG 2.2 AA contrast on every pair,
  one `<h1>` per page, skip link, keyboard-operable menu and tabs,
  `prefers-reduced-motion` honoured everywhere, axe audited.
- **SEO**: per-route metadata, Person / Organization / Service / FAQ
  JSON-LD, sitemap and robots, shared constants in `src/lib/site.ts`.

© 2026 Flutterly Ltd.
