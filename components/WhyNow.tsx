import { Languages, MessageCircle, NotebookPen } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const REASONS = [
  {
    icon: Languages,
    title: "AI finally speaks the dialect",
    body: "Speech recognition and language models now handle spoken Egyptian Arabic and written Franco, with its numbers-for-letters and loose spelling. A few years ago this needed rigid forms.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp is already everywhere",
    body: "Shopkeepers and customers already use WhatsApp every day. Reminders arrive where people already are, with nothing new to install.",
  },
  {
    icon: NotebookPen,
    title: "The habit already exists",
    body: "Shopkeepers already write every credit sale down. Daftar doesn't ask them to change behaviour, only where they write.",
  },
];

export default function WhyNow() {
  return (
    <section aria-labelledby="why-title" className="bg-navy py-20 text-paper sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="why-title" invert eyebrow="Why now" title="Three things just lined up" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {REASONS.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.1} className="h-full rounded-2xl border border-white/10 bg-navy-soft p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-apricot text-navy">
                    <r.icon size={24} aria-hidden />
                  </span>
                  <span className="font-hand text-4xl text-apricot/70" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/80">{r.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
