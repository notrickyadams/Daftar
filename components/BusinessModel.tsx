import { Check, Crown } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const PLANS = [
  {
    name: "Free",
    price: "Free forever",
    pitch: "Everything a shop needs to replace the paper notebook.",
    features: [
      "Say or write entries in Egyptian Arabic or Franco",
      "AI-organized ledger of every sale",
      "Customer profiles",
      "Manual WhatsApp reminders",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "Low monthly fee",
    pitch: "For shops that want collection on autopilot.",
    features: [
      "Everything in Free",
      "Automatic reminders on the due date",
      "Excel export and weekly summaries",
      "Insights on who owes what and who's late",
    ],
    highlight: true,
  },
];

export default function BusinessModel() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="pricing-title"
          eyebrow="Business model"
          title="Free to start, small fee to grow"
          subtitle="A freemium model: the core notebook is free so any shop can switch, and Premium adds automation for a low monthly fee."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <article
                className={`relative h-full rounded-3xl border p-7 ${
                  p.highlight ? "border-navy bg-navy text-paper shadow-lift" : "border-beige bg-card text-navy shadow-paper"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-apricot px-3 py-1 text-xs font-bold text-navy">
                    <Crown size={13} aria-hidden /> Premium
                  </span>
                )}
                <h3 className="font-heading text-2xl font-bold">{p.name}</h3>
                <p className={`mt-1 font-hand text-3xl ${p.highlight ? "text-apricot" : "text-ember-dark"}`}>{p.price}</p>
                <p className={`mt-3 ${p.highlight ? "text-paper/80" : "text-muted"}`}>{p.pitch}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          p.highlight ? "bg-apricot text-navy" : "bg-wa text-green-900"
                        }`}
                      >
                        <Check size={13} strokeWidth={3} aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
