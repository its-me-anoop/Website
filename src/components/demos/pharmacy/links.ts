/**
 * Structural navigation for the pharmacy demo. Routes are code, not
 * content — the CMS owns what appears on each page, not which pages
 * exist.
 */
export const navLinks = [
  { href: "/demo/pharmacy", label: "Home" },
  { href: "/demo/pharmacy/pharmacy-first", label: "Pharmacy First" },
  { href: "/demo/pharmacy/services", label: "Services" },
  { href: "/demo/pharmacy/prescriptions", label: "Prescriptions" },
  { href: "/demo/pharmacy/about", label: "About & team" },
  { href: "/demo/pharmacy/contact", label: "Hours & contact" },
] as const;
