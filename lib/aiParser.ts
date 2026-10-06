import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import type { ParsedEntry } from "./types";

const ItemSchema = z.object({
  name: z.string().describe("Item name in simple English, e.g. 'cheese'"),
  nameAr: z.string().describe("Item name in Egyptian Arabic script without 'ال', e.g. 'جبنة'"),
  quantity: z.number().nullable(),
  unit: z.string().nullable().describe("English unit, e.g. 'kilo', 'bottle', 'bag', or null"),
  unitAr: z.string().nullable().describe("Arabic unit, e.g. 'كيلو', 'إزازة', or null"),
});

export const EntrySchema = z.object({
  customerName: z.string().nullable().describe("Base first name in English letters, e.g. 'Ahmed'"),
  customerTitle: z.string().nullable().describe("Nickname/honorific exactly as written, e.g. '3am', 'om', 'abo'"),
  customerDisplayEn: z.string().nullable().describe("Friendly English name, e.g. 'Uncle Ahmed', 'Om Mona'"),
  customerDisplayAr: z.string().nullable().describe("Friendly Arabic name, e.g. 'عم أحمد', 'أم منى'"),
  phone: z.string().nullable().describe("Egyptian mobile in local format 01XXXXXXXXX if written, else null"),
  items: z.array(ItemSchema),
  amount: z.number().nullable().describe("Money amount in EGP if written, else null"),
  type: z.enum(["cash_sale", "unpaid", "payment"]),
  dueDate: z.string().nullable().describe("YYYY-MM-DD, only for unpaid entries with a due date"),
  dueLabelEn: z.string().nullable().describe("e.g. 'Next Monday', 'Tomorrow'"),
  dueLabelAr: z.string().nullable().describe("Egyptian Arabic: weekday like 'الاتنين' (no 'يوم'), or 'بكرة', 'أول الشهر'"),
});

const SYSTEM_PROMPT = `You read entries that Egyptian shopkeepers (bekala, koshk) write in their paper credit notebook ("daftar") and turn each one into structured data.

Entries are short and informal, written in Egyptian Arabic script or in Franco (Arabic in Latin letters). Many are spoken out loud and arrive as a speech-to-text transcript in Arabic script: expect no punctuation, numbers said as words ("اتنين كيلو" = 2 kilo, "تلاتة" = 3, "نص" = half, "مية جنيه" = 100 pounds, "بخمسين" = for 50), and occasional mis-heard words.

Franco conventions:
- Numerals stand for Arabic letters: 2 = ء/ق, 3 = ع, 5 = خ, 7 = ح, 8 = غ, 9 = ص. So "5ad" = خد (took), "3am" = عم, "dafa3" = دفع (paid), "7ag" = حاج.
- A token made only of digits is a number (quantity or money); digits inside a word are letters.
- Spelling is inconsistent: "hydf3", "hayedfa3", "haydfa3" all mean هيدفع (will pay).

Names and nicknames:
- "3am X" = عم X (Uncle X), "om X" = أم X (Om X), "abo X" = أبو X (Abu X), "7ag/hag X" = الحاج X (Hajj X), "madam X", "ostaz X".
- customerName is just the first name in English letters ("Ahmed"), used to match saved profiles. Keep the nickname in customerTitle.

Entry type:
- unpaid: the customer took goods to pay later ("5ad", "a5ad", "3aleh", "shokok", "hydf3", "خد", "عليه", "شكك").
- payment: the customer paid money ("dafa3", "sadad", "دفع"). The number is the amount.
- cash_sale: the shopkeeper sold for cash, usually with no customer ("ba3t", "bi3t", "cash", "بعت").

Quantities and units: "ns/nos" = half (0.5), "kilo", "ezaza" = bottle, "kis" = bag, "3elba" = box. "w"/"we"/"و" = and. A number followed by "geneh"/"gneh"/"جنيه" or preceded by "be" is money (amount), not a quantity. Common items: gebna = جبنة cheese, 3esh = عيش bread, laban = لبن milk, roz = رز rice, sokar = سكر sugar, zeit = زيت oil, bed = بيض eggs, shay = شاي tea, pepsi = بيبسي, chipsy = شيبسي.

Relative dates (resolve against the "Today" line in the message):
- "bokra" = tomorrow, "ba3d bokra" = day after tomorrow.
- "el etnen el gy" / "الاتنين الجاي" = the next Monday after today (if today is Monday, one week later). Same for other weekdays: el 7ad (Sun), el etnen (Mon), el talat (Tue), el arba3 (Wed), el 5ames (Thu), el gom3a (Fri), el sabt (Sat).
- "awel el shahr" = the 1st of next month. "el esbo3 el gy" = in 7 days.
Only set dueDate for unpaid entries. Leave fields null when the entry doesn't say them; don't guess prices.`;

export async function parseWithAI(entry: string, today = new Date()): Promise<ParsedEntry> {
  const client = new Anthropic();
  const todayLine = `Today: ${today.toLocaleDateString("en-GB", { weekday: "long" })}, ${today.toISOString().slice(0, 10)}`;

  const response = await client.messages.parse(
    {
      model: "claude-opus-5-5",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      output_config: { effort: "low", format: zodOutputFormat(EntrySchema) },
      messages: [{ role: "user", content: `${todayLine}\n\nNotebook entry:\n${entry}` }],
    },
    { timeout: 25_000 },
  );

  if (response.stop_reason === "refusal" || !response.parsed_output) {
    throw new Error(`No structured output (stop_reason: ${response.stop_reason})`);
  }
  return response.parsed_output;
}
