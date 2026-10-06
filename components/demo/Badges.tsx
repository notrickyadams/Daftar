import { STATUS_LABEL, TYPE_LABEL } from "@/lib/ledger";
import type { EntryStatus, EntryType } from "@/lib/types";

const TYPE_TONE: Record<EntryType, string> = {
  cash_sale: "bg-wa text-green-900",
  unpaid: "bg-apricot/30 text-ember-dark",
  payment: "bg-navy/10 text-navy",
};

const STATUS_TONE: Record<EntryStatus, string> = {
  paid: "bg-wa text-green-900",
  received: "bg-wa text-green-900",
  pending: "bg-paper text-navy ring-1 ring-beige",
  overdue: "bg-ember text-white",
};

export function TypeBadge({ type }: { type: EntryType }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${TYPE_TONE[type]}`}>
      {TYPE_LABEL[type]}
    </span>
  );
}

export function StatusBadge({ status }: { status: EntryStatus }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_TONE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
