"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Product = {
  name: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  href: string;
  cta: string;
};

const products: Product[] = [
  {
    name: "Sipli",
    eyebrow: "Health and habit",
    title: "Hydration, made effortless.",
    body: "An iPhone, iPad, and Apple Watch experience with adaptive goals, one-tap logging, and coaching that feels quiet by design.",
    image: "/projects/sipli/iphone_and_ipad.png",
    href: "/projects/sipli",
    cta: "View Sipli",
  },
  {
    name: "Artling",
    eyebrow: "Family archive",
    title: "A home for every tiny masterpiece.",
    body: "A warm mobile archive for children's artwork, designed around capture, memory, and simple sharing without turning the product noisy.",
    image: "/projects/artling/fox-painter.png",
    href: "/projects/artling",
    cta: "View Artling",
  },
  {
    name: "Product systems",
    eyebrow: "Web and operations",
    title: "Sharper tools for teams that move fast.",
    body: "From commerce to booking flows and internal dashboards, Flutterly makes complex work feel direct, readable, and calm.",
    image: "/project-sandbourne.png",
    href: "#brief",
    cta: "Start yours",
  },
];

const tiles = [
  {
    title: "Native where it matters.",
    body: "SwiftUI, Flutter, and React used with the same care for motion, performance, and handoff.",
    image: "/images/sipli/iphone/04-insights-1320x2868.png",
  },
  {
    title: "Designed in the product.",
    body: "Interfaces are tuned in real code so spacing, transitions, and edge cases are felt early.",
    image: "/abstract-jjpaper.png",
  },
];

export function FeaturedWork() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = products[selectedIndex];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-background px-5 py-20 text-foreground sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xl font-semibold text-foreground-secondary">
            Selected work
          </p>
          <h2
            id="work-heading"
            className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl"
          >
            Built to look simple. Engineered not to be.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-foreground-secondary">
            Every product gets a clear hierarchy, a native-feeling interface,
            and production code that can keep moving after launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mx-auto mt-10 flex w-full max-w-xl rounded-full bg-[#e8e8ed] p-1"
          aria-label="Featured work selector"
        >
          {products.map((product, index) => (
            <button
              key={product.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative min-h-10 flex-1 rounded-full px-4 text-sm font-medium transition duration-200 ${
                selectedIndex === index
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
              aria-pressed={selectedIndex === index}
            >
              {product.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.14, ease }}
          className="mt-10 overflow-hidden rounded-[8px] bg-background-secondary"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.36, ease }}
              className="grid min-h-[620px] items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-16"
            >
              <div className="text-center lg:text-left">
                <p className="text-lg font-semibold text-foreground-secondary">
                  {selected.eyebrow}
                </p>
                <h3 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                  {selected.title}
                </h3>
                <p className="mt-5 text-lg leading-8 text-foreground-secondary">
                  {selected.body}
                </p>
                <Link
                  href={selected.href}
                  className="group mt-7 inline-flex items-center gap-1 text-lg font-medium text-accent transition duration-200 hover:text-accent-hover"
                >
                  {selected.cta}
                  <ArrowRight
                    size={19}
                    className="transition duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
              <div className="relative min-h-[330px] sm:min-h-[460px]">
                <Image
                  src={selected.image}
                  alt={`${selected.name} product preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-contain drop-shadow-[0_36px_80px_rgba(0,0,0,0.18)]"
                  priority={selectedIndex === 0}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {tiles.map((tile, index) => (
            <motion.article
              key={tile.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease }}
              className="grid min-h-[420px] overflow-hidden rounded-[8px] bg-background-secondary p-8 sm:p-10"
            >
              <div>
                <h3 className="max-w-md text-3xl font-semibold leading-tight sm:text-4xl">
                  {tile.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-8 text-foreground-secondary">
                  {tile.body}
                </p>
              </div>
              <div className="relative mt-8 min-h-[220px]">
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-contain"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
