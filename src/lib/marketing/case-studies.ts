import type { ServiceSlug } from "./services";

/**
 * Short case studies for projects that do not have a bespoke product
 * page: `/projects/[slug]` renders each one. Every fact here comes from
 * the project's own repository; a project that is not released says so,
 * and a project with no screenshots shows none.
 */
export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown under the capture. */
  caption: string;
  /** How the capture is framed. */
  frame: "browser" | "phone" | "duo-inner" | "duo-outer";
};

export type CaseStudy = {
  slug: "rotaowl" | "streetcrew" | "catholic-bible";
  name: string;
  /** Which service's colour the page takes. */
  service: ServiceSlug;
  eyebrow: string;
  heading: { lead: string; emphasis: string; trail?: string };
  intro: string;
  status: string;
  facts: readonly (readonly [string, string])[];
  features: readonly { title: string; copy: string }[];
  /** The lead image beside the hero; an icon or cover when there is no capture. */
  mark: { src: string; alt: string; width: number; height: number };
  shotsTitle?: string;
  shotsNote?: string;
  shots: readonly Shot[];
  metaDescription: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "rotaowl",
    name: "Rotaowl",
    service: "websites",
    eyebrow: "Web app and mobile app · In development",
    heading: { lead: "Next week's rota,", emphasis: "done", trail: "by Thursday." },
    intro:
      "Rotaowl is rota and shift planning for small teams: cafés, clinics, shops and care. Managers build and publish the weekly rota; staff see it, pick up open shifts, swap shifts and book leave.",
    status: "In development. The web app runs with a demo café, and the staff app for iPhone and Android is in testing.",
    facts: [
      ["Built with", "Next.js, TypeScript, Postgres"],
      ["Staff app", "Flutter, for iPhone and Android"],
      ["Tested", "Test-driven, against a real Postgres engine"],
      ["For", "Teams of up to 15 on the free plan"],
    ],
    features: [
      {
        title: "A week you can publish",
        copy: "A weekly grid on a desktop and a day list on a phone. Draft shifts stay hidden from staff until the week is published, and last week can be copied forward.",
      },
      {
        title: "Rules that catch mistakes",
        copy: "UK Working Time defaults: it blocks double booking and rostering someone on approved leave, and warns about short rest, long weeks and recurring unavailability.",
      },
      {
        title: "Requests without the group chat",
        copy: "Leave with approval, shift swaps a colleague accepts and a manager approves, and open shifts anyone can pick up, first come first served.",
      },
      {
        title: "Hours and cost as you build",
        copy: "Scheduled hours and labour cost add up as shifts go in, with unpaid breaks and overnight shifts handled.",
      },
      {
        title: "The right access for each role",
        copy: "Owner, admin, manager and staff each see what they need. One account can belong to several organisations and switch between them.",
      },
      {
        title: "In everyone's calendar",
        copy: "Each person gets a private calendar feed of their published shifts, and every change is kept in an audit trail.",
      },
    ],
    mark: {
      src: "/projects/rotaowl/landing-desktop.webp",
      alt: "The Rotaowl home page: next week's rota, done by Thursday",
      width: 2880,
      height: 1920,
    },
    shotsTitle: "The same rota on every screen.",
    shotsNote:
      "Captured from the current build with its demo café. The two iPhone Duo captures are the web app at the Duo's outer and inner screen sizes; the last two are the staff app.",
    shots: [
      {
        src: "/projects/rotaowl/rota-desktop.webp",
        alt: "The weekly rota on a desktop: a grid of people and days with hours, labour cost and open shifts",
        width: 2880,
        height: 1920,
        caption: "The week on a desktop",
        frame: "browser",
      },
      {
        src: "/projects/rotaowl/rota-duo-inner.webp",
        alt: "The weekly rota at the size of an iPhone Duo's inner screen, still a grid",
        width: 2007,
        height: 2853,
        caption: "iPhone Duo, open",
        frame: "duo-inner",
      },
      {
        src: "/projects/rotaowl/home-duo-outer.webp",
        alt: "The manager's overview at the size of an iPhone Duo's outer screen: what needs attention and this week's totals",
        width: 1398,
        height: 2034,
        caption: "iPhone Duo, folded",
        frame: "duo-outer",
      },
      {
        src: "/projects/rotaowl/app-home.png",
        alt: "The staff app's home screen: clock in, shortcuts and upcoming shifts",
        width: 400,
        height: 844,
        caption: "Staff app: home",
        frame: "phone",
      },
      {
        src: "/projects/rotaowl/app-rota.png",
        alt: "The staff app's rota, listed by day",
        width: 400,
        height: 844,
        caption: "Staff app: rota",
        frame: "phone",
      },
    ],
    metaDescription:
      "Rotaowl is rota and shift planning for small UK teams, built by Flutterly: publish the week, open shifts, swaps, leave and labour cost. In development.",
  },
  {
    slug: "streetcrew",
    name: "StreetCrew",
    service: "apps",
    eyebrow: "iPhone app · In TestFlight",
    heading: { lead: "Get out. Find", emphasis: "new streets." },
    intro:
      "Record your runs, walks, hikes and rides, watch your explored map grow, and share the best ones with friends. Your routes stay on your device.",
    status: "In TestFlight. StreetCrew is being tested before it reaches the App Store, so there are no screenshots here yet.",
    facts: [
      ["Built with", "SwiftUI, MapKit, HealthKit"],
      ["Behind it", "TypeScript and PostGIS"],
      ["Street data", "OpenStreetMap contributors"],
      ["Privacy", "Routes stay on the device"],
    ],
    features: [
      {
        title: "Record anything on foot or wheels",
        copy: "Runs, walks, hikes and rides, recorded in the app or brought in from Apple Health.",
      },
      {
        title: "A map that fills in",
        copy: "Every outing adds to an explored map, so the streets you have not been down yet are easy to see.",
      },
      {
        title: "Plan the next one",
        copy: "Plan a route or generate a loop, then follow it as you go.",
      },
      {
        title: "Share with friends, not the world",
        copy: "A feed, friends and leaderboards for the people you choose, with reporting and blocking built in.",
      },
    ],
    mark: {
      src: "/projects/streetcrew/app-icon.png",
      alt: "StreetCrew app icon: an orange route drawn across a street grid",
      width: 512,
      height: 512,
    },
    shots: [],
    metaDescription:
      "StreetCrew is an iPhone app from Flutterly for recording runs, walks, hikes and rides and watching your explored map grow. In TestFlight.",
  },
  {
    slug: "catholic-bible",
    name: "Catholic Bible",
    service: "apps",
    eyebrow: "iPhone app · SwiftUI",
    heading: { lead: "The whole Bible,", emphasis: "offline." },
    intro:
      "A reading app for the Catholic Public Domain Version. Both testaments are in the app itself, by book and chapter, so it opens straight to the text with no account and no connection.",
    status: "A SwiftUI app with a Flutter build alongside it. Neither has screenshots in its repository yet, so none are shown here.",
    facts: [
      ["Built with", "SwiftUI"],
      ["Also built in", "Flutter"],
      ["Translation", "Catholic Public Domain Version"],
      ["Works", "Offline, with no account"],
    ],
    features: [
      {
        title: "Old and New Testament",
        copy: "Every book and chapter of the Catholic canon, bundled with the app.",
      },
      {
        title: "Bookmarks",
        copy: "Keep the verses you return to, and go straight back to them.",
      },
      {
        title: "Share a verse",
        copy: "Send any verse with its reference from the share sheet.",
      },
      {
        title: "Find a verse",
        copy: "The Flutter build adds searching across verses.",
      },
    ],
    mark: {
      src: "/projects/catholic-bible/cover.svg",
      alt: "Catholic Bible, Catholic Public Domain Version",
      width: 600,
      height: 800,
    },
    shots: [],
    metaDescription:
      "Catholic Bible is an offline reading app for the Catholic Public Domain Version, built by Flutterly in SwiftUI, with bookmarks and verse sharing.",
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
