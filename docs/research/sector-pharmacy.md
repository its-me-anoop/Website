# UK Community Pharmacy Websites (2025/26) — Research for the Flutterly Fictional Demo

Scope: what a real Reading-area community pharmacy website must/should contain (NHS services, GPhC regulatory content), what good independent sites actually do vs the big multiples, and the anti-patterns to avoid. Researched via NHS England, NHSBSA, Community Pharmacy England (CPE), GPhC, legislation.gov.uk, and four live Reading/Berkshire independent pharmacy sites.

---

## 1. NHS services to surface

### 1a. NHS Pharmacy First — the flagship service, should be the loudest thing on the site

Pharmacy First launched 31 January 2024 and has **three distinct elements** — most pharmacy sites (including the real Reading ones I checked) only talk about the first:

1. **Clinical pathways for 7 conditions** — pharmacist can supply POM medicines under a Patient Group Direction without a GP visit. Patients can walk in directly *or* be referred by GP practice, NHS 111, or urgent/emergency care.
2. **Urgent repeat medicine supply** (successor to the old CPCS "urgent medicine supply") — NHS 111/UEC can refer a patient who's run out of a regular medicine; GP practices cannot refer into this element.
3. **NHS referral for minor illness** — GP/111/UEC refer a patient for pharmacist advice/OTC recommendation, not tied to the 7 conditions.
   Source: [NHS England — Launch of NHS Pharmacy First](https://www.england.nhs.uk/long-read/launch-of-nhs-pharmacy-first-advanced-service/), [CPE Pharmacy First](https://cpe.org.uk/national-pharmacy-services/advanced-services/pharmacy-first-service/)

**The seven conditions and age bands** (confirmed against NHS England directly, not just secondary sources):

| Condition | Eligible ages | Notes |
|---|---|---|
| Acute otitis media (earache) | 1–17 | Excluded for distance-selling pharmacies |
| Impetigo | 1+ | |
| Infected insect bites | 1+ | |
| Shingles | 18+ | |
| Sinusitis | 12+ | |
| Sore throat | 5+ | |
| Uncomplicated UTI | Women 16–64 | |

Source: [NHS England — Pharmacy First](https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/pharmacy-first/), [NHS England advanced service specification](https://www.england.nhs.uk/publication/community-pharmacy-advanced-service-specification-nhs-pharmacy-first-service/)

A clinical-pathway stocktake produced minor PGD/protocol changes effective **1 October 2025** — worth a one-line "pathways reviewed and updated Oct 2025" credibility note, not clinical detail. Independent prescribing for pharmacists is due to start **autumn 2026**, which will eventually broaden what Pharmacy First can treat — a good forward-looking line for a "future-proofed" pitch, but don't overclaim it as live yet. Source: [CPE Pharmacy First](https://cpe.org.uk/national-pharmacy-services/advanced-services/pharmacy-first-service/)

### 1b. Other national services worth their own content block

- **New Medicine Service (NMS)** — supports patients newly started on a medicine for a long-term condition (originally asthma/COPD, diabetes, hypertension, antiplatelet/anticoagulant therapy); **depression added as an eligible area from October 2025**. Source: [CPE NMS](https://cpe.org.uk/national-pharmacy-services/advanced-services/nms/), [NHS England NMS spec](https://www.england.nhs.uk/long-read/community-pharmacy-advanced-service-specification-nhs-new-medicine-service/)
- **Blood pressure check service** — free NHS blood pressure checks/case-finding for over-40s, walk-in.
- **Pharmacy Contraception Service (PCS)** — started April 2023 as ongoing-supply-only; expanded **December 2023** to include *initiation* of oral contraception via PGD plus annual reviews. Requires a consultation room. Contractors had to start initiating by 29 Feb 2024 or be deregistered — i.e. this is now table stakes, not a differentiator. Source: [CPE PCS](https://cpe.org.uk/national-pharmacy-services/advanced-services/pharmacy-contraception-service/), [Pharmaceutical Journal](https://pharmaceutical-journal.com/article/news/pharmacies-offering-contraception-service-must-opt-in-to-initiate-patients-on-the-pill-by-february-2024)
- **Seasonal flu/COVID vaccination** — genuinely seasonal (runs roughly Sept–March); eligibility cohorts phase in through the season (pregnant women/children from Sept, 65+/at-risk from Oct). Because it's seasonal, a demo site should describe it generically ("seasonal NHS flu vaccination, usually September to March — check current eligibility") rather than hard-coding this year's dates, which go stale. Source: [CPE flu vaccination service](https://cpe.org.uk/national-pharmacy-services/advanced-services/flu-vaccination-service/), [CPE seasonal vaccination services](https://cpe.org.uk/national-pharmacy-services/advanced-services/seasonal-vaccination-services-covid-19-and-adult-flu/)
- **Emergency supply of medicines** — pharmacist's power under reg. 226 Human Medicines Regulations 2012 to supply without a prescription in genuine emergencies (repeat medicine run-out, lost prescription) — this sits conceptually next to Pharmacy First's "urgent repeat medicine supply" and is worth a plain-English explainer since patients rarely know it exists.
- **Discharge Medicines Service (DMS)** — patient referred to their community pharmacy after hospital discharge for a medicines review; claim window extended to 3 months from July 2025. This is mostly B2B (hospital→pharmacy) but a short "what happens after I leave hospital" patient-facing paragraph builds trust. Source: [NHS England DMS](https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/nhs-discharge-medicines-service/), [CPE DMS](https://cpe.org.uk/national-pharmacy-services/essential-services/discharge-medicines-service/)
- **Repeat prescriptions / EPS nomination via the NHS App** — patients nominate a pharmacy in the NHS App (Prescriptions → Choose a pharmacy); once nominated, prescriptions route electronically and no paper FP10 changes hands. A pharmacy site should have a short "how to order your repeat prescription" page covering NHS App nomination, phone/in-branch ordering, and (if offered) an online order form — this is one of the single most-used pages on real pharmacy sites. Source: [NHS App — nominating a pharmacy](https://www.nhs.uk/nhs-app/help/prescriptions/nominating-a-pharmacy/)

**Practical implication for the demo:** a genuine services page needs a private consultation room mentioned explicitly, because Pharmacy First, NMS, PCS and DMS consultations all require one (confidential, seated, IT-equipped) — bricks-and-mortar pharmacies without one can't offer most of these. Source: [CPE — consultation rooms](https://cpe.org.uk/our-news/regs-reminder-14-consultation-rooms-and-remote-consultations/), [Community Pharmacy Lincolnshire](https://pharmacylincolnshire.org/services/consultation-room-requirements-for-key-services/)

---

## 2. Regulatory content — what must legally/professionally appear

The pharmacy's sole sector regulator is the **General Pharmaceutical Council (GPhC)** — not CQC (that's for the GP-practice demo). Two separate legal instruments matter:

### 2a. GPhC premises registration
- Every pharmacy premises has a **GPhC registration number** (7 digits, e.g. `1029006`). Real sites display this in the footer.
- GPhC requires online pharmacies to display their registration number, and current GPhC guidance points patients to **check the number against the GPhC's public register** to verify legitimacy. The old "internet pharmacy logo" scheme has been **discontinued** (closed to new applicants in 2025) — do **not** design a fictional "verified internet pharmacy" badge/logo into the demo, it's now defunct and would misrepresent current practice.
  Source: [GPhC — Pharmacy premises registration](https://www.pharmacyregulation.org/pharmacies/registration-and-renewal/pharmacy-premises-registration), [GPhC registers](https://www.pharmacyregulation.org/registers)
- The **superintendent pharmacist** must be named, with their own individual GPhC registration number — this is a hard requirement for the premises registration itself to be valid (GPhC won't register a pharmacy without one appointed). All four real Reading-area sites I checked display "Superintendent pharmacist: [name], GPhC no. [number]" in the footer, alongside the legal owner/company name and company registration number. Source: [GPhC — Becoming a superintendent pharmacist](https://www.pharmacyregulation.org/pharmacists/changes-registration/becoming-superintendent-pharmacist)

### 2b. Responsible pharmacist notice
Separate from the superintendent (who owns overall accountability for the business), the **Responsible Pharmacist** is whoever is in charge of that specific premises *right now*, under the Medicines (Pharmacies) (Responsible Pharmacist) Regulations 2008. Legally this must be a **physical notice in the pharmacy** (traditionally in the window or near the dispensing counter) showing:
- The responsible pharmacist's full name
- Their GPhC registration number
- A statement that they are the RP in charge at that time
- It must be updated whenever the RP changes (shift change, absence)

An RP may be absent up to 2 hours in 24, and NHS pharmacies are expected to have a pharmacist on-site at all times pharmaceutical services are being provided.
Sources: [GPhC — Being a responsible pharmacist](https://www.pharmacyregulation.org/pharmacists/changes-registration/being-responsible-pharmacist), [CPE — Responsible Pharmacist](https://cpe.org.uk/quality-and-regulations/other-regulatory-and-terms-of-service-requirments/responsible-pharmacist/), [The Medicines (Pharmacies)(Responsible Pharmacist) Regulations 2008](https://www.legislation.gov.uk/uksi/2008/2789/regulation/3/made), [Abacus Medicine — the RP notice](https://www.abacusmedicine.com/uk/the-responsible-pharmacist-notice/)

**For the demo:** this is primarily an in-store, physical-notice requirement, not a website requirement — so don't over-engineer a "current responsible pharmacist" widget on the homepage (that would be an odd, unrealistic flourish; real pharmacy sites don't do this). Instead, put the *superintendent pharmacist* + GPhC premises number in the footer (this genuinely is standard practice) and use an About/Team page to explain the roles in plain English — that's what demonstrates sector understanding without inventing a live-data feature no real site has.

### 2c. Distance-selling rules — largely not applicable
Distance-selling pharmacy (DSP) status applies to pharmacies operating wholly online/by post with no walk-in counter. A Reading high-street pharmacy demo is **not** a DSP, so the heavier disclosure rules (prescriber photo/ID pages, DSP-specific PGD exclusions like otitis media) don't apply — flag this explicitly in scoping so the demo doesn't accidentally adopt online-pharmacy patterns (e.g., an "order medicines online" checkout flow) that would misrepresent a bricks-and-mortar service. Worth one line acknowledging "this is not a distance-selling pharmacy" implicitly by *not* including mail-order/checkout UI. Source: [GPhC guidance for pharmacies providing services at a distance](https://assets.pharmacyregulation.org/files/2025-02/gphc-guidance-registered-pharmacies-providing-pharmacy-services-distance-february-2025.pdf) (Feb 2025 revision).

### 2d. Opening hours, lunch closures, bank holidays
- Real independent pharmacies commonly close for lunch — e.g. Fields Pharmacy (Twyford): **Mon–Fri 9am–1pm & 2pm–6pm, Sat 9am–1pm**, closed Sunday and bank holidays. This is a normal, expected pattern for an independent (vs. chains which tend to stay open through lunch) and is good, specific, believable content for the demo.
- NHS regulations treat Good Friday, Easter Sunday and Christmas Day specially — pharmacies can close on these (and other bank holidays) while still counting their normal hours toward contracted "core hours," *unless* directed to open by the ICB as part of the local bank-holiday rota. Pharmacies are expected to notify their ICB of bank-holiday opening via the NHS Profile Updater, and local LPCs publish rota PDFs each year.
- **Practical anti-pattern to avoid replicating:** opening hours on the pharmacy's own site not matching NHS.uk/Google — a very common real complaint. For the demo, state hours once, clearly, with an explicit "closed bank holidays — see our notice board / call ahead" line rather than pretending to show a live rota feed.
  Sources: [Community Pharmacy Cheshire & Wirral — bank/public holiday requirements](https://cpcw.org.uk/resources/bank-hols/), [CPE — bank holiday opening hours](https://cpe.org.uk/wp-content/uploads/2026/03/Pharmacy-bank-holiday-opening-hours-in-the-remainder-of-2026-and-in-2027-.pdf)

### 2e. Advertising limits — a genuine deal-breaker to design around
In April 2025 the GPhC, MHRA and ASA issued a **joint enforcement notice** prohibiting adverts that name specific prescription-only weight-management medicines (e.g. semaglutide/Wegovy-style products) to the public — GPhC can pursue the pharmacy, the superintendent, or both, and this activity is linked to roughly 40 open fitness-to-practise cases. For the fictional demo: **do not** have the fictional pharmacy advertise named POMs (weight-loss jabs, named erectile-dysfunction drugs, etc.) as a marketing hook — real GPhC-compliant sites describe *services* ("weight management support," "medicines for erectile dysfunction available following consultation") not brand-named POMs. This is the single clearest "looks realistic vs. looks like it'd get a real pharmacy in trouble" test for content review.
Sources: [GPhC — joint enforcement action on weight-management medicine advertising](https://www.pharmacyregulation.org/about-us/news-and-updates/gphc-joins-forces-other-regulators-over-advertising-weight-management-medicines), [Fitness to Practise News](https://fitnesstopractisenews.co.uk/gphc-issues-enforcement-notice-on-weight-loss-medicine-advertising/), [Pharmaceutical Journal — 40 open cases](https://pharmaceutical-journal.com/article/news/online-pharmacy-activity-linked-to-40-open-fitness-to-practise-cases-says-gphc)

### 2f. GPhC Standards for Registered Pharmacies — Principle 1 (Governance)
Relevant to content, even though it's primarily an operational standard: pharmacies must have clear staff roles/accountability, protect patient confidentiality (screens/consultation rooms not overlooked), and have a documented complaints process with MHRA escalation for product-quality/adverse-event issues. Translate this into a genuine **"Feedback and complaints" page** — most real independent sites bury this or omit it entirely (an opportunity to look more professional than the competition). Source: [GPhC Standards for registered pharmacies (June 2018, in force)](https://assets.pharmacyregulation.org/files/document/standards_for_registered_pharmacies_june_2018_0.pdf), summarised at [Pharmacy Consulting — Principle 1](https://pharmacyconsulting.co.uk/blog/gphc-standards-principle-1-governance-arrangements/)

---

## 3. What real sites do — independents vs. chains

I read four live independent pharmacies in the Reading/Berkshire area (chosen because they match the demo's target geography exactly) plus Well Pharmacy as a chain comparator (Boots blocked automated access with a bot-detection interstitial, which is itself a telling data point about chain-site complexity vs. a lean server-rendered independent site).

| Site | GPhC info in footer | Pharmacy First front-and-centre | Lunch closure stated | NHS App/EPS mentioned | Notable pattern |
|---|---|---|---|---|---|
| [Reading Pharmacy](https://readingpharmacy.co.uk/) | Yes — premises no. + superintendent name & no. | Yes | No (branch-dependent hours) | Not explicit | Vendor-platform patterns: "branches" page, dependents/account dashboard, "hours vary by branch" |
| [Oxford Road Pharmacy](https://oxfordrdpharmacy.com/) | Yes — company reg. + premises no. + superintendent | Yes | No | Not explicit | Near-identical UI/copy patterns to Reading Pharmacy above — strong evidence both run on the same white-label pharmacy platform |
| [Fields Pharmacy, Twyford](https://fieldspharmacy.uk/) | Yes — premises no. + superintendent named | Yes, with all 7 conditions listed by name | **Yes, explicit split hours** | EPS nomination mentioned | Clear NHS-vs-private split in nav; "popular services" surfaces weight-loss/travel private services without naming POMs |
| [Emmer Green Pharmacy, Caversham](https://www.emmergreenpharmacy.co.uk/) | Yes — company name + premises no. + superintendent | Yes (own nav item) | Not shown in fetch | No | Leans on "new management" and free delivery as local trust signals; simpler nav than the platform-driven sites |
| [Well Pharmacy](https://well.co.uk/services) (chain, 700+ branches) | Not surfaced on services page | Present but one tile among many | N/A (national) | Nomination page exists separately | Services organised by **demographic/health topic** (women's health, men's health, "safe spaces" for domestic abuse) rather than NHS-vs-private; heavy scale-marketing language ("without the hassle," "700 pharmacies") instead of local trust cues; blended NHS/private labelling is inconsistently clear |

### Patterns worth borrowing for the demo
1. **Footer regulatory block is universal and non-negotiable**: premises name, GPhC premises number, superintendent name + GPhC number, legal entity name. Every real independent site had this; it's the cheapest, highest-signal "we understand the sector" detail.
2. **Pharmacy First gets its own nav item and its own page**, listing all seven conditions by name — not buried inside a generic "services" grid. Fields Pharmacy does this best.
3. **Independents differentiate on locality and continuity** ("family-run," "new management," "serving Caversham since...") rather than scale. This is the opposite lever to the chains and is exactly the tone a bricks-and-mortar Reading demo should use.
4. **Lunch closures and Sunday/bank-holiday closure are stated plainly**, not hidden — patients expect it from an independent and it reads as honest rather than a weakness.
5. **A meaningful number of "independent" sites are actually running on a shared vendor platform** (Reading Pharmacy and Oxford Road Pharmacy show near-identical account/dependents/branches UI patterns — consistent with platforms like Charac, RxSure or similar practice-management vendors that bundle a templated public website). That means a genuinely bespoke, well-designed independent pharmacy site is still a real differentiator in this market — useful framing for Flutterly's own sales pitch, not just the demo content. Source for the platform landscape: [Charac — best pharmacy apps UK 2026](https://charac.co.uk/blog/for-patients/best-pharmacy-apps-in-the-uk-2026-order-prescriptions-book-appointments-and-find-your-local-pharmacy)

### Where chains diverge (don't copy)
- Store-locator-first IA (fine for a 700-branch chain, wrong for a single Reading site).
- Blended/ambiguous NHS-vs-private service labelling — Well's page doesn't consistently flag which services are free-on-NHS vs. paid; this is a genuine trust and compliance-adjacent issue, not just a style choice. The demo should always mark each service **NHS (free) / Private (paid)** clearly.
- Heavy client-side/bot-protected front ends (Boots) — the opposite of the brief's "server-rendered" requirement, and worse for accessibility/reliability than a straightforward server-rendered independent site.

---

## 4. Anti-patterns to avoid

Synthesised from pharmacy-specific UX critique plus what's visibly wrong on real sites in this space:

1. **Wall-of-text service pages / disclaimer dumps.** Pharmacy content tends to accrete every warning and footnote until pages become unscannable. Lead with the service in plain language; push clinical caveats to a secondary layer. Source: [Iguazu — UX mistakes pharma websites](https://iguazu.co.uk/articles/ux-mistakes-pharma-websites)
2. **Ambiguous NHS-free vs. private-paid labelling.** Seen on chain sites; erodes trust and risks looking like you're upselling a free service.
3. **Generic stock photography** (pill bottles, shelves, models in white coats) instead of anything that signals *this specific pharmacy*. Real independents lean on locality/family-run framing instead — worth doing the equivalent for the fictional demo (specific, invented local detail) rather than generic pharmacy stock imagery.
4. **Superintendent/GPhC number missing or buried** in a T&Cs page instead of the footer — every credible real site puts it in the footer; omitting it is the single clearest "doesn't understand the sector" signal a reviewer would spot.
5. **No mention of the consultation room** despite listing confidential services (Pharmacy First, PCS, NMS) that legally require one — a subtle but real gap on some sites.
6. **Opening-hours drift** between the pharmacy's own site, Google, and NHS.uk — a widely reported real-world patient complaint; the demo should state hours in exactly one place and reference it consistently.
7. **No bank-holiday guidance** — either silence or a vague "we may be closed," rather than the honest, standard independent pattern (closed Sundays/bank holidays, check the door/notice board or ICB rota).
8. **Named POM advertising** (weight-loss jabs, ED drugs by brand) as a marketing hook — actively enforced against by GPhC/MHRA/ASA since April 2025; a realistic fictional pharmacy would describe the *service*, not the drug brand.
9. **Modal-heavy or heavily interactive booking flows** for what should be simple inline information (aligns with the studio's own style guidance to exhaust inline alternatives before reaching for a modal) — real pharmacy sites over-rely on account dashboards/pop-ups for things that could be static content (e.g., "how to order a repeat prescription").
10. **Non-responsive or slow-loading pages, broken links, no clear CTA, confusing multi-level dropdown nav, no analytics/feedback loop** — generic but validated web-agency critique specific to pharmacy sites. Source: [PBA Health — 10 things holding back your pharmacy website](https://www.pbahealth.com/elements/10-things-that-are-holding-back-your-pharmacy-website/)
11. **Bot-protected or JS-gated pages that block basic access** (seen first-hand trying to read Boots' NHS services page) — the antithesis of a lean, accessible, server-rendered site, and a poor model even though it's from a major chain.
12. **Treating the internet-pharmacy logo/badge as current** — it's discontinued (2025); a demo that includes a "verified online pharmacy" badge would look out of date to anyone in the sector.

---

## 5. Implications for the Flutterly demo (content, not design)

Given the brief already fixes WCAG 2.2 AA, server-rendered, fictional-labelled, Reading-area, 4–6 pages, the content backbone that would read as authentic to someone in the sector:

- **Home** — lead with Pharmacy First (all 7 conditions named) and repeat-prescription/NHS App nomination as the two highest-frequency patient needs; local, specific framing (family-run/serving a named Reading neighbourhood) rather than scale claims.
- **Services** — grouped and explicitly labelled NHS (free) vs. Private (paid): Pharmacy First, NMS, blood pressure checks, Pharmacy Contraception Service, seasonal flu/COVID vaccination (described generically, not date-locked), emergency supply, DMS explainer, plus a couple of believable private extras (travel vaccinations, weight-management *support* — service framed, no named POM).
- **Repeat prescriptions & NHS App** — plain-English how-to: nominate via NHS App, EPS explainer, what "ready for collection" timelines look like, delivery option if offered.
- **About / Our team** — superintendent pharmacist named with a clearly fictional GPhC number, GPhC premises number, mention of the private consultation room, and a short explanation of what a responsible pharmacist is (without pretending to have a live "who's on duty" widget, which no real site has).
- **Opening hours & location** — explicit lunch-closure pattern (if wanted, to read as authentically independent), Sunday/bank-holiday closure stated plainly, no live rota gimmick.
- **Contact / feedback & complaints** — a genuine complaints/feedback page is rare among the real sites reviewed and would read as unusually professional; worth including as the 6th page.

Footer across all pages: pharmacy name, registered address, GPhC premises number, superintendent name + GPhC number, legal entity name — all invented but formatted exactly as real sites format them (e.g., `GPhC premises no. [7-digit fictional number] · Superintendent pharmacist: [Name], GPhC [7-digit fictional number]`), plus a clear "this is a fictional demonstration site" disclaimer per the existing Flutterly convention.

---

## Sources

- [NHS England — Pharmacy First](https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/pharmacy-first/)
- [NHS England — Community pharmacy advanced service specification: NHS Pharmacy First Service](https://www.england.nhs.uk/publication/community-pharmacy-advanced-service-specification-nhs-pharmacy-first-service/)
- [NHS England — Launch of NHS Pharmacy First advanced service](https://www.england.nhs.uk/long-read/launch-of-nhs-pharmacy-first-advanced-service/)
- [Community Pharmacy England — Pharmacy First service](https://cpe.org.uk/national-pharmacy-services/advanced-services/pharmacy-first-service/)
- [CPE briefing — Pharmacy First urgent supply of medicines](https://cpe.org.uk/wp-content/uploads/2026/02/Briefing-002.26-PF-Urgent-supply-of-medicines-and-appliances.pdf)
- [NHSBSA — NHS Pharmacy First Service](https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/dispensing-contractors-information/nhs-pharmacy-first-service-pfs)
- [Wikipedia — Pharmacy First](https://en.wikipedia.org/wiki/Pharmacy_First)
- [NHS England — NHS Discharge Medicines Service](https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/nhs-discharge-medicines-service/)
- [CPE — Discharge Medicines Service](https://cpe.org.uk/national-pharmacy-services/essential-services/discharge-medicines-service/)
- [CPE — New Medicine Service](https://cpe.org.uk/national-pharmacy-services/advanced-services/nms/)
- [NHS England — NMS advanced service specification](https://www.england.nhs.uk/long-read/community-pharmacy-advanced-service-specification-nhs-new-medicine-service/)
- [CPE — Pharmacy Contraception Service](https://cpe.org.uk/national-pharmacy-services/advanced-services/pharmacy-contraception-service/)
- [Pharmaceutical Journal — pharmacies must opt in to initiate patients on the pill](https://pharmaceutical-journal.com/article/news/pharmacies-offering-contraception-service-must-opt-in-to-initiate-patients-on-the-pill-by-february-2024)
- [NHS England — NHS Pharmacy Contraception Service](https://www.england.nhs.uk/long-read/nhs-pharmacy-contraception-service/)
- [CPE — Flu Vaccination Service](https://cpe.org.uk/national-pharmacy-services/advanced-services/flu-vaccination-service/)
- [CPE — Seasonal Vaccination Services (COVID-19 and adult flu)](https://cpe.org.uk/national-pharmacy-services/advanced-services/seasonal-vaccination-services-covid-19-and-adult-flu/)
- [NHS App — Nominating a pharmacy](https://www.nhs.uk/nhs-app/help/prescriptions/nominating-a-pharmacy/)
- [CPE — NHS App](https://cpe.org.uk/digital-and-technology/patient-facing-tools-apps-and-services/nhs-app/)
- [CPE — Regs reminder: consultation rooms and remote consultations](https://cpe.org.uk/our-news/regs-reminder-14-consultation-rooms-and-remote-consultations/)
- [Community Pharmacy Lincolnshire — consultation room requirements](https://pharmacylincolnshire.org/services/consultation-room-requirements-for-key-services/)
- [GPhC — Pharmacy premises registration](https://www.pharmacyregulation.org/pharmacies/registration-and-renewal/pharmacy-premises-registration)
- [GPhC — Registers](https://www.pharmacyregulation.org/registers)
- [GPhC — Becoming a superintendent pharmacist](https://www.pharmacyregulation.org/pharmacists/changes-registration/becoming-superintendent-pharmacist)
- [GPhC — Being a responsible pharmacist](https://www.pharmacyregulation.org/pharmacists/changes-registration/being-responsible-pharmacist)
- [CPE — Responsible Pharmacist](https://cpe.org.uk/quality-and-regulations/other-regulatory-and-terms-of-service-requirments/responsible-pharmacist/)
- [The Medicines (Pharmacies) (Responsible Pharmacist) Regulations 2008 — legislation.gov.uk](https://www.legislation.gov.uk/uksi/2008/2789/regulation/3/made)
- [Abacus Medicine — The Responsible Pharmacist Notice](https://www.abacusmedicine.com/uk/the-responsible-pharmacist-notice/)
- [GPhC — Standards for registered pharmacies (June 2018)](https://assets.pharmacyregulation.org/files/document/standards_for_registered_pharmacies_june_2018_0.pdf)
- [Pharmacy Consulting — GPhC Standards Principle 1](https://pharmacyconsulting.co.uk/blog/gphc-standards-principle-1-governance-arrangements/)
- [GPhC — Guidance for registered pharmacies providing pharmacy services at a distance (Feb 2025)](https://assets.pharmacyregulation.org/files/2025-02/gphc-guidance-registered-pharmacies-providing-pharmacy-services-distance-february-2025.pdf)
- [RxSure — GPhC Registration for Online Pharmacies](https://rxsure.co.uk/gphc-registration-online-pharmacy/)
- [GPhC — joint enforcement action on advertising of weight management medicines](https://www.pharmacyregulation.org/about-us/news-and-updates/gphc-joins-forces-other-regulators-over-advertising-weight-management-medicines)
- [Fitness to Practise News — GPhC weight-loss medicine advertising enforcement notice](https://fitnesstopractisenews.co.uk/gphc-issues-enforcement-notice-on-weight-loss-medicine-advertising/)
- [Pharmaceutical Journal — online pharmacy activity linked to 40 open fitness-to-practise cases](https://pharmaceutical-journal.com/article/news/online-pharmacy-activity-linked-to-40-open-fitness-to-practise-cases-says-gphc)
- [Community Pharmacy Cheshire and Wirral — public and bank holiday opening requirements](https://cpcw.org.uk/resources/bank-hols/)
- [CPE — Pharmacy bank holiday opening hours 2026/2027](https://cpe.org.uk/wp-content/uploads/2026/03/Pharmacy-bank-holiday-opening-hours-in-the-remainder-of-2026-and-in-2027-.pdf)
- Real independent pharmacy sites read directly: [Reading Pharmacy](https://readingpharmacy.co.uk/), [Fields Pharmacy, Twyford](https://fieldspharmacy.uk/), [Emmer Green Pharmacy, Caversham](https://www.emmergreenpharmacy.co.uk/), [Oxford Road Pharmacy, Reading](https://oxfordrdpharmacy.com/)
- [Well Pharmacy — Services](https://well.co.uk/services) / [Well Pharmacy — Nominations](https://well.co.uk/prescriptions/nominations) (chain comparator)
- [PBA Health — 10 things that are holding back your pharmacy website](https://www.pbahealth.com/elements/10-things-that-are-holding-back-your-pharmacy-website/)
- [Iguazu — 10 UX mistakes pharma brands must fix](https://iguazu.co.uk/articles/ux-mistakes-pharma-websites)
- [Charac — Best Pharmacy Apps UK 2026](https://charac.co.uk/blog/for-patients/best-pharmacy-apps-in-the-uk-2026-order-prescriptions-book-appointments-and-find-your-local-pharmacy)

### Gaps / what I couldn't verify directly
- I could not directly fetch the GPhC's own HTML pages for premises registration or the distance-selling PDF (403/binary-parse failures) — the specifics on registration-number-plus-register-link and superintendent/team-page requirements are corroborated by GPhC's own page **title and indexed snippet** plus a third-party compliance vendor (RxSure) that cites the same Feb 2025 GPhC guidance; if this ever needs to be legally precise (not just "looks credible" for a fictional demo), pull the primary GPhC PDF text directly rather than relying on my secondary-source synthesis.
- The exact current status of the "internet pharmacy logo" scheme wind-down date was inconsistent across search snippets (June 2025 vs Dec 2025 close dates) — safe conclusion either way is "discontinued, don't use it," but I did not confirm an exact date from a primary GPhC page.
