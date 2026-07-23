/**
 * Content model for the Oakfield House demo — a fictional care home
 * used to show what a Flutterly build looks like. Phone numbers use
 * Ofcom's reserved fictional Reading range (0118 496) and the
 * address/postcode are invented.
 */

export const home = {
  name: "Oakfield House",
  strap: "Residential, dementia and respite care in Caversham",
  phone: "0118 496 0456",
  phoneHref: "tel:+441184960456",
  address: "42 Orchard Way, Caversham, Reading RG4 9ZZ",
  email: "enquiries@oakfieldhouse.example",
  manager: "Sarah Whitfield",
} as const;

export const navLinks = [
  { href: "/demo/care-home", label: "Home" },
  { href: "/demo/care-home/life", label: "Life at Oakfield" },
  { href: "/demo/care-home/families", label: "For families" },
  { href: "/demo/care-home/careers", label: "Careers" },
  { href: "/demo/care-home/contact", label: "Contact & visits" },
] as const;

export const careTypes = [
  {
    title: "Residential care",
    copy: "Comfortable, long-term care with round-the-clock support — and as much independence as each resident wants to keep.",
    tone: "sage",
  },
  {
    title: "Dementia care",
    copy: "A calm, familiar environment with a specialist team, designed around each person's routines, history and family.",
    tone: "terra",
  },
  {
    title: "Respite stays",
    copy: "Short stays from one week — for recovery after hospital, or to give a family carer a proper break.",
    tone: "cream",
  },
] as const;

/** Sample inspection summary — clearly labelled as demo content. */
export const inspection = {
  rating: "Good",
  note: "Sample rating shown for demonstration. A real site links this block directly to the home's page on cqc.org.uk.",
  areas: [
    ["Safe", "Good"],
    ["Effective", "Good"],
    ["Caring", "Outstanding"],
    ["Responsive", "Good"],
    ["Well-led", "Good"],
  ],
} as const;

export const lifeMoments = [
  {
    title: "Home-cooked, every day",
    copy: "Menus planned with residents each month, baking on Wednesdays, and a proper Sunday roast.",
  },
  {
    title: "The garden room",
    copy: "Raised beds, a greenhouse and tea outside whenever the weather allows — gardening is Oakfield's favourite pastime.",
  },
  {
    title: "Music and memory",
    copy: "Weekly singalongs, visiting musicians and playlists built from each resident's own era and taste.",
  },
  {
    title: "Out and about",
    copy: "Minibus trips to the river, garden centres and the theatre — life doesn't stop at the front door.",
  },
] as const;

export const familySteps = [
  {
    title: "1. Call or enquire",
    copy: "Talk to our manager about what you need — honestly, including whether Oakfield is the right fit at all.",
  },
  {
    title: "2. Visit the home",
    copy: "Come for a look around and stay for lunch. Bring the person who may live here — their impression matters most.",
  },
  {
    title: "3. Assessment",
    copy: "We visit you (at home or in hospital) to understand care needs, routines and preferences before anything is agreed.",
  },
  {
    title: "4. Moving in",
    copy: "A settled, unhurried move — the room ready, favourite things in place, and family welcome from day one.",
  },
] as const;

export const faqs = [
  {
    q: "What does care at Oakfield House cost?",
    a: "Fees start from £1,350 per week for residential care, depending on the level of support needed. That figure includes everything day to day — meals, activities, laundry — with no surprise extras. We publish our fees because families deserve to plan with real numbers.",
  },
  {
    q: "When can we visit?",
    a: "Whenever suits you — there are no set visiting hours. Grandchildren, dogs and birthday cakes are all welcome. We just ask you avoid mealtimes for a resident's first fortnight while they settle.",
  },
  {
    q: "Can couples stay together?",
    a: "Yes. We have two companion rooms, and where needs differ we build a care plan around each person while keeping them together.",
  },
  {
    q: "What happens if care needs change?",
    a: "Care plans are reviewed monthly, and with families straight away when something changes. Because we provide residential, dementia and respite care under one roof, most changes don't mean moving home.",
  },
] as const;

export const roles = [
  {
    title: "Care Assistant",
    detail: "Full and part time · days or nights",
    copy: "No experience needed — full training and funded qualifications, and a team that looks after its own.",
  },
  {
    title: "Senior Carer",
    detail: "Full time · NVQ 3 or working towards",
    copy: "Lead shifts, mentor new starters, and shape care plans with our deputy manager.",
  },
  {
    title: "Activities Coordinator",
    detail: "Part time · 3 days a week",
    copy: "Fill the week with things worth getting up for — from the minibus rota to the raised beds.",
  },
] as const;
