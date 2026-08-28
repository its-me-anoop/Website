# NHS digital service manual & NHS.UK design system — applied to the Willowbrook Surgery demo

Scope: primary sources read directly from `service-manual.nhs.uk` (design system components/patterns, content guide), `digital.nhs.uk` (content style guide), `england.nhs.uk` (GP practice website contract requirements), and a live NHS.UK GP profile page (Victoria Medical Centre) used as a real-world reference for what nhs.uk shows for a practice. I cross-checked all of this against the current demo source at `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/**` and `src/components/demos/gp/{GpShell.tsx,data.ts}`, so the "do/don't" guidance below is grounded in your actual copy and components, not generic.

Top-line verdict: the demo's structure, colour system and most components are unusually faithful to the service manual (NHS blue #005eb8, green buttons, yellow focus, table markup, care-card colour logic are all correct). The gaps are mostly **content-style mechanics** (time/date formatting, "medicine" vs "medication", one banned term already correctly avoided), **component selection at the margins** (warning callout used for things that aren't warnings), and **two missing patterns** (review dates, contents list) that are cheap to add and would materially increase credibility with a GP practice manager evaluating this as a sales artifact — because those two patterns are exactly what they'll recognise from maintaining their own NHS.UK profile.

---

## 1. Relevant components and patterns

Source: [Components](https://service-manual.nhs.uk/design-system/components) and [Patterns](https://service-manual.nhs.uk/design-system/patterns) indexes.

### Header
There is **no single "header" component** — there's a decision tree. [Header component](https://service-manual.nhs.uk/design-system/components/header):
- **Do** use the plain "logo + service name" header for transactional journeys (reduces distraction).
- **Do** use an **organisational header** (blue / white / white-with-blue-nav) for a local NHS body like a GP surgery, not the standard nhs.uk header — the standard header is reserved for the national site.
- **Do not** make header elements sticky (breaks WCAG 2.2 SC 2.4.11, Focus Not Obscured).
- **Do** keep any "help"/contact links in a consistent position across pages (WCAG 2.2 SC 3.2.6).

Current build: `GpShell.tsx` renders a blue organisational-style header (practice name, strap line, phone, green "Book an appointment" button, nav below via `GpNav`) — non-sticky, consistent placement. **This is the right category of header and matches the pattern.** The one thing that isn't a documented NHS pattern is embedding a CTA button directly in the header band; that's a common real-world GP-site convention, not an NHS one — fine as a deliberate choice, just don't present it as "NHS-compliant," present it as "NHS-flavoured."

### "Hero"
Important finding: **the NHS design system has no hero-banner component.** Content and hub pages open with a plain heading + short lede paragraph, sometimes on a tinted band — no photographic banner. This reflects the manual's task-first ethos (get to the content, don't decorate). Confirmed by scanning the full component list and the [hub page](https://service-manual.nhs.uk/design-system/patterns/hub-page) and [start page](https://service-manual.nhs.uk/design-system/patterns/start-page) patterns, neither of which specifies imagery.
- `GpPageHero` (tinted band, breadcrumb, H1, lede, no image) used on every inner page is exactly the idiomatic NHS pattern — **keep this as-is**, it's correct.
- The homepage's large photographic hero (`gp-hero.jpg` of the reception desk beside "What do you need to do today?") is **not an NHS service-manual convention** — it's a marketing-site convention. That's a legitimate, deliberate choice for a sales artifact aimed at practices who want something warmer than the plain NHS.UK template, but it should not be described internally as "matching NHS patterns" — flag it explicitly as the one intentional departure.

### Cards
[Card component](https://service-manual.nhs.uk/design-system/components/card):
- **Do** use cards to group related tasks/actions (primary cards for top tasks, secondary for lower-priority groupings).
- **Do not** wrap an entire card in one giant `<a>` — use visually-hidden context text instead. **Do not** use cards just to decorate long-form content (use details, inset text, or tabs instead).
- Keep headings short, link text should mirror the destination page's H1.

`GpPrimaryCard` / `GpCard` in the demo correctly use a single interactive `<Link>` per card (not nested links), short headings that match destination H1s ("Book or cancel an appointment" → Appointments page), and a two-tier hierarchy (2 primary task cards, 4 secondary task cards) that mirrors NHS's primary/secondary card distinction almost exactly. **This is correct and doesn't need changing.**

### Warning callout, notification banner, inset text — the three easily-confused "flag something" components
This is the biggest area of real fixable drift. NHS deliberately splits this into three components with different triggers:

| Component | Use when | Source |
|---|---|---|
| **Warning callout** (amber) | Content is time-critical, could significantly affect health, or corrects a common mistake. Task-relevant, on-page. Max 2 per page. | [Warning callout](https://service-manual.nhs.uk/design-system/components/warning-callout) |
| **Notification banner** (blue "Important" / green "Success") | Service-wide or user-specific news *not* about the immediate task — approaching deadlines, service changes, confirmations. One per page, placed **above the H1**, below breadcrumb. | [Notification banners](https://service-manual.nhs.uk/design-system/components/notification-banners) |
| **Inset text** | General "make this stand out" content that is neither urgent nor health-critical. | [Inset text](https://service-manual.nhs.uk/design-system/components/inset-text) |

The demo has one component, `GpCallout` (amber, exclamation icon), doing the job of all three, used **4 times** across the site:
- Home — "Travelling this summer?" (vaccination promo)
- Appointments — "Can't make your appointment?" (cancellation reminder)
- Prescriptions — "Going away?" (order-early reminder)
- Services — "Not sure which service you need?" (wayfinding nudge)

Applying the NHS decision tree to each:
- **Home "Travelling this summer?"** — this is a service-wide seasonal announcement unrelated to the task the user is currently doing (it sits between the task-tile grid and the opening-times section). This is a textbook **notification banner** case, not a warning callout. It should move above the H1 ("What do you need to do today?"), use the blue "Important" treatment, and appear on this page only (not duplicated as a callout elsewhere).
- **Appointments "Can't make your appointment?"** — corrects a common mistake (not cancelling), task-relevant. **Warning callout is the right choice** — keep it, but see the accessibility fix below.
- **Prescriptions "Going away?"** — borderline: it's task-relevant and time-sensitive-ish, so warning callout is defensible. Keep it.
- **Services "Not sure which service you need?"** — this is a wayfinding nudge, not a warning about a mistake or a health risk. Per the manual's own instruction ("for less critical information, use inset text instead"), **this should be inset text**, not an amber warning.

Net effect of applying this correctly: you'd end up with **1 notification banner (home), 2 warning callouts (appointments, prescriptions), 1 inset text (services)** — which also fixes the "no more than 2 warning callouts per page" and "don't let repeated amber boxes become wallpaper" problems for free, since currently every single inner page has exactly one identical-looking amber box regardless of what kind of message it's carrying, which trains users to stop reading them.

Also: the warning callout heading convention pairs a **specific heading with a visually-hidden "Important:" prefix** for screen readers (omitted if the heading already contains "Important"). None of the four current callouts include this hidden prefix — cheap, concrete accessibility fix: `<span class="sr-only">Important: </span>` before each heading.

### Care cards (urgent/emergency triage)
[Care cards](https://service-manual.nhs.uk/design-system/components/care-cards):
- Three tiers: **non-urgent (blue)** → "speak to a GP", **urgent (red)** → "ask for an urgent appointment / NHS 111", **emergency (red+dark)** → "call 999 or go to A&E now".
- Each heading carries a **visually-hidden prefix**: "Non-urgent advice:", "Urgent advice:", "Immediate action required:" — this is the load-bearing accessibility detail, because colour-blind and screen-reader users can't rely on the colour alone.
- **Do not** link out from an emergency card to "more information" — in an emergency the only correct action is 999/A&E.

`GpCareCard` in `GpShell.tsx` gets the colour logic exactly right (`urgent` → `--dgp-red`, `emergency` → dark `#1c2b39`, `non-urgent` → `--dgp-blue`) and doesn't link out from the emergency card on the Appointments page — both correct. What's missing: the **visually-hidden urgency prefix**. Current headings are "Ask for an urgent appointment today if:" and "Call 999 or go to A&E now if:" with no hidden "Urgent advice:" / "Immediate action required:" span. This is a one-line addition per card and is the single most concrete accessibility gap I found in the component layer. Also note: the `non-urgent` variant is defined in the component but never used anywhere in the site — there's no blue "speak to a GP" card at all, which is arguably a content gap (the three-tier triage is incomplete without the bottom rung).

### Do and don't lists
[Do and don't lists](https://service-manual.nhs.uk/design-system/components/do-and-dont-lists):
- Dos before Don'ts, both stack vertically (never side-by-side).
- Each "Don't" item must independently start with "do not" — tested finding: screen reader users need it repeated every line, because a bare list of actions read out of context can sound like instructions to do the bad thing.
- If you only have one Do or one Don't, use inset text or a warning callout instead, not this component.

**Not currently used anywhere in the demo.** Good candidate: the Prescriptions page already has the right *content* split into three narrative steps plus two side-notes — that's exactly the shape of a do/don't list hiding in prose. E.g.:
- Do: order through the NHS App or the slip box at reception; allow two working days; nominate a pharmacy in the app.
- Don't: do not order by phone; do not order more than 7 days before travel; do not expect same-day collection for a routine request.

This isn't mandatory, but it's the single best "use the actual right component" upgrade available, since the content already exists in the wrong shape.

### Tables
[Table component](https://service-manual.nhs.uk/design-system/components/table): caption required, `scope` on header cells, never leave cells empty, right-align numeric columns.

The opening-times tables (home page and contact page) already have `<caption className="sr-only">`, `scope="row"` on the day header, and no empty cells — **this is a correct, compliant implementation**, worth calling out as a positive rather than a fix.

### Action links vs buttons
[Action link component](https://service-manual.nhs.uk/design-system/components/action-link): a **text link** with a green arrow-in-circle icon, used inline in a content block to signpost the start of a digital service; not for forms (use a button there); explicit copy pattern is "start with a verb" ("Book an appointment").

Worth a naming clarification rather than a fix: `GpAction` in the demo ("Book with the NHS App", "Order in the NHS App") is a **solid filled green box with a drop-shadow bottom border** — that is visually and structurally the NHS **Button** component (`nhsuk-button`, green, 3–4px offset shadow), not the Action Link (which has no fill, just an underlined-style link with a circular arrow icon). Functionally this is fine — buttons are the correct choice for a single prominent external CTA, and the manual explicitly says use buttons instead of action links where visual emphasis is needed. But if the team ever wants the literal in-line "Action link" treatment (e.g. a lower-emphasis link inside a paragraph, like "Book an appointment →" sitting inline in body text rather than as a standalone box), that's a second, distinct component that doesn't exist yet in `GpShell.tsx`.

### Contents list
[Contents list component](https://service-manual.nhs.uk/design-system/components/contents-list): for **up to 8** related sub-pages/sections, ordered list, current item shown with `aria-current="page"`, wrapped in `<nav aria-label="Pages in this guide">`.

Directly applicable and currently missing: `practice-information/page.tsx` renders **exactly 7** anchor-linked sections (`feedback`, `records`, `everyone-welcome`, `carers`, `chaperones`, `zero-tolerance`, `ppg`) in a single scrolling page — precisely the count and shape this component is designed for. Adding a contents list at the top (linking to each `#id`) would be a very close, low-risk match to the documented pattern and would improve scannability of what is currently a long single-page scroll of seven policy blocks.

### Review dates ("know that a page is up to date")
The dedicated **Review date component was deprecated**; the manual now says: *"We no longer have a review date component. Use the pattern for reassuring users that a page is up to date instead."* — [Review date](https://service-manual.nhs.uk/design-system/components/review-date), pattern at [Know that a page is up to date](https://service-manual.nhs.uk/design-system/patterns/know-that-a-page-is-up-to-date).

Exact format specified by the pattern:
```
Page last reviewed: 15 March 2025
Next review due: 15 March 2028
```
placed at the **bottom** of content pages in small, secondary-coloured text, and — critically — this is not optional for a real GP practice: NHS.UK GP profile pages are contractually required to be reviewed **at least every 12 months, sooner if key information changes** ([GP contract regs summarised by NHS England](https://www.england.nhs.uk/long-read/nhs-uk-online-resource-for-patients/), [practice websites guidance](https://www.england.nhs.uk/long-read/practice-websites/)).

Current state: **only the Accessibility statement** has anything like this ("was last reviewed in July 2026"), and it's informal — bundled into an attribution sentence, missing the "next review due" half, and not styled as the secondary-text block the pattern specifies. Nothing on Practice information, Services & clinics, or Prescriptions carries a review date at all, despite all three being exactly the kind of "policy/clinical-adjacent content that changes and needs a trust signal" the pattern exists for. This is a concrete, cheap, high-credibility fix — a GP practice manager evaluating this demo will very likely look for this, because it's the exact discipline they're required to maintain on their own NHS.UK profile.

### Breadcrumbs
[Breadcrumbs](https://service-manual.nhs.uk/design-system/components/breadcrumbs): `<nav aria-label="Breadcrumb">`, and — the specific detail — **the current page is not supposed to appear in the trail at all**, because "this information is in the H1." Documented examples show only ancestor links (e.g. Home → parent), never a non-linked "current page" node.

`GpBreadcrumb` in the demo shows "Home › [current page]" with the current page as non-linked text carrying `aria-current="page"`. This is a very common, widely-used breadcrumb convention elsewhere (GOV.UK's own breadcrumbs do the same) and is not harmful — I'd flag this as **low-priority / optional**, not a real defect, and given the site is only one level deep below Home, breadcrumbs are doing very little orientation work either way. Not worth spending effort on.

### Details / expander
[Details component](https://service-manual.nhs.uk/design-system/components/details): native `<details>/<summary>`, for information only some users need, short descriptive summary text. Known usability risk: some users mistake the link-styled summary for navigation and avoid clicking it in transactional contexts — not a concern here since the FAQ block on the home page ("How do I…?") is informational, not transactional.

The home page FAQ block already uses native `<details>/<summary>` with a rotating `+` indicator — **this matches the pattern correctly**, no change needed.

---

## 2. Content style guide — rules most relevant to GP practice content

Primary sources: [How we write](https://service-manual.nhs.uk/content/how-we-write), [Voice and tone](https://service-manual.nhs.uk/content/voice-and-tone), [Formatting](https://service-manual.nhs.uk/content/formatting), [Numbers, measurements, dates and time](https://service-manual.nhs.uk/content/numbers-measurements-dates-time), [A to Z of NHS health writing](https://service-manual.nhs.uk/content/a-to-z-of-nhs-health-writing), [Standard for creating health content](https://service-manual.nhs.uk/content/standard-for-creating-health-content).

### Tone, reading age, sentence/paragraph length
- Target reading age **9–11**, relax to **11–14** only where medical complexity forces it.
- Sentences **≤ 20 words**; paragraphs **≤ 3 sentences**.
- Voice: neutral, factual, calm, personal ("you"), empowering rather than instructive — prefer "talk to your doctor about…" over "your doctor will tell you…", and avoid "should" (patronising).
- Active voice throughout ("find a pharmacy" not "a pharmacy can be found").

Assessment against the demo: copy in `data.ts` and the page files is consistently short-sentence, second-person, active voice, and avoids "should" in every instance I read (e.g. "Order through the NHS App, or drop your repeat slip into the box at reception. We do not take orders by phone — it keeps the lines free for people who need to talk to us."). This is genuinely close to the house style already — **no changes needed to tone**, only to specific word choices below.

### Task-first writing
The manual's implicit organising principle (reinforced by the hub-page and card-component guidance) is: **lead every page with what the user needs to do, not with who you are**. The homepage H1 "What do you need to do today?" plus a 2+4 task-card grid is precisely this pattern, and every inner page opens with a lede that states the outcome before the process ("Order in under a minute with the NHS App"). This is correctly applied throughout and is arguably the strongest alignment in the whole site.

### Specific terminology (A to Z of NHS health writing)
| Term | NHS guidance | Demo status |
|---|---|---|
| "GP surgery" / "surgery" | Preferred over "practice" for patient-facing copy — tested to be what patients actually search for and use. | **Mixed.** The practice is correctly named "…Surgery", and several passages say "surgery" (footer, care navigator copy, PPG description). But patient-facing nav/task copy repeatedly says "practice": nav item "Practice information & policies" (×3, incl. footer), H2 "Practice news", task copy "Join the practice — most registrations are completed online" (`moreTasks` in `data.ts`), team page intro "General practice is a team effort" (fine — generic noun, not the entity name), "your previous practice" (Contact page — fine, referring to another organisation). Recommend auditing patient-facing entity references specifically and swapping to "surgery" (e.g. "Join the surgery"), while **keeping** "practice" in formal/legal noun phrases that are correct as-is: "practice list" (this is literally the term used in the real NHS zero-tolerance policy), "Patient Participation Group", job titles ("GP Partner", "Practice Nurse", "Practice Manager" — these are standard NHS job-title nouns, not a style violation). |
| "medicine", not "medication" | Explicit house rule. | **Violated in 3 places**: Prescriptions page H2 "Medication reviews" (body text below correctly says "medicines"), `data.ts` practiceInfo copy "Annual medication reviews with our clinical pharmacist", Team page "the pharmacist for medication questions". Fix: "Medication reviews" → "Medicine reviews"; "medication reviews" → "medicine reviews"; "medication questions" → "medicine questions". Mechanical, low-risk, 3 occurrences. |
| "online consultation" — explicitly banned term ("Do not use the term 'online consultation' or any variation… use 'Contact your GP using an online form' or 'Request an appointment (online)'") | Demo already avoids this correctly — "Tell us about your symptoms online" / "Tell us your symptoms online" is used throughout instead. **This is correct and should be protected** if copy is ever revised. |
| "pharmacy", not "chemist" | Demo consistently says "pharmacy" / "Pharmacy First" / "nominated pharmacy" — **correct, no changes**. |
| "fit note (sick note)" at first mention, then "fit note" | Demo uses "Get a sick (fit) note" (task tile) then "Sick (fit) notes" (heading). This inverts the manual's stated order slightly (guide says lead with "fit note", parenthesise "sick note") but is a very minor, arguably-fine variant given "sick note" is what most patients search for. Low priority. |
| "symptoms": say people "get" or "have" symptoms, not "develop" or "experience" | Demo copy: "Get help for your symptoms", "Tell us what's wrong online" — compliant; I didn't find "develop"/"experience" used anywhere. |
| "111 online": "Go to NHS 111 online or call 111" | Demo's urgent-help band says "NHS 111 can help day and night — online or by phone" with a button "Get help from NHS 111" linking to 111.nhs.uk — functionally equivalent, acceptable phrasing variant. |

### Numbers, dates and time
[Numbers, measurements, dates and time](https://service-manual.nhs.uk/content/numbers-measurements-dates-time):
- Dates: full month name, no abbreviation — "6 August 2018", not "6 Aug 2018" (screen readers mangle abbreviated months).
- Times: 12-hour clock, **no leading `:00`** — "5pm" not "5:00pm" or "5.00pm"; keep the colon only when there are minutes — "5:30pm" is correct.
- Ranges: use the word **"to"**, never a hyphen or en/em dash — "Monday to Friday, 2pm to 6pm".

Assessment: dates in the demo (news items: "18 July 2026", "2 July 2026", "12 June 2026") are **fully compliant** — full month names, correct format, good.

Times are the clearest, most mechanical fix in this whole report. The demo writes whole-hour times with a redundant `:00` and joins ranges with an en dash, both of which the style guide explicitly rules against:
- `openingTimes` in `data.ts`: `"8:00am – 6:30pm"` (×5 weekdays) → should be `"8am to 6:30pm"`.
- `GpShell.tsx` footer: `"Open 8:00am – 6:30pm, Monday to Friday"` → `"Open 8am to 6:30pm, Monday to Friday"`.
- `contact/page.tsx`: `"(lines open 8:00am – 6:30pm, Monday to Friday)"` → same fix.
- `appointments/page.tsx`: "Call ... from 8:00am", "Forms submitted before 3:00pm" → "8am", "3pm".
- `prescriptions/page.tsx`: "before 3:00pm" → "3pm".
- `data.ts` FAQ: "Call the surgery at 8:00am" → "8am".
- `data.ts` news item: "blood test appointments run 8:00am to 12:00pm" → "8am to 12pm" (this one already correctly uses "to" for the range — only the `:00` needs removing).

This is a single find-and-replace pass (`8:00am` → `8am`, `3:00pm` → `3pm`, and en-dash time ranges → "to") that touches ~8 strings across `data.ts`, `GpShell.tsx`, `appointments/page.tsx`, `prescriptions/page.tsx`, `contact/page.tsx` — small, mechanical, and directly citable against the style guide if a practice manager or clinical safety officer ever pushes back on the copy.

### Formatting
[Formatting](https://service-manual.nhs.uk/content/formatting): one H1 per page (≤65 chars), never skip heading levels, bullet lists capped at 6 items with lead-in colon style preferred, bold used sparingly (UI labels only, not emphasis), links must be specific/active ("book an appointment" not "click here") and warn of new tabs.

- H1s throughout are single, short, and sentence-case — compliant.
- Heading levels: `GpCareCard` deliberately uses `h3` "because every current use sits inside a section already headed by an h2" (per the component's own code comment) — this shows the team already understands and is actively managing heading-level discipline, which is good practice, not just luck.
- `GpCallout` deliberately avoids being a heading ("A notice, not a document section — deliberately not a heading, so task tiles keep their place in the page outline") — also correct, matches the manual's stated screen-reader concern about warning callouts needing a distinguishable following heading.
- Bold usage (`<strong>Telephone:</strong>`, `<strong>Address:</strong>` on the Contact page) is label-style, not emphasis-style — compliant, and structurally this is really an ad-hoc version of NHS's **summary list** component (label/value pairs). Not required to change, but worth knowing the "correct" component exists if this pattern grows.
- Link text throughout is specific and verb-led ("Order in the NHS App", "More about getting here") — compliant, no "click here" anywhere I found.

---

## 3. How NHS.UK itself presents a GP practice profile page

I read a live example — **Victoria Medical Centre** on NHS.UK ([overview](https://www.nhs.uk/services/gp-surgery/victoria-medical-centre/E87002), [contact & opening times](https://www.nhs.uk/services/gp-surgery/victoria-medical-centre/E87002/contact-details-and-opening-times), [facilities](https://www.nhs.uk/services/gp-surgery/victoria-medical-centre/E87002/facilities), [how to register](https://www.nhs.uk/services/gp-surgery/victoria-medical-centre/E87002/how-to-register)) — and cross-checked against NHS England's own guidance for practices ([Practice websites](https://www.england.nhs.uk/long-read/practice-websites/), [NHS.UK online resource for patients](https://www.england.nhs.uk/long-read/nhs-uk-online-resource-for-patients/)).

**Structure is four tabs/pages under one profile, not one long page:**
1. **Overview** — name, address, a prominent status line ("This GP surgery is currently accepting new patients"), phone, link to the practice's own website.
2. **Contact details and opening times** — reception phone number, address, opening-times table (varies by day, e.g. Saturday 9am–1pm, Sunday closed), a separate bank-holiday table, and a "Last confirmed: [date]" timestamp per section (this is the live-site equivalent of the review-date pattern, confirmed per-section rather than whole-page here).
3. **Facilities** — accessibility features as a flat checklist (disabled parking, disabled toilet, induction loop, signing service, wheelchair access, step-free access), family amenities (children's play area, baby changing), parking — again with its own "Last confirmed" date.
4. **How to register** — catchment-area check, "register online" as the lead path with "other ways to register" as a fallback, and the explicit reassurance: **"You do not need proof of address or immigration status, ID or an NHS number to register online with a GP."**

Fields NHS England's own guidance says a practice profile should carry, beyond what I could observe live: appointment-availability information, staff profiles with clinical specialities, **CQC ratings**, local news/health articles, links to online services and video-consultation platforms, and the ability to show which consultation options are offered (face-to-face/telephone/online) plus what support needs can be accommodated. GP contract regulations require the profile (and the practice's own website) to be **updated at least once every 12 months, sooner if key information changes**.

### Cross-check against the demo
- **Registration-without-ID messaging**: the demo's own copy — *"You do not need proof of address, identification or immigration status to register with the practice"* (`practiceInfo`, "everyone-welcome") and *"Registration is done online in about ten minutes — you do not need proof of address or immigration status"* (Contact page) — is **almost word-for-word aligned** with the real NHS.UK registration page's actual phrasing. This is a strong, citable match worth keeping exactly as-is; it demonstrates the demo correctly reproduces real NHS registration policy language rather than inventing something plausible-sounding.
- **Catchment area**: mentioned ("If you live in our catchment area, we would be glad to have you") — matches the real page's opening gate ("check that you live in this GP surgery's catchment area").
- **Facilities/accessibility checklist**: the demo's "Getting here" bullet list (accessible parking, step-free access, hearing loop) covers a subset of the real facilities checklist categories — reasonably matched, though real profiles typically also flag an induction loop and signing-service availability as separate line items, which the demo folds into one bullet ("Hearing loop at reception — just ask").
- **Gaps against the real profile's field set** (worth knowing, not necessarily worth fixing on a fictional demo, but useful if you want maximum realism for the sales pitch): no explicit **"currently accepting new patients" status statement** anywhere near the top of the site (real profiles lead with this); no mention of a **CQC rating** or link to one; no explicit list of **consultation options offered** (face-to-face/telephone/online) as its own field, though this is implicitly covered across the Appointments page's three routes.
- **Update cadence**: the real profile shows a **per-section** "Last confirmed" date (contact info dated separately from facilities). The demo currently has **no per-page or whole-site review-date discipline at all** except the informal line on the Accessibility statement — this is the most concrete, highest-credibility gap identified in this whole report, because it's literally the discipline every GP practice manager reading this demo will be contractually familiar with from maintaining their own NHS.UK profile.

---

## 4. Prioritised recommendations

Ranked by (impact on credibility with a GP-practice-manager audience) × (effort to fix):

1. **Add "Page last reviewed / Next review due" in the exact NHS format** to Practice information, Services & clinics, Prescriptions, and formalise it on Accessibility. Cheapest, highest-credibility fix — matches both the [service-manual pattern](https://service-manual.nhs.uk/design-system/patterns/know-that-a-page-is-up-to-date) and the real contractual requirement practices already live under.
2. **Fix time formatting site-wide**: `8:00am` → `8am`, `3:00pm` → `3pm`, en-dash ranges → "to". ~8 strings, mechanical, directly citable against [Numbers, measurements, dates and time](https://service-manual.nhs.uk/content/numbers-measurements-dates-time).
3. **Re-sort the four `GpCallout` uses** into their correct components: home "Travelling this summer?" → notification banner (blue, above H1); Services "Not sure which service you need?" → inset text; keep Appointments and Prescriptions callouts as warning callouts but add the visually-hidden "Important:" prefix. This is the change most likely to be *noticed* by someone who has read the actual service manual, because right now every page has an identical amber box regardless of what kind of message it's carrying.
4. **Add visually-hidden urgency prefixes to care cards** ("Urgent advice:", "Immediate action required:") — one-line accessibility fix per card, directly required by the [care cards component doc](https://service-manual.nhs.uk/design-system/components/care-cards).
5. **Fix "medication" → "medicine"** in 3 places (Prescriptions H2, `data.ts` practiceInfo, Team page) — explicit A-to-Z house rule.
6. **Add a contents list** to the top of Practice information's 7-section page — near-exact match to the [contents list component](https://service-manual.nhs.uk/design-system/components/contents-list)'s stated use case (up to 8 related sections).
7. **Terminology audit**: swap patient-facing "practice" → "surgery" in nav/task copy (footer "Practice information & policies", H2 "Practice news", task tile "Join the practice") while explicitly keeping "practice" in formal/legal phrases ("practice list", "Patient Participation Group", job titles) — this is a judgement call, not a mechanical rule, so treat it as a review pass rather than a blind find-replace.
8. **Optional / lower priority**: convert the Prescriptions ordering steps into a proper do/don't list; consider whether to add the missing non-urgent (blue) care card tier somewhere in the triage flow; clarify internally that `GpAction` is implementing the NHS **Button** pattern, not **Action Link** (no functional change needed, just don't describe it as an action link in docs/comments).

None of the above are deal-breakers — nothing here is a compliance or safety risk, since this is explicitly a fictional, `noindex` sales demo, not a live clinical service. The value of fixing them is entirely about credibility with the audience that will actually evaluate this artifact: GP practice managers and their marketing decision-makers, who deal with NHS.UK's review-date discipline and content-style rules as part of their annual contractual obligations, and who will register (consciously or not) whether a site that claims to be "NHS-service-manual-flavoured" gets the small mechanical things right.

---

## Sources

- [Components – NHS digital service manual](https://service-manual.nhs.uk/design-system/components)
- [Patterns – NHS digital service manual](https://service-manual.nhs.uk/design-system/patterns)
- [Header component](https://service-manual.nhs.uk/design-system/components/header)
- [Card component](https://service-manual.nhs.uk/design-system/components/card)
- [Warning callout](https://service-manual.nhs.uk/design-system/components/warning-callout)
- [Notification banners](https://service-manual.nhs.uk/design-system/components/notification-banners)
- [Inset text](https://service-manual.nhs.uk/design-system/components/inset-text)
- [Care cards](https://service-manual.nhs.uk/design-system/components/care-cards)
- [Do and don't lists](https://service-manual.nhs.uk/design-system/components/do-and-dont-lists)
- [Table component](https://service-manual.nhs.uk/design-system/components/table)
- [Action link](https://service-manual.nhs.uk/design-system/components/action-link)
- [Contents list](https://service-manual.nhs.uk/design-system/components/contents-list)
- [Breadcrumbs](https://service-manual.nhs.uk/design-system/components/breadcrumbs)
- [Details component](https://service-manual.nhs.uk/design-system/components/details)
- [Review date (deprecated)](https://service-manual.nhs.uk/design-system/components/review-date)
- [Know that a page is up to date (pattern)](https://service-manual.nhs.uk/design-system/patterns/know-that-a-page-is-up-to-date)
- [Hub page pattern](https://service-manual.nhs.uk/design-system/patterns/hub-page)
- [Start page pattern](https://service-manual.nhs.uk/design-system/patterns/start-page)
- [Colour styles](https://service-manual.nhs.uk/design-system/styles/colour)
- [Content guide index](https://service-manual.nhs.uk/content)
- [How we write](https://service-manual.nhs.uk/content/how-we-write)
- [Voice and tone](https://service-manual.nhs.uk/content/voice-and-tone)
- [Formatting](https://service-manual.nhs.uk/content/formatting)
- [Numbers, measurements, dates and time](https://service-manual.nhs.uk/content/numbers-measurements-dates-time)
- [A to Z of NHS health writing](https://service-manual.nhs.uk/content/a-to-z-of-nhs-health-writing)
- [Standard for creating health content](https://service-manual.nhs.uk/content/standard-for-creating-health-content)
- [NHS England — Practice websites guidance](https://www.england.nhs.uk/long-read/practice-websites/)
- [NHS England — NHS.UK online resource for patients](https://www.england.nhs.uk/long-read/nhs-uk-online-resource-for-patients/)
- [NHS Identity Guidelines — Colours](https://www.england.nhs.uk/nhsidentity/identity-guidelines/colours/)
- [NHS.UK — Victoria Medical Centre profile (live example)](https://www.nhs.uk/services/gp-surgery/victoria-medical-centre/E87002)
- [NHS England content style guide](https://digital.nhs.uk/about-nhs-digital/corporate-information-and-documents/our-style-guidelines/content-style-guide)

## Files reviewed in the demo (for context, all under `/Users/anoopjose/Projects/Website`)
- `src/app/demo/gp-practice/page.tsx` (home)
- `src/app/demo/gp-practice/appointments/page.tsx`
- `src/app/demo/gp-practice/prescriptions/page.tsx`
- `src/app/demo/gp-practice/services/page.tsx`
- `src/app/demo/gp-practice/contact/page.tsx`
- `src/app/demo/gp-practice/practice-information/page.tsx`
- `src/app/demo/gp-practice/accessibility/page.tsx`
- `src/app/demo/gp-practice/team/page.tsx`
- `src/components/demos/gp/GpShell.tsx`
- `src/components/demos/gp/data.ts`

Not read in this pass (no material findings expected beyond what's above): `src/components/demos/gp/GpNav.tsx`, `src/app/demo/gp-practice/layout.tsx`. If you want the terminology and time-format audit extended to `/demo/care-home`, that would need a separate pass — I did not open any care-home files for this report.
