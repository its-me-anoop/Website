import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const FACTS = [
  { label: "Founded", value: "2024" },
  { label: "Based", value: "Reading, UK" },
  { label: "Team", value: "1 + collaborators" },
  { label: "Reply", value: "<48 hours" },
];

const SOCIALS = [
  { href: site.social.github, label: "GitHub", icon: Github },
  { href: site.social.linkedin, label: "LinkedIn", icon: Linkedin },
];

export function About() {
  return (
    <section
      id="about"
      className="relative z-[1] px-6 pb-[60px] pt-[150px] md:px-12"
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-11 lg:grid-cols-[1.1fr_.9fr] lg:gap-[88px]">
        <div>
          <Reveal className="mb-5 font-jb text-[11px] uppercase tracking-[0.3em] text-iris">
            <span className="text-frost/40">06 /</span> About
          </Reveal>
          <Reveal delay={80}>
            <h2 className="m-0 font-syne text-[clamp(34px,4.6vw,68px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-frost">
              Deliberately
              <br />
              <span className="text-outline">small.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mb-0 mt-7 max-w-[480px] text-[17px] leading-[1.7] text-frost/65">
              Flutterly was founded in 2024, after a decade of shipping inside
              bigger teams. It stays a studio of one on purpose — a few
              engagements a year, so the same person writes the code, draws
              the pixels, and answers the email. Usually in that order.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mb-0 mt-[18px] max-w-[480px] text-[17px] leading-[1.7] text-frost/65">
              The best fit: founders with a v1 to sketch, and teams whose
              product needs a second wind.
            </p>
          </Reveal>

          <Reveal delay={320} className="mt-11 border-t border-white/10">
            {FACTS.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-white/[.08] py-4"
              >
                <span className="font-jb text-[11px] uppercase tracking-[0.22em] text-frost/[.42]">
                  {label}
                </span>
                <span className="font-grotesk text-[17px] font-bold text-frost">
                  {value}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal kind="right" delay={160}>
          <div className="-rotate-2 rounded-[30px] border border-white/[.12] bg-[rgba(11,14,22,.6)] p-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,.09),0_40px_90px_rgba(0,0,0,.5)] backdrop-blur-[24px] transition-transform duration-500 ease-[cubic-bezier(.22,1.1,.36,1)] hover:rotate-0">
            <div className="relative h-[440px] w-full overflow-hidden rounded-[18px]">
              <Image
                src="/anoop-jose.jpg"
                alt="Anoop Jose — founder and lead engineer of Flutterly"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-2.5 pb-2 pt-[18px]">
              <div>
                <div className="font-syne text-[19px] font-bold text-frost">
                  Anoop Jose
                </div>
                <div className="mt-1 font-jb text-[10px] uppercase tracking-[0.2em] text-frost/45">
                  Founder · Lead engineer
                </div>
              </div>
              <div className="flex gap-2.5">
                {SOCIALS.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[.15] text-frost/70 transition-[transform,color,border-color] duration-[250ms] ease-[cubic-bezier(.3,1.4,.45,.9)] hover:scale-[1.12] hover:border-mint/50 hover:text-frost"
                  >
                    <Icon size={17} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
