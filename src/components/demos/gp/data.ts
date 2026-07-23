/**
 * Content model for the Willowbrook Surgery demo — a fictional GP
 * practice used to show what a Flutterly build looks like. Phone
 * numbers use Ofcom's reserved fictional Reading range (0118 496)
 * and the address/postcode are invented.
 */

export const practice = {
  name: "Willowbrook Surgery",
  strap: "NHS GP services for Willowbrook and the surrounding villages",
  phone: "0118 496 0123",
  phoneHref: "tel:+441184960123",
  address: "1 Meadow Lane, Willowbrook, Reading RG1 9ZZ",
} as const;

export const navLinks = [
  { href: "/demo/gp-practice", label: "Home" },
  { href: "/demo/gp-practice/appointments", label: "Appointments" },
  { href: "/demo/gp-practice/prescriptions", label: "Prescriptions" },
  { href: "/demo/gp-practice/contact", label: "Contact & opening times" },
] as const;

export const alert = {
  title: "Travelling this summer?",
  copy: "Book travel vaccinations at least six weeks before you fly. Appointments are available now — book through the NHS App or call the surgery.",
} as const;

/** Task-first tiles — the six things patients come to do. */
export const tasks = [
  {
    title: "Book or cancel an appointment",
    copy: "Routine and urgent appointments, by phone or online.",
    href: "/demo/gp-practice/appointments",
  },
  {
    title: "Order a repeat prescription",
    copy: "Order in the NHS App or at reception — we can't take orders by phone.",
    href: "/demo/gp-practice/prescriptions",
  },
  {
    title: "Get help for your symptoms",
    copy: "Tell us what's wrong online and we'll direct you to the right care.",
    href: "/demo/gp-practice/appointments#online",
  },
  {
    title: "Register as a new patient",
    copy: "Join the practice — most registrations are completed online.",
    href: "/demo/gp-practice/contact#register",
  },
  {
    title: "Get test results",
    copy: "Results appear in the NHS App as soon as they are ready.",
    href: "/demo/gp-practice/appointments#results",
  },
  {
    title: "Request a fit note",
    copy: "Ask for a fit note without booking an appointment.",
    href: "/demo/gp-practice/appointments#fit-note",
  },
] as const;

export const openingTimes = [
  ["Monday", "8:00am – 6:30pm"],
  ["Tuesday", "8:00am – 6:30pm"],
  ["Wednesday", "8:00am – 6:30pm"],
  ["Thursday", "8:00am – 6:30pm"],
  ["Friday", "8:00am – 6:30pm"],
  ["Saturday", "Closed — call NHS 111"],
  ["Sunday", "Closed — call NHS 111"],
] as const;

export const news = [
  {
    date: "18 July 2026",
    title: "New online consultation service",
    copy: "You can now tell us about your symptoms online, any time. A clinician reviews every request and replies within one working day.",
  },
  {
    date: "2 July 2026",
    title: "Welcome to Dr Amara Osei",
    copy: "Dr Osei joins the practice team with a special interest in women's health and long-term conditions.",
  },
  {
    date: "12 June 2026",
    title: "Blood test clinics moving to mornings",
    copy: "From July, blood test appointments run 8:00am to 12:00pm to get samples to the lab on the same day.",
  },
] as const;

export const faqs = [
  {
    q: "How do I see a doctor urgently?",
    a: "Call the surgery at 8:00am for a same-day urgent appointment. If the surgery is closed, call NHS 111. For a life-threatening emergency, always call 999.",
  },
  {
    q: "How long does a repeat prescription take?",
    a: "Allow two working days between ordering and collection. Order through the NHS App or the slip box at reception — we cannot take repeat orders over the phone, which keeps the lines free for people who need to talk to us.",
  },
  {
    q: "Can I choose which GP I see?",
    a: "Yes — tell us your preference when booking. Continuity matters, and we will always try to book you with your usual GP, though you may wait a little longer.",
  },
  {
    q: "How do I update my contact details?",
    a: "Update your details in the NHS App, or tell reception next time you visit. Keeping your mobile number current means you get appointment reminders by text.",
  },
] as const;
