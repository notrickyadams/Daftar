import { toArabicDigits, toISODate } from "./dates";
import type { EntryStatus, EntryType, LedgerEntry, ParsedItem } from "./types";

export const TYPE_LABEL: Record<EntryType, string> = {
  cash_sale: "Cash sale",
  unpaid: "Unpaid",
  payment: "Payment",
};

export const STATUS_LABEL: Record<EntryStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  received: "Received",
};

export function entryStatus(entry: LedgerEntry, today = new Date()): EntryStatus {
  const { type, dueDate } = entry.parsed;
  if (type === "cash_sale") return "paid";
  if (type === "payment") return "received";
  if (dueDate && dueDate < toISODate(today)) return "overdue";
  return "pending";
}

function formatQty(q: number | null): string {
  if (q === null) return "";
  if (q === 0.5) return "½";
  return String(q);
}

export function describeItem(item: ParsedItem): string {
  const parts = [formatQty(item.quantity), item.unit, item.name].filter(Boolean);
  return parts.join(" ");
}

export function describeItems(items: ParsedItem[]): string {
  return items.length ? items.map(describeItem).join(", ") : "—";
}

export function formatQuantity(items: ParsedItem[]): string {
  if (!items.length) return "—";
  return items
    .map((i) => [formatQty(i.quantity), i.unit].filter(Boolean).join(" ") || "1")
    .join(" + ");
}

export function formatMoney(n: number | null): string {
  return n === null ? "—" : `${n.toLocaleString("en-US")} EGP`;
}

/** "٢ كيلو الجبنة" */
function itemAr(item: ParsedItem): string {
  const isArabic = /[؀-ۿ]/.test(item.nameAr);
  const name = isArabic && !item.nameAr.startsWith("ال") ? `ال${item.nameAr}` : item.nameAr;
  if (item.quantity === 0.5 && item.unitAr) return `نص ${item.unitAr} ${name}`;
  const qty = item.quantity && item.quantity !== 1 ? toArabicDigits(item.quantity) : "";
  return [qty, item.unitAr, name].filter(Boolean).join(" ");
}

const WEEKDAYS_AR = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];

/** Friendly reminder in Egyptian Arabic. */
export function buildReminder(entry: LedgerEntry, customerAr: string): string {
  const { items, amount, dueLabelAr } = entry.parsed;
  const what = items.length ? items.map(itemAr).join(" و") : "الحساب";
  const money = amount !== null ? ` (${toArabicDigits(amount)} جنيه)` : "";
  let when = "";
  if (dueLabelAr) {
    when = WEEKDAYS_AR.includes(dueLabelAr) ? `، ميعاده يوم ${dueLabelAr}` : `، ميعاده ${dueLabelAr}`;
  }
  return `إزيك يا ${customerAr}! بنفكرك بلطف بحساب ${what}${money}${when}. شكراً ليك 🙏`;
}

/** Egyptian mobile "010..." → "2010..." for wa.me */
export function toWhatsAppNumber(phone: string | null): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("20")) return digits;
  if (digits.startsWith("0")) return `2${digits}`;
  return `20${digits}`;
}

export function whatsappLink(phone: string | null, message: string): string {
  const num = toWhatsAppNumber(phone);
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
