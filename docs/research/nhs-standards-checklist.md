# NHS-standards requirements checklist — GP practice website

**Source key** (used throughout):
- **PRN00651** — [Creating a highly usable and accessible GP website for patients, v3](https://www.england.nhs.uk/wp-content/uploads/2022/09/PRN00651-creating-a-highly-usable-and-accessible-gp-website-for-patients-v3.pdf) ([long-read](https://www.england.nhs.uk/long-read/creating-a-highly-usable-and-accessible-gp-website-for-patients/))
- **PRN01429** — [Step-by-step guide to improving GP website online journeys](https://www.england.nhs.uk/long-read/step-by-step-guide-to-improving-general-practice-website-online-journeys/)
- **PRN00274** — [GP website benchmarking and improvement tool](https://www.england.nhs.uk/publication/gp-website-benchmarking-and-improvement-tool/) (50 criteria)
- **GMS Regs** — [SI 2015/1862](https://www.legislation.gov.uk/uksi/2015/1862/contents/made) (mirrored in [PMS SI 2015/1879](https://www.legislation.gov.uk/uksi/2015/1879/contents/made))
- **2025/26 contract** — [Changes to the GP Contract in 2025/26](https://www.england.nhs.uk/long-read/changes-to-the-gp-contract-in-2025-26/); [1 Oct 2025 compliance assessment](https://www.england.nhs.uk/long-read/assessment-of-general-practice-compliance-1-october-contractual-changes/)
- **PSBAR** — [Public Sector Bodies Accessibility Regulations 2018, SI 2018/952](https://www.legislation.gov.uk/uksi/2018/952/contents), as amended by [SI 2022/1097](https://www.legislation.gov.uk/uksi/2022/1097/made); [GOV.UK guidance](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- **Service manual** — [NHS digital service manual](https://service-manual.nhs.uk/) (design system, content guide, accessibility)

MUST = statutory, contractual, or legally required. SHOULD = NHS England / service-manual guidance (the benchmarking tool scores against it, but it is not law).

## 1. Statutory and contractual content (all MUST)

Derived from the GMS Regs duty to maintain an online presence publishing everything in the practice leaflet (Reg 73 / Sch 3 Part 6), as tabulated in PRN00651 Part 4 (pp 58–71), cross-checked against 2025/26 contract changes.

| # | Requirement | Level | Source |
|---|---|---|---|
| 1 | Practice name, address(es), phone, email, plus every route by which patients can book/amend appointments or order repeat prescriptions | MUST | GMS Regs; PRN00651 Part 4 |
| 2 | Opening hours of premises and how to access services throughout core hours | MUST | GMS Regs; PRN00651 Part 4 |
| 3 | Extended-hours / Enhanced Access arrangements — since Oct 2022 every PCN must offer 6:30–8pm weekday and 9am–5pm Saturday appointments; the website must say how patients reach them | MUST | [Enhanced Access FAQs, Network Contract DES](https://www.england.nhs.uk/gp/investment/gp-contract/network-contract-directed-enhanced-service-des/enhanced-access-faqs/) |
| 4 | Out-of-hours arrangements and how to contact them (NHS 111 / 999 routing) | MUST | GMS Regs; PRN00651 Part 4 |
| 5 | Named accountable GP arrangements (all patients and 75+) and right to express a practitioner preference | MUST | GMS Regs; PRN00651 Part 4 |
| 6 | Partnership/company structure (partner names, or directors/secretary/shareholders + registered office) | MUST | GMS Regs; PRN00651 Part 4 |
| 7 | Full names and professional qualifications of everyone providing services under the contract | MUST | GMS Regs; PRN00651 Part 4 |
| 8 | Whether the practice trains healthcare professionals/students | MUST | GMS Regs; PRN00651 Part 4 |
| 9 | Practice area / catchment boundary "by reference to a sketch diagram, plan, or postcode" (commonly a map + postcode checker) | MUST | GMS Regs; PRN00651 Part 4 |
| 10 | Disabled-access arrangements at the premises (or alternatives if none) | MUST | GMS Regs; PRN00651 Part 4 |
| 11 | How to register as a patient (including that no proof of address, ID or immigration status is needed) | MUST | GMS Regs; PRN00651 Part 4; [NHS registration case study](https://www.england.nhs.uk/gp/case-studies/new-service-makes-it-easier-to-register-with-a-gp-surgery/) |
| 12 | Services available under the contract | MUST | GMS Regs; PRN00651 Part 4 |
| 13 | Home-visit criteria and how to request one | MUST | GMS Regs; PRN00651 Part 4 |
| 14 | Repeat-prescription ordering method; dispensing arrangements if a dispensing practice | MUST | GMS Regs; PRN00651 Part 4 |
| 15 | How to complain / give feedback | MUST | GMS Regs; PRN00651 Part 4 |
| 16 | Patients' rights and responsibilities, including keeping appointments | MUST | GMS Regs; PRN00651 Part 4 |
| 17 | Zero-tolerance / violent-patient policy | MUST | GMS Regs; PRN00651 Part 4 |
| 18 | Who has access to patient information and patients' disclosure rights | MUST | GMS Regs; PRN00651 Part 4 |
| 19 | Full contact details of the responsible ICB | MUST | GMS Regs; PRN00651 Part 4 |
| 20 | GP net earnings — mean net GP earnings for the previous financial year, published annually | MUST | GMS Regs Part 5 Reg 21; [pay transparency guidance](https://www.england.nhs.uk/long-read/general-practice-pay-transparency-guidance/) |
| 21 | Patient Participation Group — keep patients updated on PPG progress/agreed actions | MUST | GMS Regs Part 5; PRN00651 Part 4 |
| 22 | Friends and Family Test — collect, report and **publish results** | MUST | GMS Regs Part 14; [FFT guidance](https://www.england.nhs.uk/publication/guidance-on-the-submission-of-gp-practice-friends-and-family-test-data/) |
| 23 | Online services facility: order repeats online, view/print repeatable items, nominate/change pharmacy, request and view test results, update personal details | MUST | GMS Regs Part 10; PRN00651 Part 4 |
| 24 | Online consultation facility (distinct from a contact form); from 1 Oct 2025 it must stay open 8am–6:30pm Mon–Fri for non-urgent/medication/admin requests, with no submission caps; a practice email mailbox does not satisfy it | MUST | GMS Reg 71ZD; 2025/26 contract; [Online consultations FAQs](https://www.england.nhs.uk/long-read/online-consultations-frequently-asked-questions/) |
| 25 | Link to the "You and Your General Practice" patient charter, no later than 1 Oct 2025 | MUST | [YYGP](https://www.england.nhs.uk/publication/you-and-your-general-practice/); 2025/26 contract |
| 26 | Review all published website information at least once every 12 months | MUST | GMS Regs Part 10; [Practice websites guidance](https://www.england.nhs.uk/long-read/practice-websites/) |
| 27 | Access to Service Information (A2SI) / Directory of Services machine-readable practice metadata | MUST | PRN00651 Part 4 |
| 28 | CQC rating displayed/linked (About/Practice information content named in the official page checklist; universally expected) | SHOULD (strongly) | PRN00651 p.37; exemplar sites |

## 2. Legal compliance (accessibility, data protection)

| # | Requirement | Level | Source |
|---|---|---|---|
| 29 | **WCAG 2.2 AA** conformance — the current legal floor since 5 Oct 2024 (PSBAR auto-updates to the current WCAG recommendation; NHS England's GP guide still says 2.1 AA — cite GOV.UK, not the NHS PDF, for the version) | MUST | PSBAR; [GOV.UK](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag); [service manual](https://service-manual.nhs.uk/accessibility/what-all-nhs-services-need-to-do) |
| 30 | Published accessibility statement containing the Reg 7(4) minimum: non-accessible content and why; accessible alternatives; contact mechanism for reporting failures/requesting formats; enforcement procedure (EHRC via EASS) | MUST | [Reg 7](https://www.legislation.gov.uk/uksi/2018/852/regulation/7/made); [GOV.UK statement guidance](https://www.gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement) |
| 31 | Statement follows the full GDS structure: explicit compliance status (fully/partially/not compliant vs WCAG 2.2 AA), itemised non-accessible content with remediation dates, preparation/testing methodology, response-time commitments, third-party content scope note | SHOULD | [NHS.uk statement](https://www.nhs.uk/accessibility-statement/); [GOV.UK Design System statement](https://design-system.service.gov.uk/accessibility-statement/) |
| 32 | Statement reviewed at least annually (GDS monitoring treats >12 months as a red flag) | MUST | GOV.UK statement guidance; [GDS monitoring 2022–24](https://www.gov.uk/government/publications/accessibility-monitoring-of-public-sector-websites-and-mobile-apps-from-2022-to-2024/accessibility-monitoring-of-public-sector-websites-and-mobile-apps-from-2022-to-2024) |
| 33 | UK GDPR / DPA 2018: privacy notice, your medical records, SMS/email use, access to your record, National Data Opt-out | MUST | PRN00651 Part 4 |
| 34 | PECR compliance for cookies / electronic communications (cookie policy) | MUST | PRN00651 Part 4; PRN00274 legal section |
| 35 | Equality Act 2010 and Accessible Information Standard (DAPB1605) — staff must verify patients can actually use the website and offer alternative formats | MUST | [AIS](https://www.england.nhs.uk/accessible-information-standard/) |
| 36 | Do **not** use accessibility overlay widgets/toolbars (ReciteMe, Browsealoud-style) — "cannot make a website fully compliant... cannot protect you from legal action" | SHOULD NOT (explicit NHS guidance) | [Service manual: development](https://service-manual.nhs.uk/accessibility/development) |
| 37 | Custom, clearly visible focus styles (browser default "generally not good enough"); skip link hidden until focused, landing on a `<main>` landmark | SHOULD | [Service manual: design](https://service-manual.nhs.uk/accessibility/design) |
| 38 | WCAG 2.2's six new A/AA criteria specifically: Focus Not Obscured 2.4.11, Dragging Movements 2.5.7, Target Size ≥24px 2.5.8, Consistent Help 3.2.6, Redundant Entry 3.3.7, Accessible Authentication 3.3.8 | MUST (subset of #29) | [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) |

## 3. Structure, navigation and usability (NHS England guidance)

| # | Requirement | Level | Source |
|---|---|---|---|
| 39 | Primary nav: 5–7 flat items, no dropdowns. Reference IA: Home, Appointments, Prescriptions, Services, About the surgery, Contact us. News not in the main nav | SHOULD | PRN00651 p.35 |
| 40 | **No pop-ups, overlays or interstitials anywhere** (27% of tested patients got stuck; benchmarking tool scores any non-cookie pop-up "Inadequate"). Time-bound notices go inline on the relevant page as a warning callout with a hard expiry | SHOULD (near-binary benchmark criterion) | PRN00651 pp.17, 45–47; PRN00274 |
| 41 | Homepage: quick links to the 8 top tasks (appointment, prescription, sick note, test results, register, phone, opening times, address); no prose paragraphs; phone + opening times visible | SHOULD | PRN00651 pp.6, 38–39 |
| 42 | Visible search box labelled "Search" (not icon-only); mobile nav labelled "Menu"/"More", not a bare hamburger | SHOULD | PRN00651 p.38 |
| 43 | Four priority pages get the most attention: Appointments, Prescriptions, Contact, Registration | SHOULD | PRN01429 |
| 44 | Appointments page: urgent vs routine separated with time-based labels ("today"/"this week" — never "emergency appointment"); phone, hours and online-request link together; explicit response-time expectation; home-visit section | SHOULD | PRN00651 pp.42–44 |
| 45 | Registration treated as a first-class journey (one of the 7 scored patient journeys), with catchment self-check at point of registration | SHOULD | PRN00274; exemplar sites |
| 46 | Remove fax numbers; keep email away from clinical-request pages (complaints only); non-OC contact forms need clinical-safety sign-off | SHOULD | PRN00651 p.39 |
| 47 | Breadcrumbs on linked-out journeys; never auto-open new tabs; direct links to PCN content, not the PCN homepage | SHOULD | PRN00651 pp.53–54 |
| 48 | Tested CTA wording: "Make, change or cancel an appointment", "Get a repeat prescription online", "Get a sick note for work", "Get test results", "Join the surgery" | SHOULD | PRN00651 p.34 |
| 49 | A "Managing your health online" page distinguishing the online-consultation tool vs NHS App vs practice-system app | SHOULD | PRN00651 pp.40, 82–83 |

## 4. Content and writing style (service manual + PRN00651)

| # | Requirement | Level | Source |
|---|---|---|---|
| 50 | Reading age 9–11 (fallback 11–14 for complex content); sentences ≤20 words; paragraphs ≤3 sentences; active voice; second person | SHOULD | [How we write](https://service-manual.nhs.uk/content/how-we-write); PRN00651 §1.2 |
| 51 | Banned terms: "online consultation" (83% of patients didn't understand it), "emergency appointment", "triage", "clinician(s)", "secure message" — use task-based phrasing instead | SHOULD | PRN00651 §3.2; [A to Z](https://service-manual.nhs.uk/content/a-to-z-of-nhs-health-writing) |
| 52 | House vocabulary: "medicine" not "medication"; "surgery" preferred over "practice" in patient-facing copy; "pharmacy" not "chemist"; "fit note (sick note)" at first mention | SHOULD | A to Z of NHS health writing |
| 53 | Times: 12-hour clock, no leading ":00" ("8am", "6:30pm"); ranges with "to", never dashes. Dates: full month names | SHOULD | [Numbers, dates and time](https://service-manual.nhs.uk/content/numbers-measurements-dates-time) |
| 54 | Links verb-first, meaningful out of context, warn when leaving the site; no "click here" | SHOULD | PRN00651 §3.2; [Formatting](https://service-manual.nhs.uk/content/formatting) |
| 55 | HTML not PDF; images only for genuine user need, real alt text, no text in images | SHOULD | PRN00651; service manual |
| 56 | Use the correct flag component: notification banner (site-wide news, above H1) vs warning callout (time-critical/health-critical, max 2/page, hidden "Important:" prefix) vs inset text (mild emphasis) | SHOULD | [Warning callout](https://service-manual.nhs.uk/design-system/components/warning-callout); [Notification banners](https://service-manual.nhs.uk/design-system/components/notification-banners); [Inset text](https://service-manual.nhs.uk/design-system/components/inset-text) |
| 57 | Care cards with visually-hidden urgency prefixes ("Urgent advice:", "Immediate action required:"); no links out of emergency cards | SHOULD | [Care cards](https://service-manual.nhs.uk/design-system/components/care-cards) |
| 58 | "Page last reviewed / Next review due" block at the bottom of content pages | SHOULD (supports the MUST at #26) | [Know that a page is up to date](https://service-manual.nhs.uk/design-system/patterns/know-that-a-page-is-up-to-date) |
| 59 | Adapt NHS England's official content templates (Appointments, Prescriptions, Contact, Test results, Fit notes, Registration, Proxy access, Managing your health online) rather than writing from scratch | SHOULD | PRN00651 §5 pp.72–83 |
| 60 | One H1 per page (≤65 chars), no skipped heading levels; tables with captions and `scope`; contents list for pages with up to 8 sections | SHOULD | Formatting; [Table](https://service-manual.nhs.uk/design-system/components/table); [Contents list](https://service-manual.nhs.uk/design-system/components/contents-list) |

## 5. Maintenance cadence

| # | Requirement | Level | Source |
|---|---|---|---|
| 61 | Full review of all published information every 12 months (= #26) | MUST | GMS Regs Part 10 |
| 62 | Key pages reviewed every 6 months, all other content annually, on a rolling basis | SHOULD | PRN01429 |
| 63 | Self-audit with the benchmarking tool every 12–18 months; consider a template refresh every couple of years | SHOULD | PRN01429; PRN00274 |
