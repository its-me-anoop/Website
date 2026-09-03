import { jsonLdTypes } from "../page";
import { checker, type CheckModule } from "./context";

const c = checker("local");

const LOCAL_TYPES = [
  "localbusiness",
  "medicalorganization",
  "medicalclinic",
  "physician",
  "dentist",
  "pharmacy",
  "hospital",
  "healthandbeautybusiness",
  "organization",
  "professionalservice",
  "medicalbusiness",
  "physiotherapy",
];

export const localChecks: CheckModule = ({ page }) => {
  const { jsonLd, metas, title, textRaw, anchors } = page;
  const checks = [];

  const types = jsonLdTypes(page);
  const localNode = jsonLd.find((n) => {
    const t = n["@type"];
    const list = (Array.isArray(t) ? t : [t]).map((x) => String(x).toLowerCase());
    return list.some((x) => LOCAL_TYPES.includes(x));
  });
  const specific = types.some((t) => LOCAL_TYPES.includes(t) && t !== "organization");

  checks.push(
    c({
      id: "local-schema",
      title: "Organisation described for Google",
      impact: "high",
      status: localNode ? (specific ? "pass" : "warn") : "fail",
      detail: localNode
        ? specific
          ? `Structured data describes the organisation as ${types.filter((t) => LOCAL_TYPES.includes(t)).join(", ")}.`
          : "Structured data describes a generic Organization. A more specific type (MedicalClinic, Dentist, Pharmacy, LocalBusiness) helps Google place you in local results."
        : "No LocalBusiness or medical organisation structured data. Google has to infer what kind of place this is from the text.",
      fix: "Add JSON-LD with the most specific schema.org type (e.g. MedicalClinic), name, address, telephone, geo and openingHoursSpecification.",
    })
  );

  const address = localNode?.address as Record<string, unknown> | string | undefined;
  const phone = localNode?.telephone;
  const hours = localNode?.openingHoursSpecification ?? localNode?.openingHours;
  const napParts = [!!address, !!phone, !!hours].filter(Boolean).length;
  checks.push(
    c({
      id: "local-nap",
      title: "Address, phone and hours in structured data",
      impact: "medium",
      status: napParts === 3 ? "pass" : napParts >= 1 ? "warn" : "fail",
      detail:
        napParts === 3
          ? "Address, telephone and opening hours are all machine-readable."
          : napParts >= 1
            ? `Structured data has ${[address && "address", phone && "telephone", hours && "opening hours"].filter(Boolean).join(" and ")} but is missing ${[!address && "address", !phone && "telephone", !hours && "opening hours"].filter(Boolean).join(", ")}.`
            : "None of address, telephone or opening hours are available as structured data, so the knowledge panel and map listing depend on third-party guesses.",
      fix: "Complete the address, telephone and openingHoursSpecification fields and keep them identical to your Google Business Profile.",
    })
  );

  /* Place name in title/description */
  const description = metas.get("description") ?? "";
  const postcodeArea = /\b([A-Z]{1,2})\d[A-Z\d]?\s*\d[A-Z]{2}\b/.exec(textRaw)?.[1];
  const townLike = /\b(in|near|serving)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/.exec(`${title ?? ""} ${description}`)?.[2];
  const hasLocationSignal = !!townLike || /\b(reading|london|berkshire|surrey|hampshire|oxford|bristol|manchester|leeds|birmingham|glasgow|edinburgh|cardiff|belfast|[A-Z][a-z]+shire)\b/.test(`${title ?? ""} ${description}`);
  checks.push(
    c({
      id: "local-title-place",
      title: "Location named in the title or description",
      impact: "medium",
      status: hasLocationSignal ? "pass" : "warn",
      detail: hasLocationSignal
        ? `The title or description names a place${townLike ? ` (${townLike})` : ""}, which is how \u201cGP near me\u201d style searches match.`
        : `Neither the title nor the description names your town or area${postcodeArea ? ` (postcode area ${postcodeArea} appears in the copy)` : ""}. Local searches are almost always \u201cservice + place\u201d.`,
      fix: "Add the town and county to the title and meta description: \u201cWillowbrook Surgery | GP practice in Reading, Berkshire\u201d.",
    })
  );

  /* Map */
  const map = page.root.querySelectorAll("iframe").some((f) => /google\.com\/maps|maps\.google|openstreetmap|what3words|bing\.com\/maps/i.test(f.getAttribute("src") ?? "")) ||
    anchors.some((a) => /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|openstreetmap|what3words|apple\.com\/maps/i.test(a.href));
  checks.push(
    c({
      id: "local-map",
      title: "Map or directions available",
      impact: "low",
      status: map ? "pass" : "warn",
      detail: map ? "A map or directions link is present." : "No map embed or directions link was found on this page.",
      fix: "Add a \u201cGet directions\u201d link to your Google Maps listing (lighter than an embedded map) on the contact and home pages.",
    })
  );

  /* Geo meta */
  const geo = metas.has("geo.region") || metas.has("geo.placename") || metas.has("geo.position") || metas.has("icbm") || !!(localNode?.geo);
  checks.push(
    c({
      id: "local-geo",
      title: "Geographic coordinates provided",
      impact: "low",
      status: geo ? "pass" : "info",
      detail: geo ? "Coordinates are provided in structured data or geo meta tags." : "No geo coordinates. Optional, but they remove any ambiguity for map providers.",
      fix: "Add a geo property (latitude, longitude) to the organisation\u2019s JSON-LD.",
    })
  );

  /* Reviews / social proof */
  const reviews = /google review|reviews|testimonial|what (our )?(patients|residents|families|clients) say|carehome\.co\.uk|nhs\.uk\/services|friends and family test|trustpilot/i.test(textRaw) || anchors.some((a) => /carehome\.co\.uk|g\.page|google\.com\/maps.*reviews|trustpilot|nhs\.uk\/services/i.test(a.href));
  checks.push(
    c({
      id: "local-reviews",
      title: "Reviews or public ratings referenced",
      impact: "low",
      status: reviews ? "pass" : "warn",
      detail: reviews ? "Reviews, testimonials or a public ratings profile are referenced." : "No reviews, testimonials or links to public ratings (Google, carehome.co.uk, nhs.uk). Social proof is what tips a local search into a phone call.",
      fix: "Link to your Google Business Profile reviews (or carehome.co.uk / nhs.uk listing) and quote two or three recent ones.",
    })
  );

  return checks;
};
