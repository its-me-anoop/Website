import type { Metadata } from "next";
import {
  CareHeading,
  CarePageHero,
  CareSection,
} from "@/components/demos/care/CareShell";

export const metadata: Metadata = { title: "Life at Oakfield" };

const week = [
  ["Monday", "Gentle exercise with Maria, then the flower club in the garden room"],
  ["Tuesday", "Minibus outing — the river in summer, garden centres when it's cold"],
  ["Wednesday", "Baking morning; the smell reaches every corner of the house"],
  ["Thursday", "Visiting musician and afternoon singalong in the lounge"],
  ["Friday", "Fish and chips, films and family visits into the evening"],
  ["Weekend", "Slower mornings, roast lunch, papers and long phone calls home"],
] as const;

const rooms = [
  {
    title: "Your own room, your own things",
    copy: "All 34 rooms are en-suite, and each one is decorated around the person who lives there — their pictures, their chair, their bedspread. We move furniture, not people, until it feels right.",
  },
  {
    title: "Shared spaces that feel lived-in",
    copy: "Two lounges (one lively, one quiet), a garden room, a hair salon and a proper dining room. Nowhere in the house is out of bounds to residents.",
  },
  {
    title: "The garden",
    copy: "Level paths, raised beds at wheelchair height, a greenhouse, and a bird table outside the lounge window that gets more attention than the television.",
  },
] as const;

export default function LifePage() {
  return (
    <>
      <CarePageHero
        eyebrow="Life at Oakfield"
        title="What a week here actually looks like"
        lede="An honest picture, not a brochure — because the best way to judge a home is by its ordinary days, not its open days."
      />

      <CareSection>
        <CareHeading eyebrow="The rhythm of the week">
          Always something on, never anything compulsory
        </CareHeading>
        <table className="mt-7 w-full max-w-[760px] border-collapse text-[15px]">
          <caption className="sr-only">
            A typical week of activities at Oakfield House
          </caption>
          <tbody>
            {week.map(([day, activity]) => (
              <tr key={day} className="border-b border-[var(--dch-line)]">
                <th scope="row" className="w-[120px] py-3.5 pr-4 text-left align-top font-bold text-[var(--dch-terra)]">
                  {day}
                </th>
                <td className="py-3.5 leading-relaxed text-[var(--dch-soft)]">{activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
          Residents plan the month&rsquo;s calendar together over coffee on the
          first Monday — and anyone who would rather sit it out with a book is
          left happily in peace.
        </p>
      </CareSection>

      <div className="bg-[var(--dch-surface)]">
        <CareSection>
          <CareHeading eyebrow="The house and garden">
            Rooms that belong to their residents
          </CareHeading>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room.title}
                className="rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-canvas)] p-6"
              >
                <h3 className="dch-display text-[18px] font-bold text-[var(--dch-ink)]">
                  {room.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
                  {room.copy}
                </p>
              </article>
            ))}
          </div>
        </CareSection>
      </div>

      <CareSection>
        <CareHeading eyebrow="Food">Cooked here, eaten together</CareHeading>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <p className="max-w-[520px] text-[15.5px] leading-relaxed text-[var(--dch-soft)]">
            Everything is cooked in Oakfield&rsquo;s own kitchen, and menus are
            planned with residents each month. Soft and fortified diets are
            prepared with the same care as everything else — the same meal,
            plated properly, never a lesser version of lunch.
          </p>
          <p className="max-w-[520px] text-[15.5px] leading-relaxed text-[var(--dch-soft)]">
            Families are welcome at mealtimes once a new resident has had their
            first fortnight to settle. After that, Sunday lunch together costs
            nothing and needs no notice — just tell the kitchen when you
            arrive, and leave room for pudding.
          </p>
        </div>
      </CareSection>
    </>
  );
}
