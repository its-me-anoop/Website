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
  { href: "/demo/gp-practice/services", label: "Services & clinics" },
  { href: "/demo/gp-practice/team", label: "Our team" },
  { href: "/demo/gp-practice/contact", label: "Contact" },
] as const;

export const alert = {
  title: "Travelling this summer?",
  copy: "Book travel vaccinations at least six weeks before you fly. Appointments are available now — book through the NHS App or call the surgery.",
} as const;

/** The two tasks that dominate every GP practice's traffic. */
export const primaryTasks = [
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
] as const;

/** The rest of the everyday tasks patients come to do. */
export const moreTasks = [
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
    title: "Get a sick (fit) note",
    copy: "Ask for a sick note without booking an appointment.",
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
    iso: "2026-07-18",
    title: "Tell us about your symptoms online",
    copy: "You can now tell us about your symptoms online, any time. A doctor or nurse reviews every request and replies within one working day.",
  },
  {
    date: "2 July 2026",
    iso: "2026-07-02",
    title: "Welcome to Dr Amara Osei",
    copy: "Dr Osei joins the practice team with a special interest in women's health and long-term conditions.",
  },
  {
    date: "12 June 2026",
    iso: "2026-06-12",
    title: "Blood test clinics moving to mornings",
    copy: "From July, blood test appointments run 8:00am to 12:00pm to get samples to the lab on the same day.",
  },
] as const;

/* ── Our team ──────────────────────────────────────────────── */

export const team = [
  {
    group: "Doctors",
    members: [
      ["Dr Sarah Patel", "GP Partner — women's health, minor surgery"],
      ["Dr James Okafor", "GP Partner — diabetes and cardiovascular care"],
      ["Dr Amara Osei", "Salaried GP — women's health and long-term conditions"],
      ["Dr Tom Bradley", "GP Registrar — a qualified doctor training in general practice"],
    ],
  },
  {
    group: "Nursing team",
    members: [
      ["Helen Carter", "Lead Practice Nurse — asthma, COPD and travel clinics"],
      ["Priya Sharma", "Practice Nurse — immunisations and cervical screening"],
      ["Mark Davies", "Healthcare Assistant — blood tests, blood pressure and health checks"],
    ],
  },
  {
    group: "Wider clinical team",
    members: [
      ["Fatima Khan", "Clinical Pharmacist — medication reviews and prescription queries"],
      ["Rob Jenkins", "First-Contact Physiotherapist — muscle and joint problems, no GP referral needed"],
      ["Grace Adeyemi", "Social Prescriber — practical support with money, housing, loneliness and more"],
    ],
  },
  {
    group: "Practice team",
    members: [
      ["Lisa Morton", "Practice Manager"],
      ["Our reception team", "Trained care navigators — they ask what you need so you reach the right person first time"],
    ],
  },
] as const;

/* ── Services & clinics ────────────────────────────────────── */

export const serviceGroups = [
  {
    title: "Long-term conditions",
    items: [
      "Asthma and COPD reviews",
      "Diabetes care and annual reviews",
      "Blood pressure checks and hypertension clinics",
      "Annual medication reviews with our clinical pharmacist",
    ],
  },
  {
    title: "Prevention & screening",
    items: [
      "Childhood immunisations",
      "Flu, COVID-19 and pneumonia vaccinations",
      "Cervical screening (smear tests)",
      "NHS Health Checks for 40–74 year olds",
    ],
  },
  {
    title: "Everyday care",
    items: [
      "Blood tests (morning phlebotomy clinics)",
      "Wound care and dressings",
      "Contraception and family planning",
      "Menopause support",
      "Joint injections and minor surgery",
      "Travel health advice and vaccinations",
    ],
  },
] as const;

/** Services patients can access directly, without seeing a GP first. */
export const selfReferral = [
  {
    title: "Pharmacy First",
    copy: "Your local pharmacy can treat seven common conditions — including earache, sore throat, sinusitis and urinary infections — and prescribe where appropriate, no appointment needed.",
  },
  {
    title: "First-contact physiotherapy",
    copy: "Muscle, joint and back problems can be booked straight in with our physiotherapist — no GP appointment first. Book the same way as any appointment.",
  },
  {
    title: "NHS Talking Therapies",
    copy: "Free, confidential support for stress, anxiety and low mood. Refer yourself directly online or by phone — you do not need to see a GP first.",
  },
  {
    title: "Sexual health services",
    copy: "Contraception, testing and advice through local sexual health clinics, booked directly and in confidence.",
  },
  {
    title: "Stop smoking support",
    copy: "Free local support that makes you three times more likely to quit for good. Sign up directly — no GP appointment needed.",
  },
] as const;

/* ── Practice information & policies ───────────────────────── */

export const practiceInfo = [
  {
    id: "feedback",
    title: "Feedback and complaints",
    copy: "Tell us when something goes wrong — or right. Speak to any member of staff, or write to our practice manager, Lisa Morton, and you will receive an acknowledgement within three working days. If you are not happy with our response, you can take your complaint to the Parliamentary and Health Service Ombudsman. We also take part in the NHS Friends and Family Test — the results are displayed in our waiting room and on this website.",
  },
  {
    id: "records",
    title: "Your records and privacy",
    copy: "Your medical record is confidential and handled under UK GDPR. You can read our full privacy notice at reception or on this page, see your own record through the NHS App, and ask for information we hold to be corrected. We never share your record outside your care without your consent, unless the law requires it.",
  },
  {
    id: "everyone-welcome",
    title: "Everyone is welcome here",
    copy: "You do not need proof of address, identification or immigration status to register with the practice. We are a veteran-friendly practice, we support registration for people experiencing homelessness, and free interpreters — including British Sign Language — can be arranged for any appointment. Just tell us what you need when you book.",
  },
  {
    id: "carers",
    title: "Are you a carer?",
    copy: "If you look after a family member, friend or neighbour, tell us — we will note it on your record, offer you an annual flu jab and health check, and connect you with local carer support services.",
  },
  {
    id: "chaperones",
    title: "Chaperones",
    copy: "You are welcome to have a chaperone present for any examination — a trained member of staff, or someone you bring with you. Just ask when booking or at any point during your appointment.",
  },
  {
    id: "zero-tolerance",
    title: "Respect for our team",
    copy: "Our staff come to work to care for people. In line with the NHS zero-tolerance policy, violence or abuse towards any member of the team may lead to removal from the practice list.",
  },
  {
    id: "ppg",
    title: "Patient Participation Group",
    copy: "Our PPG is a group of patients who meet quarterly with the practice team to help shape how the surgery works — from phone systems to clinic times. Everyone registered here is welcome; ask at reception or mention it in any message to join.",
  },
] as const;

export const faqs = [
  {
    q: "How do I see a doctor urgently?",
    a: "Call the surgery at 8:00am for an urgent appointment today. If the surgery is closed, call NHS 111. For a life-threatening emergency, always call 999.",
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
