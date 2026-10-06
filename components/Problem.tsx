import { Coins, EyeOff, HandCoins, Smartphone } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const PROBLEMS = [
  {
    icon: Coins,
    title: "Lost money",
    body: "Pages get torn, wet, or lost, and the debts written on them go with them. Cash sales usually aren't written down at all.",
  },
  {
    icon: HandCoins,
    title: "Awkward collection",
    body: "Customers forget what they owe, and asking a neighbour for money face to face is uncomfortable, so it often doesn't happen.",
  },
  {
    icon: EyeOff,
    title: "No visibility",
    body: "Flipping through a notebook can't tell you how much is owed in total, who is late, or how the shop did this week.",
  },
  {
    icon: Smartphone,
    title: "Apps don't fit",
    body: "Accounting apps want forms, product codes, and formal Arabic or English. Shopkeepers think in quick notes, not data entry.",
  },
];

export default function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="problem-title"
          eyebrow="The problem"
          title="The daftar works, until it doesn't"
          subtitle="Most small shops in Egypt track customers who buy now and pay later in a paper notebook called a daftar. It's simple and familiar, and it leaks money."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="card relative h-full p-6">
                <span className="absolute right-5 top-4 font-hand text-3xl text-beige" aria-hidden>
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-apricot/25 text-ember-dark">
                  <p.icon size={24} aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
