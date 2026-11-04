/**
 * StreetCrew case-study content. Copy follows the app's own App Store
 * listing (its-me-anoop/streetcrew, ios/appstore/listing-1.0.md) and every
 * image is the app's own App Store artwork (ios/appstore/marketing), so
 * the page never shows or promises more than the app does. The page component takes
 * this as a prop, which keeps copy changes out of the layout code.
 */

export interface FeatureGroup {
  title: string;
  points: readonly string[];
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The listing group this screen illustrates. */
  group: string;
}

export interface StreetCrewContent {
  name: string;
  /** App Store name and subtitle, as submitted. */
  storeName: string;
  subtitle: string;
  /** The line used in the App Store artwork and promotional text. */
  tagline: string;
  category: string;
  platforms: string;
  price: string;
  /** null until the App Store listing is live. */
  appStoreUrl: string | null;
  links: { privacy: string; support: string; terms: string };
  featureGroups: readonly FeatureGroup[];
  privacyPoints: readonly string[];
  craft: readonly { title: string; description: string }[];
  /** App Store screenshots, from ios/appstore/marketing in the app repo. */
  screenshots: readonly Screenshot[];
  /** App Store product page header artwork. */
  header: { src: string; alt: string; width: number; height: number };
}

const APP_SITE = "https://streetcrew-api-xi.vercel.app";

export const streetcrew: StreetCrewContent = {
  name: "StreetCrew",
  storeName: "StreetCrew: Walk & Run Tracker",
  subtitle: "Explore new streets & routes",
  tagline: "Every walk, somewhere new",
  category: "Health & Fitness",
  platforms: "iPhone and iPad",
  price: "Free, with no in-app purchases",
  appStoreUrl: null,
  links: {
    privacy: `${APP_SITE}/privacy`,
    support: `${APP_SITE}/support`,
    terms: `${APP_SITE}/terms`,
  },
  featureGroups: [
    {
      title: "Record",
      points: [
        "Runs, walks, hikes and rides with live distance, pace, steps and calories",
        "Keeps recording with the screen locked, with a Live Activity on the Lock Screen",
        "Optional spoken splits, so your phone can stay in your pocket",
      ],
    },
    {
      title: "Explore",
      points: [
        "Your map fills in square by square, with new ground counted on every outing",
        "Past workouts from Apple Health light up the places you have already been",
        "Firsts, streaks and personal bests are celebrated at the finish",
      ],
    },
    {
      title: "Plan",
      points: [
        "Plan a loop to fit the time you have, starting from where you stand",
        "Draw your own route and follow it with turn cues",
        "A tip on the best time to head out, based on the weather forecast",
      ],
    },
    {
      title: "Remember",
      points: [
        "Pin photos from an outing to its route",
        "Short insights about your week, written on your device",
      ],
    },
    {
      title: "Share, if you want to",
      points: [
        "Add friends with a code, give kudos and comment on each other's outings",
        "Weekly and all-time leaderboards with friends or people nearby",
        "Join or host group walks and runs, with only a rough location shown until you join",
      ],
    },
  ],
  privacyPoints: [
    "No account needed to track",
    "Routes, health numbers and photos stay on your device",
    "Shared outings have their start, finish and privacy zones cut first",
    "No ads, no tracking and no data sold",
    "Delete your account at any time in Settings",
  ],
  craft: [
    {
      title: "Native SwiftUI",
      description:
        "Built for iPhone and iPad with MapKit, HealthKit, Live Activities and an adaptive sidebar layout on larger screens.",
    },
    {
      title: "A tested engine",
      description:
        "Recording, route filtering, exploration squares and badges live in a pure Swift package, written test-first.",
    },
    {
      title: "Privacy in the design",
      description:
        "Routes are trimmed and thinned on the phone before anything is shared, and nothing leaves the device by default.",
    },
  ],
  screenshots: [
    {
      src: "/projects/streetcrew/record.jpg",
      alt: "StreetCrew recording a run: live distance, time, pace and climb, with new squares lighting up on the map",
      width: 1206,
      height: 2622,
      group: "Record",
    },
    {
      src: "/projects/streetcrew/explore.jpg",
      alt: "StreetCrew Explore tab: explored squares on the map, new ground this week and the nearest new ground",
      width: 1206,
      height: 2622,
      group: "Explore",
    },
    {
      src: "/projects/streetcrew/loop-planner.jpg",
      alt: "StreetCrew loop planner: a 45-minute loop with new squares and a weather tip",
      width: 1206,
      height: 2622,
      group: "Plan",
    },
  ],
  header: {
    src: "/projects/streetcrew/header.jpg",
    alt: "StreetCrew: Every walk, somewhere new",
    width: 1920,
    height: 823,
  },
};

export type StoreStatus = { kind: "coming-soon" } | { kind: "available"; url: string };

/** What the store button should do, given the listing URL (if any). */
export function storeStatus(url: string | null): StoreStatus {
  if (url === null) return { kind: "coming-soon" };
  if (!url.startsWith("https://apps.apple.com/")) {
    throw new Error(`StreetCrew's store link must be on apps.apple.com, got ${url}`);
  }
  return { kind: "available", url };
}
