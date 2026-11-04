/**
 * Sipli case-study content. Copy follows the app's current App Store
 * description (its-me-anoop/Sipli, docs/appstore-description.txt, 6.1) and
 * every image is one of its App Store screenshots
 * (appstore-screenshots/release-5.0.2 and release-6.0-duo), so the page
 * never shows or promises more than the app does.
 */

export interface StoreImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SipliSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points?: readonly string[];
  images: readonly StoreImage[];
}

const phone = (file: string, alt: string): StoreImage => ({
  src: `/projects/sipli/store/${file}`,
  alt,
  width: 1320,
  height: 2868,
});

const duo = (file: string, alt: string): StoreImage => ({
  src: `/projects/sipli/store/${file}`,
  alt,
  width: 2007,
  height: 2853,
});

export const sipli = {
  name: "Sipli",
  storeName: "Sipli — Water Tracker",
  version: "6.1",
  platforms: "iPhone, iPad and Apple Watch",
  requirement: "Requires iOS 17 or later",
  appStoreUrl: "https://apps.apple.com/us/app/sipli-water-tracker/id6758851574",
  privacyPolicy: "/projects/sipli/privacy-policy",
  intro:
    "See how much is left to reach your daily water goal. Sipli makes logging a drink quick and your progress easy to read.",
  hero: phone("see-whats-left.jpg", "Sipli App Store screenshot: see what's left to drink, your daily goal in a bottle"),
  mark: { src: "/projects/sipli/mark.png", alt: "Sipli bottle mark" },
  sections: [
    {
      id: "bottle",
      eyebrow: "Home",
      title: "A bottle that follows your day",
      body: "The Home bottle starts full and drains as you log drinks. Its percentage shows how much of your daily goal is left. Tilt your phone and the water moves with it, then settles. With Reduce Motion on, the level updates without the motion effects.",
      images: [
        phone("every-drink-counts.jpg", "Sipli App Store screenshot: every drink, a little less, as the bottle empties"),
        phone("moves-with-you.jpg", "Sipli App Store screenshot: water with a little life, moving as you tilt"),
      ],
    },
    {
      id: "duo",
      eyebrow: "iPhone Duo",
      title: "Made for iPhone Duo",
      body: "Open your iPhone Duo and Sipli fills the inner display, with Home, Insights and Diary split around the fold. Close it and your bottle stays on the cover screen. Sipli works in every orientation, with two-column layouts in landscape.",
      images: [
        duo("duo-made-for-iphone-duo.jpg", "Sipli App Store screenshot: made for iPhone Duo, on the inner display"),
        duo("duo-folded-or-open.jpg", "Sipli App Store screenshot: folded or open, on both iPhone Duo displays"),
      ],
    },
    {
      id: "logging",
      eyebrow: "Logging",
      title: "Quick to log, easy to correct",
      body: "Add a drink in a couple of taps, and fix a missed or wrong entry whenever you need to.",
      points: [
        "Add water with quick amounts or choose your own serving size",
        "Set a daily goal and use reminders that fit your waking hours",
        "Keep a drink diary, add a missed entry, or edit and delete a previous log",
        "Check daily progress, streaks, a monthly heatmap, and 7- and 30-day trends",
        "Log water from Apple Watch, with Home Screen and Lock Screen widgets",
      ],
      images: [
        phone("log-a-drink.jpg", "Sipli App Store screenshot: had a drink? Make it count, on the Log Intake screen"),
        phone("daily-diary.jpg", "Sipli App Store screenshot: every sip has a place, in the daily diary"),
      ],
    },
    {
      id: "keep-going",
      eyebrow: "Motivation",
      title: "Small reasons to keep going",
      body: "Build a streak, take on weekly quests, and discover 31 badges in the Trophy Room. Share a daily summary, a week of progress, or a badge you've earned.",
      images: [phone("siri-voice-activated.jpg", "Sipli App Store screenshot: earn a badge for it, too")],
    },
    {
      id: "siri",
      eyebrow: "Siri",
      title: "Log a drink with your voice",
      body: "Ask Siri to log a drink by name and amount, like “Log 350 ml of latte in Sipli”, and hear how much is left without opening the app.",
      images: [
        phone("siri-log-with-your-voice.jpg", "Sipli App Store screenshot: log a drink with your voice"),
        phone("siri-just-say-it.jpg", "Sipli App Store screenshot: just say “Log a coffee”"),
      ],
    },
  ] satisfies readonly SipliSection[],
  ipad: {
    src: "/projects/sipli/store/ipad-see-whats-left.jpg",
    alt: "Sipli App Store screenshot on iPad: see what's left to drink",
    width: 2048,
    height: 2732,
  },
  free: [
    "Basic water logging",
    "Custom daily goals",
    "Diary history",
    "Standard reminders",
  ],
  premium: [
    "More than 35 beverage types, including coffee, tea, juice and smoothies, with drink-specific hydration estimates",
    "Apple Health sync for water intake, workouts and active energy, with your permission",
    "Daily goal adjustments for local temperature, humidity, workouts and active days",
    "Smart reminders that respond to your schedule and progress",
    "Hydration tips and insight summaries, with on-device Apple Intelligence on supported devices",
  ],
  billing:
    "Monthly and annual plans are available. Prices, billing periods and any eligible trial offers are shown before purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the current period ends, and can be managed in your App Store account settings.",
  privacy: [
    "No account to create",
    "No ad tracking",
    "No developer-operated servers",
    "Your data is stored on your device, with Apple-managed iCloud sync when available",
    "Apple Health and location access are optional",
    "On-device AI does not send your data to external AI services",
  ],
  disclaimer: "Hydration goals and beverage factors are estimates for general wellness, not medical advice.",
} as const;

export type SipliContent = typeof sipli;
