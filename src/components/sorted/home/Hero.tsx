"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowDownRight, CirclePause, CirclePlay, MapPin } from "lucide-react";
import { useMotionAllowed } from "../effects/hooks";
import "./studio-hero.css";

export function Hero() {
  const allowsMotion = useMotionAllowed();
  const [paused, setPaused] = useState(false);

  return (
    <section id="top" className="studio-hero" aria-labelledby="hero-title" data-motion={allowsMotion && !paused ? "on" : "off"}>
      <div className="studio-hero-art">
        <Image src="/studio/tidal-wing.webp" alt="" fill preload sizes="100vw" />
      </div>
      <div className="studio-hero-inner">
        <div className="studio-hero-copy">
          <p className="studio-hero-kicker"><span aria-hidden="true" /> Independent digital studio</p>
          <h1 id="hero-title">Digital by <em>nature.</em></h1>
          <p className="studio-hero-deck">I’m Anoop, a designer and developer in Reading. I build websites and apps, and look after them once they’re live.</p>
          <div className="studio-hero-actions">
            <Link className="studio-hero-primary" href="#work">Explore the work <ArrowDownRight size={17} aria-hidden="true" /></Link>
            <Link className="studio-hero-secondary" href="/book">Book a call</Link>
          </div>
        </div>
        <div className="studio-hero-colophon">
          <a href="#work" className="studio-scroll"><ArrowDown size={16} aria-hidden="true" /> Scroll to explore</a>
          <span className="studio-hero-location"><MapPin size={13} aria-hidden="true" /> Reading, UK</span>
          <div className="studio-hero-credit">
            <span>Studio study <i>/</i> Tidal wing</span>
            {allowsMotion && <button type="button" aria-label={paused ? "Play artwork motion" : "Pause artwork motion"} onClick={() => setPaused(value => !value)}>
              {paused ? <CirclePlay size={21} strokeWidth={1.3} /> : <CirclePause size={21} strokeWidth={1.3} />}
            </button>}
          </div>
        </div>
      </div>
    </section>
  );
}
