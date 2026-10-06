"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BellRing, Bot, BookOpen, Info, Mic, UserCheck, UserPlus } from "lucide-react";
import CustomerPrompt from "./CustomerPrompt";
import { StatusBadge, TypeBadge } from "./Badges";
import { formatDate } from "@/lib/dates";
import { describeItems, entryStatus, formatMoney, formatQuantity } from "@/lib/ledger";
import type { Customer } from "@/lib/types";
import type { DemoResult } from "./Demo";

const isArabic = (s: string) => /[؀-ۿ]/.test(s);

export type CustomerLink = "none" | "existing" | "created" | "auto" | "pending";

interface ParsedCardProps {
  result: DemoResult;
  customer: Customer | null;
  onCreateCustomer: (phone: string | null) => void;
  onRemind: () => void;
}

export default function ParsedCard({ result, customer, onCreateCustomer, onRemind }: ParsedCardProps) {
  const reduce = useReducedMotion();
  const { parsed, raw, source, note, link } = result;
  const status = entryStatus({ id: "", createdAt: "", raw, parsed, source, input: result.input, customerId: null });
  const customerLabel = parsed.customerDisplayEn ?? "Walk-in customer";

  const rows: [string, React.ReactNode][] = [
    [
      "Customer",
      <span key="c">
        {customerLabel}
        {parsed.customerDisplayAr && parsed.customerDisplayAr !== customerLabel && (
          <span lang="ar" dir="rtl" className="ml-2 text-muted">
            {parsed.customerDisplayAr}
          </span>
        )}
      </span>,
    ],
    ["Item", describeItems(parsed.items.map((i) => ({ ...i, quantity: null, unit: null })))],
    ["Quantity", formatQuantity(parsed.items)],
    ["Amount", formatMoney(parsed.amount)],
    ["Type", <TypeBadge key="t" type={parsed.type} />],
    ["Due date", parsed.dueDate ? `${formatDate(parsed.dueDate)}${parsed.dueLabelEn ? ` (${parsed.dueLabelEn})` : ""}` : "—"],
    ["Status", link === "pending" ? <span key="s" className="text-muted">Waiting for profile…</span> : <StatusBadge key="s" status={status} />],
  ];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16, rotate: -0.6 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card overflow-hidden"
      aria-label="What the AI understood"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-beige bg-paper/70 px-5 py-3">
        <h3 className="font-heading text-lg font-semibold text-navy">What Daftar understood</h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
            source === "ai" ? "bg-navy text-paper" : "bg-beige/70 text-navy"
          }`}
        >
          {source === "ai" ? <Bot size={13} aria-hidden /> : <BookOpen size={13} aria-hidden />}
          {source === "ai" ? "Read by AI (Claude)" : "Built-in parser"}
        </span>
      </header>

      <div className="px-5 pt-4">
        {result.input === "voice" ? (
          <>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
              <Mic size={13} aria-hidden /> You said
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="mt-1.5 rounded-2xl rounded-tr-sm bg-wa px-4 py-2.5 font-heading text-lg leading-relaxed text-navy"
            >
              {raw}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">Written to your daftar as</p>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">You wrote</p>
            {isArabic(raw) ? (
              <p lang="ar" dir="rtl" className="font-heading text-xl leading-relaxed text-navy">
                {raw}
              </p>
            ) : (
              <p className="font-hand text-[1.7rem] leading-tight text-navy">{raw}</p>
            )}
          </>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-[110px_1fr] gap-x-4 px-5 text-[15px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="border-t border-dashed border-beige py-2.5 text-muted">{k}</dt>
            <dd className="border-t border-dashed border-beige py-2.5 font-semibold text-navy">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="px-5 pb-5 pt-2">
        {note && (
          <p className="mb-3 flex items-start gap-2 rounded-lg bg-paper px-3 py-2 text-sm text-muted">
            <Info size={16} className="mt-0.5 shrink-0" aria-hidden /> {note}
          </p>
        )}

        {link === "pending" && <CustomerPrompt name={customerLabel} onSubmit={onCreateCustomer} />}

        {link === "existing" && customer && (
          <LinkNote icon={<UserCheck size={18} aria-hidden />}>
            Linked to saved profile <strong>{customer.displayEn}</strong>.
          </LinkNote>
        )}
        {link === "created" && customer && (
          <LinkNote icon={<UserPlus size={18} aria-hidden />}>
            New profile created for <strong>{customer.displayEn}</strong>
            {customer.phone ? ` (${customer.phone})` : ""}. Saved to the ledger.
          </LinkNote>
        )}
        {link === "auto" && customer && (
          <LinkNote icon={<UserPlus size={18} aria-hidden />}>
            Profile auto-created for <strong>{customer.displayEn}</strong> from the phone number {customer.phone}.
          </LinkNote>
        )}
        {link === "none" && <LinkNote icon={<BookOpen size={18} aria-hidden />}>Saved to the ledger as a walk-in sale.</LinkNote>}

        {parsed.type === "unpaid" && link !== "pending" && customer && (
          <button type="button" onClick={onRemind} className="btn-secondary mt-3 w-full !py-2.5">
            <BellRing size={18} aria-hidden /> Preview WhatsApp reminder
          </button>
        )}
      </div>
    </motion.article>
  );
}

function LinkNote({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg bg-wa/70 px-3 py-2.5 text-sm text-navy">
      <span className="mt-px text-green-800">{icon}</span>
      <span>{children}</span>
    </p>
  );
}
