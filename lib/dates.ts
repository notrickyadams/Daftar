export interface ResolvedDate {
  date: string;
  labelEn: string;
  labelAr: string;
}

const WEEKDAYS: { day: number; en: string; ar: string; patterns: RegExp }[] = [
  { day: 0, en: "Sunday", ar: "الحد", patterns: /\bel[ -]?(7ad|had|a7ad|ahad)\b|الحد|الأحد|الاحد/ },
  { day: 1, en: "Monday", ar: "الاتنين", patterns: /\bel[ -]?(etnen|itnen|tnen|etneen)\b|الاتنين|الإثنين|الاثنين/ },
  { day: 2, en: "Tuesday", ar: "التلات", patterns: /\bel[ -]?(talat|tlat|talata|solasa2)\b|التلات|الثلاثاء/ },
  { day: 3, en: "Wednesday", ar: "الأربع", patterns: /\bel[ -]?(arba3|arb3a|arba3a|arbe3)\b|الأربع|الاربع|الأربعاء|الاربعاء/ },
  { day: 4, en: "Thursday", ar: "الخميس", patterns: /\bel[ -]?(5ames|khamis|5amis|khamees)\b|الخميس/ },
  { day: 5, en: "Friday", ar: "الجمعة", patterns: /\bel[ -]?(gom3a|gum3a|goma3)\b|الجمعة|الجمعه/ },
  { day: 6, en: "Saturday", ar: "السبت", patterns: /\bel[ -]?(sabt)\b|السبت/ },
];

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(base: Date, n: number): Date {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  d.setDate(d.getDate() + n);
  return d;
}

/**
 * Finds a relative due date in a Franco / Egyptian Arabic entry.
 * Handles "bokra", "ba3d bokra", "awel el shahr", "el esbo3 el gy",
 * weekday names ("el etnen el gy") and "ba3d N ayam".
 */
export function resolveRelativeDate(text: string, today = new Date()): ResolvedDate | null {
  const t = text.toLowerCase();

  if (/\bba3d\s+bokra\b|بعد\s+بكر[ةه]/.test(t)) {
    return { date: toISODate(addDays(today, 2)), labelEn: "Day after tomorrow", labelAr: "بعد بكرة" };
  }
  if (/\bbokra\b|\bbukra\b|بكر[ةه]/.test(t)) {
    return { date: toISODate(addDays(today, 1)), labelEn: "Tomorrow", labelAr: "بكرة" };
  }
  if (/\b(awel|awwel)\s+el\s*shahr\b|أول\s+الشهر|اول\s+الشهر/.test(t)) {
    const d = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return { date: toISODate(d), labelEn: "1st of next month", labelAr: "أول الشهر" };
  }
  if (/\b(el\s*)?(esbo3|isbo3|osbo3)\s+el\s*(gy|gai|gay)\b|الأسبوع\s+الجاي|الاسبوع\s+الجاي/.test(t)) {
    return { date: toISODate(addDays(today, 7)), labelEn: "Next week", labelAr: "الأسبوع الجاي" };
  }
  const inDays = t.match(/\bba3d\s+(\d+)\s+(ayam|yom|youm)\b/);
  if (inDays) {
    const n = Number(inDays[1]);
    return { date: toISODate(addDays(today, n)), labelEn: `In ${n} days`, labelAr: `بعد ${toArabicDigits(n)} أيام` };
  }

  for (const wd of WEEKDAYS) {
    if (wd.patterns.test(t)) {
      let diff = (wd.day - today.getDay() + 7) % 7;
      if (diff === 0) diff = 7;
      const isNext = /\b(el\s*)?(gy|gai|gay)\b|الجاي/.test(t);
      return {
        date: toISODate(addDays(today, diff)),
        labelEn: isNext ? `Next ${wd.en}` : wd.en,
        labelAr: wd.ar,
      };
    }
  }
  return null;
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicDigits(n: number | string): string {
  return String(n).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);
}

export function fromArabicDigits(s: string): string {
  return s
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
