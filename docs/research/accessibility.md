# UK GP Practice Website Accessibility — Legal & Implementation Research

Researched for the fictional "Willowbrook Surgery" demo (`/demo/gp-practice`), a sales artifact built on NHS service-manual conventions. This report treats the legal requirements as if the site were real, since that is what gives the demo credibility with prospective NHS clients. Current implementation is checked against `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/` and `/Users/anoopjose/Projects/Website/src/app/globals.css` throughout, and gaps are flagged concretely.

---

## 1. Do the accessibility regulations apply to GP practices, and what do they require?

**Yes.** GP practices in England are treated as in scope of the **Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018** (SI 2018/952, which replaced/consolidated SI 2018/852) — [legislation.gov.uk/uksi/2018/952](https://www.legislation.gov.uk/uksi/2018/952/contents). GP practices are NHS-funded bodies providing services under an NHS contract (general interest, non-commercial, publicly financed) — the "bodies governed by public law" test in Regulation 2's definition of public sector body. This is confirmed directly by trade/sector sources aimed at practice managers: *"By 23rd September 2020 ... all public sector organisations, **including GP practices**, need to meet new government accessibility requirements"* — [PracticeIndex, "Meeting the new website accessibility requirements"](https://practiceindex.co.uk/gp/blog/meeting-the-new-website-accessibility-requirements/). It's also evidenced empirically: essentially every `nhs.uk`-domain GP practice site publishes a Regulations-citing accessibility statement (e.g. [Market Cross Surgery](https://www.marketcrosssurgery.nhs.uk/about-section/practice-policies/accessibility/), [Bridge View Medical](https://bridgeviewmedical.nhs.uk/surgery-policies/accessibility-statement)). NHS England's own long-read on practice websites assumes the regulations apply — [NHS England: Creating a highly usable and accessible GP website](https://www.england.nhs.uk/long-read/creating-a-highly-usable-and-accessible-gp-website-for-patients/).

**Compliance is the practice's legal responsibility even when the site is built/hosted by an external agency** — outsourcing development doesn't transfer liability (PracticeIndex, above; also stated on GOV.UK's general guidance). This is worth stating explicitly in the demo's sales narrative — a practice manager cannot treat "we bought a website" as discharging the duty.

### What WCAG version and level — and a subtlety worth getting right

The Regulations require conformance with **WCAG level AA**. Critically, **the specific WCAG version is not fixed in the statute** — it auto-updates. Regulation 9 was amended by **SI 2022/1097** so that instead of naming EN 301 549 with a pinned WCAG 2.1 reference, it now points to *"the Web Content Accessibility Guidelines recommended by the World Wide Web Consortium, **as amended from time to time**"* — [TetraLogical: Amendment to the Public Sector Accessibility Regulations](https://tetralogical.com/blog/2023/11/07/amendment-to-public-sector-accessibility-regulations/), citing [SI 2022/1097](https://www.legislation.gov.uk/uksi/2022/1097/made). WCAG 2.2 became the current W3C Recommendation on **5 October 2023**, and the Cabinet Office gave a 12-month transition — so **from 5 October 2024, the operative legal standard for UK public sector sites is WCAG 2.2 AA**, not 2.1. This is confirmed by:
- GOV.UK service manual: *"Services must achieve WCAG 2.2 level AA as part of meeting government accessibility requirements"* — [gov.uk/service-manual/.../understanding-wcag](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag)
- GOV.UK guidance updated accordingly — [gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [Silktide: "UK Government websites to meet WCAG 2.2 from October 2024"](https://silktide.com/blog/uk-government-websites-to-meet-wcag-2-2-from-october-2024/)
- NHS digital service manual: *"meet at least level AA of the Web Content Accessibility Guidelines (WCAG 2.2) and aim for AAA where possible"* — [service-manual.nhs.uk/accessibility/what-all-nhs-services-need-to-do](https://service-manual.nhs.uk/accessibility/what-all-nhs-services-need-to-do)

**This is a genuinely useful, specific fact for the demo's positioning**: Flutterly can credibly claim "WCAG 2.2 AA" as the *current* legal bar (not just aspirational best practice) — and can point out that many incumbent GP sites still only claim 2.1 AA, which is now stale. The demo's accessibility page (`src/app/demo/gp-practice/accessibility/page.tsx`, line 22-26) already states WCAG 2.2 AA — this is correct and current.

### Compliance deadlines (for narrative/historical accuracy)
- Websites published before 23 September 2018: compliant by **23 September 2020**
- Websites published on/after 23 September 2018: compliant **immediately / within a short window of publication**
- Mobile apps: compliant by **23 June 2021**
(Source: [legislation.gov.uk/uksi/2018/852/regulation/4](https://www.legislation.gov.uk/uksi/2018/852/regulation/4/made); corroborated by PracticeIndex above)

### Exemptions from scope (relevant to a content-heavy GP site with PDFs and embedded third-party tools)
- Office documents / PDFs published **before 23 September 2018**, unless essential to a service (e.g. a claim form)
- Pre-recorded audio/video published **before 23 September 2020**
- **Live** audio/video — exempt indefinitely
- Maps — exempt, but essential information (e.g. the practice address) must be available in an accessible alternative form
- **Third-party content neither funded nor developed by the body** — e.g. an embedded NHS App booking widget, a Pharmacy First/NHS Talking Therapies self-referral iframe, social share buttons
- Archived content no longer needed for current services
- Intranet/extranet content published before 23 September 2019, unless substantially revised after that date

Source: [gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)

**Concrete implication for Willowbrook**: the Services & clinics page lists self-referral routes (Pharmacy First, first-contact physio, NHS Talking Therapies, sexual health, stop smoking) that in a real deployment would link out to NHS/ICB-run booking or referral tools outside the practice's control. The accessibility statement should explicitly note that linked third-party services are covered by their own statements, not Willowbrook's — this is a realistic detail current GP accessibility statements get right and is currently *missing* from `accessibility/page.tsx`.

### Enforcement
- **EHRC** (England, Scotland, Wales) and **ECNI** (Northern Ireland) enforce the Regulations and can issue unlawful act notices / take court action.
- In practice, the individual complaint route is: contact the organisation first → if unsatisfied, contact the **Equality Advisory and Support Service (EASS)**, the general Equality Act 2010 helpline, which can refer structural complaints to EHRC. This exact two-step pattern appears in the real [NHS.uk accessibility statement](https://www.nhs.uk/accessibility-statement/) and is the GDS-standard wording.
- Underpinned by the **Equality Act 2010** — inaccessible services can separately constitute a failure of the duty to make reasonable adjustments, regardless of the 2018 Regulations.
- **GDS/Cabinet Office monitors compliance via periodic sampling** of public sector sites and publishes findings — the most recent [Accessibility monitoring of public sector websites 2022–2024 report](https://www.gov.uk/government/publications/accessibility-monitoring-of-public-sector-websites-and-mobile-apps-from-2022-to-2024/accessibility-monitoring-of-public-sector-websites-and-mobile-apps-from-2022-to-2024) found many statements are stale — good ammunition for a sales narrative about why practices need an agency that keeps this current.

### Review cadence for the accessibility statement
The Regulations require statements to be reviewed and updated, and GOV.UK guidance operationalises this as: **update when there are major changes to the site, and at minimum once a year** — [gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement](https://www.gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement). There is no shorter statutory cadence, but GDS's monitoring reports treat statements over 12 months old as a compliance red flag. Willowbrook's statement says "last reviewed in July 2026" — correct pattern, just needs the fuller GDS structure (see §4).

---

## 2. WCAG 2.2 success criteria for a content-heavy GP site

WCAG 2.2 (W3C Recommendation, **5 October 2023** — [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)) adds **nine new success criteria** to 2.1, and **removes** 4.1.1 Parsing (obsolete for modern browsers). Of the nine, **six are Level A/AA and therefore legally mandatory** under the Regulations' "AA conformance" requirement (AA conformance = all Level A *and* AA criteria); three are Level AAA and are best-practice-only, matching the NHS "aim for AAA where possible" framing.

| # | Criterion | Level | Mandatory under Regs? | What it requires |
|---|---|---|---|---|
| 2.4.11 | Focus Not Obscured (Minimum) | AA | **Yes** | The focused element must not be *entirely* hidden by author content (sticky headers, cookie banners, chat widgets) |
| 2.4.12 | Focus Not Obscured (Enhanced) | AAA | No (aspirational) | The focused element must not be hidden *at all*, even partially |
| 2.4.13 | Focus Appearance | AAA | No (aspirational) | Focus indicator ≥ area of a 2px-thick perimeter around the component, ≥3:1 contrast between focused/unfocused states |
| 2.5.7 | Dragging Movements | AA | **Yes** | Any drag-operated function needs a single-pointer (tap/click) alternative, unless dragging is essential |
| 2.5.8 | Target Size (Minimum) | AA | **Yes** | Pointer targets ≥24×24 CSS px, with 5 exceptions (spacing, equivalent, inline, user-agent-controlled, essential) |
| 3.2.6 | Consistent Help | A | **Yes** | A help mechanism (contact details, live chat, phone) appears in the same relative order on every page of a set |
| 3.3.7 | Redundant Entry | A | **Yes** | Information already entered in a process must be auto-populated or selectable, not re-typed |
| 3.3.8 | Accessible Authentication (Minimum) | AA | **Yes** | No login/registration step may rely on a cognitive test (remembering a password, solving a puzzle) unless an alternative, an assistive mechanism, object recognition, or "your own content" recognition is offered |
| 3.3.9 | Accessible Authentication (Enhanced) | AAA | No (aspirational) | Stricter version — essentially no cognitive test at all, even with object-recognition exception |

Sources: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/); [W3C Understanding Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); [W3C Understanding Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html); [TetraLogical: What's new in WCAG 2.2](https://tetralogical.com/blog/2023/10/05/whats-new-wcag-2.2/); [wcag22aa.org: What's new in WCAG 2.2](https://www.wcag22aa.org/new-criteria/)

### Implementation notes mapped to Willowbrook's actual pages

**Target Size 2.5.8 — Home page task tiles, icon-only controls.**
Checked `src/components/ui/Button.tsx`: the shared button sizes are `h-9`/`h-11`/`h-12` (36/44/48px) — all comfortably clear of the 24px floor, so primary CTAs (book/cancel appointment, order repeat prescription) are fine as-is. The place this criterion actually bites is **icon-only controls** not covered by the shared Button component — a hamburger/menu toggle, a phone icon next to a number, a close icon on a banner. None of these were found in a scan of `GpShell.tsx`/`GpNav`, but if any are added, apply the exact test: 24×24 CSS px, or the 24px-diameter-circle spacing exception (no other target's circle overlaps), quoted verbatim from [W3C's Understanding page](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

**Consistent Help 3.2.6 — persistent nav across all subpages.**
Already satisfied structurally: `GpDemoLayout` (`src/app/demo/gp-practice/layout.tsx`) wraps every route in a single shared `GpShell`, and `navLinks`/`GpNav` render identically on every page, so "Contact" and the phone number occupy the same relative position throughout. No action needed — worth noting in the sales narrative as "built in by construction," since this is one 2.2 criterion many bespoke agency builds get wrong when they hand-code one-off subpages.

**Redundant Entry 3.3.7 & Accessible Authentication 3.3.8 — currently N/A, but a landmine for later.**
A scan of every `page.tsx` under `src/app/demo/gp-practice/` found **no `<form>`, `<input>`, or `<select>` elements anywhere** — the site is pure signposting (it links out to the NHS App / phone / online consultation rather than embedding transactional forms). That means these two criteria don't currently apply. But it's worth flagging explicitly for two reasons: (1) if a future iteration adds an on-site contact/callback form (plausible, given "Practice information → feedback/complaints" is a listed page), any multi-step version must not re-ask for name/DOB/contact details already captured; (2) if any booking/registration is ever embedded rather than linked out, it must not gate access behind a password-recall or CAPTCHA-style step without an alternative (object recognition, paste-allowed password field, or a passwordless option) per [3.3.8's exceptions](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html).

**Focus Not Obscured 2.4.11 — no sticky header currently, so compliant by default.**
Grep of `GpShell.tsx` found no `position: sticky` anywhere in the GP demo — so there's nothing to obscure a focused element. This is a constraint to *preserve*: if a sticky nav or cookie/consent banner is added later, it must never fully cover a keyboard-focused link or field.

**Focus Appearance 2.4.13 (AAA, aspirational) — already close to meeting it, and worth calling out as a strength.**
`globals.css` (lines 467–471) implements the GP demo's focus style as:
```css
.demo-gp-root :focus-visible {
  outline: 3px solid var(--dgp-yellow);   /* #ffeb3b */
  outline-offset: 0;
  box-shadow: 0 0 0 6px rgba(33, 43, 50, 0.9);
  border-radius: 2px;
}
```
This is a genuinely well-designed dual-ring: a plain yellow outline directly on white body content would fail 3:1 contrast (yellow-on-white is roughly 1.07:1 — a real risk if this weren't handled), but the near-opaque dark `box-shadow` ring around it guarantees a high-contrast boundary against light backgrounds, while the yellow itself reads clearly against the dark NHS-blue masthead. This already exceeds the mandatory AA bar (2.4.7 Focus Visible) and is doing real work toward the AAA-level 2.4.13 test (≥2px perimeter, ≥3:1 contrast) — worth stating in sales copy as "the focus ring alone is built to a higher bar than the law requires." One thing to actually verify with a contrast tool rather than assume: the yellow-to-dark-ring boundary and dark-ring-to-canvas boundary both need measuring against the *specific* `--dgp-canvas` value, not just eyeballed.

**Dragging Movements 2.5.7 — low current risk, flag as a constraint.**
No carousels, sliders, or drag interactions found in the GP demo's page set (news section is a static list; opening times is a table). Note as a constraint for any future image gallery/testimonial carousel on this site: must ship with visible prev/next controls, not swipe/drag-only.

**General WCAG 2.2 items not new but especially relevant to a content-heavy site (opening times table, policy-heavy Practice Information page):** ensure the opening times table uses semantic `<table>`/`<caption>`/`<th scope>` markup rather than a styled grid of divs (supports screen-reader table navigation — 1.3.1, unchanged from 2.1 but easy to get wrong on a "table" that's actually CSS Grid); ensure "read more"/"see details" links on the News section have accessible names that are unique out of context (2.4.4/2.4.9) rather than repeated generic text.

---

## 3. NHS accessibility guidance specifics (focus styles, skip links, reading age)

Primary source: **NHS digital service manual** — [service-manual.nhs.uk/accessibility](https://service-manual.nhs.uk/accessibility/what-all-nhs-services-need-to-do). This is the right reference to cite in the demo's own copy/positioning since it's the house style Willowbrook is modelled on.

**Focus styles.** *"It must be obvious to them which element or link is the current focus position on the page. The browser default is generally not good enough."* — [service-manual.nhs.uk/accessibility/design](https://service-manual.nhs.uk/accessibility/design). NHS guidance pushes toward custom, clearly visible focus states rather than relying on browser defaults — exactly the pattern Willowbrook already implements (yellow-on-ink ring, see §2 above), and consistent with the "yellow focus" convention referenced in the demo's design brief.

**Skip links.** NHS guidance: *"Skip links can be invisible by default, but must be very visible when focused,"* recommended at the top of every page and additionally before long lists of interactive elements (e.g. 20+ checkboxes in a filter) so keyboard/switch/head-wand users aren't forced to tab through repeated content — [service-manual.nhs.uk/accessibility/design](https://service-manual.nhs.uk/accessibility/design); worked example at [nhsdigital.github.io/accessibility-checklist — 2.4.1 mechanism to skip content](https://nhsdigital.github.io/accessibility-checklist/pages/2.4.1-mechanism-to-skip-content-or-navigation/). Checked implementation: `globals.css` line 458 defines `body:has(.demo-gp-root) > a[href="#main"]:focus { background:#ffeb3b; color:#212b32; ... }` and `GpShell.tsx` renders `<main id="main">` — a hidden-until-focused skip link landing on a proper `<main>` landmark, matching the NHS pattern exactly.

**Reading age.** NHS content guidance targets a **reading age of 9–11 years old**, falling back to **11–14 years** where complex medical information genuinely can't be simplified further — [service-manual.nhs.uk/content/how-we-write](https://service-manual.nhs.uk/content/how-we-write); consistent detail at [digital.nhs.uk content style guide](https://digital.nhs.uk/about-nhs-digital/corporate-information-and-documents/our-style-guidelines/content-style-guide). Concrete mechanics given: sentences up to ~20 words, paragraphs of up to 3 sentences, plain-English term before the medical term where both are needed (their example: "piles (haemorrhoids)"), and the **Hemingway Editor** recommended as a practical check. **Direct implication for Willowbrook's Practice Information page** — the policy-heavy content (feedback/complaints, GDPR/records privacy, chaperones, zero tolerance, PPG) is exactly the content type NHS guidance is warning about: it's naturally written by services in formal/legal register, and is the highest-risk page on the site for missing the 9–11 target. Worth running through Hemingway or a Flesch-Kincaid check as a concrete QA step, not just an aspiration.

**Testing approach.** NHS guidance layers automated, manual, and real-user testing: *"Automated tests only check some of what you need to test"*; manual testing is *"the most effective way to test for accessibility issues on individual pages or components"* — [service-manual.nhs.uk/accessibility/testing](https://service-manual.nhs.uk/accessibility/testing). Recommended tools: **Microsoft Accessibility Insights** (Chrome extension), screen readers (JAWS/NVDA/VoiceOver — the same trio cited in the [NHS.uk statement](https://www.nhs.uk/accessibility-statement/)), and the text-spacing bookmarklet from html5accessibility.com. No fixed cadence is prescribed; the manual assumes it's continuous/build-integrated rather than a one-off pre-launch audit — a genuinely useful sales point ("we test as we build, not just before handover"), and directly echoes the memory note that the project's own audit scripts need a server on :3100.

**Other concrete NHS design rules worth carrying into the demo's copy/QA checklist:** single `<h1>` per page, no skipped heading levels; unique/descriptive `<title>` per page; every form field has a visible label; error summaries link focus to the offending field; session timeouts of at least 20 hours of inactivity if any session-based feature exists; never convey meaning by colour or position alone; alt text under ~125 characters, `alt=""` for decorative images — [service-manual.nhs.uk/accessibility/design](https://service-manual.nhs.uk/accessibility/design).

---

## 4. What a compliant accessibility statement must contain

### Statutory minimum (Regulation 7(4))
Per [legislation.gov.uk/uksi/2018/852/regulation/7](https://www.legislation.gov.uk/uksi/2018/852/regulation/7/made), a statement must legally contain:
1. An explanation of the content that isn't accessible, and why (non-compliance / disproportionate burden / out-of-scope)
2. A description of any accessible alternatives provided
3. A contact mechanism for reporting compliance failures and requesting excluded information in another format
4. A link to the enforcement procedure (EHRC/ECNI route)

### GDS-standard structure in practice (richer than the bare statutory minimum, and what real NHS/GDS statements actually publish)
Cross-checked against the live [GOV.UK Design System accessibility statement](https://design-system.service.gov.uk/accessibility-statement/) and the live [NHS.uk accessibility statement](https://www.nhs.uk/accessibility-statement/), both of which follow the model at [gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement](https://www.gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement):

1. **Opening/scope statement** — which site(s) this covers, who runs it, and the aspiration ("we want as many people as possible to be able to use this website")
2. **How accessible this website is** — user-facing capability list (resize text to 400%, navigate by keyboard, screen-reader compatibility with named tools e.g. JAWS/NVDA/VoiceOver, speech recognition) plus a plain-language compliance summary
3. **Compliance status** — one of three explicit states: **fully compliant**, **partially compliant** (with exceptions listed), or **not compliant**, stated against "WCAG 2.2 AA"
4. **Non-accessible content** — itemised list of known issues, each tagged with *why* (regulatory non-compliance vs. disproportionate burden claim vs. out-of-scope exemption), ideally with a remediation date
5. **What we're doing to improve accessibility** (common, not statutory) — forward-looking remediation plan
6. **Preparation of this statement** — date prepared, method used (self-assessment vs. third-party audit — the NHS.uk statement names its auditor, Nomensa, and dates: Sept 2020 initial, June–July 2022 and Jan–Feb 2024 follow-ups), last review date
7. **Feedback and contact information** — how to report a problem or request an alternative format, with a stated response-time commitment (NHS.uk: 5 working days for feedback, 10 days for alternative-format requests; GOV.UK Design System: 2 days)
8. **Enforcement procedure** — EHRC reference plus the practical first step, EASS (Equality Advisory and Support Service)

### Gap analysis: Willowbrook's current statement vs. this structure

`src/app/demo/gp-practice/accessibility/page.tsx` currently has three short sections ("Our commitment," "What that means for you," "Tell us if something isn't working") plus a one-line review date. This reads well as marketing copy but is **missing every one of the statutory/GDS structural elements that make a real statement credible to a practice manager evaluating vendors**:

- No explicit **compliance status** sentence (full/partial/non-compliant against WCAG 2.2 AA — it currently just says the site "aims to meet" the standard, which is weaker than a real statement's declarative claim)
- No **non-accessible content** section — real statements always list *something* (even a well-run site names PDFs, third-party embeds, or specific known issues); an empty list reads as unaudited, not as flawless
- No **preparation/testing methodology** section (who tested, when, how) — this is the section that signals genuine rigor rather than boilerplate
- No **enforcement procedure** link (EHRC/EASS) — a statutory requirement, and its absence is exactly the kind of gap GDS's own monitoring flags
- No stated **response-time commitment** for feedback
- The phone-only reporting channel ("tell reception") is a nice human touch but doesn't satisfy the regulation's requirement for a described contact *mechanism* for compliance-failure reports in general — real statements pair a human channel with a written/online one

**For the demo's purposes** this is arguably a deliberate, effective piece of sales positioning either way: the current version is warm and readable (good UX writing), but if the goal is to demonstrate to a skeptical practice manager that Flutterly *understands the compliance obligation in detail* (which is presumably part of the pitch), filling in the missing GDS sections would make the artifact more persuasive as evidence of expertise, not just a nice-sounding paragraph. Real small-practice statements (e.g. [Bridge View Medical](https://bridgeviewmedical.nhs.uk/surgery-policies/accessibility-statement), [Kingskerswell & Ipplepen Medical Practice](https://kingskerswellandipplepenmedicalpractice.nhs.uk/surgery-policies/accessibility-statement)) do include the fuller structure, so a version that matches it would also be more realistic as a sample artifact, not just more compliant.

---

## Sources

- [Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 — SI 2018/952](https://www.legislation.gov.uk/uksi/2018/952/contents)
- [Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018 — SI 2018/852 (regulations text)](https://www.legislation.gov.uk/uksi/2018/852/contents/made)
- [Reg 4 — application/deadlines](https://www.legislation.gov.uk/uksi/2018/852/regulation/4/made)
- [Reg 7 — accessibility statement duty](https://www.legislation.gov.uk/uksi/2018/852/regulation/7/made)
- [Amending SI 2022/1097 (Reg 9 — "as amended from time to time")](https://www.legislation.gov.uk/uksi/2022/1097/made)
- [GOV.UK: Understanding accessibility requirements for public sector bodies](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [GOV.UK: Make your website or app accessible and publish an accessibility statement](https://www.gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement)
- [GOV.UK Service Manual: Understanding WCAG](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag)
- [GOV.UK: Accessibility monitoring of public sector websites 2022–2024](https://www.gov.uk/government/publications/accessibility-monitoring-of-public-sector-websites-and-mobile-apps-from-2022-to-2024/accessibility-monitoring-of-public-sector-websites-and-mobile-apps-from-2022-to-2024)
- [GDS blog: Public sector website accessibility statements — what you need to know](https://gds.blog.gov.uk/2018/11/21/public-sector-website-accessibility-statements-what-you-need-to-know/)
- [TetraLogical: Amendment to the Public Sector Accessibility Regulations](https://tetralogical.com/blog/2023/11/07/amendment-to-public-sector-accessibility-regulations/)
- [TetraLogical: What's new in WCAG 2.2](https://tetralogical.com/blog/2023/10/05/whats-new-wcag-2.2/)
- [Silktide: UK Government websites to meet WCAG 2.2 from October 2024](https://silktide.com/blog/uk-government-websites-to-meet-wcag-2-2-from-october-2024/)
- [W3C: Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C: Understanding Target Size (Minimum) 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C: Understanding Accessible Authentication (Minimum) 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
- [wcag22aa.org: What's new in WCAG 2.2 — the 9 new success criteria](https://www.wcag22aa.org/new-criteria/)
- [NHS digital service manual: What all NHS services need to do about accessibility](https://service-manual.nhs.uk/accessibility/what-all-nhs-services-need-to-do)
- [NHS digital service manual: Design (accessibility)](https://service-manual.nhs.uk/accessibility/design)
- [NHS digital service manual: Content (accessibility)](https://service-manual.nhs.uk/accessibility/content)
- [NHS digital service manual: Testing (accessibility)](https://service-manual.nhs.uk/accessibility/testing)
- [NHS digital service manual: How we write](https://service-manual.nhs.uk/content/how-we-write)
- [NHS England: Creating a highly usable and accessible GP website for patients](https://www.england.nhs.uk/long-read/creating-a-highly-usable-and-accessible-gp-website-for-patients/)
- [NHS England: Digital accessibility standards](https://www.england.nhs.uk/long-read/digital-accessibility/)
- [NHS.uk accessibility statement (live example)](https://www.nhs.uk/accessibility-statement/)
- [GOV.UK Design System accessibility statement (live example)](https://design-system.service.gov.uk/accessibility-statement/)
- [PracticeIndex: Meeting the new website accessibility requirements](https://practiceindex.co.uk/gp/blog/meeting-the-new-website-accessibility-requirements/)
- [nhsdigital.github.io accessibility checklist: 2.4.1 mechanism to skip content or navigation](https://nhsdigital.github.io/accessibility-checklist/pages/2.4.1-mechanism-to-skip-content-or-navigation/)
- [digital.nhs.uk content style guide](https://digital.nhs.uk/about-nhs-digital/corporate-information-and-documents/our-style-guidelines/content-style-guide)
- Example small-practice statements: [Bridge View Medical](https://bridgeviewmedical.nhs.uk/surgery-policies/accessibility-statement), [Kingskerswell & Ipplepen Medical Practice](https://kingskerswellandipplepenmedicalpractice.nhs.uk/surgery-policies/accessibility-statement), [Market Cross Surgery](https://www.marketcrosssurgery.nhs.uk/about-section/practice-policies/accessibility/)

## Files reviewed in this codebase
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/accessibility/page.tsx`
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/layout.tsx`
- `/Users/anoopjose/Projects/Website/src/components/demos/gp/GpShell.tsx`
- `/Users/anoopjose/Projects/Website/src/components/ui/Button.tsx`
- `/Users/anoopjose/Projects/Website/src/app/globals.css` (lines ~289–295, ~440–472)
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/appointments/page.tsx` (confirmed no forms)

## What remains uncertain / would need resolving before treating this as legal advice
- Whether a specific real (non-fictional) GP practice would be found to be a "body governed by public law" turns on its exact contractual/financing structure (GMS/PMS/APMS contract type); this report treats the near-universal sector practice of publishing Regulations-based statements as strong practical evidence, not as a substitute for a legal opinion.
- The exact current wording of the GDS "sample accessibility statement" template page could not be fetched directly (404 at the expected URL); the structure above is reconstructed from two live, current, GDS-pattern statements (GOV.UK Design System and NHS.uk) plus GOV.UK's guidance page, which should be materially equivalent but isn't a verbatim quote of the withdrawn/moved template.
