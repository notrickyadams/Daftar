"use client";

import { useState } from "react";
import { BellRing, FileSpreadsheet, LoaderCircle, Mic, Trash2 } from "lucide-react";
import { StatusBadge, TypeBadge } from "./Badges";
import { formatDate } from "@/lib/dates";
import { describeItems, entryStatus, formatMoney, formatQuantity } from "@/lib/ledger";
import { exportLedgerToExcel } from "@/lib/exportExcel";
import type { Customer, LedgerEntry } from "@/lib/types";

interface LedgerTableProps {
  entries: LedgerEntry[];
  customers: Customer[];
  onRemind: (entry: LedgerEntry) => void;
  onClear: () => void;
  className?: string;
}

export default function LedgerTable({ entries, customers, onRemind, onClear, className = "" }: LedgerTableProps) {
  const [exporting, setExporting] = useState(false);
  const byId = new Map(customers.map((c) => [c.id, c]));
  const name = (e: LedgerEntry) => (e.customerId ? byId.get(e.customerId)?.displayEn : null) ?? "Walk-in";
  const time = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportLedgerToExcel(entries, customers);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="flex flex-col gap-3 border-b border-beige bg-paper/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-navy">Ledger</h3>
          <p className="text-sm text-muted">
            {entries.length === 0 ? "No entries yet" : `${entries.length} ${entries.length === 1 ? "entry" : "entries"} this session`}
          </p>
        </div>
        <div className="flex gap-2">
          {entries.length > 0 && (
            <button type="button" onClick={onClear} className="btn !px-3 !py-2.5 text-muted hover:bg-beige/50 hover:text-navy">
              <Trash2 size={18} aria-hidden /> Clear
            </button>
          )}
          <button type="button" onClick={handleExport} disabled={!entries.length || exporting} className="btn-primary !py-2.5">
            {exporting ? <LoaderCircle size={18} className="animate-spin" aria-hidden /> : <FileSpreadsheet size={18} aria-hidden />}
            Export to Excel
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="px-5 py-10 text-center text-muted">
          Entries you add above land here, organized like a spreadsheet.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Ledger entries, newest first</caption>
              <thead className="text-muted">
                <tr>
                  {["Time", "Customer", "Items", "Qty", "Amount", "Type", "Due", "Status", ""].map((h, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-semibold">
                      {h || <span className="sr-only">Actions</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-t border-beige align-middle">
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        {time(e.createdAt)}
                        {e.input === "voice" && <VoiceIcon />}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-navy">{name(e)}</td>
                    <td className="px-4 py-3">{describeItems(e.parsed.items.map((i) => ({ ...i, quantity: null, unit: null })))}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatQuantity(e.parsed.items)}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatMoney(e.parsed.amount)}</td>
                    <td className="px-4 py-3"><TypeBadge type={e.parsed.type} /></td>
                    <td className="whitespace-nowrap px-4 py-3">{formatDate(e.parsed.dueDate)}</td>
                    <td className="px-4 py-3"><StatusBadge status={entryStatus(e)} /></td>
                    <td className="px-4 py-3 text-right">
                      {e.parsed.type === "unpaid" && e.customerId && (
                        <RemindButton onClick={() => onRemind(e)} who={name(e)} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="divide-y divide-beige md:hidden">
            {entries.map((e) => (
              <li key={e.id} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy">{name(e)}</p>
                    <p className="text-sm text-muted">
                      {describeItems(e.parsed.items)}
                      {e.parsed.amount !== null && ` · ${formatMoney(e.parsed.amount)}`}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    {e.input === "voice" && <VoiceIcon />}
                    {time(e.createdAt)}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <TypeBadge type={e.parsed.type} />
                  <StatusBadge status={entryStatus(e)} />
                  {e.parsed.dueDate && <span className="text-muted">Due {formatDate(e.parsed.dueDate)}</span>}
                </div>
                {e.parsed.type === "unpaid" && e.customerId && (
                  <div className="mt-3">
                    <RemindButton onClick={() => onRemind(e)} who={name(e)} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function VoiceIcon() {
  return (
    <span title="Spoken in Arabic" className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-wa text-green-900">
      <Mic size={11} aria-hidden />
      <span className="sr-only">(spoken)</span>
    </span>
  );
}

function RemindButton({ onClick, who }: { onClick: () => void; who: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Send WhatsApp reminder to ${who}`}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-wa px-3 py-2 text-sm font-bold text-green-900 transition hover:bg-green-200"
    >
      <BellRing size={16} aria-hidden /> Send WhatsApp reminder
    </button>
  );
}
