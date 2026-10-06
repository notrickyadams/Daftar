import { describeItems, entryStatus, formatQuantity, STATUS_LABEL, TYPE_LABEL } from "./ledger";
import type { Customer, LedgerEntry } from "./types";

/** Builds a two-sheet workbook (Ledger + Customers) and downloads it. */
export async function exportLedgerToExcel(entries: LedgerEntry[], customers: Customer[]) {
  const XLSX = await import("xlsx");
  const byId = new Map(customers.map((c) => [c.id, c]));

  const ledgerRows = entries.map((e) => {
    const c = e.customerId ? byId.get(e.customerId) : undefined;
    return {
      Date: new Date(e.createdAt).toLocaleString("en-GB"),
      "Entry (as written or said)": e.raw,
      Input: e.input === "voice" ? "Voice" : "Typed",
      Customer: c?.displayEn ?? "Walk-in",
      "Customer (Arabic)": c?.displayAr ?? "",
      Phone: c?.phone ?? "",
      Items: describeItems(e.parsed.items),
      Quantity: formatQuantity(e.parsed.items),
      "Amount (EGP)": e.parsed.amount ?? "",
      Type: TYPE_LABEL[e.parsed.type],
      "Due date": e.parsed.dueDate ?? "",
      Status: STATUS_LABEL[entryStatus(e)],
    };
  });

  const customerRows = customers.map((c) => {
    const mine = entries.filter((e) => e.customerId === c.id);
    return {
      Customer: c.displayEn,
      "Customer (Arabic)": c.displayAr,
      Phone: c.phone ?? "",
      "Open unpaid entries": mine.filter((e) => e.parsed.type === "unpaid").length,
      "Payments received (EGP)": mine
        .filter((e) => e.parsed.type === "payment")
        .reduce((sum, e) => sum + (e.parsed.amount ?? 0), 0),
    };
  });

  const wb = XLSX.utils.book_new();
  const ledgerSheet = XLSX.utils.json_to_sheet(ledgerRows);
  ledgerSheet["!cols"] = [18, 44, 8, 18, 18, 14, 30, 14, 12, 12, 12, 10].map((wch) => ({ wch }));
  XLSX.utils.book_append_sheet(wb, ledgerSheet, "Ledger");

  const customerSheet = XLSX.utils.json_to_sheet(customerRows);
  customerSheet["!cols"] = [18, 18, 14, 20, 24].map((wch) => ({ wch }));
  XLSX.utils.book_append_sheet(wb, customerSheet, "Customers");

  const stamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `daftar-ledger-${stamp}.xlsx`);
}
