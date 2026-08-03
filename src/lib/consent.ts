export const CONSENT_STORAGE_KEY = "flutterly.cookieConsent";
export const CONSENT_VERSION = 1;

export type OptionalConsentCategory = "analytics" | "marketing";

export type ConsentPreferences = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

export function createConsentPreferences(
  optional: Record<OptionalConsentCategory, boolean>
): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: optional.analytics,
    marketing: optional.marketing,
    decidedAt: new Date().toISOString(),
  };
}

export function readConsent(
  storage: Pick<Storage, "getItem"> | undefined =
    typeof window === "undefined" ? undefined : window.localStorage
): ConsentPreferences | null {
  if (!storage) return null;

  try {
    const raw = storage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const value = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (
      value.version !== CONSENT_VERSION ||
      value.necessary !== true ||
      typeof value.analytics !== "boolean" ||
      typeof value.marketing !== "boolean" ||
      typeof value.decidedAt !== "string"
    ) {
      return null;
    }

    return value as ConsentPreferences;
  } catch {
    return null;
  }
}

export function writeConsent(
  preferences: ConsentPreferences,
  storage: Pick<Storage, "setItem"> = window.localStorage
) {
  storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
}

/** Optional scripts must call this before loading or writing a cookie. */
export function hasOptionalConsent(
  category: OptionalConsentCategory,
  storage?: Pick<Storage, "getItem">
) {
  return readConsent(storage)?.[category] === true;
}
