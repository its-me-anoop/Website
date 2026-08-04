# UK GP Practice Websites: Research for Willowbrook Surgery Demo

## Method note

I looked for practices that are either (a) named in an NHS England/HSJ digital-access award or case study, or (b) cited by GP-website vendors (Silicon Practice/FootFall, Agilio/Practice365) as reference implementations, then read the **live, real sites** directly rather than relying on vendor marketing copy. Five practice sites below were fetched and read directly; NHS England's own long-form guidance and its 50-criterion benchmarking tool are treated as the primary normative source since they are what every commercial GP-website vendor (Silicon Practice, GPsurgery.net, GP Surgery Sites, Practice365) explicitly builds to comply with, and Willowbrook is styled on the same conventions. One HSJ award winner (Southport and Formby Health) is included for credibility but flagged as a weaker IA example because it's a PCN-level organisational site, not a single-practice patient portal — worth knowing so it isn't over-weighted.

---

## Primary source: NHS England's own guidance (read this before the sites)

Two NHS England long-reads and a formal benchmarking tool set the bar that every vendor below is building against:

- **["Creating a highly usable and accessible GP website for patients"](https://www.england.nhs.uk/long-read/creating-a-highly-usable-and-accessible-gp-website-for-patients/)** — based on usability testing with 102 patients (low-to-moderate digital/English confidence) and 165 staff across 25 practices. Key findings: 80% of users look at the homepage first for any task; menus should have ≤7 items (its own reference structure is **Home, Appointments, Prescriptions, Services, About the Surgery, Contact Us**); 81% of nhs.uk sessions are mobile, so labelled "Menu" beats hamburger icons; avoid PDFs; avoid overlays/pop-ups (27% of test participants got stuck on them); write to a 9–11-year reading age; avoid the word "emergency appointment" (confuses with A&E).
- **[GP Website Benchmarking and Improvement Tool](https://www.england.nhs.uk/publication/gp-website-benchmarking-and-improvement-tool/)** — a free 50-criterion Excel audit, built from observing patients navigate 10 GP sites, now the de facto standard vendors sell against ([Silicon Practice's own writeup](https://siliconpractice.co.uk/2024/03/07/nhs-benchmarking-raising-gp-website-quality/), [Tree View Designs' scoring guide](https://treeviewdesigns.co.uk/blog/nhs-gp-website-benchmarking-tool-guide)). It scores three things: **(1) seven patient journeys** — make/change/cancel an appointment (incl. online consultation), repeat prescriptions, sick notes, test results, registering, finding contact/access info; **(2) practice-manager-required content** — Friends and Family Test results, complaints procedure, registration/catchment detail, vaccination info; **(3) legal compliance** — privacy notice, accessibility statement, cookies.
- **[Step-by-step guide to improving GP website online journeys](https://www.england.nhs.uk/long-read/step-by-step-guide-to-improving-general-practice-website-online-journeys/)** — prioritises four pages above all others: Appointments, Prescriptions, Contact, Registration.
- **[Enhanced Access FAQs, Network Contract DES](https://www.england.nhs.uk/gp/investment/gp-contract/network-contract-directed-enhanced-service-des/enhanced-access-faqs/)** — since October 2022 every PCN is *contractually required* to offer patient-facing appointments 6:30–8pm weekdays and 9am–5pm Saturdays. This is not optional branding; it's a service patients are entitled to, which is why every real site below foregrounds it.

---

## Five real practice sites, read directly

### 1. Formby Medical Group — [formbymedicalgroup.nhs.uk](https://www.formbymedicalgroup.nhs.uk/)
*(Part of Southport & Formby PCN — the same network whose "GP Website Transformation" was shortlisted at the [HSJ Digital Awards 2024](https://www.hsj.co.uk/hsj-digital-awards-2024-improving-primary-care-through-digital/7037208.article).)*

- **IA / nav:** Home, Appointments, Prescriptions, Practice Information, Services, Vaccinations, Contact Us. Two-site practice (Chapel Lane Surgery + The Hollies Family Surgery), each with its own phone number shown together.
- **Homepage prioritisation:** leads with "We are currently accepting new patients" linked straight to registration, then six task tiles (Digital Front Door, appointments, repeat prescriptions, new patient registration, test results, fit notes) — registration is a first-class homepage task, not buried.
- **Appointments journey ([formbymedicalgroup.nhs.uk/appointments/](https://www.formbymedicalgroup.nhs.uk/appointments/)):** deliberately avoids an urgent/routine split. Frames phone, video and face-to-face as flexible options ("more flexible and often means we can help you sooner") and leads with **cancellation instructions**, not booking mechanics. Explicitly names accommodations (interpreter, specific clinician, access needs) as a first-class option, not an afterthought.
- **Standout to copy:** the "Digital Front Door" concept as a named, single entry point that bundles online consultation + self-care advice + NHS 111 signposting into one branded idea patients learn once and reuse — rather than making patients choose between five differently-labelled tools.
- **Anti-pattern:** the appointments page has no booking-system link and no time-frame table at all — patients must navigate elsewhere to actually act. Good tone, weak call-to-action density.

### 2. Canbury & Berrylands Surgery (formerly Berrylands Surgery) — [berrylandssurgery.nhs.uk](https://www.berrylandssurgery.nhs.uk/)
*(A FootFall/Silicon Practice site — [siliconpractice.co.uk/footfall-case-studies](https://siliconpractice.co.uk/footfall-case-studies/) — showcasing the platform used across 1,000+ UK practices.)*

- **IA / nav:** Home, Appointments, Contact Us, **Our Practice** (dropdown: practice info, accreditations, team, feedback, PPG, vacancies, policies), Test Results, **Prescriptions** (dropdown: prescriptions, medication reviews), **Patient Resources** (dropdown: services, news, sick notes, referrals, online access, non-NHS work), New Patients, Seasonal Vaccinations. Test Results has its own **top-level nav item**, not an anchor.
- **Homepage prioritisation:** four card-style CTAs above the fold — Register as new patient, Request sick/fit note, Order prescriptions, Access test results — plus a merger notice, NHS App walkthrough videos, Pharmacy First promo, and a **missed-appointments notice framed around NHS cost impact**.
- **Standout to copy:**
  - **CQC "Good" rating badge**, prominently placed and linked to the actual inspection report — a trust signal none of Willowbrook's pages carry despite the practice-information page *claiming* Friends and Family Test results are "displayed... on this website" (they aren't, anywhere in the demo).
  - A **"What our patients say" testimonial block**.
  - **Extended hours clearly stated**: 8am–8pm Monday–Friday at the surgery, plus a named weekend PCN hub number (0203 841 9942) for Enhanced Access appointments — exactly the contractual pattern above.
- **Anti-pattern:** dropdown-heavy nav (three multi-item dropdowns) trades the "≤7 flat items" NHS England guidance for depth; on mobile this is a common source of the 27%-overlay-style confusion the benchmarking research flags. Good content, worse discoverability than a flat structure.

### 3. Hove Medical Centre — [hovemedicalcentre.co.uk](https://www.hovemedicalcentre.co.uk/)

- **IA / nav:** Quick Links (patient tasks): Contact Us, New Patients, Appointments, Prescriptions, Services, Opening Times — cleanly separated from a second "Practice Information" cluster (About Us, GP Net Earnings, Meet The Team, Jobs, Patient Group, Practice Policies) and a third legal-compliance cluster (Terms, Privacy, Accessibility, Cookies, Copyright, Complaints). This three-tier separation (task / trust-building / legal) is a clean IA pattern.
- **Homepage prioritisation:** leads with NHS App promotion and an NHS England "You and your general practice" explainer — teaching patients what to expect from modern general practice, not just listing services.
- **Standout to copy:** **CQC "Good" rating badge** again (a repeated pattern across real sites — two-of-five here), and "New Patients" as a first-class Quick Link alongside Appointments/Prescriptions rather than buried in About.
- **Anti-pattern:** no distinct urgent-care messaging visible on the homepage — a patient in genuine distress has to hunt for what to do if the surgery is shut, which the benchmarking tool penalises directly (it audits the "find urgent help" journey).

### 4. Guru Nanak Medical Centre & Botwell Medical Centre (Dr G Singh & Partners) — [drgsinghandpartners.nhs.uk](https://www.drgsinghandpartners.nhs.uk/)

- **IA / nav:** Home, News, Clinics and Services, Our Practice, Health Information, Contact Us, plus a "Browse More" expander. Two-site practice (Southall + Hayes).
- **Homepage prioritisation:** "currently accepting patients" banner up top, then tiled quick-access for online consultation, appointments, repeat prescriptions, admin requests, registration, NHS App, news, PPG, health information.
- **Appointments journey ([drgsinghandpartners.nhs.uk/appointments/](https://www.drgsinghandpartners.nhs.uk/appointments/)):** the strongest of the five I read. Routine appointments (eConsult, NHS App, phone, in-person) presented first; **emergency pathway is a symptom-based decision tree** ("chest pain," "breathlessness," "suspected stroke" → 999/A&E), not a generic "call 999" line; explicit **paediatric A&E routing** (local Ealing Hospital can't treat children, so it names the alternative site); and a **home-visits section with eligibility criteria and a same-morning cut-off time** for requests.
- **Standout to copy:** published **access-standard commitments** on the appointments page itself — "90% of calls answered within 10 minutes," "90% of online consultations responded to by end of next working day." Turns an abstract promise ("we'll get back to you") into a measurable, checkable one.
- **Anti-pattern:** none observed structurally, though a five-item "Browse More" catch-all is a soft version of the same dropdown-depth trade-off as Berrylands.

### 5. Wootton Medical Centre — [woottonmedicalcentre.co.uk](https://woottonmedicalcentre.co.uk/)
*(Silicon Practice's flagship "Foundation" template case study — [siliconpractice.co.uk/wootton-medical-practice](https://siliconpractice.co.uk/wootton-medical-practice/).)*

- **IA / nav:** Appointments, Prescriptions, Services, About the surgery, **Register with the surgery**, Contact us — registration is a **top-level nav item**, matching NHS England's own reference structure exactly.
- **Homepage prioritisation:** visible site search + quick-access buttons, then priority order: Anima (online contact — "Skip the phone call, contact us online"), Test results, Patient registration (with **catchment-area verification**), Sick notes, Prescriptions (with pharmacy-finder), Appointments.
- **Standout to copy:** **visible site search box** in the header (the one NHS England guidance calls out specifically — 27% overlay-confusion rate cited in the long-read is exactly the kind of dead-end search-avoidance is meant to prevent); a **catchment-area checker** at the point of registration rather than prose asking patients to "check if you live in our area."
- **Anti-pattern:** a large "HOT WEATHER ADVICE" banner repeated four times on the homepage the day it was fetched — seasonal alert content can visually dominate and crowd out the permanent task tiles if not time-boxed or dismissible.

### 6. Southport and Formby Health — [southportandformbyhealth.com](https://www.southportandformbyhealth.com/) *(award context, weaker IA example)*

Included because it's the entity behind the [HSJ Digital Awards 2024](https://digitalawards.hsj.co.uk/winners-2024) shortlisted "GP Website Transformation." Reading the live site shows why it's a *weaker* IA reference for a single-practice demo: it's a GP-owned federation/at-scale provider site (nav: Home, About Us, Our Services, News, Vacancies, Contact Us), so it describes services narratively (7-Day GP Service, Community Cardiology) rather than surfacing appointment/prescription self-service — those live on the *member practices'* individual sites, not here. It does one thing well worth noting as a **caution, not a model**: it layers a third-party **accessibility overlay toolbar** (translate, text-to-speech, font size, contrast toggle) — precisely the pattern NHS England's usability research argues against, since overlays don't fix underlying markup/contrast problems and can conflict with a patient's own browser/OS accessibility tools, and 27% of tested users got stuck on overlay-style UI generally.

---

## Cross-cutting patterns that appear on the best real sites (and in NHS England's own criteria)

| Pattern | Seen on |
|---|---|
| Registration as a **top-level nav item or homepage banner**, not buried | Wootton (nav item), Formby (homepage lead), Guru Nanak (banner), Hove (Quick Link) |
| **Catchment-area self-check** at the point of registration | Wootton |
| **CQC rating badge**, linked to the real report | Berrylands, Hove |
| **Enhanced/extended-access hours stated explicitly** (evenings + Saturday PCN hub, with a number) | Berrylands, Formby ("7-Day GP Service"), Southport & Formby Health |
| **Visible site search** | Wootton |
| **Home-visit eligibility + cut-off time** as its own appointments-page section | Guru Nanak/Dr G Singh |
| **Published, measurable access standards** ("90% of calls answered within 10 minutes") | Guru Nanak/Dr G Singh |
| **Symptom-based emergency decision tree** rather than a single generic 999 line | Guru Nanak/Dr G Singh |
| **Patient testimonials / FFT results actually displayed**, not just referenced | Berrylands |
| Test results as a **top-level nav item** | Berrylands |

---

## Comparison against Willowbrook: what's already right, and what's genuinely missing

I read the demo's source directly — `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/page.tsx`, `appointments/page.tsx`, `prescriptions/page.tsx`, `contact/page.tsx`, `services/page.tsx`, `practice-information/page.tsx`, and the shared shell/data at `/Users/anoopjose/Projects/Website/src/components/demos/gp/GpShell.tsx`, `GpNav.tsx`, `data.ts`.

### Already matching or beating best-practice
Worth stating so the gap list below reads as genuine, not padding: Willowbrook's nav (`data.ts` `navLinks`: Home/Appointments/Prescriptions/Services & clinics/Our team/Contact — 6 flat items) matches NHS England's own reference structure almost exactly, without the dropdown-depth trade-off Berrylands and Guru Nanak make. Its "Urgent appointments for today" framing (`appointments/page.tsx`) correctly avoids the "emergency appointment" A&E-confusion the NHS England research specifically warns against, and its emergency care-card ("Call 999 or go to A&E now if…") is symptom-based like the best example (Dr G Singh), not a generic line. It has no PDFs and no accessibility-overlay widget, both explicit anti-patterns real sites still ship. Registration copy already states "you do not need proof of address or immigration status" up front, which is the single biggest finding of NHS England's [GP registration case study](https://www.england.nhs.uk/gp/case-studies/new-service-makes-it-easier-to-register-with-a-gp-surgery/).

### Missing patterns (concrete, prioritised)

1. **No mention of Enhanced/extended access hours anywhere.** `data.ts` `openingTimes` shows Saturday/Sunday as flatly "Closed — call NHS 111." Since October 2022 every PCN is contractually required to offer evening (6:30–8pm weekdays) and Saturday (9am–5pm) appointments via a hub ([Enhanced Access FAQs](https://www.england.nhs.uk/gp/investment/gp-contract/network-contract-directed-enhanced-service-des/enhanced-access-faqs/)), and every real multi-practice site read here (Berrylands, Formby, Southport & Formby Health) states this with a name or number. This is the single most concrete, checkable, and easily fixed omission — it isn't a stylistic choice, it's information patients are entitled to.

2. **Registration has no dedicated page or nav entry.** It's a mid-page anchor (`#register`) at the bottom of `contact/page.tsx`, reachable only via a secondary "more tasks" card on the homepage (`data.ts` `moreTasks`). NHS England's benchmarking tool names "register with the practice" as one of only seven scored patient journeys, and both Wootton (top nav item) and Formby (homepage-leading banner) treat it as first-class. There's also no catchment-area self-check — the copy just says "if you live in our catchment area" with nothing to check that against, unlike Wootton's postcode verification.

3. **No trust/reputation signals.** No CQC rating badge (two of five real sites showed one prominently), no testimonials, and `practiceInfo` in `data.ts` explicitly *claims* "[Friends and Family Test] results are displayed in our waiting room and on this website" — but they are not displayed anywhere in the demo. That's a copy/reality mismatch worth fixing even in a fictional demo, since it's exactly the kind of claim a real practice's website would need to make good on.

4. **No site search.** NHS England's long-read specifically studied search behaviour (visible "Menu"/search over hamburgers) and Wootton implements a visible search box. `GpShell.tsx`/`GpNav.tsx` has none — reasonable for a 9-page demo, but worth a one-line note if this is being pitched as production-representative, since search is one of the 50 benchmarking criteria.

5. **No home-visit information.** Dr G Singh's appointments page gives eligibility and a same-day cut-off time as a distinct section; Willowbrook's `appointments/page.tsx` has no equivalent — a real gap for elderly/housebound patients, a population GP sites are specifically expected to serve well.

6. **Self-referral links terminate in "ask reception" instead of a direct link.** `services/page.tsx`'s `selfReferral` section (Pharmacy First, physio, Talking Therapies, sexual health, stop smoking) ends with "Reception can give you the contact details... or find them on the NHS website" — which quietly reintroduces the phone-call friction the self-referral pathway exists to remove. Every real site that mentions Pharmacy First or eConsult-style triage links directly to it.

7. **No measurable access commitments.** Dr G Singh publishes specific SLAs ("90% of calls answered within 10 minutes"). Willowbrook's copy uses softer, unquantified promises ("reply within one working day," "the quietest time to call is after 10:30am") — good tone, but a numbered commitment is a stronger, more copyable pattern if the studio wants to differentiate on credibility.

### Anti-patterns confirmed across real sites — worth naming explicitly so they're never added later
- Accessibility overlay toolbars (font-size/contrast/translate widgets) — Southport & Formby Health. NHS England's own usability research argues against these; Willowbrook correctly has none.
- Deep dropdown navigation trading NHS England's "≤7 flat items" guidance for content depth — Berrylands' three multi-item dropdowns, Guru Nanak's "Browse More" catch-all.
- Seasonal/promotional banners crowding out permanent task tiles — Wootton's four repeated "HOT WEATHER ADVICE" blocks the day it was read.
- Appointments pages with strong tone but no actual booking link or timeframe (Formby) — content without a call-to-action.
- Claiming content ("FFT results... on this website") that isn't actually present (Willowbrook's own `practiceInfo` copy) — worth fixing regardless of fictional status, since it's the kind of inconsistency a real client's website would be caught out on.

---

## Sources
- [NHS England: Creating a highly usable and accessible GP website for patients](https://www.england.nhs.uk/long-read/creating-a-highly-usable-and-accessible-gp-website-for-patients/)
- [NHS England: GP Website Benchmarking and Improvement Tool](https://www.england.nhs.uk/publication/gp-website-benchmarking-and-improvement-tool/)
- [Tree View Designs: How to Score Well on the NHS Benchmarking Tool](https://treeviewdesigns.co.uk/blog/nhs-gp-website-benchmarking-tool-guide)
- [NHS England: Step-by-step guide to improving general practice website online journeys](https://www.england.nhs.uk/long-read/step-by-step-guide-to-improving-general-practice-website-online-journeys/)
- [NHS England: New service makes it easier to register with a GP surgery](https://www.england.nhs.uk/gp/case-studies/new-service-makes-it-easier-to-register-with-a-gp-surgery/)
- [NHS England: Enhanced Access FAQs (Network Contract DES)](https://www.england.nhs.uk/gp/investment/gp-contract/network-contract-directed-enhanced-service-des/enhanced-access-faqs/)
- [HSJ Digital Awards 2024: Improving Primary Care Through Digital (Southport and Formby shortlisted)](https://www.hsj.co.uk/hsj-digital-awards-2024-improving-primary-care-through-digital/7037208.article) / [Winners 2024](https://digitalawards.hsj.co.uk/winners-2024)
- [Formby Medical Group](https://www.formbymedicalgroup.nhs.uk/) / [Appointments](https://www.formbymedicalgroup.nhs.uk/appointments/)
- [Canbury & Berrylands Surgery](https://www.berrylandssurgery.nhs.uk/)
- [Hove Medical Centre](https://www.hovemedicalcentre.co.uk/)
- [Dr G Singh and Partners — Guru Nanak & Botwell Medical Centres](https://www.drgsinghandpartners.nhs.uk/) / [Appointments](https://www.drgsinghandpartners.nhs.uk/appointments/)
- [Wootton Medical Centre](https://woottonmedicalcentre.co.uk/)
- [Southport and Formby Health](https://www.southportandformbyhealth.com/)
- [Silicon Practice: FootFall case studies](https://siliconpractice.co.uk/footfall-case-studies/) / [Wootton Medical Practice case study](https://siliconpractice.co.uk/wootton-medical-practice/)

## Willowbrook files referenced
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/page.tsx`
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/appointments/page.tsx`
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/prescriptions/page.tsx`
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/contact/page.tsx`
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/services/page.tsx`
- `/Users/anoopjose/Projects/Website/src/app/demo/gp-practice/practice-information/page.tsx`
- `/Users/anoopjose/Projects/Website/src/components/demos/gp/GpShell.tsx`
- `/Users/anoopjose/Projects/Website/src/components/demos/gp/GpNav.tsx`
- `/Users/anoopjose/Projects/Website/src/components/demos/gp/data.ts`
