import { AudioLines, BellRing, FileSpreadsheet, Mic, ReceiptText, Users } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { EXAMPLE_ENTRY, EXAMPLE_VOICE } from "@/lib/examples";

const FEATURES = [
  {
    icon: ReceiptText,
    title: "Every sale tracked",
    body: "Cash sales, things taken on credit, and payments all live in one place, so the day's picture is complete.",
  },
  {
    icon: Users,
    title: "Customer profiles",
    body: "Entries link to the right person automatically, whether they're written as \"3am Ahmed\", \"Ahmed\", or عم أحمد.",
  },
  {
    icon: FileSpreadsheet,
    title: "Organized Excel",
    body: "Everything is saved into a clean spreadsheet you can open, print, or share. No lock-in, no special software.",
  },
  {
    icon: BellRing,
    title: "WhatsApp reminders",
    body: "Polite reminders in Egyptian Arabic go out when a payment is due, so the shopkeeper doesn't have to chase anyone.",
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="features-title" eyebrow="Features" title="Everything the notebook does, minus the leaks" />

        <Reveal className="mt-14">
          <VoiceFeature />
        </Reveal>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={i * 0.08} className="card group flex h-full gap-5 p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-apricot transition group-hover:rotate-[-4deg]">
                  <f.icon size={26} aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The headline feature: speak the entry in Arabic instead of typing it. */
function VoiceFeature() {
  return (
    <article className="relative grid gap-8 overflow-hidden rounded-3xl bg-navy p-7 text-paper shadow-lift sm:p-9 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-apricot px-3 py-1 text-xs font-bold text-navy">
          <Mic size={13} aria-hidden /> Main way to add an entry
        </span>
        <h3 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">Just say it in Arabic</h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-paper/80">
          Busy behind the counter? Tap the mic and say what happened, the way you&apos;d tell a neighbour. Daftar
          writes it into the notebook for you: the right customer, the items, and when they&apos;ll pay. No typing, no
          spelling.
        </p>
      </div>

      <div className="space-y-3" aria-label="Example: a spoken entry turned into a daftar entry">
        <div className="flex items-start gap-3 rounded-2xl rounded-tr-sm bg-wa px-4 py-3 text-navy">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
            <AudioLines size={18} aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-green-900">Spoken</p>
            <p lang="ar" dir="rtl" className="font-heading text-lg leading-relaxed">
              {EXAMPLE_VOICE}
            </p>
          </div>
        </div>
        <p className="pl-4 font-hand text-2xl text-apricot" aria-hidden>
          ↓ written into the daftar
        </p>
        <div className="ruled rounded-2xl border border-beige px-4 py-2 pl-12 text-navy">
          <p className="font-hand text-[1.55rem] leading-[2.25rem]">{EXAMPLE_ENTRY}</p>
          <p className="pb-1 text-sm text-muted">Uncle Ahmed · 2 kilo cheese · unpaid · due next Monday</p>
        </div>
      </div>
    </article>
  );
}
