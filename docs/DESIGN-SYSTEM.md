# Design System — "Noir"

The visual language of anoopjose / flutterly.uk: a **cinematic, awwwards-style
dark portfolio** built from the ground up, inspired by the contemporary
landing-page work showcased on lafys.com (loaders, scroll choreography,
marquees, liquid glass, oversized display type).

> TL;DR — near-black canvas, warm bone ink, **one vermilion accent**,
> uppercase Outfit display with outline-stroke moments, film grain, marquee
> strips, and scroll-driven sections. Type *is* the layout.

---

## 1. Principles

1. **Type is the interface.** Oversized uppercase display lines (solid +
   `.text-stroke` hollow pairs) carry every section; UI chrome stays mono,
   tiny, and tracked-out.
2. **One accent.** Vermilion `--accent` marks the live word, the active row,
   the hover state. Everything else is the bone-on-noir ramp.
3. **Choreograph the scroll.** Lines rise out of masks (`RevealText`),
   process cards stack (`Practice`), the hero parallaxes away, marquees never
   stop. Every move has a `prefers-reduced-motion` fallback.
4. **Texture over decoration.** Film grain (`.grain`), hairlines, and the
   liquid-glass lens give depth without imagery.
5. **The index, not the gallery.** Work is a numbered list with hover
   previews — content first, chrome last.

---

## 2. Tokens

All tokens live in `src/app/globals.css` under `:root`, exposed to Tailwind
v4 via `@theme inline`. Use the utility, not the raw variable.

### Canvases

| Token | Value | Utility | Use |
|---|---|---|---|
| `--canvas` | `#0b0b0e` | `bg-canvas` | Page |
| `--canvas-2` | `#101015` | `bg-canvas-2` | Alternating bands |
| `--surface` | `#15151b` | `bg-surface` | Cards |
| `--surface-2` | `#1b1b22` | `bg-surface-2` | Nested chips |
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
| `--accent` `#ff5c28` | `bg-accent` / `text-accent` | Active word, hover, CTA |
| `--accent-ink` `#140a05` | `text-accent-ink` | Text **on** an accent fill |
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

- **Display**: locally-bundled **Outfit** variable (`font-display`) — used
  uppercase at `clamp(40px,7vw,96px)` for section heads, up to
  `clamp(56px,12.5vw,178px)` in the hero. Pair a solid line with a
  `.text-stroke` hollow line.
- **Body** (`font-sans`): system stack, 15px, relaxed 1.7 leading.
- **Mono** (`font-mono`): all labels, numbers, meta — uppercase, tracked
  `0.16em–0.3em`.

---

## 4. Primitives (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `RevealText` | Mask line-reveal for display type. **The mask is the observed element** (a clipped child never intersects); variants propagate to the line. `onMount` for the hero. |
| `Preloader` | 0→100 counter on a black curtain; once per session, ~1.2s, skipped under reduced motion. |
| `Marquee` | Seamless ticker (duplicated children); `duration`, `reverse`. |
| `Button` | Pill CTA — `primary` (vermilion) / `dark` / `outline` / `ghost`. |
| `LiquidGlass` | Cross-browser `feDisplacementMap` refraction lens (see `lib/liquid-glass.ts`); drifts over the hero display. |
| `LiftCard`, `SectionHeader`, `PhoneFrame` | Retained for the case-study subpages. |

---

## 5. Section patterns

- **Hero** — full-svh; meta rows top/bottom, two-line display refracted by the
  glass lens, scroll cue, stats; the stage fades/parallaxes away on scroll.
- **Strip** (`Stack`) — full-bleed double marquee: availability line in
  display type over a counter-scrolling toolbox ticker.
- **Work index** (`FeaturedWork`) — numbered rows, oversized titles; hover
  tints the row vermilion and floats a rotated preview card at the row's
  height.
- **Services** — numbered accordion rows (`aria-expanded`), one open at a
  time, + icon rotates to ×.
- **Process** (`Practice`) — sticky-stacked cards: each pins under the header
  and settles back/dims as the next slides over.
- **About** — editorial split: statement quote, story, meta `dl`, portrait
  with clip-path unmask.
- **Contact finale** — invitation marquee, giant solid/stroke CTA that fills
  vermilion on hover, channel rail. Slim legal footer.

---

## 6. Accessibility checklist

- One `<h1>` per page; sections labelled via `aria-labelledby`.
- All motion gated by `useReducedMotion` (static render) — including the
  preloader, marquees (CSS-paused), reveals and stacked cards.
- The glass lens is `aria-hidden` + pointer-only.
- Focus-visible rings in accent at 3px offset; skip-link to `#main` on every
  page.
- Contrast: bone on noir ≥ AA; `accent-ink` on accent ≥ AA.

---

## 7. Verification

`npm run lint` · `npx tsc --noEmit` · `npx vitest run` ·
`npm run build` · `npm run test:browser` (Playwright audit: routes ×
viewports, anchors, h1/#main, menu + accordion interactions, reduced motion).
