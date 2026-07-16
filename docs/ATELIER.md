# Design Language — "Atelier" (homepage)

The homepage's warm gallery language, translated from a motion-design
reference: a cream canvas, oversized grotesque type revealed word by
word, fanned art cards with `@handle` speech-bubble chips, folder-tab
browsing, marquee bands and pill chrome. It is scoped to the home route
by the `.atelier-root` wrapper (`src/components/home/atelier/AtelierHome.tsx`);
everything under `/projects/*` stays on
[Porcelain](./DESIGN-SYSTEM.md).

> TL;DR — `#F1EFEB` cream + `#22211F` charcoal ink, terracotta /
> violet / lime accents, Space Grotesk display and body, pill buttons
> and chips everywhere, and scroll-staggered word reveals.

---

## 1. Tokens

Declared in `src/app/globals.css` (`:root` + `@theme inline`), all
prefixed `--at-*` / `at-` utilities.

| Token | Value | Utility | Use |
|---|---|---|---|
| `--at-canvas` | `#F1EFEB` | `bg-at-canvas` | Page canvas |
| `--at-panel` | `#F8F7F4` | `bg-at-panel` | Raised cards, footer panel |
| `--at-surface` | `#FFFFFF` | `bg-at-surface` | Pills, tiles, arrows |
| `--at-ink` | `#22211F` | `text-at-ink` | Primary text |
| `--at-ink-soft` | `#55534D` | `text-at-ink-soft` | Secondary text |
| `--at-muted` | `#A3A099` | `text-at-muted` | Ghost words, captions |
| `--at-dark` | `#262523` | `bg-at-dark` | Dark pills, chips, folder panel |
| `--at-terracotta` | `#B65437` | `text-at-terracotta` | Headline accent, chips |
| `--at-violet` | `#6A58E0` | `bg-at-violet` | Feature card, View-all pill |
| `--at-lime` | `#E7ECB4` | `bg-at-lime` | Ticker band |
| `--at-sun` / `--at-pink` / `--at-sky` | `#DC9552` / `#C96F88` / `#DBE7EE` | tints | Panel + card tints |

Type is Space Grotesk (self-hosted variable font, `--font-grotesk`),
weight 500 for display sizes with `-0.035em` tracking.

## 2. Signature moves

- **RevealWords** (`primitives.tsx`) — headlines split into words that
  rise out of clipped line boxes with a per-word stagger. The observed
  element is the *heading itself*, which propagates a `visible` variant
  to the words: a fully-clipped word is invisible to
  IntersectionObserver, so `whileInView` must never sit on the word.
  Spaces must be siblings of the inline-block clip spans (a space inside
  collapses at the boundary). Segments can be tinted ink / muted /
  terracotta / violet.
- **Fanned decks** — hero and statement art cards rotate/translate from
  a stack into a fan; the statement cluster is scroll-linked
  (`useScroll` + `useTransform`).
- **`@handle` chips** — `HandleChip`, a rotated pill with a CSS
  `clip-path` speech tail (`.at-chip-tail`), always `aria-hidden`.
- **Marquees** — `.animate-marquee` / `.animate-marquee-rev` with
  duplicated content (second copy `aria-hidden`) and `.edge-mask`.
- **Folder tabs** — the work browser (`Vision.tsx`) uses a real
  `role="tablist"` with a dark tab connected to a dark panel
  (`rounded-3xl rounded-tl-none`).

## 3. Sections (in order)

`Nav → Hero → Trusted → Showcase (#featured) → Statement →
WorkCarousel (#work) → Vision → Stories (#services, #process) →
Community → Ticker → SplitCta (#about) → Footer (#contact)`

All content (projects, services, tiles, footer links) lives in
`src/components/home/atelier/data.ts`.

## 4. Motion & accessibility rules

- Every `m.*` component renders under the `LazyMotion strict`
  provider in `template.tsx` — always import `m`, never `motion`.
- `useReducedMotion()` gates every entrance: reduced-motion users get
  static, fully-visible content (RevealWords renders plain spans).
- Carousels are buttons with `aria-label`s; the showcase announces
  slides via `aria-live="polite"`; decorative art uses empty `alt`.
- Focus outlines use the terracotta accent; selection is terracotta.
