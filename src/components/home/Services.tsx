import {
  Component,
  Globe,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

type Service = {
  index: string;
  title: string;
  description: string;
  stack: string;
  icon: LucideIcon;
  accent: string;
  accentRgb: string;
  hoverBorder: string;
  delay: number;
};

const SERVICES: Service[] = [
  {
    index: "S—01",
    title: "Web applications",
    description:
      "Server components, edge rendering, type-safe end to end — tuned until Lighthouse runs out of points to give.",
    stack: "NEXT.JS / REACT / TYPESCRIPT / TAILWIND",
    icon: Globe,
    accent: "#8B7CFF",
    accentRgb: "139,124,255",
    hoverBorder: "hover:border-iris/45",
    delay: 0,
  },
  {
    index: "S—02",
    title: "Mobile apps",
    description:
      "SwiftUI when it should feel native. Flutter or React Native when one codebase has to do two jobs. App Store-ready either way.",
    stack: "SWIFTUI / FLUTTER / REACT NATIVE",
    icon: Smartphone,
    accent: "#3DF2C4",
    accentRgb: "61,242,196",
    hoverBorder: "hover:border-mint/45",
    delay: 100,
  },
  {
    index: "S—03",
    title: "Backend & APIs",
    description:
      "Type-safe APIs, real-time sync, auth and infra — wired so the product just works, from schema to screen.",
    stack: "NODE / POSTGRES / GRAPHQL / AWS",
    icon: Server,
    accent: "#FFB45C",
    accentRgb: "255,180,92",
    hoverBorder: "hover:border-amber/45",
    delay: 0,
  },
  {
    index: "S—04",
    title: "Design systems",
    description:
      "Figma and code, kept honest with each other. Tokens, components, and a library your engineers will actually use.",
    stack: "FIGMA / TOKENS / STORYBOOK",
    icon: Component,
    accent: "#FF6FCB",
    accentRgb: "255,111,203",
    hoverBorder: "hover:border-candy/45",
    delay: 100,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative z-[1] px-6 pb-[60px] pt-[150px] md:px-12"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-5 font-jb text-[11px] uppercase tracking-[0.3em] text-iris">
          <span className="text-frost/40">02 /</span> Services
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-[72px] mt-0 font-syne text-[clamp(34px,5.6vw,84px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-frost">
            Four disciplines,
            <br />
            <span className="text-outline">one engineer.</span>
          </h2>
        </Reveal>

        <div className="grid gap-[22px] md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.index} delay={service.delay}>
                <TiltCard
                  className={`rounded-[28px] border border-white/10 bg-[rgba(11,14,22,.6)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-[24px] transition-[border-color] duration-300 sm:p-12 ${service.hoverBorder}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-[18px]"
                      style={{
                        background: `rgba(${service.accentRgb},.11)`,
                        border: `1px solid rgba(${service.accentRgb},.3)`,
                      }}
                    >
                      <Icon
                        size={24}
                        style={{ color: service.accent }}
                        aria-hidden
                      />
                    </div>
                    <span className="font-jb text-xs tracking-[0.2em] text-frost/30">
                      {service.index}
                    </span>
                  </div>
                  <h3 className="mb-0 mt-[30px] font-syne text-[28px] font-bold tracking-[-0.01em] text-frost">
                    {service.title}
                  </h3>
                  <p className="mb-0 mt-3.5 text-[15px] leading-[1.65] text-frost/60">
                    {service.description}
                  </p>
                  <div
                    className="mt-[26px] font-jb text-[11px] tracking-[0.14em]"
                    style={{ color: service.accent }}
                  >
                    {service.stack}
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
