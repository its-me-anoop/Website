import type { Metadata } from "next";
import {
  PhysioCallout,
  PhysioPageHero,
  PhysioSection,
} from "@/components/demos/physio/PhysioShell";
import { loadPhysioContent } from "@/lib/cms/physio";

export const metadata: Metadata = { title: "Trust & regulation" };

export default function TrustPage() {
  const { clinic, trust } = loadPhysioContent();

  return (
    <>
      <PhysioPageHero
        eyebrow="Regulation, in plain English"
        title="Trust & regulation"
        lede="Who checks up on us, what protects you, and how to verify any of our clinicians yourself."
      />

      <PhysioSection>
        <PhysioCallout title="Verify any clinician yourself">
          <p>{trust.verifyRegisterCopy}</p>
          <a
            href="https://www.hcpc-uk.org/check-the-register/"
            className="mt-3 inline-block text-sm font-semibold text-[var(--dpy-ink)] underline underline-offset-4 decoration-[var(--dpy-coral)]"
          >
            Open the HCPC register ↗
          </a>
        </PhysioCallout>

        <div className="mt-10 space-y-10">
          {trust.blocks.map((block) => (
            <section key={block.title}>
              <h2 className="dpy-display text-2xl font-bold leading-tight">{block.title}</h2>
              <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                {block.copy}
              </p>
            </section>
          ))}
        </div>
      </PhysioSection>

      <div className="bg-[var(--dpy-tint)]">
        <PhysioSection>
          <h2 className="dpy-display text-2xl font-bold leading-tight">Visiting the clinic</h2>
          <p className="mt-2 max-w-[560px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
            {clinic.address}
          </p>
          <ul className="mt-4 max-w-[560px] list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--dpy-ink-soft)]">
            {clinic.access.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </PhysioSection>
      </div>
    </>
  );
}
