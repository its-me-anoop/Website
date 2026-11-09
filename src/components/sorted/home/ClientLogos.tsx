"use client";

import type { CSSProperties } from "react";
import { clients, type Client, type ClientLogo } from "@/lib/marketing/clients";
import { Reveal } from "../effects/Motion";
import { Container, Eyebrow } from "../ui/primitives";

/**
 * The clients, filed in a tray of white tiles that tip up one after
 * another as the row scrolls in. Every logo is drawn as a mask in navy,
 * so marks that arrived in purple, blue or white sit together, and a
 * linked tile turns cobalt under the pointer. Clients without a logo
 * file are set as a wordmark in the display face.
 */
export function ClientLogos() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="tone-chalk scroll-mt-20 border-b-2 border-s-navy py-[clamp(56px,6vw,88px)]">
      <Container className="flex flex-col gap-9">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
          <h2 id="clients-title" className="s-display text-[clamp(1.7rem,3vw,2.5rem)]">
            Already <em>sorting</em> things for
          </h2>
          <Eyebrow>Clients</Eyebrow>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
          {clients.map((client, i) => (
            <Reveal as="li" key={client.name} turn={70} delay={(i % 4) * 0.07} className="max-sm:odd:last:col-span-2">
              <ClientCell client={client} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const cellClass =
  "group flex h-full min-h-[124px] flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-[10px] border-[1.5px] border-s-line-2 bg-white px-4 py-7 text-s-navy";

function ClientCell({ client }: { client: Client }) {
  const body = <ClientMark client={client} />;
  if (!client.href) return <div className={cellClass}>{body}</div>;
  return (
    <a
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cellClass} transition-[background-color,color,transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-s-navy hover:bg-s-cobalt hover:text-white hover:shadow-[0_5px_0_0_var(--s-navy)]`}
    >
      {body}
    </a>
  );
}

function ClientMark({ client }: { client: Client }) {
  if (!client.logo) {
    return (
      <span data-client-wordmark className="s-display text-center text-[clamp(1.25rem,2vw,1.7rem)]">
        {client.name}
      </span>
    );
  }
  return (
    <>
      <LogoMask name={client.name} logo={client.logo} />
      {client.logo.symbolOnly ? (
        <span aria-hidden="true" className="s-display text-center text-[clamp(1rem,1.5vw,1.3rem)] [--lh:1.05]">
          {client.name}
        </span>
      ) : null}
    </>
  );
}

function LogoMask({ name, logo }: { name: string; logo: ClientLogo }) {
  const mask = `url("${logo.src}") center / contain no-repeat`;
  const style: CSSProperties = {
    height: logo.displayHeight,
    aspectRatio: `${logo.width} / ${logo.height}`,
    WebkitMask: mask,
    mask,
  };
  return (
    <span role="img" aria-label={name} data-client-logo={logo.src} className="block max-w-full shrink-0 bg-current" style={style} />
  );
}
