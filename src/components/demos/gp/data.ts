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
  { href: "/demo/gp-practice/online-consultation", label: "Get help online" },
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
    href: "/demo/gp-practice/online-consultation",
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
  {
    title: "Ask about your medication",
    copy: "Questions for our pharmacist, answered without an appointment.",
    href: "/demo/gp-practice/online-consultation",
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

/* ── Getting help: the three ways in ────────────────────────────
   The modern general practice model puts one front door — an online
   request — ahead of the 8am phone scramble, and keeps the phone and
   the front desk open for anyone who cannot or would rather not use
   it. All three feed the same clinical queue, which is the point. */

export const waysIn = [
  {
    id: "online",
    title: "Ask online",
    lede: "Open 8:00am – 6:30pm, every working day",
    copy: "Answer a few questions about what you need. A GP reads every request and decides what happens next — usually the same day.",
    action: "Start an online request",
    href: "/demo/gp-practice/online-consultation",
    best: "Fastest for most things, and you never wait in a queue.",
  },
  {
    id: "phone",
    title: "Call us",
    lede: "Lines open 8:00am – 6:30pm",
    copy: "Our reception team are trained care navigators. Tell them briefly what you need and they will fill the same form in with you.",
    action: "Call the surgery",
    href: "tel:+441184960123",
    best: "Best if you would rather talk to a person, or you are not online.",
  },
  {
    id: "in-person",
    title: "Come in",
    lede: "Front desk open 8:00am – 6:00pm",
    copy: "Call in at reception and we will take your request at the desk, in private if you would prefer.",
    action: "Find the surgery",
    href: "/demo/gp-practice/contact",
    best: "Best if you need help in person, or you would like an interpreter booked.",
  },
] as const;

/* ── Online consultation / triage ───────────────────────────── */

export const triageSteps = [
  {
    title: "Tell us what you need",
    copy: "A short set of questions — different ones for a medical problem, a sick note, a test result or an admin request. It takes about three minutes, and you can do it on a phone.",
  },
  {
    title: "A GP reads it",
    copy: "Every request is reviewed by a clinician, not sorted by a computer. They look at what you have written alongside your record.",
  },
  {
    title: "We tell you what happens next",
    copy: "You get a reply by text or in the NHS App: an appointment with the right person, a prescription, a referral, a link to self-care advice, or a call to talk it through.",
  },
  {
    title: "You are seen by the right person",
    copy: "That might be a GP — or a pharmacist, physiotherapist, nurse or mental-health practitioner who can help sooner.",
  },
] as const;

export const triageUses = [
  "A new symptom or health problem",
  "A long-term condition that has changed",
  "A sick (fit) note",
  "A test result you would like explained",
  "A question about your medication",
  "A referral or hospital letter query",
  "Something you would rather write down than say aloud",
] as const;

/** Anything time-critical must leave the online route immediately. */
export const triageNotFor = [
  "Chest pain, breathlessness or signs of a stroke — call 999",
  "A baby or young child you are worried about — call us",
  "Bleeding that will not stop, or a serious injury — call 999",
  "Thoughts of harming yourself — call 111 and choose the mental health option",
] as const;

/* ── The tools the practice runs on ─────────────────────────────
   Named plainly, because patients arriving from a text message need
   to recognise the name in it. A live build lists whichever tools
   the practice actually uses — these are the common ones. */

export const digitalTools = [
  {
    name: "NHS App",
    role: "Appointments, prescriptions, test results and your record",
    copy: "The main way to see your own information. Order repeat medication, check results as soon as they are filed, and read letters from the hospital.",
    href: "https://www.nhs.uk/nhs-app/",
    external: true,
  },
  {
    name: "Accurx Patient Triage",
    role: "The online request form behind “Get help online”",
    copy: "The questionnaire you fill in when you ask for help online. It is the same form our reception team complete when you ring us.",
    href: "/demo/gp-practice/online-consultation",
    external: false,
  },
  {
    name: "Accurx messaging",
    role: "How we reply, and how we send questionnaires",
    copy: "Replies arrive as a text from the surgery. Some include a secure link to a short health questionnaire, or to send us a photo of a rash or wound.",
    href: "/demo/gp-practice/online-consultation#reply",
    external: false,
  },
  {
    name: "Online booking",
    role: "Book some appointments yourself",
    copy: "Blood tests, smears, blood-pressure checks and vaccination clinics can be booked directly in the NHS App without going through triage.",
    href: "/demo/gp-practice/appointments",
    external: false,
  },
  {
    name: "Cloud telephony",
    role: "No more engaged tone",
    copy: "Call at 8:00am and you will hear your position in the queue, and can ask for a call back without losing your place.",
    href: "/demo/gp-practice/contact",
    external: false,
  },
  {
    name: "Interpreting and BSL",
    role: "Free, for any appointment or request",
    copy: "Tell us the language you need — including British Sign Language — and we book an interpreter before your appointment.",
    href: "/demo/gp-practice/contact#access",
    external: false,
  },
] as const;

/** Practices change online consultation supplier often; the copy is
    written so swapping the name is a one-line edit. */
export const triageAlternatives = [
  "Accurx Patient Triage",
  "eConsult",
  "PATCHS",
  "Anima",
  "Engage Consult",
  "Klinik",
] as const;

/* ── Statutory and contractual publications ─────────────────────
   The things a practice website is actually required to carry, in
   one place, so a practice manager can check them off. */

export const cqc = {
  rating: "Good",
  date: "Last inspected March 2025",
  href: "https://www.cqc.org.uk/",
} as const;

export const publications = [
  {
    id: "named-gp",
    title: "Your named GP",
    copy: "Every patient has a named, accountable GP responsible for overseeing their care. Yours is shown in the NHS App, or ask reception and we will tell you. You can still book with any clinician at the practice.",
  },
  {
    id: "earnings",
    title: "GP net earnings",
    copy: "All practices must publish the mean net earnings of their GPs. In the financial year 2024/25 the average pay for GPs working at Willowbrook Surgery was £86,400 before tax and National Insurance. This is for four full-time GPs and two part-time GPs who worked at the practice for more than six months. These figures are not a fair basis for comparing practices.",
  },
  {
    id: "fft",
    title: "Friends and Family Test",
    copy: "Every patient is invited to say whether they would recommend the practice. Last quarter 94% of the 412 people who replied said good or very good. Results are published here and in the waiting room each quarter, together with what we changed as a result.",
  },
  {
    id: "safeguarding",
    title: "Safeguarding",
    copy: "We have a named GP lead for safeguarding children and adults, and all staff are trained to the level their role requires. If you are worried about a child or an adult at risk, tell any member of the team — you do not need an appointment.",
  },
  {
    id: "fees",
    title: "Non-NHS services and fees",
    copy: "Some work is not covered by the NHS — private medicals, some insurance and travel forms, and letters for employers or solicitors. A printed price list is at reception and the fee is agreed with you before the work starts.",
  },
  {
    id: "pcn",
    title: "Our Primary Care Network",
    copy: "We work with four neighbouring practices as the Loddon Valley PCN. Sharing a team means you can see a pharmacist, physiotherapist, mental-health practitioner or social prescriber quickly — sometimes at one of the other sites, always with your consent.",
  },
] as const;

/** The Accessible Information Standard, written for patients rather
    than for the auditor. */
export const accessibleInfo = [
  "Tell us if you need letters in large print, easy read, braille or another language",
  "Tell us if you need a British Sign Language interpreter — we book one, free",
  "Tell us if you need longer appointments, a quieter waiting area, or someone with you",
  "We record what you tell us, flag it on your file, and it follows you to hospital referrals",
] as const;
