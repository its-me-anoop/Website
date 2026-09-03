import { sentencesOf } from "../page";
import type { Sector } from "../types";
import { checker, plural, trim, unless, type CheckModule } from "./context";

const c = checker("content");

const UK_POSTCODE = /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/;
const UK_PHONE = /(?:\+44\s?\(?0?\)?|0)(?:\d\s?){9,10}/;

type SectorTask = {
  id: string;
  title: string;
  impact: "high" | "medium";
  /** Any of these phrases in link text or copy counts as present. */
  terms: RegExp;
  missing: string;
  fix: string;
};

/**
 * The tasks each sector's visitors arrive with. Checked against link
 * text first (a signposted task) and then body copy (mentioned at all).
 */
const SECTOR_TASKS: Record<Exclude<Sector, "other">, SectorTask[]> = {
  "gp-practice": [
    {
      id: "appointments",
      title: "Appointments signposted",
      impact: "high",
      terms: /appointment|book online|econsult|online consult|ask my gp|askmygp|patchs|anima|accurx|klinik/i,
      missing: "No route to booking or requesting an appointment was found on the homepage. It is the number one reason patients visit.",
      fix: "Put \u201cBook or request an appointment\u201d in the first screen, linking straight into your online consultation tool.",
    },
    {
      id: "prescriptions",
      title: "Repeat prescriptions signposted",
      impact: "high",
      terms: /prescription|nhs app|repeat medication|order (your )?medication/i,
      missing: "Nothing about ordering repeat prescriptions was found. This is the second-largest source of calls to reception.",
      fix: "Add a \u201cRepeat prescriptions\u201d route that explains the NHS App and your ordering options.",
    },
    {
      id: "nhs-app",
      title: "NHS App promoted",
      impact: "medium",
      terms: /nhs app|nhs login/i,
      missing: "The NHS App is not mentioned. Practices are asked to promote it as the default way to order prescriptions and view records.",
      fix: "Add an NHS App section with a link to nhs.uk/nhs-app and what patients can do in it.",
    },
    {
      id: "urgent",
      title: "Urgent help and 111 signposted",
      impact: "high",
      terms: /\b111\b|\b999\b|urgent|emergency|out of hours|out-of-hours/i,
      missing: "No urgent-care or NHS 111 signposting was found. Patients in distress land on the homepage first.",
      fix: "Add a short \u201cNeed help now?\u201d block naming 999, NHS 111 and when to use each.",
    },
    {
      id: "register",
      title: "Registration explained",
      impact: "medium",
      terms: /register|new patient|join the practice/i,
      missing: "No route for new patients to register was found.",
      fix: "Add a \u201cRegister as a new patient\u201d page with the online registration link.",
    },
  ],
  "care-home": [
    {
      id: "cqc",
      title: "CQC rating and report linked",
      impact: "high",
      terms: /cqc|care quality commission|inspection report|care inspectorate/i,
      missing: "No mention of the CQC rating or inspection report. Families check it anyway; hiding it reads as having something to hide.",
      fix: "Show the CQC rating near the top of the page with a link to the full report.",
    },
    {
      id: "fees",
      title: "Fees and funding explained",
      impact: "high",
      terms: /fee|cost|price|funding|self[- ]fund|local authority|nhs continuing/i,
      missing: "Nothing about fees or funding was found. It is the question families are most anxious to ask and least likely to phone about.",
      fix: "Publish a fees and funding page: a weekly starting figure, what it includes, and the funding routes.",
    },
    {
      id: "visit",
      title: "Booking a visit or enquiring is easy",
      impact: "high",
      terms: /book a visit|arrange a visit|enquir|brochure|come and see|contact us/i,
      missing: "No clear route to book a visit or make an enquiry.",
      fix: "Add \u201cBook a visit\u201d as the primary action on every page, with a phone number and a short form.",
    },
    {
      id: "careers",
      title: "Careers and recruitment present",
      impact: "medium",
      terms: /career|job|vacanc|recruit|work (with|for) us|join our team/i,
      missing: "No careers section. Carers research employers the way families research homes.",
      fix: "Add a careers page with current vacancies and what it is like to work at the home.",
    },
    {
      id: "life",
      title: "Daily life shown honestly",
      impact: "medium",
      terms: /activit|daily life|life at|dining|menu|garden|our rooms|the home/i,
      missing: "Little about daily life, activities or the rooms. Families want to picture their relative living there.",
      fix: "Add a \u201cLife at the home\u201d page with real photographs, activities and sample menus.",
    },
  ],
  "dental-practice": [
    {
      id: "fees",
      title: "Fees published",
      impact: "high",
      terms: /fee|price|cost|nhs band|band 1|band 2|band 3|price list/i,
      missing: "No fees or NHS band information was found. Patients compare prices before they phone.",
      fix: "Publish NHS bands and private fees side by side on a dedicated page.",
    },
    {
      id: "emergency",
      title: "Emergency dental care signposted",
      impact: "high",
      terms: /emergenc|urgent|toothache|out of hours|\b111\b/i,
      missing: "No route for urgent or emergency dental care.",
      fix: "Add an \u201cIn pain now?\u201d block with your emergency slots and the NHS 111 route.",
    },
    {
      id: "new-patients",
      title: "New patient route",
      impact: "medium",
      terms: /new patient|register|join|accepting/i,
      missing: "Nothing tells new patients whether you are accepting them or how to join.",
      fix: "Add a \u201cNew patients\u201d page stating NHS/private availability and how to register.",
    },
    {
      id: "nervous",
      title: "Reassurance for nervous patients",
      impact: "medium",
      terms: /nervous|anxious|anxiety|sedation|gentle|phobia/i,
      missing: "No mention of nervous or anxious patients, one of the largest groups who put off booking.",
      fix: "Add a short section on how you look after nervous patients.",
    },
  ],
  pharmacy: [
    {
      id: "hours",
      title: "Opening hours prominent",
      impact: "high",
      terms: /opening hours|open(ing)? times|we are open|monday|mon[-–]fri/i,
      missing: "No opening hours were found on the page. It is the first thing anyone checks before walking over.",
      fix: "Put today\u2019s hours in the header and the full week in the footer.",
    },
    {
      id: "pharmacy-first",
      title: "Pharmacy First explained",
      impact: "high",
      terms: /pharmacy first|minor illness|treat(ment)? without a gp|seven conditions/i,
      missing: "Pharmacy First is not mentioned, so patients do not know they can be treated for common conditions without a GP.",
      fix: "Add a Pharmacy First page listing the conditions you can treat and how to be seen.",
    },
    {
      id: "prescriptions",
      title: "Prescription ordering explained",
      impact: "high",
      terms: /prescription|nhs app|nominat|collect/i,
      missing: "Nothing explains how to order or collect prescriptions, or how to nominate the pharmacy.",
      fix: "Add a prescriptions page: nominating via the NHS App, collection and delivery options.",
    },
    {
      id: "services",
      title: "Services listed",
      impact: "medium",
      terms: /flu|vaccin|blood pressure|travel|contracept|emergency contracept|service/i,
      missing: "No list of services (vaccinations, blood pressure checks, travel clinic).",
      fix: "List every service with whether it is NHS-funded or private and how to book.",
    },
  ],
  "physio-clinic": [
    {
      id: "prices",
      title: "Prices published",
      impact: "high",
      terms: /price|fee|cost|£\s?\d/i,
      missing: "No prices were found. \u201cPrices on request\u201d loses patients to the clinic that publishes them.",
      fix: "Publish initial and follow-up appointment prices on a dedicated page.",
    },
    {
      id: "booking",
      title: "Online booking available",
      impact: "high",
      terms: /book online|book now|book an appointment|cliniko|jane app|nookal|booking/i,
      missing: "No online booking route. Patients in pain book whoever lets them book at 10pm.",
      fix: "Add an online booking link as the primary action on every page.",
    },
    {
      id: "first-visit",
      title: "First appointment explained",
      impact: "medium",
      terms: /first (appointment|visit|session)|what to expect|what happens/i,
      missing: "Nothing explains what happens at a first appointment, the main worry for new patients.",
      fix: "Add a \u201cYour first appointment\u201d page: duration, what to wear, what to bring, what happens.",
    },
    {
      id: "conditions",
      title: "Conditions treated listed",
      impact: "medium",
      terms: /back pain|neck|knee|shoulder|sports|sciatica|condition/i,
      missing: "No list of conditions treated, which is how most people search.",
      fix: "Add a conditions index so \u201cknee pain physio near me\u201d can land on the right page.",
    },
  ],
};

export const contentChecks: CheckModule = ({ page }) => {
  const { words, textRaw, text, anchors } = page;
  const checks = [];
  const linkText = anchors.map((a) => `${a.text} ${a.href}`).join(" \n ");

  /* Substance */
  checks.push(
    c({
      id: "content-word-count",
      title: "Enough content to be useful",
      impact: "medium",
      status: words.length >= 250 ? "pass" : words.length >= 80 ? "warn" : "fail",
      detail:
        words.length >= 250
          ? `About ${words.length} words of visible text.`
          : words.length >= 80
            ? `Only about ${words.length} words of visible text. Visitors and search engines get little to work with${page.scripts.length > 5 ? "; if the content is loaded by JavaScript, search engines may not see it at all" : ""}.`
            : `${words.length === 0 ? "No readable text" : `Only about ${plural(words.length, "word")}`} could be read from the HTML${page.scripts.length > 3 ? ". The page probably relies on JavaScript to render its content, which slows phones and hides text from some crawlers" : ""}.`,
      fix: "Answer the top visitor questions in plain HTML text on the page itself.",
    })
  );

  /* Readability */
  const sentences = sentencesOf(textRaw);
  const sentenceWords = sentences.reduce((n, s) => n + s.split(/\s+/).length, 0);
  const avgSentence = sentences.length ? sentenceWords / sentences.length : 0;
  const longWords = words.filter((w) => w.replace(/[^a-z]/gi, "").length >= 12).length;
  const longWordPct = words.length ? (longWords / words.length) * 100 : 0;
  checks.push(
    c({
      id: "content-readability",
      title: "Plain English",
      impact: "medium",
      status: words.length < 80 ? "info" : avgSentence <= 20 && longWordPct <= 4 ? "pass" : avgSentence <= 28 && longWordPct <= 7 ? "warn" : "fail",
      detail:
        words.length < 80
          ? "Not enough text to judge readability."
          : `Sentences average ${avgSentence.toFixed(0)} words and ${longWordPct.toFixed(1)}% of words are 12+ letters. ${avgSentence <= 20 && longWordPct <= 4 ? "That is comfortably readable." : "NHS content guidance aims for under 20 words a sentence and everyday words: many visitors are anxious, in a hurry or reading in a second language."}`,
      fix: unless(words.length < 80, "Shorten sentences, swap jargon for everyday words, and lead every page with what the visitor can do."),
    })
  );

  /* Contact details */
  const hasPhone = UK_PHONE.test(textRaw) || anchors.some((a) => a.href.startsWith("tel:"));
  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.-]+/.test(textRaw) || anchors.some((a) => a.href.startsWith("mailto:"));
  checks.push(
    c({
      id: "content-contact",
      title: "Phone number easy to find",
      impact: "high",
      status: hasPhone ? "pass" : "fail",
      detail: hasPhone
        ? `A phone number appears on the page${hasEmail ? ", along with an email address" : ""}.`
        : "No phone number was found on the page. For a local service it is the single most looked-for detail.",
      fix: "Show the main phone number in the header or first screen of every page.",
    })
  );

  const hasPostcode = UK_POSTCODE.test(textRaw);
  const hasAddressSchema = page.jsonLd.some((n) => n.address || String(n["@type"] ?? "").toLowerCase().includes("postaladdress"));
  checks.push(
    c({
      id: "content-address",
      title: "Address shown",
      impact: "medium",
      status: hasPostcode || hasAddressSchema ? "pass" : "fail",
      detail:
        hasPostcode || hasAddressSchema
          ? `A postal address${hasPostcode ? ` with postcode ${UK_POSTCODE.exec(textRaw)?.[0]}` : ""} is present.`
          : "No UK postcode or structured address was found on the page.",
      fix: "Put the full address with postcode in the footer of every page and in structured data.",
    })
  );

  const hoursTerms = /opening hours|opening times|open(ing)? (from|at)|we are open|monday|mon\b|mon[-–]fri|9\s?(am|:00)/i;
  const hasHours = hoursTerms.test(textRaw);
  checks.push(
    c({
      id: "content-hours",
      title: "Opening hours available",
      impact: "medium",
      status: hasHours ? "pass" : "fail",
      detail: hasHours ? "Opening hours are mentioned on the page." : "No opening hours were found on the page. Visitors phone to ask, or turn up when you are closed.",
      fix: "Publish opening hours on the homepage and contact page, and keep them in structured data for Google.",
    })
  );

  /* Legal and trust pages */
  const privacy = anchors.some((a) => /privacy|data protection|our policies|gdpr/i.test(a.text) || /privacy|data-protection|policies/i.test(a.href));
  const complaints = /complaint|feedback|compliment/i.test(linkText);
  checks.push(
    c({
      id: "content-privacy",
      title: "Privacy notice linked",
      impact: "medium",
      status: privacy ? "pass" : "fail",
      detail: privacy ? "A privacy page is linked." : "No privacy notice link was found. UK GDPR requires one wherever personal data is collected, including contact forms.",
      fix: "Publish a privacy notice and link it from the footer of every page.",
    })
  );
  checks.push(
    c({
      id: "content-complaints",
      title: "Feedback and complaints route",
      impact: "low",
      status: complaints ? "pass" : "warn",
      detail: complaints ? "A feedback or complaints route is linked." : "No feedback or complaints route was found. Regulated services are expected to make it easy to raise concerns.",
      fix: "Add a short \u201cFeedback and complaints\u201d page explaining how to raise a concern and what happens next.",
    })
  );

  /* Freshness */
  const years = [...textRaw.matchAll(/(?:©|\(c\)|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map((m) => Number(m[1]));
  const latestYear = years.length ? Math.max(...years) : null;
  const thisYear = new Date().getFullYear();
  checks.push(
    c({
      id: "content-freshness",
      title: "Site looks maintained",
      impact: "low",
      status: latestYear === null ? "info" : latestYear >= thisYear - 1 ? "pass" : "warn",
      detail:
        latestYear === null
          ? "No copyright year found to judge freshness."
          : latestYear >= thisYear - 1
            ? `The copyright line reads ${latestYear}.`
            : `The copyright line still reads ${latestYear}. Small signs like this make visitors doubt everything else, including the opening hours.`,
      fix: unless(latestYear === null, "Generate the copyright year automatically and review the homepage content each quarter."),
    })
  );

  const placeholder = /lorem ipsum|under construction|coming soon|insert text here|your text here/i.test(text);
  checks.push(
    c({
      id: "content-placeholder",
      title: "No placeholder text",
      impact: "medium",
      status: placeholder ? "fail" : "pass",
      detail: placeholder ? "Placeholder or \u201cunder construction\u201d text is still visible on the page." : "No placeholder or template text was found.",
      fix: "Replace placeholder text with real content, or remove the section.",
    })
  );

  /* PDF-first content */
  const pdfLinks = anchors.filter((a) => /\.pdf(\?|#|$)/i.test(a.href));
  checks.push(
    c({
      id: "content-pdfs",
      title: "Information is on web pages, not PDFs",
      impact: "low",
      status: pdfLinks.length <= 3 ? "pass" : pdfLinks.length <= 8 ? "warn" : "fail",
      detail:
        pdfLinks.length <= 3
          ? `${plural(pdfLinks.length, "PDF link")} on the page.`
          : `${pdfLinks.length} links point to PDFs. PDFs are hard to read on a phone, rarely accessible and poorly indexed.`,
      fix: "Publish leaflets and policies as web pages; keep PDFs only where a printable form is genuinely needed.",
      evidence: pdfLinks.slice(0, 4).map((a) => trim(a.text || a.href, 60)),
    })
  );

  /* Sector tasks */
  if (page.sector !== "other" && !page.clientRendered) {
    for (const task of SECTOR_TASKS[page.sector]) {
      const inLinks = task.terms.test(linkText);
      const inCopy = task.terms.test(textRaw);
      checks.push(
        c({
          id: `content-${page.sector}-${task.id}`,
          title: task.title,
          impact: task.impact,
          status: inLinks ? "pass" : inCopy ? "warn" : "fail",
          detail: inLinks
            ? "Signposted with a link on this page."
            : inCopy
              ? "Mentioned in the text, but not as a link visitors can act on."
              : task.missing,
          fix: task.fix,
        })
      );
    }
  }

  /* When the HTML is an empty shell there is no copy to judge. The
     word-count check carries the failure; everything else that reads the
     text becomes informational rather than a pile of false negatives. */
  if (page.clientRendered) {
    return checks.map((check) =>
      check.id === "content-word-count"
        ? {
            ...check,
            status: "fail" as const,
            impact: "high" as const,
            detail: "No readable content arrives in the HTML: the page is drawn entirely by JavaScript. Search engines, slow phones and this audit all see an empty page first.",
            fix: "Render the content on the server or at build time so it is in the HTML. The rest of the content checks will then be measurable.",
          }
        : check.status === "pass"
          ? check
          : {
              ...check,
              status: "info" as const,
              detail: "Could not be checked: the page's content is rendered by JavaScript, so it is not in the HTML.",
              fix: undefined,
            }
    );
  }

  return checks;
};
