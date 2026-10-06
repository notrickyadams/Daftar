import { NextResponse } from "next/server";
import { parseWithAI } from "@/lib/aiParser";
import { parseWithRules } from "@/lib/ruleParser";
import type { ParseResponse } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let text = "";
  try {
    const body = await req.json();
    text = typeof body?.text === "string" ? body.text.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!text) return NextResponse.json({ error: "Entry text is required" }, { status: 400 });
  if (text.length > 500) return NextResponse.json({ error: "Entry is too long" }, { status: 400 });

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const entry = await parseWithAI(text);
      return NextResponse.json<ParseResponse>({ entry, source: "ai" });
    } catch (err) {
      console.error("[parse] AI parsing failed, using rules:", err);
      return NextResponse.json<ParseResponse>({
        entry: parseWithRules(text),
        source: "rules",
        note: "AI was unavailable, so the built-in parser handled this one.",
      });
    }
  }

  return NextResponse.json<ParseResponse>({ entry: parseWithRules(text), source: "rules" });
}
