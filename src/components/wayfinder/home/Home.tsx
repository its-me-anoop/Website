import { CtaBand } from "../layout/CtaBand";
import { Shell } from "../layout/Shell";
import { About } from "./About";
import { Compare } from "./Compare";
import { Directory } from "./Directory";
import { Hero } from "./Hero";
import { PackagesTeaser } from "./PackagesTeaser";
import { Route } from "./Route";
import { Statement } from "./Statement";
import { Work } from "./Work";

/**
 * Wayfinder homepage. It reads like a walk through a well-signed
 * building: the fingerpost at the door, the directory of sample sites,
 * the reason it matters, how the build differs, who does the work, what
 * has shipped, the route from first call to launch, the prices, and a
 * yellow board at the exit with the two ways to start.
 */
export function Home() {
  return (
    <Shell>
      <Hero />
      <Directory />
      <Statement />
      <Compare />
      <About />
      <Work />
      <Route />
      <PackagesTeaser />
      <CtaBand
        id="contact"
        title={
          <>
            Where does your website <mark className="wf-mark">send people?</mark>
          </>
        }
        copy="Find out in a few seconds with the free audit, or talk it through on a short call. A GP practice, a care home or a product idea: every conversation ends with a clear, written next step."
      />
    </Shell>
  );
}
