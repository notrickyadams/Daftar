"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BellRing, CheckCheck, CircleCheck, Mic } from "lucide-react";
import Logo from "./Logo";
import { EXAMPLE_REMINDER, EXAMPLE_VOICE } from "@/lib/examples";

const WAVE = [30, 55, 80, 45, 95, 60, 35, 70, 90, 50, 30, 65, 85, 40, 25, 55, 75, 45, 30, 20];

const ROWS: [string, string][] = [
  ["Customer", "Uncle Ahmed"],
  ["Item", "Cheese · 2 kilo"],
  ["Type", "Unpaid"],
  ["Due", "Next Monday"],
];

export default function PhoneMockup() {
  const reduce = useReducedMotion();
  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <figure
      className="relative w-[300px] max-w-full sm:w-[320px]"
      aria-label="Phone showing a Daftar chat: the shopkeeper sends a voice note in Arabic, Daftar saves it as an unpaid sale for Uncle Ahmed due next Monday, and a WhatsApp reminder is prepared in Arabic."
    >
      <div className="rounded-[2.75rem] bg-navy p-3 shadow-lift">
        <div className="overflow-hidden rounded-[2.1rem] bg-paper">
          {/* Status bar notch */}
          <div className="flex justify-center bg-navy-soft pt-2">
            <div className="h-5 w-24 rounded-b-2xl bg-navy" />
          </div>
          {/* Chat header */}
          <div className="flex items-center gap-3 bg-navy-soft px-4 pb-3 pt-2 text-paper">
            <Logo size={34} decorative />
            <div className="leading-tight">
              <p className="font-heading font-semibold">Daftar</p>
              <p className="text-xs text-paper/70">your shop notebook</p>
            </div>
          </div>

          <div className="flex min-h-[440px] flex-col gap-3 px-3 py-4" aria-hidden>
            <p className="mx-auto rounded-full bg-beige/70 px-3 py-0.5 text-[11px] font-semibold text-muted">Today</p>

            <motion.div {...pop(0.5)} className="ml-auto w-[85%] rounded-2xl rounded-tr-sm bg-wa px-3 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
                  <Mic size={15} />
                </span>
                <span className="flex h-6 flex-1 items-center gap-[3px]">
                  {WAVE.map((h, i) => (
                    <span key={i} className="w-[3px] rounded-full bg-green-800/60" style={{ height: `${h}%` }} />
                  ))}
                </span>
                <span className="text-[11px] text-muted">0:04</span>
              </div>
              <p lang="ar" dir="rtl" className="mt-1.5 border-t border-green-800/15 pt-1.5 text-[13px] leading-snug text-navy">
                {EXAMPLE_VOICE}
              </p>
              <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-muted">
                9:41 <CheckCheck size={12} className="text-sky-600" />
              </p>
            </motion.div>

            <motion.div {...pop(1.2)} className="max-w-[88%] rounded-2xl rounded-tl-sm border border-beige bg-card p-3 shadow-sm">
              <p className="flex items-center gap-1.5 text-[13px] font-bold text-navy">
                <CircleCheck size={16} className="text-ember" /> Saved to your daftar
              </p>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12.5px]">
                {ROWS.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted">{k}</dt>
                    <dd className={`font-semibold ${k === "Type" ? "text-ember-dark" : "text-navy"}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.p {...pop(1.9)} className="mx-auto mt-1 rounded-full bg-beige/70 px-3 py-0.5 text-[11px] font-semibold text-muted">
              Monday
            </motion.p>

            <motion.div {...pop(2.3)} className="max-w-[92%] rounded-2xl rounded-tl-sm border border-beige bg-card p-3 shadow-sm">
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-navy">
                <BellRing size={14} className="text-ember" /> Reminder ready for Uncle Ahmed
              </p>
              <p lang="ar" dir="rtl" className="mt-2 rounded-xl bg-wa px-3 py-2 text-[13.5px] leading-relaxed text-navy">
                {EXAMPLE_REMINDER}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </figure>
  );
}
