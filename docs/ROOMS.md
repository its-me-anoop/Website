# Design Language — "Rooms"

The marketing site (home, services, GP practices, care homes, packages,
Clear Path, free audit, audit report, booking, accessibility statement,
404) runs Rooms. Every section is a room: a wall of one flat colour, a
floor of another, and a few things standing in it. Headlines are a heavy
grotesque with one word in an italic serif; captions are typewritten and
marked up like a plain-text file; every control is a pill; a vermilion
dot follows the wordmark around.

Rooms replaced "Sorted" (a chalk desk, navy rules, keys with a pressed
side, 3D slabs) in 2026-11. It is inspired by the scroll film at
human-md.ai: its flat walls and floors, its pairing of a grotesque with
a serif, its typewriter captions and its pink index pill. Nothing is
copied from it: the illustrations, words and layout are Flutterly's own,
and the content of the site is unchanged from Sorted.

Everything is scoped to `.s-root` (see `Shell`), or `.s-chrome` for the
bar and footer around a case-study page, so no token leaks into
`/projects/*` or `/demo/*`. The `s-` prefix and the token names are the
slots components read, kept from Sorted so that a tone still means the
same thing to every component.

## Palette (`src/app/globals.css`)

Flat colour. A gradient is only ever a ruled line (the notebook footer,
the underline that draws in).

| Token | Value | Use |
|---|---|---|
| `--s-chalk` / `--s-chalk-2` | `#f4efe8` / `#e6e2db` | Paper: the neutral wall, the paper floor, inset wells |
| `--s-white` | `#fffdf8` | Cards, stickers, the audit field |
| `--s-navy` | `#201e1f` | Ink: text, rules, the dark room (≈14:1 on paper) |
| `--s-cobalt` | `#0b41c2` | The studio's wall: hero, closing band, Websites |
| `--s-flame` / `--s-flame-deep` | `#fc4109` / `#c93205` | Vermilion, lifted from the butterfly: the dot, the action pill (ink text ≈4.5:1), and (deep) the serif word on paper |
| `--s-pink` | `#ffabc8` | A wall, a floor, the index pill, Social media |
| `--s-sky` | `#e7bfff` | The lilac wall (audit) |
| `--s-sun` | `#f8d867` | The yellow wall (studio), SEO, the focus ring |
| `--s-jade` | `#69b488` | The mint wall (process), IT support |
| `--s-ochre` | `#c7963c` | The ochre wall (work, the index) |
| `--s-bottle` / `--s-tomato` | `#1c3d24` / `#e83729` | Floors only |

### Tones

A room or a card takes one `tone-*` class (`chalk`, `white`, `sky`,
`cobalt`, `navy`, `flame`, `sun`, `jade`, `pink`, `ochre`). The class
paints the background and remaps the semantic tokens every component
reads: `--s-bg`, `--s-raised`, `--s-ink`, `--s-ink-soft`, `--s-muted`,
`--s-line`, `--s-line-2`, `--s-accent` (ticks, numbers, links as text),
`--s-mark` (the serif word in a headline), `--s-action` /
`--s-action-ink` / `--s-action-edge` (the primary pill and its hover),
and `--s-pass` / `--s-warn` / `--s-fail`. A component built on
`text-s-ink`, `border-s-line-2` and `.s-key` therefore comes out right
on any wall without knowing where it is. Every pairing is ≥ 4.5:1
(3:1 for the large serif word).

The action follows the wall: vermilion on paper and in the dark room,
pink on cobalt, ink on every bright wall.

### Dark theme and Safari's Adaptive Dark Mode

Rooms pages carry their own dark theme under
`@media (prefers-color-scheme: dark)`, and declare
`color-scheme: light dark` (CSS on `html:has(.s-root)` and the
`color-scheme` meta from each page's `viewport`). That declaration is
what tells Safari 27.3's Adaptive Dark Mode to leave a page alone
instead of repainting it.

- Only the neutral walls change: paper, white and lilac become three
  depths of ink (`#201e1f`, `#282627`, `#2b2233`) with paper type and
  pink for the serif word. Cobalt, vermilion, sun, mint, pink and ochre
  rooms are the brand and stay as they are, as do the floors.
- `--s-rule` is the colour of firm rules: ink in light, `#8d8a85` in
  dark. Use `border-s-rule`, never a literal ink, for a rule that must
  show on both.
- Captures of real sites (`Frames.tsx`), the audit field, the pills of
  the bar and the Cal.com booker stay light on purpose.
- The dark block is scoped to `.s-root`, so the bar and footer around a
  light case-study page (`.s-chrome`) do not turn dark on their own.
- `theme-color` is `#f4efe8` in light and `#201e1f` in dark.
- Case-study pages, `/duo` and the `/demo/*` sample sites have no dark
  theme and declare light only.

### The colour code

`ui/tones.ts` maps each service to one tone, used for its row in the
services index, its page hero, its mark in the menu and its stickers on
the hero wall: Websites cobalt, Apps vermilion, IT support mint, Social
media pink, SEO sun.

Tailwind utilities are generated as `bg-s-*`, `text-s-*`, `border-s-*`.

## Type

Three faces, all SIL OFL and self-hosted in `src/fonts/`.

- **Bricolage Grotesque** (variable weight): everything that is not one
  of the two below.
  - **Display** (`.s-display`): weight 800, tracking −0.052em,
    line-height 0.94 (override with `--lh`).
  - **Statement** (`.s-say`): weight 300, large, for a sentence said out
    loud (the hero's offer, a service's summary, the founder's note).
  - **Body**: 400–600.
- **Instrument Serif**, italic: the emphasised word. `<em>` inside a
  display heading (or `.s-mark` on its own, e.g. a numeral) changes
  voice instead of weight, and takes the tone's `--s-mark` colour.
- **Cutive Mono**: captions (`.s-label`, `.s-mono`), in the case they
  were written in. A typewriter's space is a full cell, so word-spacing
  is pulled in.
- **Eyebrow** (`.s-eyebrow`): the section's label, lowercase and bold,
  behind a typewritten `##`. Small print and facts take a `>`.

## Surfaces and controls

- **Pills** (`.s-key`): every button and link-button is fully round and
  flat. It lightens and rises a pixel under the pointer and sinks when
  pressed. Variants: default (the tone's action), `.s-key-plain`
  (paper), `.s-key-navy` (ink), `.s-key-pink`, `.s-key-outline`.
  `ButtonLink` wraps them.
- **Cards**: a flat fill with 24–28px corners and no outline; the colour
  against the wall is the edge. Never a shadow.
- **Stickers** (`.s-chip`): a word on a piece of paper with corners that
  are not quite square (service tags, the hero's twelve pieces).
- **Floor** (`ui/Room.tsx`, `.s-floor`): the block at the foot of a
  room, in its own colour, with a skirting board in the shade of the
  wall. Things that should stand on it are pulled over it with a
  negative margin. `PageHero` picks the floor that goes with its wall.
- **Porthole** (`.s-porthole`): a disc of another colour let into the
  wall, behind the content.
- **Dot** (`.s-dot`): the vermilion dot after the wordmark, beside the
  hero's serif word and under the current link. Its colour is `--s-dot`:
  vermilion, or ink on the vermilion wall.
- **Frames** (`ui/Frames.tsx`): `BrowserFrame` and `PhoneFrame` draw a
  flat window or phone around a real capture. One `<figure role="img">`
  carries the description; an empty `alt` makes the frame decorative.
- **Notebook** (`.s-ruled`, `.s-hl`): the footer is a ruled page with a
  margin line; the pointer runs a pink highlighter under a link.

## The bar and the index

`layout/Nav.tsx`. There is no bar: three groups of outlined pills float
over whatever room is at the top of the window (the page's first section
runs to the top and leaves `pt-28` or more for them). The wordmark and
its dot on the left; the routes on a paper pill from `lg`; the audit
link, the booking pill and the pink **index** pill on the right.

The index opens the whole site as cards on an ochre wall: one per
route, numbered in the serif and landing a little askew, then the five
services as stickers and the two ways to start. It is a modal: Tab is
held inside it, Escape closes it and returns focus to the pill, and the
page behind does not scroll.

## The rooms of the home page

| Room | Wall | Floor | What stands in it |
|---|---|---|---|
| Hero | cobalt | paper | The tagline across the wall with "sorted." in the serif; twelve stickers, askew with a problem showing, that the dot fixes one by one as the page scrolls; three typewritten lines on the floor |
| Clients | paper | – | Logos as ink masks on rounded tiles |
| Services | ink | pink | Five rounded rows in the service colours that open under the pointer (`.idx`, CSS only; all open on touch) |
| Work | ochre | bottle | Every project as a card with its picture on a coloured mat, a degree or two off square |
| Audit | lilac | tomato | The exploded page (`ui/XRay.tsx`) standing on the floor beside the audit bar |
| Studio | sun | paper | The founder's portrait in an arch |
| Process | mint | tomato | Four paper cards numbered in the serif |
| Contact | vermilion | cobalt | The question beside a sun porthole |

## The travelling dot

`effects/DotTrail.tsx`, mounted once in `Shell`. One dot is carried down
every Rooms page. It stands on whichever **anchor** is nearest the
middle of the window, moves with that element as the page scrolls, and
hops to the next in an arc when another comes nearer: it stretches as it
flies, squashes as it lands, and what it lands on gives a little. It
starts as the dot beside "sorted." in the hero and ends, grown to size,
as the dot of the footer's wordmark.

An anchor is any element with `data-dot`:

| `data-dot` | The dot… |
|---|---|
| `top` (or empty) | perches on the element's top edge; `data-dot-x` says where along it (`"0.25"`, `"12px"`, `"-20px"` from the right) |
| `slot` | fills a placeholder at the placeholder's own size (`<Dot slot />`) |
| `start` | stands just before a line of text |
| `steps` | visits the element's `data-dot-step` children in turn: a row left to right as it rises past the eye's line, a grid like a page |

The serif word of every section heading is an anchor without being
marked, as is that of a page heading (`Display dotEm`). `Eyebrow` and
the audit bar's button are anchors wherever they appear, so inner pages
get a route for free. `data-dot-pin` holds the dot on one anchor
whatever else is nearer (the hero's sticker being fixed).

What the dot lands on is told in attributes, and answers in CSS:
`data-dot-hit` for the moment of landing (a nudge, written with
`translate` and `scale` so it adds to the element's own transform) and
`data-dot-on` while the dot stays (a service's arrow turns, a client's
tile turns pink and leans, a picture straightens, a process card lifts).

The arithmetic (where the dot stands, which anchor wins, the spring) is
in `effects/dot-math.ts` and tested there. The loop only runs while
something is moving. The dot is `aria-hidden`, takes no pointer events,
is not printed, and does not exist under reduced motion or without
JavaScript, where the placeholders show their own dots.

## Motion

| Motion | Where | What it does |
|---|---|---|
| **Sticker wall** (`home/Hero.tsx`, `.sort-*`, `.hero-scene`) | Home hero | Flat, and played by the scroll. One number, `--q` (`home/hero-scroll.ts`), runs from 0, the wall as found, through one unit per sticker to the letters of "sorted." settling; CSS works each sticker out from it. On a wide, tall window the room holds still (`position: sticky`) while it plays; on a small one it plays as the wall scrolls past. The wall drifts away from a mouse |
| **Rise** (`Reveal`, `SplitWords`, `.s-rise`) | Everywhere | Blocks rise into place, some landing a degree or two off square; headline words rise one at a time |
| **Pictures** (`.shot`) | Work, sample sites, case studies | A capture hangs off square, drifts in on scroll (CSS scroll timeline) and straightens under the pointer |
| **Exploded page** (`ui/XRay.tsx`) and **slab stack** (`ui/SlabStack.tsx`) | Audit, inner-page heroes, 404 | The only 3D left: two small, bounded DOM scenes with their own `perspective` |
| **Curtains** (`.route-flaps`) | Between pages | Five panels in wall colours cover the new page and lift away |

### Rules that keep it fast and safe

- **The page is right without JavaScript.** The hero's scene is one
  custom property; the stylesheet's default for it is past the end, a
  `<noscript>` rule keeps it there and lets go of the pin, and reduced
  motion does the same. The headline is never hidden or delayed: at the
  first frame its last word is askew, still readable, and its
  accessible name is the whole sentence.
- Transform and opacity only. No animated `filter`, no `blur()`, no
  backdrop blur, no canvas (`effects/scene-safety.test.tsx` guards this).
- The page shell is never a 3D context.
- Scroll-linked motion sits behind `@supports (animation-timeline:
  view())`; other browsers show the finished state.
- Pointer-following runs only with a fine pointer.
- `prefers-reduced-motion` stops every scene and shows every entrance in
  its end state: the hero is sorted and does not hold, and there is no
  travelling dot.
- Component classes in `globals.css` are unlayered, so they beat
  Tailwind utilities. `.s-key`'s `display` alone sits in
  `@layer components` so `hidden` and `lg:hidden` still apply. For the
  same reason `.s-mark` sets no font size (a numeral takes a utility)
  and `Dot` is rendered conditionally rather than hidden.

## Accessibility

WCAG 2.2 AA. Focus is two rings, ink inside sun, so it shows on every
wall. Decorative scenes, floors without content, portholes and dots are
`aria-hidden`. `npm run test:contrast` measures the text of every
opening and closing room against the pixels actually painted behind it
(wall, porthole, floor), sorted and as found, at five screen sizes.

## Social cards

`node scripts/og-card.mjs` renders `public/og-flutterly.png` and
`public/og-healthcare.png` from the same faces and palette.
