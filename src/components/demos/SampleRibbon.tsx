import Image from "next/image";
import Link from "next/link";

/**
 * Thin banner pinned above every demo site so nobody mistakes the
 * fictional organisation for a real one — and so the demo sells the
 * service it exists to demonstrate.
 *
 * This is the one piece of Flutterly chrome that appears on a demo, so
 * it wears the studio's cocoa and closes with the three-colour rule —
 * a hard edge that says where the studio's bar ends and the client's
 * site begins. The values are literal: the demo scopes deliberately
 * carry no Aurum tokens.
 */
export function SampleRibbon({
  sectorHref,
  sectorLabel,
}: {
  sectorHref: string;
  sectorLabel: string;
}) {
  return (
    <aside
      aria-label="About this sample website"
      className="relative bg-[#170c0f] text-[#f5e6d7] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[linear-gradient(90deg,#1b8fa1,#e89a2a_52%,#c73e6f)] after:content-['']"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 pb-2.5 pt-2 text-sm sm:px-6">
        <p className="flex items-center gap-2">
          <Image src="/flutterly-logo.png" alt="" width={16} height={16} />
          <span>
            Sample website by{" "}
            <Link href="/" className="font-semibold underline underline-offset-2 hover:text-white">
              Flutterly
            </Link>{" "}
            — the organisation shown is fictional.
          </span>
        </p>
        <Link
          href={sectorHref}
          className="font-semibold underline underline-offset-2 hover:text-white"
        >
          {sectorLabel} →
        </Link>
      </div>
    </aside>
  );
}
