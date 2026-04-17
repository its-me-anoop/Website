const meta = [
  { k: "Founded", v: "2024" },
  { k: "Based", v: "Reading, UK" },
  { k: "Headcount", v: "1 + friends" },
  { k: "Reply time", v: "Within a day" },
];

export default function About() {
  return (
    <section
      id="studio"
      className="relative border-t border-[var(--rule)] bg-[var(--paper-2)] py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Head */}
        <div className="mb-14 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 05 · The studio
            </div>
            <h2
              className="mt-3 font-display text-[clamp(40px,5.5vw,72px)] font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
            >
              One person, <em className="italic text-[var(--ink-2)]">a few trusted<br />collaborators</em>,
              a short<br />client list.
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-[1.6] text-[var(--ink-2)]">
            Flutterly is a UK-registered product studio, founded in 2024 after a
            decade of shipping inside larger teams.
          </p>
        </div>

        {/* Body grid */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <blockquote
              className="m-0 font-display text-[clamp(28px,3.4vw,44px)] font-light italic leading-[1.2] tracking-[-0.02em] text-[var(--ink)]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
            >
              <span
                aria-hidden="true"
                className="mr-[0.1em] inline-block text-[1.6em] leading-[0] align-[-0.2em] text-[var(--accent)]"
              >
                &ldquo;
              </span>
              I started Flutterly because I was tired of handing off work to
              people who didn&rsquo;t care about it as much as I did. So I
              stopped handing it off.
            </blockquote>
            <div className="mt-8 max-w-[480px] text-[16px] leading-[1.7] text-[var(--ink-2)]">
              <p className="m-0">
                We&rsquo;re small on purpose. We take on a handful of engagements
                a year so we can write the code, draw the pixels, and answer the
                email — usually in that order.
              </p>
              <p className="mt-3.5">
                We&rsquo;re at our best with founders sketching the first version,
                teams redesigning something their users secretly hate, and
                companies who want a partner — not a vendor — for the long run.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--rule)] pt-6 md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k} className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {m.k}
                  </span>
                  <span className="font-display text-[17px]">{m.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <figure
            className="relative m-0 overflow-hidden rounded-[22px] bg-[linear-gradient(170deg,#2a2418,#15140f)]"
            style={{
              aspectRatio: "4/5",
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(209,74,31,.35), transparent 55%), radial-gradient(circle at 70% 75%, rgba(13,107,92,.3), transparent 55%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 text-center font-display font-light leading-[0.9] tracking-[-0.05em]"
              style={{
                padding: 30,
                fontSize: 220,
                color: "rgba(245,239,228,0.08)",
              }}
            >
              A.J.
            </span>
            <figcaption className="absolute inset-x-5 bottom-5 z-[2] text-[var(--paper)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.6)]">
                Founder · Lead Engineer
              </div>
              <div className="mt-1 font-display text-[22px]">Anoop Jose</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
