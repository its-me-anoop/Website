"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "90px"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      ref={sectionRef}
      className="apple-hero-glow relative isolate overflow-hidden px-5 pt-24 text-center text-foreground sm:px-8 md:pt-28"
      aria-label="Flutterly product studio"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[96svh] max-w-[1180px] flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-lg font-semibold text-foreground-secondary md:text-xl"
        >
          Flutterly
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-3 max-w-5xl text-5xl font-semibold leading-none text-foreground sm:text-7xl md:text-8xl"
        >
          Apps that feel instantly familiar.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-3xl text-xl leading-8 text-foreground-secondary md:text-2xl md:leading-9"
        >
          We design and build polished web and mobile products with the clarity,
          speed, and restraint people expect from the software they keep using.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#brief"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-base font-medium text-white transition duration-200 hover:bg-accent-hover"
          >
            Start a project
          </Link>
          <Link
            href="#work"
            className="group inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-base font-medium text-accent transition duration-200 hover:text-accent-hover"
          >
            See the work
            <ArrowRight
              size={18}
              className="transition duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>

        <motion.div
          style={{ y: imageY, scale: imageScale }}
          variants={fadeUp}
          className="relative mt-12 w-full flex-1 md:mt-16"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-muted blur-3xl sm:h-[420px] sm:w-[420px]"
          />
          <div className="relative mx-auto h-[390px] w-full max-w-[960px] sm:h-[560px] md:h-[640px]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="absolute left-1/2 top-0 w-[78%] max-w-[720px] -translate-x-1/2"
            >
              <Image
                src="/projects/sipli/iphone_and_ipad.png"
                alt="Sipli shown across iPhone and iPad"
                width={1400}
                height={980}
                className="h-auto w-full drop-shadow-[0_36px_80px_rgba(0,0,0,0.22)]"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.38, ease }}
              className="absolute bottom-0 left-4 w-[30%] max-w-[230px] sm:left-16"
            >
              <Image
                src="/images/sipli/iphone/02-coach-1320x2868.png"
                alt="Sipli hydration coaching screen"
                width={560}
                height={1216}
                className="h-auto w-full rounded-[8px] drop-shadow-[0_28px_60px_rgba(0,0,0,0.24)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.48, ease }}
              className="absolute bottom-8 right-3 w-[29%] max-w-[220px] sm:right-20"
            >
              <Image
                src="/projects/artling/fox-painter.png"
                alt="Artling app artwork preview"
                width={520}
                height={650}
                className="h-auto w-full rounded-[8px] drop-shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="#work"
          className="absolute bottom-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/70 text-foreground-secondary backdrop-blur-xl transition duration-200 hover:text-foreground"
          aria-label="Scroll to work"
        >
          <ChevronDown size={20} aria-hidden />
        </motion.a>
      </motion.div>
    </section>
  );
}
