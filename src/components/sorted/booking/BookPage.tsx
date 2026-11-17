import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { Shell } from "../layout/Shell";
import { CalEmbed } from "./CalEmbed";
import "../conversion.css";

export function BookPage() {
  return (
    <Shell>
      <section className="cv-intake" aria-labelledby="booking-title">
        <div className="cv-width cv-intake-grid">
          <div>
            <p className="cv-label">Studio enquiries</p>
            <h1 id="booking-title" className="cv-title">Book a short discovery call.</h1>
            <p className="cv-lead">Tell me what you have in mind for a website, an app, IT support, social media or search. We’ll work out where to start.</p>
            <a href="#calendar" className="cv-book-jump">Choose a time <ArrowDownRight size={18} aria-hidden /></a>
          </div>
          <div className="cv-host">
            <Image src="/anoop-jose.jpg" alt="" width={112} height={140} className="cv-host-photo" />
            <div>
              <p className="cv-label">Your host</p>
              <p className="cv-host-name">{site.founder}</p>
              <p>Founder, Flutterly</p>
              <p className="cv-host-format">Free · {site.booking.durationMinutes}-minute video call</p>
            </div>
          </div>
        </div>
      </section>
      <section className="cv-width cv-section cv-book-grid" id="calendar" aria-labelledby="calendar-title">
        <div>
          <p className="cv-label">Availability</p>
          <h2 id="calendar-title" className="cv-heading">Choose a time.</h2>
          <p className="cv-body">Pick a slot in the calendar and a video link will arrive by email.</p>
          <h3 className="cv-agenda-title">On the call</h3>
          <ul className="cv-agenda">
            <li>What you want to improve or build</li>
            <li>What’s getting in the way today</li>
            <li>The scope, budget and next steps</li>
          </ul>
        </div>
        <div className="min-w-0">
          <CalEmbed />
          <p className="cv-calendar-email">No suitable time? Email <a href={`mailto:${site.email}`}>{site.email}</a>. You’ll hear back within one working day.</p>
        </div>
      </section>
      <div id="contact" className="cv-secondary">
        <div className="cv-width cv-endnote"><span>Prefer an instant report on your website?</span>
          <Link href="/free-audit" className="cv-inline-link">Get a free audit <ArrowUpRight size={16} aria-hidden /></Link>
        </div>
      </div>
    </Shell>
  );
}
