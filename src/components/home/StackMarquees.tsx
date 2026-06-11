import { Reveal } from "./Reveal";

const ROW_1 = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "FRAMER MOTION",
  "SWIFTUI",
  "FLUTTER",
  "REACT NATIVE",
  "NODE.JS",
];

const ROW_2 = [
  "POSTGRES",
  "GRAPHQL",
  "SUPABASE",
  "AWS",
  "VERCEL",
  "FIGMA",
  "STORYBOOK",
  "STRIPE",
  "SENTRY",
];

function ChipRow({ tools }: { tools: string[] }) {
  return (
    <div className="flex gap-4 pr-4">
      {tools.map((tool) => (
        <span
          key={tool}
          className="whitespace-nowrap rounded-full border border-white/10 bg-white/[.04] px-7 py-3.5 font-jb text-sm tracking-[0.08em] text-frost/[.78] shadow-[inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-[10px]"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

/** Two glass-chip marquees drifting in opposite directions. */
export function StackMarquees() {
  return (
    <section id="stack" className="relative z-[1] pb-[60px] pt-[150px]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <Reveal className="mb-5 font-jb text-[11px] uppercase tracking-[0.3em] text-amber">
          <span className="text-frost/40">04 /</span> The bench
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-16 mt-0 font-syne text-[clamp(30px,4.6vw,68px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-frost">
            Boring where it counts,
            <br />
            <span className="text-outline">modern where it pays.</span>
          </h2>
        </Reveal>
      </div>
      <Reveal delay={120} className="flex flex-col gap-[18px] overflow-hidden">
        <div className="flex w-max [animation:au-marquee_32s_linear_infinite]">
          <ChipRow tools={ROW_1} />
          <div aria-hidden>
            <ChipRow tools={ROW_1} />
          </div>
        </div>
        <div className="flex w-max [animation:au-marquee-rev_36s_linear_infinite]">
          <ChipRow tools={ROW_2} />
          <div aria-hidden>
            <ChipRow tools={ROW_2} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
