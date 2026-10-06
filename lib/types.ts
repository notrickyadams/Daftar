export type EntryType = "cash_sale" | "unpaid" | "payment";

export interface ParsedItem {
  /** English name, e.g. "cheese" */
  name: string;
  /** Egyptian Arabic name without the article, e.g. "جبنة" */
  nameAr: string;
  quantity: number | null;
  /** English unit, e.g. "kilo" */
  unit: string | null;
  /** Arabic unit, e.g. "كيلو" */
  unitAr: string | null;
}

/** What the parser (AI or rules) understood from one notebook entry. */
export interface ParsedEntry {
  /** Base name used to match profiles, e.g. "Ahmed" */
  customerName: string | null;
  /** Nickname / honorific as written, e.g. "3am", "om", "abo" */
  customerTitle: string | null;
  /** Friendly English name, e.g. "Uncle Ahmed" */
  customerDisplayEn: string | null;
  /** Friendly Arabic name, e.g. "عم أحمد" */
  customerDisplayAr: string | null;
  /** Egyptian mobile number if one was written in the entry */
  phone: string | null;
  items: ParsedItem[];
  /** Money amount in EGP if one was written */
  amount: number | null;
  type: EntryType;
  /** YYYY-MM-DD */
  dueDate: string | null;
  /** e.g. "Next Monday" */
  dueLabelEn: string | null;
  /** e.g. "الاتنين" (as it would follow "يوم") or "بكرة" */
  dueLabelAr: string | null;
}

export type ParseSource = "ai" | "rules";

/** How the shopkeeper entered it: spoken (speech-to-text) or typed. */
export type InputMode = "voice" | "text";

export interface ParseResponse {
  entry: ParsedEntry;
  source: ParseSource;
  note?: string;
}

export interface Customer {
  id: string;
  /** Base name, e.g. "Ahmed" */
  name: string;
  displayEn: string;
  displayAr: string;
  phone: string | null;
}

export type EntryStatus = "paid" | "pending" | "overdue" | "received";

export interface LedgerEntry {
  id: string;
  createdAt: string;
  raw: string;
  customerId: string | null;
  parsed: ParsedEntry;
  source: ParseSource;
  input: InputMode;
}
