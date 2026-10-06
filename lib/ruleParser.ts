import { resolveRelativeDate, fromArabicDigits } from "./dates";
import {
  CURRENCY,
  FILLER,
  HUNDRED_WORDS,
  ITEMS,
  NAMES,
  NUMBER_WORDS,
  SEPARATORS,
  TITLES,
  UNITS,
  VERBS,
  capitalize,
} from "./lexicon";
import type { EntryType, ParsedEntry, ParsedItem } from "./types";

const PHONE_RE = /(?:\+?20|0020)?\s?0?(1[0125]\d{8})/;

const DATE_WORDS = new Set([
  "bokra", "bukra", "ba3d", "awel", "awwel", "el", "shahr", "gy", "gai", "gay", "esbo3", "isbo3", "osbo3",
  "ayam", "yom", "youm", "etnen", "talat", "arba3", "5ames", "khamis", "gom3a", "sabt", "7ad", "had",
  "بكرة", "بكره", "بعد", "أول", "اول", "الشهر", "الجاي", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت", "الحد",
]);

const ALL_VERBS = new Set([...VERBS.unpaid, ...VERBS.cash, ...VERBS.payment]);
const STOP = new Set([...ALL_VERBS, ...CURRENCY, ...SEPARATORS, ...FILLER, ...DATE_WORDS]);

const isNumber = (t: string) => /^\d+(\.\d+)?$/.test(t);
const HALF = new Set(["ns", "nos", "nus", "نص"]);

function lookupItem(tokens: string[], i: number): { item: { en: string; ar: string }; len: number } | null {
  const two = tokens.slice(i, i + 2).join(" ");
  if (ITEMS[two]) return { item: ITEMS[two], len: 2 };
  const one = tokens[i];
  if (!one) return null;
  if (ITEMS[one]) return { item: ITEMS[one], len: 1 };
  // Arabic article: "الجبنة" → "جبنة"
  if (one.startsWith("ال") && ITEMS[one.slice(2)]) return { item: ITEMS[one.slice(2)], len: 1 };
  return null;
}

function lookupUnit(tokens: string[], i: number): { unit: { en: string; ar: string }; len: number } | null {
  const one = tokens[i];
  if (one && UNITS[one]) return { unit: UNITS[one], len: 1 };
  return null;
}

/**
 * Speech-to-text writes numbers as words ("اتنين كيلو", "دفع مية جنيه").
 * Turn them into digits so the rest of the parser treats both the same.
 */
function spokenNumbersToDigits(tokens: string[]): string[] {
  const out: string[] = [];
  tokens.forEach((tok, i) => {
    const next = tokens[i + 1];
    const prev = tokens[i - 1];
    if (NUMBER_WORDS[tok] !== undefined) {
      out.push(String(NUMBER_WORDS[tok]));
    } else if (HUNDRED_WORDS.includes(tok) && ((next && CURRENCY.includes(next)) || (prev && VERBS.payment.includes(prev)))) {
      out.push("100");
    } else if (tok.length > 1 && tok.startsWith("ب") && (NUMBER_WORDS[tok.slice(1)] !== undefined || /^\d+$/.test(tok.slice(1)))) {
      // "بخمسين" = "for fifty"
      out.push("be", String(NUMBER_WORDS[tok.slice(1)] ?? tok.slice(1)));
    } else {
      out.push(tok);
    }
  });
  return out;
}

/**
 * A deterministic parser for common shop-notebook phrasings, so the demo
 * works without an API key. It's intentionally simple: the AI route handles
 * the long tail.
 */
export function parseWithRules(input: string, today = new Date()): ParsedEntry {
  let text = fromArabicDigits(input).toLowerCase();

  let phone: string | null = null;
  const phoneMatch = text.replace(/[\s-]/g, "").match(PHONE_RE);
  if (phoneMatch) {
    phone = "0" + phoneMatch[1];
    // Remove the phone (with any spacing) from the text before tokenizing
    text = text.replace(/(?:\+?20|0020)?[\s-]?0?1[0125](?:[\s-]?\d){8}/, " ");
  }

  const rawTokens = text
    .replace(/(\d)[.,](\d)/g, "$1DOT$2")
    .replace(/[.,!?؟،:;()"']/g, " ")
    .replace(/DOT/g, ".")
    // Split an attached Arabic "و" (and) from the next word: "و٢" → "و 2"
    .replace(/(^|\s)و(?=\S)/g, "$1و ")
    .split(/\s+/)
    .filter(Boolean);
  const tokens = spokenNumbersToDigits(rawTokens);

  const used = new Set<number>();

  // ---- Type --------------------------------------------------------------
  const has = (list: string[]) => tokens.findIndex((t) => list.includes(t));
  const paymentIdx = has(VERBS.payment);
  const unpaidIdx = has(VERBS.unpaid);
  const cashIdx = has(VERBS.cash);
  [paymentIdx, unpaidIdx, cashIdx].forEach((i) => i >= 0 && used.add(i));

  // ---- Customer ----------------------------------------------------------
  let title: string | null = null;
  let nameToken: string | null = null;

  for (let i = 0; i < tokens.length - 1; i++) {
    if (TITLES[tokens[i]] && !STOP.has(tokens[i + 1]) && !isNumber(tokens[i + 1])) {
      title = tokens[i];
      nameToken = tokens[i + 1];
      used.add(i).add(i + 1);
      break;
    }
  }
  if (!nameToken) {
    const i = tokens.findIndex((t) => NAMES[t]);
    if (i >= 0) {
      nameToken = tokens[i];
      used.add(i);
    }
  }
  if (!nameToken) {
    // "Karim 5ad ..." / "Karim dafa3 ..." → the word before the verb
    const verbIdx = [paymentIdx, unpaidIdx].filter((i) => i > 0).sort((a, b) => a - b)[0];
    if (verbIdx !== undefined) {
      const cand = tokens[verbIdx - 1];
      if (cand && !STOP.has(cand) && !isNumber(cand) && !lookupItem(tokens, verbIdx - 1) && !UNITS[cand]) {
        nameToken = cand;
        used.add(verbIdx - 1);
      }
    }
  }

  let type: EntryType;
  if (paymentIdx >= 0) type = "payment";
  else if (unpaidIdx >= 0) type = "unpaid";
  else if (cashIdx >= 0) type = "cash_sale";
  else type = nameToken ? "unpaid" : "cash_sale";

  // ---- Items & amount ----------------------------------------------------
  const items: ParsedItem[] = [];
  let amount: number | null = null;

  for (let i = 0; i < tokens.length; i++) {
    if (used.has(i)) continue;
    const tok = tokens[i];
    const next = tokens[i + 1];

    let qty: number | null = null;
    if (isNumber(tok)) qty = Number(tok);
    else if (HALF.has(tok) && next && UNITS[next]) qty = 0.5;
    if (qty === null) {
      // Unit + item without a number ("إزازة زيت") → 1 of that unit
      const unitOnly = lookupUnit(tokens, i);
      const afterUnit = unitOnly ? lookupItem(tokens, i + 1) : null;
      if (unitOnly && afterUnit) {
        items.push({ name: afterUnit.item.en, nameAr: afterUnit.item.ar, quantity: 1, unit: unitOnly.unit.en, unitAr: unitOnly.unit.ar });
        for (let k = 0; k <= afterUnit.len; k++) used.add(i + k);
        i += afterUnit.len;
        continue;
      }
      // Item without a number ("5ad gebna") → quantity 1
      const found = lookupItem(tokens, i);
      if (found && !used.has(i)) {
        items.push({ name: found.item.en, nameAr: found.item.ar, quantity: 1, unit: null, unitAr: null });
        for (let k = 0; k < found.len; k++) used.add(i + k);
        i += found.len - 1;
      }
      continue;
    }

    used.add(i);
    // "100 geneh", "be 50", or a bare number in a payment → money
    const prev = tokens[i - 1];
    if ((next && CURRENCY.includes(next)) || prev === "be" || prev === "b" || prev === "bi" || prev === "ب") {
      amount = qty;
      if (next && CURRENCY.includes(next)) used.add(i + 1);
      continue;
    }

    let j = i + 1;
    const unitHit = lookupUnit(tokens, j);
    if (unitHit) {
      for (let k = 0; k < unitHit.len; k++) used.add(j + k);
      j += unitHit.len;
    }
    while (tokens[j] && (tokens[j] === "el" || tokens[j] === "men" || tokens[j] === "mn")) j++;

    const itemHit = lookupItem(tokens, j);
    if (itemHit) {
      for (let k = 0; k < itemHit.len; k++) used.add(j + k);
      items.push({
        name: itemHit.item.en,
        nameAr: itemHit.item.ar,
        quantity: qty,
        unit: unitHit?.unit.en ?? null,
        unitAr: unitHit?.unit.ar ?? null,
      });
      i = j + itemHit.len - 1;
    } else if (tokens[j] && !STOP.has(tokens[j]) && !isNumber(tokens[j]) && !TITLES[tokens[j]]) {
      // Unknown item word — keep it as written
      used.add(j);
      items.push({
        name: tokens[j],
        nameAr: tokens[j],
        quantity: qty,
        unit: unitHit?.unit.en ?? null,
        unitAr: unitHit?.unit.ar ?? null,
      });
      i = j;
    } else if (!unitHit && (type === "payment" || items.length === 0)) {
      amount = qty;
    }
  }

  // ---- Due date ----------------------------------------------------------
  const due = resolveRelativeDate(text, today);
  if (due && type === "cash_sale" && nameToken) type = "unpaid";

  // ---- Names -------------------------------------------------------------
  let customerName: string | null = null;
  let displayEn: string | null = null;
  let displayAr: string | null = null;
  if (nameToken) {
    const known = NAMES[nameToken];
    customerName = known ? known[0] : capitalize(nameToken);
    const nameAr = known ? known[1] : customerName;
    const t = title ? TITLES[title] : null;
    displayEn = t ? t.en(customerName) : customerName;
    displayAr = t ? `${t.ar} ${nameAr}` : nameAr;
  }

  return {
    customerName,
    customerTitle: title,
    customerDisplayEn: displayEn,
    customerDisplayAr: displayAr,
    phone,
    items,
    amount,
    type,
    dueDate: type === "unpaid" ? due?.date ?? null : null,
    dueLabelEn: type === "unpaid" ? due?.labelEn ?? null : null,
    dueLabelAr: type === "unpaid" ? due?.labelAr ?? null : null,
  };
}
