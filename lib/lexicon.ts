/**
 * Small Egyptian Arabic / Franco dictionary used by the rule-based parser.
 * Keys are lowercase Franco spellings or Arabic words.
 */

export interface ItemWord {
  en: string;
  ar: string;
}

export const ITEMS: Record<string, ItemWord> = {
  gebna: { en: "cheese", ar: "جبنة" },
  gbna: { en: "cheese", ar: "جبنة" },
  "gebna romy": { en: "Roumi cheese", ar: "جبنة رومي" },
  "gebna beida": { en: "white cheese", ar: "جبنة بيضا" },
  pepsi: { en: "Pepsi", ar: "بيبسي" },
  bebsi: { en: "Pepsi", ar: "بيبسي" },
  chipsy: { en: "Chipsy", ar: "شيبسي" },
  shipsy: { en: "Chipsy", ar: "شيبسي" },
  "3esh": { en: "bread", ar: "عيش" },
  "3eish": { en: "bread", ar: "عيش" },
  laban: { en: "milk", ar: "لبن" },
  sokar: { en: "sugar", ar: "سكر" },
  sukkar: { en: "sugar", ar: "سكر" },
  roz: { en: "rice", ar: "رز" },
  rozz: { en: "rice", ar: "رز" },
  zeit: { en: "oil", ar: "زيت" },
  zet: { en: "oil", ar: "زيت" },
  shay: { en: "tea", ar: "شاي" },
  shai: { en: "tea", ar: "شاي" },
  bed: { en: "eggs", ar: "بيض" },
  beid: { en: "eggs", ar: "بيض" },
  mayya: { en: "water", ar: "مية" },
  maya: { en: "water", ar: "مية" },
  makarona: { en: "pasta", ar: "مكرونة" },
  zabady: { en: "yogurt", ar: "زبادي" },
  "7alawa": { en: "halawa", ar: "حلاوة" },
  fool: { en: "fava beans", ar: "فول" },
  ful: { en: "fava beans", ar: "فول" },
  "3ads": { en: "lentils", ar: "عدس" },
  sabon: { en: "soap", ar: "صابون" },
  "ma3gon": { en: "toothpaste", ar: "معجون" },
  "tona": { en: "tuna", ar: "تونة" },
  "2ahwa": { en: "coffee", ar: "قهوة" },
  ahwa: { en: "coffee", ar: "قهوة" },
  "boskot": { en: "biscuits", ar: "بسكوت" },
  "coca": { en: "Coca-Cola", ar: "كوكا" },
  "cola": { en: "Coca-Cola", ar: "كوكا" },
  // Arabic script
  "جبنة": { en: "cheese", ar: "جبنة" },
  "جبنه": { en: "cheese", ar: "جبنة" },
  "بيبسي": { en: "Pepsi", ar: "بيبسي" },
  "شيبسي": { en: "Chipsy", ar: "شيبسي" },
  "عيش": { en: "bread", ar: "عيش" },
  "لبن": { en: "milk", ar: "لبن" },
  "سكر": { en: "sugar", ar: "سكر" },
  "رز": { en: "rice", ar: "رز" },
  "زيت": { en: "oil", ar: "زيت" },
  "شاي": { en: "tea", ar: "شاي" },
  "بيض": { en: "eggs", ar: "بيض" },
  "مية": { en: "water", ar: "مية" },
  "ميه": { en: "water", ar: "مية" },
  "مكرونة": { en: "pasta", ar: "مكرونة" },
  "مكرونه": { en: "pasta", ar: "مكرونة" },
  "زبادي": { en: "yogurt", ar: "زبادي" },
  "حلاوة": { en: "halawa", ar: "حلاوة" },
  "حلاوه": { en: "halawa", ar: "حلاوة" },
  "فول": { en: "fava beans", ar: "فول" },
  "عدس": { en: "lentils", ar: "عدس" },
  "صابون": { en: "soap", ar: "صابون" },
  "تونة": { en: "tuna", ar: "تونة" },
  "تونه": { en: "tuna", ar: "تونة" },
  "قهوة": { en: "coffee", ar: "قهوة" },
  "قهوه": { en: "coffee", ar: "قهوة" },
  "بسكوت": { en: "biscuits", ar: "بسكوت" },
  "كوكا": { en: "Coca-Cola", ar: "كوكا" },
  "سجاير": { en: "cigarettes", ar: "سجاير" },
  "شيبسى": { en: "Chipsy", ar: "شيبسي" },
  "بيبسى": { en: "Pepsi", ar: "بيبسي" },
  "سكّر": { en: "sugar", ar: "سكر" },
};

export const UNITS: Record<string, ItemWord> = {
  kilo: { en: "kilo", ar: "كيلو" },
  kg: { en: "kilo", ar: "كيلو" },
  "ns kilo": { en: "half kilo", ar: "نص كيلو" },
  ezaza: { en: "bottle", ar: "إزازة" },
  ezazet: { en: "bottle", ar: "إزازة" },
  kis: { en: "bag", ar: "كيس" },
  akyas: { en: "bags", ar: "أكياس" },
  "3elba": { en: "box", ar: "علبة" },
  "3elab": { en: "boxes", ar: "علب" },
  "ra3ef": { en: "loaves", ar: "رغيف" },
  "ragheef": { en: "loaf", ar: "رغيف" },
  "kartona": { en: "carton", ar: "كرتونة" },
  "كيلو": { en: "kilo", ar: "كيلو" },
  "إزازة": { en: "bottle", ar: "إزازة" },
  "كيس": { en: "bag", ar: "كيس" },
  "علبة": { en: "box", ar: "علبة" },
  "علبه": { en: "box", ar: "علبة" },
  "علب": { en: "boxes", ar: "علب" },
  "ازازة": { en: "bottle", ar: "إزازة" },
  "ازازه": { en: "bottle", ar: "إزازة" },
  "إزازات": { en: "bottles", ar: "إزازات" },
  "أكياس": { en: "bags", ar: "أكياس" },
  "اكياس": { en: "bags", ar: "أكياس" },
  "رغيف": { en: "loaf", ar: "رغيف" },
  "أرغفة": { en: "loaves", ar: "أرغفة" },
  "كرتونة": { en: "carton", ar: "كرتونة" },
  "كيلوهات": { en: "kilo", ar: "كيلو" },
};

export interface Title {
  en: (name: string) => string;
  ar: string;
}

export const TITLES: Record<string, Title> = {
  "3am": { en: (n) => `Uncle ${n}`, ar: "عم" },
  "3amo": { en: (n) => `Uncle ${n}`, ar: "عمو" },
  om: { en: (n) => `Om ${n}`, ar: "أم" },
  umm: { en: (n) => `Om ${n}`, ar: "أم" },
  abo: { en: (n) => `Abu ${n}`, ar: "أبو" },
  abu: { en: (n) => `Abu ${n}`, ar: "أبو" },
  "7ag": { en: (n) => `Hajj ${n}`, ar: "الحاج" },
  hag: { en: (n) => `Hajj ${n}`, ar: "الحاج" },
  "7agga": { en: (n) => `Hajja ${n}`, ar: "الحاجة" },
  madam: { en: (n) => `Madam ${n}`, ar: "مدام" },
  ostaz: { en: (n) => `Mr. ${n}`, ar: "أستاذ" },
  "ost": { en: (n) => `Mr. ${n}`, ar: "أستاذ" },
  "عم": { en: (n) => `Uncle ${n}`, ar: "عم" },
  "أم": { en: (n) => `Om ${n}`, ar: "أم" },
  "ام": { en: (n) => `Om ${n}`, ar: "أم" },
  "أبو": { en: (n) => `Abu ${n}`, ar: "أبو" },
  "ابو": { en: (n) => `Abu ${n}`, ar: "أبو" },
  "الحاج": { en: (n) => `Hajj ${n}`, ar: "الحاج" },
};

/** Common first names, Franco → [English spelling, Arabic]. */
export const NAMES: Record<string, [string, string]> = {
  ahmed: ["Ahmed", "أحمد"],
  a7med: ["Ahmed", "أحمد"],
  mohamed: ["Mohamed", "محمد"],
  m7md: ["Mohamed", "محمد"],
  mahmoud: ["Mahmoud", "محمود"],
  ma7moud: ["Mahmoud", "محمود"],
  mona: ["Mona", "منى"],
  sara: ["Sara", "سارة"],
  hassan: ["Hassan", "حسن"],
  "7assan": ["Hassan", "حسن"],
  hussein: ["Hussein", "حسين"],
  ali: ["Ali", "علي"],
  "3ali": ["Ali", "علي"],
  fatma: ["Fatma", "فاطمة"],
  mostafa: ["Mostafa", "مصطفى"],
  khaled: ["Khaled", "خالد"],
  "5aled": ["Khaled", "خالد"],
  youssef: ["Youssef", "يوسف"],
  karim: ["Karim", "كريم"],
  hoda: ["Hoda", "هدى"],
  samir: ["Samir", "سمير"],
  ibrahim: ["Ibrahim", "إبراهيم"],
  omar: ["Omar", "عمر"],
  "3omar": ["Omar", "عمر"],
  nour: ["Nour", "نور"],
  salma: ["Salma", "سلمى"],
  amira: ["Amira", "أميرة"],
  sayed: ["Sayed", "سيد"],
  "أحمد": ["Ahmed", "أحمد"],
  "احمد": ["Ahmed", "أحمد"],
  "محمد": ["Mohamed", "محمد"],
  "محمود": ["Mahmoud", "محمود"],
  "منى": ["Mona", "منى"],
  "سارة": ["Sara", "سارة"],
  "حسن": ["Hassan", "حسن"],
  "علي": ["Ali", "علي"],
  "على": ["Ali", "علي"],
  "حسين": ["Hussein", "حسين"],
  "فاطمة": ["Fatma", "فاطمة"],
  "مصطفى": ["Mostafa", "مصطفى"],
  "خالد": ["Khaled", "خالد"],
  "يوسف": ["Youssef", "يوسف"],
  "كريم": ["Karim", "كريم"],
  "هدى": ["Hoda", "هدى"],
  "سمير": ["Samir", "سمير"],
  "إبراهيم": ["Ibrahim", "إبراهيم"],
  "ابراهيم": ["Ibrahim", "إبراهيم"],
  "عمر": ["Omar", "عمر"],
  "نور": ["Nour", "نور"],
  "سلمى": ["Salma", "سلمى"],
  "أميرة": ["Amira", "أميرة"],
  "سيد": ["Sayed", "سيد"],
  "ساره": ["Sara", "سارة"],
};

/**
 * Spoken Arabic numbers, as speech-to-text writes them ("اتنين كيلو").
 * "مية" (100) is also "water", so it's only read as a number next to money words.
 */
export const NUMBER_WORDS: Record<string, number> = {
  "واحد": 1, "واحدة": 1, "اتنين": 2, "اثنين": 2, "إتنين": 2, "تلاتة": 3, "تلاته": 3, "ثلاثة": 3, "تلات": 3,
  "أربعة": 4, "اربعة": 4, "اربعه": 4, "أربع": 4, "خمسة": 5, "خمسه": 5, "خمس": 5, "ستة": 6, "سته": 6,
  "سبعة": 7, "سبعه": 7, "تمانية": 8, "تمانيه": 8, "ثمانية": 8, "تسعة": 9, "تسعه": 9, "عشرة": 10, "عشره": 10,
  "عشرين": 20, "تلاتين": 30, "ثلاثين": 30, "أربعين": 40, "اربعين": 40, "خمسين": 50, "ستين": 60,
  "سبعين": 70, "تمانين": 80, "تسعين": 90, "ميتين": 200, "تلتمية": 300, "ربعمية": 400, "خمسمية": 500, "ألف": 1000, "الف": 1000,
  "نص": 0.5, "ربع": 0.25,
};
export const HUNDRED_WORDS = ["مية", "ميه", "مائة", "مئة"];

export const VERBS = {
  /** took / owes → unpaid purchase */
  unpaid: [
    "5ad", "5adet", "5adt", "akhad", "a5ad", "khad", "5do", "3aleh", "3aleih", "3aleha", "shoko", "shukak",
    "hydf3", "hayedfa3", "haydfa3", "hyedfa3", "hatdfa3", "hatedfa3", "hydfa3", "a3la", "dein", "deen", "sallef", "salaf",
    "خد", "أخد", "اخد", "خدت", "عليه", "عليها", "هيدفع", "هتدفع", "شكك", "دين",
  ],
  /** sold for cash */
  cash: ["ba3t", "bi3t", "be3t", "ba3", "cash", "kash", "ka4", "نقدي", "كاش", "بعت", "بيع"],
  /** customer paid */
  payment: ["دفعت", "دافع", "dafa3", "dafa3et", "dafa3t", "dfa3", "sadad", "sadded", "radd", "رجع", "دفع", "دفعت", "سدد", "سددت"],
};

export const CURRENCY = ["geneh", "gneh", "gnih", "genih", "egp", "le", "pound", "pounds", "جنيه", "جنية", "جنيهات", "ج"];

export const SEPARATORS = ["w", "we", "wa", "و", "+", ",", "and"];

/** Filler words to skip while reading an entry. */
export const FILLER = ["يا", "من", "في", "هو", "هي", "انا", "el", "ال", "men", "mn", "be", "b", "bi", "fe", "fi", "ya", "law", "hwa", "heya", "howa", "ana"];

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
