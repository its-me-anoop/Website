import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SignArrow } from "../ui/Arrow";
import { Container, Heading, Kicker, type HeadingSize } from "../ui/Type";

/**
 * Opening band for inner pages: the kicker, a heavy h1, supporting copy
 * and the page's actions on the left. On the right, whatever the page
 * passes as `aside`, or by default a large yellow plate with an arrow
 * pointing down into the page, the site's "this way" mark.
 */
export function PageHero({
  kicker,
  title,
  copy,
  children,
  size = "xl",
  aside,
  after,
  className,
}: {
  kicker: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  size?: HeadingSize;
  /** Right-hand column on wide screens; `false` for a single column. */
  aside?: ReactNode | false;
  /** Full-width content under the hero (e.g. a screenshot). */
  after?: ReactNode;
  className?: string;
}) {
  const side = aside === undefined ? <DefaultAside /> : aside;
  return (
    <section id="top" className={cn("border-b-2 border-wf-ink", className)}>
      <Container
        className={cn(
          "grid gap-12 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:gap-12",
          side ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end" : ""
        )}
      >
        <div className="min-w-0">
          <Kicker className="wf-settle">{kicker}</Kicker>
          <Heading as="h1" size={size} className="wf-settle mt-7 max-w-[18ch]">
            {title}
          </Heading>
          {copy ? (
            <div
              className="wf-settle wf-lead mt-7 max-w-[60ch] text-[18px] leading-[1.6] sm:text-[20px]"
              style={{ ["--d" as string]: "80ms" }}
            >
              {copy}
            </div>
          ) : null}
          {children ? (
            <div className="wf-settle mt-9" style={{ ["--d" as string]: "140ms" }}>
              {children}
            </div>
          ) : null}
        </div>
        {side ? <div className="min-w-0">{side}</div> : null}
      </Container>
      {after}
    </section>
  );
}

function DefaultAside() {
  return (
    <div aria-hidden="true" className="hidden justify-end lg:flex">
      <div className="flex aspect-square w-full max-w-[300px] items-center justify-center rounded-[14px] bg-wf-sign text-wf-ink">
        <SignArrow dir="down-right" size={200} />
      </div>
    </div>
  );
}
