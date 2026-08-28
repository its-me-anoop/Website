/**
 * Structural navigation for the Kennet Bridge Dental demo. Routes are
 * code, not content — the CMS owns what appears on each page, not
 * which pages exist. Accessibility is a footer-only link, matching
 * the GP and care-home demos.
 */
export const navLinks = [
  { href: "/demo/dental-practice", label: "Home" },
  { href: "/demo/dental-practice/fees", label: "Fees" },
  { href: "/demo/dental-practice/treatments", label: "Treatments" },
  { href: "/demo/dental-practice/new-patients", label: "New patients" },
  { href: "/demo/dental-practice/urgent", label: "Urgent care" },
  { href: "/demo/dental-practice/about", label: "About & team" },
] as const;
