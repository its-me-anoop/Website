/**
 * Structural navigation for the physio demo. Routes are code, not
 * content — the CMS owns what appears on each page, not which pages
 * exist. The accessibility statement lives in the footer only, mirroring
 * the GP demo.
 */
export const navLinks = [
  { href: "/demo/physio-clinic", label: "Home" },
  { href: "/demo/physio-clinic/conditions", label: "Conditions & treatments" },
  { href: "/demo/physio-clinic/first-appointment", label: "Your first appointment" },
  { href: "/demo/physio-clinic/pricing", label: "Pricing" },
  { href: "/demo/physio-clinic/team", label: "Our team" },
  { href: "/demo/physio-clinic/trust", label: "Trust & regulation" },
] as const;
