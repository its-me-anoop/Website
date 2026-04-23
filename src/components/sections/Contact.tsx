import Link from "next/link";

const details = [
  {
    k: "Write",
    v: <Link href="mailto:anoop@flutterly.co.uk" className="transition-colors hover:text-[var(--accent)]">anoop@flutterly.co.uk</Link>,
  },
  {
    k: "Ring",
    v: <Link href="tel:+447780580534" className="transition-colors hover:text-[var(--accent)]">+44 7780 580 534</Link>,
  },
  { k: "Visit", v: "Reading, UK" },
  { k: "Usual reply", v: "Within a working day" },
];

export function Contact() {
  return (
    <section
      id="brief"
      className="relative overflow-hidden border-t border-[var(--rule)] bg-[var(--ink)] pb-[120px] pt-[140px] text-[var(--paper)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-7">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--accent)]">
          № 06 · The brief
        </div>

        <h2
          className="mt-6 font-display font-extralight leading-[0.92] tracking-[-0.04em]"
          style={{
            fontSize: "clamp(64px,11vw,180px)",
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0',
          }}
        >
          Got a brief
          <br />
          <em className="italic text-[var(--accent)]">worth</em> building?
        </h2>

        <div className="mt-10 grid items-end gap-10 border-t border-[rgba(245,239,228,0.15)] pt-10 md:grid-cols-2 md:gap-16">
          <p className="max-w-[420px] text-[17px] leading-[1.6] text-[rgba(245,239,228,0.7)]">
            We only take a handful of projects a year, so not every fit is the
            right fit. Write anyway — if we can&rsquo;t help, we&rsquo;ll usually
            know someone who can.
          </p>
          <Link
            href="mailto:anoop@flutterly.co.uk"
            className="group inline-flex items-center gap-3 self-start border-b border-[rgba(245,239,228,0.25)] pb-2.5 font-display text-[28px] text-[var(--paper)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:self-end"
          >
            anoop@flutterly.co.uk
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M5 17 17 5M8 5h9v9"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        {/* Details */}
        <div className="mt-20 grid gap-7 border-t border-[rgba(245,239,228,0.15)] pt-8 md:grid-cols-4">
          {details.map((d) => (
            <div key={d.k} className="flex flex-col gap-1.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.5)]">
                {d.k}
              </span>
              <span className="font-display text-[18px] text-[var(--paper)]">
                {d.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
