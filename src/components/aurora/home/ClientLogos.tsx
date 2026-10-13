import type { CSSProperties } from "react";
import { clients, type Client, type ClientLogo } from "@/lib/marketing/clients";
import { Container } from "../ui/primitives";

/**
 * The client strip under the hero. Every logo is drawn as a mask in
 * one warm ink, so marks that arrived in purple, blue or white sit
 * together, and each lights amber when hovered. Clients without a logo
 * file are set as a wordmark in the display face.
 */
export function ClientLogos() {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="fx-grid scroll-mt-24 border-t border-a-line bg-a-void py-[clamp(64px,7vw,104px)]"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
          <h2
            id="clients-title"
            className="fx-wt a-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.02] tracking-[-0.03em]"
            data-wf="H2 · Display 40 / 102"
          >
            Already <em>sorting</em> things for
          </h2>
          <p className="a-mono text-[11px] uppercase tracking-[0.12em] text-a-muted">
            Clients
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-2 border-l border-t border-a-line p-0 md:grid-cols-4">
          {clients.map((client) => (
            <li key={client.name} className="fx-rv border-b border-r border-a-line max-sm:odd:last:col-span-2">
              <ClientCell client={client} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const cellClass =
  "group flex h-full min-h-[128px] items-center justify-center gap-3 px-4 py-8 text-a-ink-soft transition-colors duration-300 hover:text-a-amber focus-visible:text-a-amber";

function ClientCell({ client }: { client: Client }) {
  const body = <ClientMark client={client} />;
  if (!client.href) return <div className={cellClass}>{body}</div>;
  return (
    <a href={client.href} target="_blank" rel="noopener noreferrer" data-cursor="Visit site" className={cellClass}>
      {body}
    </a>
  );
}

function ClientMark({ client }: { client: Client }) {
  if (!client.logo) {
    return (
      <span data-client-wordmark className="a-display text-[clamp(1.4rem,2.2vw,1.85rem)] leading-none tracking-[-0.04em]">
        {client.name}
      </span>
    );
  }
  return (
    <>
      <LogoMask name={client.name} logo={client.logo} />
      {client.logo.symbolOnly ? (
        <span aria-hidden="true" className="a-display text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.05] tracking-[-0.03em]">
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
    <span
      role="img"
      aria-label={name}
      data-client-logo={logo.src}
      className="block max-w-full shrink-0 bg-current"
      style={style}
    />
  );
}
