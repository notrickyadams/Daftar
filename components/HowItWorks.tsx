import { AudioLines, BellRing, Brain, Mic, PenLine } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { EXAMPLE_ENTRY, EXAMPLE_REMINDER, EXAMPLE_VOICE } from "@/lib/examples";

const CHIPS: [string, string][] = [
  ["Customer", "Uncle Ahmed"],
  ["Item", "Cheese"],
  ["Qty", "2 kilo"],
  ["Type", "Unpaid"],
  ["Due", "Next Monday"],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="Say or write → Understand → Remind"
          subtitle="Follow one real entry all the way through, spoken or typed."
        />

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          <Step n={1} icon={<Mic size={22} aria-hidden />} title="Say or write" body="Say it out loud in Egyptian Arabic, or type it like the notebook in Arabic or Franco. Spelling doesn't matter.">
            <p lang="ar" dir="rtl" className="flex items-start gap-2 rounded-2xl rounded-tr-sm bg-wa px-4 py-2.5 font-heading leading-relaxed text-navy">
              <AudioLines size={18} className="mt-1 shrink-0 text-green-800" aria-hidden />
              {EXAMPLE_VOICE}
            </p>
            <p className="my-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
              <PenLine size={13} aria-hidden /> or written
            </p>
            <div className="ruled rounded-xl border border-beige px-4 py-1 pl-12">
              <p className="font-hand text-[1.45rem] leading-[2.25rem] text-navy">{EXAMPLE_ENTRY}</p>
            </div>
          </Step>

          <Step n={2} icon={<Brain size={22} aria-hidden />} title="Understand" body="AI reads the dialect, finds the customer's profile, works out the date, and files it in your sheet.">
            <ul className="flex flex-wrap gap-2">
              {CHIPS.map(([k, v]) => (
                <li key={k} className="rounded-lg border border-beige bg-paper px-2.5 py-1.5 text-sm">
                  <span className="text-muted">{k}: </span>
                  <span className="font-semibold text-navy">{v}</span>
                </li>
              ))}
            </ul>
          </Step>

          <Step n={3} icon={<BellRing size={22} aria-hidden />} title="Remind" body="When payment is due, Daftar prepares a friendly WhatsApp message, so nobody has to ask face to face.">
            <p lang="ar" dir="rtl" className="rounded-2xl rounded-tr-sm bg-wa px-4 py-3 leading-relaxed text-navy">
              {EXAMPLE_REMINDER}
            </p>
          </Step>
        </ol>
      </div>
    </section>
  );
}

function Step({
  n,
  icon,
  title,
  body,
  children,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Reveal delay={(n - 1) * 0.12} className="card flex h-full flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-apricot">{icon}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Step {n}</p>
            <h3 className="font-heading text-xl font-semibold text-navy">{title}</h3>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-muted">{body}</p>
        <div className="mt-5 flex-1 border-t border-dashed border-beige pt-5">{children}</div>
      </Reveal>
    </li>
  );
}
