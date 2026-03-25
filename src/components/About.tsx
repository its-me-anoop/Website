"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20 md:py-32">
        {/* Marquee */}
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap py-3 sm:py-4 opacity-[0.03] pointer-events-none select-none">
            <motion.div
                className="inline-block text-[16vw] sm:text-[12vw] font-display font-bold leading-none text-foreground"
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
                DESIGN DEVELOP SHIP DESIGN DEVELOP SHIP DESIGN DEVELOP SHIP
            </motion.div>
             <motion.div
                className="inline-block text-[16vw] sm:text-[12vw] font-display font-bold leading-none text-foreground"
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
                DESIGN DEVELOP SHIP DESIGN DEVELOP SHIP DESIGN DEVELOP SHIP
            </motion.div>
        </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-24">
             {/* Left: Image */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="relative"
            >
                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm group">
                     {/* Grayscale Filter Layer */}
                    <div className="absolute inset-0 bg-foreground mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out" />

                    <Image
                        src="/anoop-jose.jpg"
                        alt="Anoop Jose"
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />

                    {/* Overlay Text */}
                     <div className="absolute bottom-4 left-4 z-20 sm:bottom-6 sm:left-6">
                         <p className="mb-2 inline-block bg-black/50 px-3 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white backdrop-blur-md">Lead Developer</p>
                         <h3 className="text-white font-display text-xl sm:text-2xl font-bold">Anoop Jose</h3>
                     </div>
                </div>

                {/* Decorative Elements */}
                 <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-accent opacity-50" />
                 <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-accent opacity-50" />
            </motion.div>


            {/* Right: Content */}
            <div className="flex h-full flex-col justify-center pt-2 sm:pt-4 lg:pt-0">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                >
                     <span className="mb-4 sm:mb-6 block text-xs font-mono text-accent uppercase tracking-widest">[03] The Studio</span>
                    <h2 className="mb-6 sm:mb-8 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.05] sm:leading-[1.1]">
                        Bridging the gap between <span className="text-foreground-tertiary decoration-wavy underline decoration-accent/50 underline-offset-4">design</span> and <span className="text-foreground-tertiary decoration-wavy underline decoration-accent/50 underline-offset-4">engineering</span>.
                    </h2>
                </motion.div>

                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    className="space-y-5 sm:space-y-6 text-base sm:text-lg text-foreground-secondary leading-relaxed"
                >
                    <p>
                        Flutterly isn&apos;t just a dev shop. We are a creative technology partner. We understand that in today&apos;s digital landscape, the quality of execution is just as important as the idea itself.
                    </p>
                    <p>
                        Founded by Anoop Jose, a software engineer with a passion for pixel-perfect interfaces, we specialize in building products that feel tangible, responsive, and alive.
                    </p>
                </motion.div>

                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease }}
                    className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
                >
                     {socials.map((social) => (
                         <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 sm:px-5 sm:py-3 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group"
                         >
                             <social.icon size={18} />
                             <span className="text-sm font-medium">{social.label}</span>
                             <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                         </Link>
                     ))}
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
