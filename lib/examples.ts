export const EXAMPLE_ENTRY = "3am Ahmed 5ad 2 kilo gebna hydf3 el etnen el gy";

export const DEMO_EXAMPLES = [
  { text: EXAMPLE_ENTRY, hint: "Unpaid, due next Monday" },
  { text: "Ba3t 3 pepsi w 2 chipsy", hint: "Cash sale" },
  { text: "Ahmed dafa3 100", hint: "Payment" },
  { text: "Om Mona 5adet ns kilo roz w 3esh bokra", hint: "Saved customer" },
];

/** What speech-to-text gives back when a shopkeeper says the entry in Egyptian Arabic. */
export const VOICE_EXAMPLES = [
  { text: "عم أحمد خد اتنين كيلو جبنة هيدفع الاتنين الجاي", hint: "Unpaid, due next Monday" },
  { text: "بعت تلاتة بيبسي واتنين شيبسي", hint: "Cash sale" },
  { text: "أحمد دفع مية جنيه", hint: "Payment" },
];

export const EXAMPLE_VOICE = VOICE_EXAMPLES[0].text;

export const EXAMPLE_REMINDER = "إزيك يا عم أحمد! بنفكرك بلطف بحساب ٢ كيلو الجبنة، ميعاده يوم الاتنين.";
