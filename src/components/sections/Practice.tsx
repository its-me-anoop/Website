const rules = [
  {
    n: "Rule 01",
    title: (
      <>
        One brief
        <br />
        at a time.
      </>
    ),
    body: "We run one engagement at full depth at a time. You get our attention, not our availability. It keeps the work honest and the calendar clear.",
  },
  {
    n: "Rule 02",
    title: (
      <>
        <em className="italic text-[var(--ink-2)]">Friday</em>
        <br />
        ships.
      </>
    ),
    body: "We commit to weekly shippable progress — something real you can click, tap, or show a teammate. If we can’t demo by Friday, we change the plan, not the deadline.",
  },
  {
    n: "Rule 03",
    title: (
      <>
        Design
        <br />
        at the code.
      </>
    ),
    body: "Design decisions happen in the editor, not in pixel-perfect Figma handoffs. Figma is a sketchpad; the browser is the studio. It’s faster, and the details are actually real.",
  },
  {
    n: "Rule 04",
    title: (
      <>
        <em className="italic text-[var(--ink-2)]">Yours</em>
        <br />
        to own.
      </>
    ),
    body: "You own everything — code, credentials, domains, runbooks. When we’re done, you could hire any other team to keep going. No lock-in, not even a little.",
  },
];

const stack = [
  { k: "Web", v: "Next.js · React · TypeScript · Tailwind · Astro" },
  { k: "Mobile", v: "Swift · SwiftUI · Flutter · React Native" },
  { k: "Backend", v: "Node · Postgres · GraphQL · Supabase · AWS" },
  { k: "Tooling", v: "Figma · Linear · GitHub · Vercel · Sentry" },
];

export function Practice() {
  return (
    <section
      id="practice"
      className="relative border-t border-[var(--rule)] bg-[var(--paper)] py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Head */}
        <div className="mb-14 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 03 · The practice
            </div>
            <h2
              className="mt-3 font-display text-[clamp(40px,5.5vw,72px)] font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
            >
              Four working rules
              <br />
              <em className="italic text-[var(--ink-2)]">we don&rsquo;t break.</em>
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-[1.6] text-[var(--ink-2)]">
            We don&rsquo;t have a glossy methodology. We have four rules
            we&rsquo;ve earned the hard way — the reason our clients come back.
          </p>
        </div>

        {/* Rules */}
        <div className="border-t border-[var(--rule)]">
          {rules.map((r) => (
            <div
              key={r.n}
              className="group relative grid gap-4 border-b border-[var(--rule)] py-10 md:grid-cols-[80px_1fr_1fr] md:gap-10"
            >
              <span className="absolute left-0 top-[-1px] h-[2px] w-0 bg-[var(--accent)] transition-[width] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:w-full" />
              <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-[var(--accent)] md:pt-1.5">
                {r.n}
              </span>
              <h3
                className="m-0 font-display text-[clamp(28px,3.6vw,48px)] font-light leading-[1.05] tracking-[-0.02em]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
              >
                {r.title}
              </h3>
              <p className="m-0 self-center text-[16px] leading-[1.6] text-[var(--ink-2)]">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-20 border-t border-[var(--rule)] pt-10">
          <h4 className="m-0 mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Appendix · Tools on the bench
          </h4>
          <div className="grid gap-7 md:grid-cols-4">
            {stack.map((s) => (
              <div key={s.k} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--muted-2)]">
                  {s.k}
                </span>
                <span className="font-display text-[18px] text-[var(--ink)]">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
