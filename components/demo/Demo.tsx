"use client";

import { useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import EntryComposer from "./EntryComposer";
import ParsedCard, { type CustomerLink } from "./ParsedCard";
import LedgerTable from "./LedgerTable";
import CustomerList from "./CustomerList";
import ReminderDialog from "./ReminderDialog";
import { parseWithRules } from "@/lib/ruleParser";
import { uid } from "@/lib/ledger";
import type { Customer, InputMode, LedgerEntry, ParsedEntry, ParseResponse, ParseSource } from "@/lib/types";

const SEED_CUSTOMERS: Customer[] = [
  { id: "c-mona", name: "Mona", displayEn: "Om Mona", displayAr: "أم منى", phone: null },
  { id: "c-hassan", name: "Hassan", displayEn: "Hajj Hassan", displayAr: "الحاج حسن", phone: null },
];

export interface DemoResult {
  key: string;
  raw: string;
  parsed: ParsedEntry;
  source: ParseSource;
  input: InputMode;
  note?: string;
  link: CustomerLink;
  customerId: string | null;
  entryId: string | null;
}

async function requestParse(text: string): Promise<ParseResponse> {
  try {
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ParseResponse;
    if (!data?.entry || !Array.isArray(data.entry.items)) throw new Error("Bad response");
    return data;
  } catch {
    // Server unreachable: parse in the browser so the demo never dead-ends.
    return { entry: parseWithRules(text), source: "rules", note: "Parsed in your browser (server unreachable)." };
  }
}

export default function Demo() {
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS);
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [reminderFor, setReminderFor] = useState<LedgerEntry | null>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const addEntry = (raw: string, parsed: ParsedEntry, source: ParseSource, input: InputMode, customerId: string | null) => {
    const entry: LedgerEntry = { id: uid(), createdAt: new Date().toISOString(), raw, parsed, source, input, customerId };
    setEntries((prev) => [entry, ...prev]);
    return entry.id;
  };

  const createCustomer = (parsed: ParsedEntry, phone: string | null): Customer => {
    const customer: Customer = {
      id: uid(),
      name: parsed.customerName!,
      displayEn: parsed.customerDisplayEn ?? parsed.customerName!,
      displayAr: parsed.customerDisplayAr ?? parsed.customerName!,
      phone,
    };
    setCustomers((prev) => [...prev, customer]);
    return customer;
  };

  const handleSubmit = async (raw: string, input: InputMode) => {
    setLoading(true);
    const { entry: parsed, source, note } = await requestParse(raw);
    setLoading(false);

    const base = { key: uid(), raw, parsed, source, input, note };

    if (!parsed.customerName) {
      const entryId = addEntry(raw, parsed, source, input, null);
      setResult({ ...base, link: "none", customerId: null, entryId });
      return;
    }

    const match = customers.find((c) => c.name.toLowerCase() === parsed.customerName!.toLowerCase());
    if (match) {
      if (parsed.phone && !match.phone) {
        setCustomers((prev) => prev.map((c) => (c.id === match.id ? { ...c, phone: parsed.phone } : c)));
      }
      const entryId = addEntry(raw, parsed, source, input, match.id);
      setResult({ ...base, link: "existing", customerId: match.id, entryId });
      return;
    }

    if (parsed.phone) {
      const c = createCustomer(parsed, parsed.phone);
      const entryId = addEntry(raw, parsed, source, input, c.id);
      setResult({ ...base, link: "auto", customerId: c.id, entryId });
      return;
    }

    // New name, no phone: ask before saving
    setResult({ ...base, link: "pending", customerId: null, entryId: null });
  };

  const confirmNewCustomer = (phone: string | null) => {
    if (!result) return;
    const c = createCustomer(result.parsed, phone);
    const entryId = addEntry(result.raw, result.parsed, result.source, result.input, c.id);
    setResult({ ...result, link: "created", customerId: c.id, entryId });
  };

  const updatePhone = (customerId: string, phone: string) => {
    setCustomers((prev) => prev.map((c) => (c.id === customerId ? { ...c, phone } : c)));
  };

  const reminderCustomer = reminderFor?.customerId ? customers.find((c) => c.id === reminderFor.customerId) ?? null : null;

  return (
    <section id="demo" aria-labelledby="demo-title" className="relative border-y border-beige bg-card/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="demo-title"
          eyebrow="Try it yourself"
          title="Your daftar, live"
          subtitle="Say an entry out loud in Arabic, or type it the way a shopkeeper would. Daftar shows what it understood and writes it into the ledger."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <EntryComposer ref={composerRef} loading={loading} onSubmit={handleSubmit} />
            <CustomerList customers={customers} entries={entries} />
          </div>

          <div aria-live="polite" className="min-h-[200px]">
            {result ? (
              <ParsedCard
                key={result.key}
                result={result}
                customer={customers.find((c) => c.id === result.customerId) ?? null}
                onCreateCustomer={confirmNewCustomer}
                onRemind={() => {
                  const e = entries.find((x) => x.id === result.entryId);
                  if (e) setReminderFor(e);
                }}
              />
            ) : (
              <EmptyResult />
            )}
          </div>
        </div>

        <LedgerTable
          className="mt-8"
          entries={entries}
          customers={customers}
          onRemind={setReminderFor}
          onClear={() => {
            setEntries([]);
            setResult(null);
            composerRef.current?.focus();
          }}
        />
      </div>

      <ReminderDialog
        entry={reminderFor}
        customer={reminderCustomer}
        onClose={() => setReminderFor(null)}
        onSavePhone={updatePhone}
      />
    </section>
  );
}

function EmptyResult() {
  return (
    <div className="ruled flex h-full min-h-[260px] flex-col justify-center rounded-2xl border border-dashed border-beige p-8 pl-16">
      <p className="font-hand text-3xl leading-[2.25rem] text-muted">What the AI understood will show up here…</p>
      <p className="mt-2 text-sm text-muted">Customer, items, quantity, type, due date, and status.</p>
    </div>
  );
}
