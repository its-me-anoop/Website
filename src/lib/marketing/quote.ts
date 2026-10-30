/**
 * The homepage figure. A practice manager can see a published build
 * price before booking, chosen by the kind of organisation they run.
 * Figures are the website packages themselves, never a second price list.
 */

import { packages, type Package } from "./content";

export type QuotePathId = "gp" | "care" | "clinic" | "other";

export type QuotePath = {
  id: QuotePathId;
  /** Radio label, also the booking sentence. */
  label: string;
  /** Which published package this path shows. */
  packageName: "Essentials" | "Standard";
  /** One sentence on what the website does for this buyer. */
  outcome: string;
  /** Amber action on the figure. */
  bookLabel: string;
  links: readonly { href: string; label: string }[];
};

export const quotePaths: readonly QuotePath[] = [
  {
    id: "gp",
    label: "A GP practice",
    packageName: "Standard",
    outcome:
      "Patients reach appointments, prescriptions and the NHS App without calling reception.",
    bookLabel: "Book a call about a GP website",
    links: [
      { href: "/gp-websites", label: "GP practice websites" },
      { href: "/demo/gp-practice", label: "Willowbrook sample" },
      { href: "/leaving-msw", label: "Leaving My Surgery Website" },
    ],
  },
  {
    id: "care",
    label: "A care home",
    packageName: "Standard",
    outcome:
      "Families can read the fees, the CQC report and how to visit before they pick up the phone.",
    bookLabel: "Book a call about a care home website",
    links: [
      { href: "/care-home-websites", label: "Care home websites" },
      { href: "/demo/care-home", label: "Oakfield House sample" },
    ],
  },
  {
    id: "clinic",
    label: "A clinic or pharmacy",
    packageName: "Standard",
    outcome: "Fees, services and opening hours are on the site, so people arrive already knowing.",
    bookLabel: "Book a call about a clinic website",
    links: [
      { href: "/demo/dental-practice", label: "Dental sample" },
      { href: "/demo/pharmacy", label: "Pharmacy sample" },
      { href: "/demo/physio-clinic", label: "Physio sample" },
    ],
  },
  {
    id: "other",
    label: "Another organisation",
    packageName: "Essentials",
    outcome:
      "A clear, accessible website for a small organisation. An app, IT support, social or search is quoted in writing after the call.",
    bookLabel: "Book a call",
    links: [
      { href: "/packages", label: "All packages" },
      { href: "/services", label: "Every service" },
    ],
  },
] as const;

function mustPackage(name: QuotePath["packageName"]): Package {
  const pkg = packages.find((item) => item.name === name);
  if (!pkg) throw new Error(`Missing package ${name}`);
  return pkg;
}

export const essentialsPackage = mustPackage("Essentials");
export const standardPackage = mustPackage("Standard");

export function quotePackage(path: QuotePath): Package {
  return mustPackage(path.packageName);
}

export function quotePathById(id: string | null | undefined): QuotePath | undefined {
  return quotePaths.find((path) => path.id === id);
}

/** The other build figure, so neither published price is hidden. */
export function quoteAlternative(path: QuotePath): string {
  if (path.packageName === "Standard") {
    return `Essentials is ${essentialsPackage.price} to build if your own team will make the edits.`;
  }
  return `Standard is ${standardPackage.price} to build, and Flutterly makes the changes for you. Partnership is quoted after a short call.`;
}

/** Note passed into the Cal.com booker so the call starts from the figure they saw. */
export function quoteCalNote(path: QuotePath): string {
  const pkg = quotePackage(path);
  return `Homepage figure: ${path.label}. ${pkg.name}, ${pkg.price} to build, ${pkg.pricePeriod}.`;
}

/** Plain-English price line for the booking page. */
export function quoteBookingLine(path: QuotePath | undefined): string {
  if (!path) {
    return `Website prices are published before the call. Essentials is ${essentialsPackage.price} to build. Standard is ${standardPackage.price}. Then ${standardPackage.pricePeriod.replace(/^\+\s*/, "")}, ${standardPackage.priceNote}. Hosting is included. An app, IT support, social or search is quoted in writing.`;
  }
  const pkg = quotePackage(path);
  const who = path.label.charAt(0).toLowerCase() + path.label.slice(1);
  const term = pkg.pricePeriod.replace(/^\+\s*/, "");
  const note = pkg.priceNote ? `, ${pkg.priceNote}` : "";
  return `You are booking about ${who}. ${pkg.name} is ${pkg.price} to build, ${term}${note}. ${path.outcome}`;
}
