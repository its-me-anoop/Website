# Design Language — "Bloom"

The marketing site (home, sector pages, packages, free audit,
accessibility statement) runs the **Bloom** language — a clean
healthcare-service aesthetic inspired by specialist NHS/care web
studios: near-white canvas, soft mint bands, deep pine ink, one teal
action colour, and calm rise-in motion. Case-study pages stay on the
"Porcelain" system (see [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)).

## Scope

Everything is scoped under `.bloom-root` (applied by
`src/components/bloom/BloomShell.tsx`), so Bloom tokens and chrome
never leak into Porcelain pages.

## Tokens (globals.css)

| Token | Role |
|---|---|
| `--bl-canvas` `#fafcfb` | Page background |
| `--bl-band` / `--bl-band-2` | Soft mint section bands |
| `--bl-surface` | Cards |
| `--bl-ink` / `--bl-ink-soft` / `--bl-muted` | Text ramp |
| `--bl-line` / `--bl-line-2` | Hairlines |
| `--bl-pine` / `--bl-pine-2` / `--bl-pine-ink` | Dark bands (process, footer, CTA) |
| `--bl-teal` (+ `-hover`, `-soft`) | The one action colour |
| `--bl-nhs` (+ `-soft`) | GP-practice accent (NHS blue) |
| `--bl-amber` (+ `-soft`) | Care-home accent (warm amber) |

Helpers: `.bl-frost` (sticky-nav blur, with reduced-transparency
fallback), `.bl-card` (soft elevation), `.bl-grid` (faint clinical
grid behind heroes).

## Structure

```
src/components/bloom/
├── BloomShell.tsx     # Nav + <main id="main"> + Footer, .bloom-root scope
├── Nav.tsx            # Sticky frosted nav: links, phone, Get in touch, mobile sheet
├── Footer.tsx         # Pine footer: contact, columns, compliance links
├── CtaBand.tsx        # Closing CTA band (configurable copy per page)
├── primitives.tsx     # EASE, RevealWords, Rise, Eyebrow, SectionHead,
│                      # BtnLink, CheckItem, FaqList
├── data.ts            # Single content model for every Bloom page
├── home/              # Homepage sections (Hero, TrustBar, Suite, Sectors,
│                      # Compare, Audit, Work, Why, Process, About)
├── sectors/           # SectorPage template (GP practices / care homes)
├── packages/          # PackagesPage
└── audit/             # AuditPage (free website audit)
```

## Signature moves

- **Specialist positioning first** — the hero leads with GP practices
  and care homes, honest capability stats (commitments, not invented
  numbers) and layered browser cards of live client work.
- **Sector accents** — NHS blue for GP content, warm amber for care
  homes; teal remains the only action colour.
- **Anti-template comparison** — a real `<table>` (with `sr-only`
  caption) contrasting template builders against a custom build.
- **Free audit** — recurring offer; the audit page requests via a
  prefilled `mailto:` (no backend form).
- **Native disclosure FAQs** — `<details>/<summary>`, no JS state.

## Motion & accessibility

- Entrances use the shared `EASE` curve via `Rise` and `RevealWords`;
  both fall back to static rendering under `prefers-reduced-motion`.
- One `<h1>` per page, `#main` skip-link target in `BloomShell`,
  visible focus styles (teal), AA contrast on every text/background
  pair, and keyboard-operable menus.
