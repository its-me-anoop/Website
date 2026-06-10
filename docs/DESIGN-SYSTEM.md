# Design System — "Lumen"

The visual language of flutterly.uk: a **refined dark SaaS-studio** look
inspired by Lumio (lumio.apollostudio.design): composed sentence-case display
type, small all-caps mono labels, one calm **teal accent**, and a live
animated dashboard as the hero centrepiece.

> TL;DR — near-black canvas, warm bone ink, teal `#2fd6c3`, sentence-case
> Outfit display + mono caps labels, generous air, and product-credible
> motion (counters, chart draws, calm reveals).

---

## 1. Principles

1. **Composed, not shouty.** Sentence-case display lines with small
   all-caps mono labels above them; UI chrome stays tiny and tracked-out.
2. **One accent.** Teal `--accent` marks labels, the active row, the hover state. Everything else is the bone-on-noir ramp.
3. **Product-credible motion.** Counters count, the velocity chart draws
   itself, reveals are calm. Every move has a `prefers-reduced-motion`
   fallback.
4. **Texture over decoration.** Soft teal glows, hairlines and surface
   panels give depth without imagery.
5. **The index, not the gallery.** Work is a numbered list with hover
   previews — content first, chrome last.

---

## 2. Tokens

All tokens live in `src/app/globals.css` under `:root`, exposed to Tailwind
v4 via `@theme inline`. Use the utility, not the raw variable.

### Canvases

| Token | Value | Utility | Use |
|---|---|---|---|
| `--canvas` | `#0a0b0d` | `bg-canvas` | Page |
| `--canvas-2` | `#0f1114` | `bg-canvas-2` | Alternating bands |
| `--surface` | `#14161a` | `bg-surface` | Cards |
| `--surface-2` | `#1a1d22` | `bg-surface-2` | Nested chips |
| `--night` | `#000000` | `bg-night` | Contact finale / curtain |
| `--night-ink` | `#f4f2ec` | `text-night-ink` | Text on night |

### Ink (warm bone ramp)

`--ink #f4f2ec` → `text-ink` (primary) · `--ink-2 #cfcdc5` · `--ink-3 #9c9a92`
(body) · `--muted #6f6e68` (labels) · `--faint #33323a` (disabled).

### Hairlines

`--line` / `--line-2` / `--line-3` → `border-line(-2/-3)` — bone at
8% / 14% / 22%.

### Accent

| Token | Utility | Use |
|---|---|---|
| `--accent` `#2fd6c3` | `bg-accent` / `text-accent` | Active word, hover, CTA |
| `--accent-ink` `#04231f` | `text-accent-ink` | Text **on** an accent fill |
| `--accent-soft` | `bg-accent-soft` | Tinted ghost wash |

Supporting hues (`indigo/teal/orange/pink/green`) tint project previews only.

### Product themes

`.sipli-theme` (light aqua) and `.artling-theme` (warm cream) re-map the
semantic tokens for the case-study subpages, which keep their own light
product identities (`color-scheme: light`).

### Radii, spacing, motion

Radii 6→30px (`rounded-[var(--r-lg)]`…); section rhythm
`--space-section: clamp(6rem, 12vw, 12rem)`; measure 1320px; easing
`--ease-out-expo` etc. — in framer use `[0.16, 1, 0.3, 1]`.

---

## 3. Typography

- **Display**: locally-bundled **Outfit** variable (`font-display`) —
  sentence case at `clamp(30px,4.4vw,52px)` for section heads, up to
  `clamp(40px,6.5vw,84px)` in the hero.
- **Body** (`font-sans`): system stack, 15px, relaxed 1.7 leading.
- **Mono** (`font-mono`): labels and meta — small caps, tracked `0.16em–0.28em`.

---

## 4. Primitives (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `RevealText` | Mask line-reveal for display type. **The mask is the observed element** (a clipped child never intersects); variants propagate to the line. `onMount` for the hero. |
| `Preloader` | 0→100 counter on a black curtain; once per session, ~1.2s, skipped under reduced motion. |
| `Marquee` | Seamless ticker (duplicated children); `duration`, `reverse`. |
| `Button` | Pill CTA — `primary` (teal) / `dark` / `outline` / `ghost`. |
| `LiquidGlass` | Cross-browser `feDisplacementMap` refraction lens (see `lib/liquid-glass.ts`); available, currently unused. |
| `LiftCard`, `SectionHeader`, `PhoneFrame` | Retained for the case-study subpages. |

---

## 5. Section patterns

- **Hero** — caps label, sentence-case display, support line, paired CTAs,
  then the `DashboardPreview` centrepiece: window chrome, count-up metrics,
  a self-drawing velocity chart with scan-line, sparkbars, cursor tilt.
- **Strip** (`Stack`) — quiet logo band: caps label + slow toolbox marquee.
- **Work index** (`FeaturedWork`) — numbered rows; hover tints the row teal
  and floats a preview card that tracks the row.
- **Services** — numbered accordion rows (`aria-expanded`), one open at a
  time, + icon rotates to ×.
- **Process** (`Practice`) — Lumio-style step grid: teal icon tiles, step
  numbers, duration chips, and an accent promise tile.
- **About** — editorial split: statement quote, story, meta `dl`, portrait
  with clip-path unmask.
- **Contact finale** — caps invitation label, giant gradient CTA, channel
  rail. Slim legal footer.

---

## 6. Accessibility checklist

- One `<h1>` per page; sections labelled via `aria-labelledby`.
- All motion gated by `useReducedMotion` (static render) — including the
  preloader, marquee (CSS-paused), counters, chart draw and reveals.
- Decorative chart/sparkline layers are `aria-hidden`.
- Focus-visible rings in accent at 3px offset; skip-link to `#main` on every
  page.
- Contrast: bone on noir ≥ AA; `accent-ink` on accent ≥ AA.

---

## 7. Verification

`npm run lint` · `npx tsc --noEmit` · `npx vitest run` ·
`npm run build` · `npm run test:browser` (Playwright audit: routes ×
viewports, anchors, h1/#main, menu + accordion interactions, reduced motion).
