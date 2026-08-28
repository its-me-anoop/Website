/**
 * Structural navigation for the GP demo. Routes are code, not content —
 * the CMS owns what appears on each page, not which pages exist.
 */
export const navLinks = [
  { href: "/demo/gp-practice", label: "Home" },
  { href: "/demo/gp-practice/appointments", label: "Appointments" },
  { href: "/demo/gp-practice/prescriptions", label: "Prescriptions" },
  { href: "/demo/gp-practice/services", label: "Services & clinics" },
  { href: "/demo/gp-practice/register", label: "Register" },
  { href: "/demo/gp-practice/team", label: "Our team" },
  { href: "/demo/gp-practice/contact", label: "Contact" },
] as const;
