"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mic, PenLine } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { EXAMPLE_ENTRY, EXAMPLE_VOICE } from "@/lib/examples";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-16">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-beige bg-card px-3 py-1.5 text-sm font-semibold text-muted"
          >
            <span className="font-heading text-ember-dark" lang="ar" dir="rtl">
              دفتر
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-beige" />
            for bekala &amp; koshk owners
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.6rem]"
          >
            The smart notebook for{" "}
            <span className="relative whitespace-nowrap text-ember">
              Egypt&apos;s local shops
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-apricot"
              >
                <path d="M2 9c60-6 160-8 296-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Say it out loud in Arabic, or write it the way you already do in your paper daftar, and Daftar&apos;s AI
            files it, tracks who owes what, and sends a friendly WhatsApp reminder when it&apos;s time to pay.
          </motion.p>

          <motion.figure {...fade(0.24)} className="relative mt-8 max-w-lg">
            <span className="tape -top-3 left-8" aria-hidden />
            <div className="ruled rounded-xl border border-beige px-5 pb-2 pl-14 shadow-paper">
              <p className="flex h-9 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                <PenLine size={14} aria-hidden /> Written in the daftar
              </p>
              <blockquote className="font-hand text-[1.7rem] leading-[2.25rem] text-navy sm:text-3xl sm:leading-[2.25rem]">
                {EXAMPLE_ENTRY}
              </blockquote>
            </div>
            <figcaption className="mt-3 pl-1 text-sm text-muted">
              = Uncle Ahmed took 2 kilos of cheese, he&apos;ll pay next Monday.
            </figcaption>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-navy">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-wa px-3 py-1.5 text-green-900">
                <Mic size={15} aria-hidden /> Or just say it
              </span>
              <span lang="ar" dir="rtl" className="font-heading text-base font-normal text-muted">
                {EXAMPLE_VOICE}
              </span>
            </p>
          </motion.figure>

          <motion.div {...fade(0.32)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="btn-primary">
              Try the demo <ArrowRight size={18} aria-hidden />
            </a>
            <a href="#how-it-works" className="btn-secondary">
              How it works
            </a>
          </motion.div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div aria-hidden className="absolute inset-x-6 top-10 -z-10 h-[80%] rounded-[3rem] bg-apricot/30 blur-2xl" />
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
