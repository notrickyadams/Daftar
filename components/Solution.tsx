import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const NOTES = ["3am Ahmed 5ad 2 kilo gebna hydf3 el etnen el gy", "Ba3t 3 pepsi w 2 chipsy", "Ahmed dafa3 100"];

const ROWS = [
  { who: "Uncle Ahmed", what: "2 kilo cheese", type: "Unpaid", due: "Mon", tone: "bg-apricot/30 text-ember-dark" },
  { who: "Walk-in", what: "3 Pepsi, 2 Chipsy", type: "Cash sale", due: "—", tone: "bg-wa text-green-900" },
  { who: "Uncle Ahmed", what: "100 EGP", type: "Payment", due: "—", tone: "bg-navy/10 text-navy" },
];

export default function Solution() {
  return (
    <section aria-labelledby="solution-title" className="bg-navy py-20 text-paper sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="solution-title"
          invert
          eyebrow="The solution"
          title={
            <>
              Write it like the daftar.
              <br className="hidden sm:block" /> <span className="text-apricot">AI does the rest.</span>
            </>
          }
          subtitle="No forms, no product codes, no new habits. The shopkeeper says it out loud in Arabic or types a quick note, and Daftar turns it into a clean, searchable record."
        />

        <div className="mt-14 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1.15fr]">
          <Reveal>
            <div className="ruled relative rounded-2xl border border-beige p-5 pl-14 text-navy shadow-lift">
              <span className="tape -top-3 right-10" aria-hidden />
              <p className="text-xs font-bold uppercase tracking-wider text-muted">What they write</p>
              <ul className="mt-1">
                {NOTES.map((n) => (
                  <li key={n} className="font-hand text-[1.6rem] leading-[2.25rem]">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center">
            <span className="flex h-14 w-14 rotate-90 items-center justify-center rounded-full bg-apricot text-navy lg:rotate-0">
              <ArrowRight size={26} aria-hidden />
            </span>
            <span className="sr-only">becomes</span>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-2xl border border-beige bg-card text-navy shadow-lift">
              <p className="flex items-center gap-2 border-b border-beige px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">
                <Sparkles size={14} className="text-ember" aria-hidden /> What Daftar saves
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] sm:text-sm">
                  <thead className="bg-paper text-muted">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold sm:px-4">Customer</th>
                      <th scope="col" className="px-3 py-2 font-semibold sm:px-4">Item</th>
                      <th scope="col" className="px-3 py-2 font-semibold sm:px-4">Type</th>
                      <th scope="col" className="px-3 py-2 font-semibold sm:px-4">Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r, i) => (
                      <tr key={i} className="border-t border-beige">
                        <td className="px-3 py-3 sm:px-4 font-semibold">{r.who}</td>
                        <td className="px-3 py-3 sm:px-4">{r.what}</td>
                        <td className="px-3 py-3 sm:px-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${r.tone}`}>{r.type}</span>
                        </td>
                        <td className="px-3 py-3 sm:px-4">{r.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
