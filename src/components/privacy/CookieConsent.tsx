"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  createConsentPreferences,
  readConsent,
  writeConsent,
  type ConsentPreferences,
} from "@/lib/consent";

type View = "hidden" | "notice" | "manage";

const optionalDefaults = { analytics: false, marketing: false };

export function CookieConsent() {
  const pathname = usePathname();
  const [view, setView] = useState<View>("hidden");
  const [preferences, setPreferences] = useState(optionalDefaults);
  const [hasDecision, setHasDecision] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readConsent();
      if (stored) {
        setPreferences({
          analytics: stored.analytics,
          marketing: stored.marketing,
        });
        setHasDecision(true);
        return;
      }

      setView("notice");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (view === "manage") headingRef.current?.focus();
  }, [view]);

  useEffect(() => {
    if (view === "hidden" || !hasDecision) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setView("hidden");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, hasDecision]);

  function persist(next: ConsentPreferences) {
    writeConsent(next);
    setPreferences({ analytics: next.analytics, marketing: next.marketing });
    setHasDecision(true);
    setView("hidden");
    window.dispatchEvent(
      new CustomEvent("flutterly:consent-changed", { detail: next })
    );
    window.requestAnimationFrame(() => settingsButtonRef.current?.focus());
  }

  function acceptAll() {
    persist(createConsentPreferences({ analytics: true, marketing: true }));
  }

  function rejectOptional() {
    persist(createConsentPreferences(optionalDefaults));
  }

  function savePreferences() {
    persist(createConsentPreferences(preferences));
  }

  // The CMS is a separate product surface. It does not load optional scripts,
  // and browser-local demo content is explained in-product rather than through
  // the public marketing site's cookie notice.
  if (pathname?.startsWith("/cms")) return null;

  if (view === "hidden") {
    if (!hasDecision) return null;

    return (
      <button
        ref={settingsButtonRef}
        type="button"
        onClick={() => setView("manage")}
        className="cookie-consent fixed bottom-4 left-4 z-[180] rounded-full border border-bl-line-2 bg-bl-canvas px-4 py-2 text-[13px] font-semibold text-bl-ink shadow-[0_12px_34px_-22px_rgba(11,47,40,0.55)] transition-[background-color,color] duration-200 hover:bg-bl-pine hover:text-bl-pine-ink"
      >
        Cookie settings
      </button>
    );
  }

  return (
    <section
      aria-label="Cookie preferences"
      aria-live="polite"
      className="cookie-consent fixed inset-x-4 bottom-4 z-[180] mx-auto max-w-[720px] overflow-hidden rounded-[28px] border border-bl-line-2 bg-bl-canvas text-bl-ink shadow-[0_24px_70px_-28px_rgba(11,47,40,0.5)]"
    >
      {view === "notice" ? (
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bl-teal">
              Privacy choices
            </p>
            <h2 className="mt-2 text-[21px] font-semibold tracking-[-0.025em]">
              This site currently uses no analytics or marketing cookies
            </h2>
            <p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-bl-ink-soft">
              We store your choice in this browser so we do not ask on every
              visit. You can accept optional categories, reject them, or review
              the plain-language details first.
            </p>
            <Link
              href="/cookie-policy"
              className="mt-3 inline-block text-[13px] font-semibold text-bl-teal underline-offset-4 hover:underline"
            >
              Read the cookie policy
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-[250px] lg:justify-end">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-bl-teal px-4 py-2.5 text-[13.5px] font-semibold text-bl-canvas hover:bg-bl-teal-hover"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-full border border-bl-line-2 bg-bl-surface px-4 py-2.5 text-[13.5px] font-semibold text-bl-ink hover:border-bl-teal"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => setView("manage")}
              className="px-2 py-2 text-[13.5px] font-semibold text-bl-teal underline-offset-4 hover:underline"
            >
              Manage preferences
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bl-teal">
            Privacy choices
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-[22px] font-semibold tracking-[-0.025em] focus:outline-none"
          >
            Manage cookie preferences
          </h2>
          <p className="mt-2 max-w-[620px] text-[14px] leading-[1.6] text-bl-ink-soft">
            No optional services are active today. If a named provider is added,
            this consent version will change and the site will ask again before
            loading it.
          </p>

          <fieldset className="mt-6 border-y border-bl-line">
            <legend className="sr-only">Cookie categories</legend>
            <PreferenceRow
              title="Essential"
              copy="Required to deliver the site and remember this choice. The preference is kept in local storage, not sent with page requests."
              checked
              disabled
              onChange={() => undefined}
            />
            <PreferenceRow
              title="Analytics"
              copy="Would help measure visits and improve pages. No analytics provider or analytics cookie is currently in use."
              checked={preferences.analytics}
              onChange={(checked) =>
                setPreferences((current) => ({ ...current, analytics: checked }))
              }
            />
            <PreferenceRow
              title="Marketing"
              copy="Would support advertising or campaign attribution. No marketing pixel or marketing cookie is currently in use."
              checked={preferences.marketing}
              onChange={(checked) =>
                setPreferences((current) => ({ ...current, marketing: checked }))
              }
            />
          </fieldset>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={savePreferences}
              className="rounded-full bg-bl-teal px-5 py-2.5 text-[13.5px] font-semibold text-bl-canvas hover:bg-bl-teal-hover"
            >
              Save preferences
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-full border border-bl-line-2 bg-bl-surface px-5 py-2.5 text-[13.5px] font-semibold text-bl-ink hover:border-bl-teal"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="px-3 py-2.5 text-[13.5px] font-semibold text-bl-teal underline-offset-4 hover:underline"
            >
              Accept all
            </button>
            {hasDecision ? (
              <button
                type="button"
                onClick={() => setView("hidden")}
                className="ml-auto px-3 py-2.5 text-[13.5px] font-semibold text-bl-ink-soft underline-offset-4 hover:underline"
              >
                Close
              </button>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

function PreferenceRow({
  title,
  copy,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  copy: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="grid cursor-pointer grid-cols-[1fr_auto] gap-5 border-b border-bl-line py-4 last:border-b-0">
      <span>
        <span className="block text-[15px] font-semibold text-bl-ink">{title}</span>
        <span className="mt-1 block max-w-[560px] text-[13px] leading-[1.55] text-bl-ink-soft">
          {copy}
        </span>
      </span>
      <span className="relative mt-1 inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="absolute inset-0 rounded-full border border-bl-line-2 bg-bl-band transition-colors peer-checked:border-bl-teal peer-checked:bg-bl-teal peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bl-teal peer-disabled:opacity-65" />
        <span className="relative ml-1 h-4 w-4 rounded-full bg-bl-surface shadow-sm transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
