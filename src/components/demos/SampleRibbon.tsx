import Image from "next/image";
import Link from "next/link";

/**
 * Thin banner pinned above every demo site so nobody mistakes the
 * fictional organisation for a real one — and so the demo sells the
 * service it exists to demonstrate.
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
      className="bg-[#0b2f28] text-[#eaf3ef]"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[13px] sm:px-6">
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
