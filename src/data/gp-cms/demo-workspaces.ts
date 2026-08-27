import {
  GP_CMS_CORE_VERSION,
  GP_CMS_SCHEMA_VERSION,
  type PracticeWorkspace,
} from "@/features/gp-cms/core/types";

const standardCapabilities = {
  announcements: true,
  teamProfiles: true,
  serviceDirectory: true,
  mediaLibrary: true,
};

const willowbrook: PracticeWorkspace = {
  schemaVersion: GP_CMS_SCHEMA_VERSION,
  coreVersion: GP_CMS_CORE_VERSION,
  id: "practice_willowbrook",
  slug: "willowbrook",
  name: "Willowbrook Surgery",
  shortName: "Willowbrook",
  tagline: "NHS GP services for Willowbrook and surrounding villages",
  updatedAt: "2026-08-01T14:42:00.000Z",
  presentation: "community",
  portfolio: {
    label: "Calm community surgery",
    description: "A warm, family-focused front door with practical support and trusted local signposting.",
    emphasis: "Community care and everyday guidance",
    image: "/demos/gp/gp-hero.jpg",
    imageAlt: "Bright reception at the fictional Willowbrook Surgery",
  },
  capabilities: standardCapabilities,
  brand: {
    primary: "#005eb8",
    primaryDark: "#003087",
    accent: "#ffeb3b",
    surface: "#f0f4f5",
    logoText: "WS",
    heroImage: "/demos/gp/gp-hero.jpg",
    heroImageAlt:
      "The bright reception area at Willowbrook Surgery, with patients checking in",
  },
  homepage: {
    eyebrow: "Here when you need us",
    heading: "What can we help you with today?",
    introduction:
      "Find the right care, manage routine requests and get trusted health advice without waiting on the phone.",
    primaryAction: {
      label: "Request an appointment",
      href: "https://www.nhs.uk/nhs-app/",
    },
    secondaryAction: { label: "View our services", href: "#services" },
  },
  contact: {
    phone: "0118 496 0123",
    phoneHref: "tel:+441184960123",
    email: "reception@example.invalid",
    address: "1 Meadow Lane, Willowbrook, Reading",
    postcode: "RG1 9ZZ",
    directions:
      "The entrance faces Meadow Lane. Bus stops are within a two-minute walk and cycle parking is beside reception.",
    accessibility:
      "Step-free entrance, accessible toilet, hearing loop and free interpreter support are available.",
  },
  openingTimes: [
    { day: "Monday", hours: "8:00am – 6:30pm" },
    { day: "Tuesday", hours: "8:00am – 6:30pm" },
    { day: "Wednesday", hours: "8:00am – 6:30pm" },
    { day: "Thursday", hours: "8:00am – 6:30pm" },
    { day: "Friday", hours: "8:00am – 6:30pm" },
    { day: "Saturday", hours: "Closed", note: "Use NHS 111 when we are closed" },
    { day: "Sunday", hours: "Closed", note: "Use NHS 111 when we are closed" },
  ],
  pages: [
    {
      id: "page_home",
      slug: "home",
      title: "Home",
      navigationLabel: "Home",
      summary: "The first page patients see, with common tasks and urgent help.",
      status: "published",
      lastUpdated: "2026-08-01T14:42:00.000Z",
      sections: [
        {
          id: "home_welcome",
          heading: "Welcome to Willowbrook Surgery",
          body: "Our practice team provides safe, inclusive care for people in Willowbrook and the surrounding villages.",
        },
        {
          id: "home_access",
          heading: "Help us meet your needs",
          body: "Tell reception if you need an interpreter, information in another format or help accessing the building.",
        },
      ],
    },
    {
      id: "page_appointments",
      slug: "appointments",
      title: "Appointments",
      navigationLabel: "Appointments",
      summary: "How to request routine, urgent and home-visit care.",
      status: "published",
      lastUpdated: "2026-07-28T09:15:00.000Z",
      sections: [
        {
          id: "appointments_request",
          heading: "Request an appointment",
          body: "Use the NHS App for routine requests or call reception from 8:00am when you need help today.",
        },
        {
          id: "appointments_urgent",
          heading: "When the practice is closed",
          body: "Use NHS 111 online or call 111. Call 999 in a life-threatening emergency.",
        },
      ],
    },
    {
      id: "page_prescriptions",
      slug: "prescriptions",
      title: "Prescriptions",
      navigationLabel: "Prescriptions",
      summary: "Repeat prescriptions, medication reviews and pharmacy support.",
      status: "published",
      lastUpdated: "2026-07-25T11:30:00.000Z",
      sections: [
        {
          id: "prescriptions_repeat",
          heading: "Order a repeat prescription",
          body: "Order through the NHS App or your nominated pharmacy. Please allow two working days.",
        },
      ],
    },
    {
      id: "page_new_patients",
      slug: "new-patients",
      title: "New patients",
      navigationLabel: "Join the practice",
      summary: "Eligibility, registration and what new patients can expect.",
      status: "published",
      lastUpdated: "2026-08-01T10:12:00.000Z",
      sections: [
        {
          id: "new_patients_register",
          heading: "Register with us",
          body: "People living in our practice area can ask to register. You do not need proof of address or immigration status.",
        },
      ],
    },
  ],
  services: [
    {
      id: "service_long_term",
      title: "Long-term condition reviews",
      summary: "Regular reviews for asthma, COPD, diabetes and blood pressure.",
      details:
        "Our clinical team will invite eligible patients for their annual review and explain any tests needed first.",
      status: "published",
    },
    {
      id: "service_vaccinations",
      title: "Vaccinations",
      summary: "Routine, seasonal and travel vaccination clinics.",
      details:
        "Contact reception for current clinic dates. Travel appointments should be requested at least six weeks before departure.",
      status: "published",
    },
    {
      id: "service_social_prescribing",
      title: "Social prescribing",
      summary: "Practical support with wellbeing, money, housing and loneliness.",
      details:
        "Ask any member of the practice team for an introduction to our social prescriber.",
      status: "draft",
    },
  ],
  team: [
    {
      id: "person_patel",
      name: "Dr Sarah Patel",
      role: "GP Partner",
      group: "Doctors",
      biography: "Special interests in women’s health and minor surgery.",
      status: "published",
    },
    {
      id: "person_okafor",
      name: "Dr James Okafor",
      role: "GP Partner",
      group: "Doctors",
      biography: "Special interests in diabetes and cardiovascular care.",
      status: "published",
    },
    {
      id: "person_carter",
      name: "Helen Carter",
      role: "Lead Practice Nurse",
      group: "Nursing team",
      biography: "Leads asthma, COPD and travel clinics.",
      status: "published",
    },
    {
      id: "person_morton",
      name: "Lisa Morton",
      role: "Practice Manager",
      group: "Practice team",
      status: "draft",
    },
  ],
  notices: [
    {
      id: "notice_travel",
      title: "Travelling this summer?",
      message:
        "Ask about travel vaccinations at least six weeks before you fly. Appointments are available now.",
      tone: "important",
      status: "published",
      startsOn: "2026-07-01",
      endsOn: "2026-09-15",
    },
    {
      id: "notice_training",
      title: "Staff training afternoon",
      message:
        "The practice will close at 1:00pm on Thursday 20 August. NHS 111 will provide urgent support.",
      tone: "information",
      status: "draft",
      startsOn: "2026-08-13",
      endsOn: "2026-08-20",
    },
  ],
  media: [
    {
      id: "media_reception",
      name: "Practice reception",
      src: "/demos/gp/gp-hero.jpg",
      alt: "Bright GP practice reception with patients checking in",
      kind: "image",
      addedOn: "2026-06-12",
    },
    {
      id: "media_team",
      name: "Practice team",
      src: "/demos/gp/gp-team.jpg",
      alt: "Members of the Willowbrook practice team together",
      kind: "image",
      addedOn: "2026-06-12",
    },
    {
      id: "media_waiting",
      name: "Waiting room",
      src: "/demos/gp/gp-waiting.jpg",
      alt: "Accessible seating in the practice waiting room",
      kind: "image",
      addedOn: "2026-06-12",
    },
  ],
  members: [
    {
      id: "member_lisa",
      name: "Lisa Morton",
      email: "lisa.morton@example.invalid",
      role: "owner",
      status: "active",
    },
    {
      id: "member_reception",
      name: "Reception leads",
      email: "reception.leads@example.invalid",
      role: "editor",
      status: "active",
    },
    {
      id: "member_partner",
      name: "Dr Sarah Patel",
      email: "sarah.patel@example.invalid",
      role: "publisher",
      status: "active",
    },
  ],
  audit: [
    {
      id: "event_seed_1",
      occurredAt: "2026-08-01T14:42:00.000Z",
      actor: "Lisa Morton",
      action: "Published home page",
      detail: "Updated the welcome message and accessibility information.",
    },
    {
      id: "event_seed_2",
      occurredAt: "2026-08-01T10:12:00.000Z",
      actor: "Reception leads",
      action: "Saved a draft",
      detail: "Started the new-patient registration page.",
    },
  ],
};

const meadowView: PracticeWorkspace = {
  ...structuredClone(willowbrook),
  id: "practice_meadow_view",
  slug: "meadow-view",
  name: "Meadow View Medical Centre",
  shortName: "Meadow View",
  tagline: "Friendly primary care for East Reading",
  updatedAt: "2026-07-30T16:20:00.000Z",
  presentation: "digital",
  portfolio: {
    label: "Digital-first medical centre",
    description: "A faster online start for routine requests, designed for a city practice with busy patient journeys.",
    emphasis: "Digital access and quick signposting",
    image: "/demos/gp/gp-reception.jpg",
    imageAlt: "Reception desk at the fictional Meadow View Medical Centre",
  },
  brand: {
    ...willowbrook.brand,
    primary: "#176b54",
    primaryDark: "#0c4838",
    accent: "#f4cf4f",
    surface: "#edf5f1",
    logoText: "MV",
    heroImage: "/demos/gp/gp-reception.jpg",
    heroImageAlt: "A welcoming GP practice reception desk",
  },
  homepage: {
    ...willowbrook.homepage,
    eyebrow: "Your local practice",
    heading: "Health support that starts with you",
    introduction:
      "Use our website to find the right service, make routine requests and learn how our team can help.",
  },
  contact: {
    ...willowbrook.contact,
    phone: "0118 496 0188",
    phoneHref: "tel:+441184960188",
    address: "44 Orchard Way, East Reading",
    postcode: "RG2 8XX",
  },
  pages: willowbrook.pages.map((page) => ({
    ...page,
    id: page.id.replace("page_", "meadow_page_"),
    sections: page.sections.map((section) => ({
      ...section,
      id: `meadow_${section.id}`,
      body: section.body.replaceAll("Willowbrook", "Meadow View"),
    })),
  })),
  services: willowbrook.services.map((service) => ({
    ...service,
    id: `meadow_${service.id}`,
  })),
  team: [
    {
      id: "meadow_person_green",
      name: "Dr Maya Green",
      role: "GP Partner",
      group: "Doctors",
      biography: "Special interests in children’s health and dermatology.",
      status: "published",
    },
    {
      id: "meadow_person_ali",
      name: "Samira Ali",
      role: "Advanced Nurse Practitioner",
      group: "Nursing team",
      biography: "Supports same-day care and long-term condition reviews.",
      status: "published",
    },
  ],
  notices: [],
  members: [
    {
      id: "meadow_member_manager",
      name: "Jordan Evans",
      email: "jordan.evans@example.invalid",
      role: "owner",
      status: "active",
    },
  ],
  audit: [
    {
      id: "meadow_event_seed",
      occurredAt: "2026-07-30T16:20:00.000Z",
      actor: "Jordan Evans",
      action: "Updated practice details",
      detail: "Checked the summer opening times.",
    },
  ],
};

const kingsway: PracticeWorkspace = {
  ...structuredClone(willowbrook),
  id: "practice_kingsway",
  slug: "kingsway",
  name: "Kingsway Family Practice",
  shortName: "Kingsway",
  tagline: "Established care for Kingsway, Parkside and the city centre",
  updatedAt: "2026-08-02T09:30:00.000Z",
  presentation: "neighbourhood",
  portfolio: {
    label: "Established neighbourhood practice",
    description: "A reassuring, information-rich practice website with clear care continuity and local service information.",
    emphasis: "Continuity, access and neighbourhood services",
    image: "/demos/gp/gp-waiting.jpg",
    imageAlt: "Accessible waiting room at the fictional Kingsway Family Practice",
  },
  brand: {
    ...willowbrook.brand,
    primary: "#6a3f2b",
    primaryDark: "#48281d",
    accent: "#e7c685",
    surface: "#f8f1e8",
    logoText: "KF",
    heroImage: "/demos/gp/gp-waiting.jpg",
    heroImageAlt: "Accessible seating in the Kingsway Family Practice waiting room",
  },
  homepage: {
    ...willowbrook.homepage,
    eyebrow: "Serving our neighbourhood since 1986",
    heading: "Care that knows your community",
    introduction:
      "Find the care, support and practical information you need from a practice team rooted in Kingsway and Parkside.",
    primaryAction: { label: "Find the right service", href: "#services" },
    secondaryAction: { label: "Check opening times", href: "#contact" },
  },
  contact: {
    ...willowbrook.contact,
    phone: "0118 496 0246",
    phoneHref: "tel:+441184960246",
    address: "8 Kingsway Parade, Parkside, Reading",
    postcode: "RG3 7YY",
    directions:
      "The practice is beside Kingsway Library, with a drop-off point outside and step-free access from Parkside Road.",
    accessibility:
      "Step-free entrance, quiet waiting area, hearing loop and interpreter support are available on request.",
  },
  pages: willowbrook.pages.map((page) => ({
    ...page,
    id: page.id.replace("page_", "kingsway_page_"),
    sections: page.sections.map((section) => ({
      ...section,
      id: `kingsway_${section.id}`,
      body: section.body.replaceAll("Willowbrook", "Kingsway"),
    })),
  })),
  services: [
    {
      id: "kingsway_service_continuity",
      title: "Care with your usual team",
      summary: "We will try to book you with a clinician who knows your care.",
      details: "Tell reception if continuity matters for your request and we will explain the next available options.",
      status: "published",
    },
    {
      id: "kingsway_service_children",
      title: "Children and family health",
      summary: "Routine childhood care, vaccinations and support for parents and carers.",
      details: "Our nursing team can help you understand which clinic or local service is right for your family.",
      status: "published",
    },
    {
      id: "kingsway_service_carers",
      title: "Support for carers",
      summary: "Tell us if you care for someone, so we can record it and signpost support.",
      details: "We can discuss practical support, annual health checks and local carer services.",
      status: "published",
    },
  ],
  team: [
    {
      id: "kingsway_person_hughes",
      name: "Dr Emily Hughes",
      role: "GP Partner",
      group: "Doctors",
      biography: "Special interests in family medicine and older people’s care.",
      status: "published",
    },
    {
      id: "kingsway_person_grant",
      name: "Noah Grant",
      role: "Care Navigator",
      group: "Practice team",
      biography: "Helps patients find the right local or practice service first time.",
      status: "published",
    },
  ],
  notices: [
    {
      id: "kingsway_notice_flu",
      title: "Autumn flu clinics",
      message: "We will contact eligible patients when appointments are ready to book. Please wait for your invitation.",
      tone: "information",
      status: "published",
      startsOn: "2026-08-01",
      endsOn: "2026-11-30",
    },
  ],
  members: [
    { id: "kingsway_member_manager", name: "Morgan Lee", email: "morgan.lee@example.invalid", role: "owner", status: "active" },
  ],
  audit: [
    { id: "kingsway_event_seed", occurredAt: "2026-08-02T09:30:00.000Z", actor: "Morgan Lee", action: "Published flu clinic notice", detail: "Added seasonal clinic information." },
  ],
};

export const demoWorkspaces = [willowbrook, meadowView, kingsway] as const;

export function getDemoWorkspace(slug: string): PracticeWorkspace | undefined {
  return demoWorkspaces.find((workspace) => workspace.slug === slug);
}
