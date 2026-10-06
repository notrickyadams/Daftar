import { Phone, Users } from "lucide-react";
import type { Customer, LedgerEntry } from "@/lib/types";

interface CustomerListProps {
  customers: Customer[];
  entries: LedgerEntry[];
}

export default function CustomerList({ customers, entries }: CustomerListProps) {
  return (
    <div className="card p-5">
      <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
        <Users size={18} className="text-ember" aria-hidden /> Customer profiles
      </h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {customers.map((c) => {
          const mine = entries.filter((e) => e.customerId === c.id);
          const open = mine.filter((e) => e.parsed.type === "unpaid").length;
          const paid = mine.filter((e) => e.parsed.type === "payment").reduce((s, e) => s + (e.parsed.amount ?? 0), 0);
          return (
            <li key={c.id} className="rounded-xl border border-beige bg-paper/60 px-3 py-2.5">
              <p className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-navy">{c.displayEn}</span>
                <span lang="ar" dir="rtl" className="text-sm text-muted">
                  {c.displayAr}
                </span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                <Phone size={12} aria-hidden /> {c.phone ?? "No number yet"}
              </p>
              {(open > 0 || paid > 0) && (
                <p className="mt-1 text-xs font-semibold text-navy">
                  {open > 0 && `${open} unpaid`}
                  {open > 0 && paid > 0 && " · "}
                  {paid > 0 && `${paid} EGP paid`}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
