"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AudioLines, LoaderCircle, Mic, Send, Square } from "lucide-react";
import Logo from "../Logo";
import { DEMO_EXAMPLES, VOICE_EXAMPLES } from "@/lib/examples";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import type { InputMode } from "@/lib/types";

interface EntryComposerProps {
  loading: boolean;
  onSubmit: (text: string, mode: InputMode) => void;
}

const EntryComposer = forwardRef<HTMLTextAreaElement, EntryComposerProps>(function EntryComposer(
  { loading, onSubmit },
  ref,
) {
  const [text, setText] = useState("");
  // Sample voice notes "play" word by word so the demo works in any browser
  const [sample, setSample] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const speech = useSpeechRecognition({ onFinal: (t) => onSubmit(t, "voice") });

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const busy = loading || speech.listening || sample !== null;
  const liveTranscript = sample ?? speech.interim;
  const showVoicePanel = speech.listening || sample !== null;

  const submitTyped = () => {
    const t = text.trim();
    if (!t || busy) return;
    onSubmit(t, "text");
    setText("");
  };

  const playSample = (full: string) => {
    if (busy) return;
    speech.clearError();
    const words = full.split(" ");
    setSample("");
    words.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setSample(words.slice(0, i + 1).join(" ")), 250 + i * 260));
    });
    timers.current.push(
      window.setTimeout(() => {
        setSample(null);
        onSubmit(full, "voice");
      }, 650 + words.length * 260),
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-beige bg-card shadow-paper">
      <div className="flex items-center gap-3 bg-navy px-4 py-3 text-paper">
        <Logo size={32} decorative />
        <div className="leading-tight">
          <p className="font-heading font-semibold">Daftar</p>
          <p className="text-xs text-paper/70">Say it or write it, like in the notebook</p>
        </div>
      </div>

      {/* ---- Speak ---------------------------------------------------- */}
      <div className="border-b border-beige bg-paper/70 px-4 pb-5 pt-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={speech.listening ? speech.stop : speech.start}
            disabled={!speech.supported || loading || sample !== null}
            aria-pressed={speech.listening}
            aria-label={speech.listening ? "Stop recording" : "Speak an entry in Arabic"}
            className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${
              speech.listening ? "bg-navy" : "bg-ember shadow-[0_4px_0_#7c370c] hover:bg-ember-dark"
            }`}
          >
            {speech.listening && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-ember/40" />}
            {speech.listening ? <Square size={22} fill="currentColor" aria-hidden /> : <Mic size={28} aria-hidden />}
          </button>
          <div>
            <p className="font-heading text-lg font-semibold text-navy">
              {speech.listening ? "Listening… speak in Arabic" : "Just say it in Arabic"}
            </p>
            <p className="text-sm text-muted">
              {speech.supported
                ? speech.listening
                  ? "Tap the square when you're done."
                  : "Tap the mic and talk like you would to the notebook."
                : "Live voice works in Chrome, Edge and Safari. Try a sample voice note below."}
            </p>
          </div>
        </div>

        <div aria-live="polite">
          {showVoicePanel && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl rounded-tr-sm bg-wa px-4 py-3">
              <AudioLines size={20} className="mt-1 shrink-0 animate-pulse text-green-800" aria-hidden />
              <p lang="ar" dir="rtl" className="min-h-[1.75rem] flex-1 text-lg leading-relaxed text-navy">
                {liveTranscript || "…"}
              </p>
            </div>
          )}
          {speech.error && (
            <p role="alert" className="mt-3 text-sm font-semibold text-ember-dark">
              {speech.error}
            </p>
          )}
        </div>

        <p id="voice-examples-label" className="mt-5 text-xs font-bold uppercase tracking-wider text-muted">
          Try a sample voice note
        </p>
        <div role="group" aria-labelledby="voice-examples-label" className="mt-2 flex flex-wrap gap-2">
          {VOICE_EXAMPLES.map((ex) => (
            <button
              key={ex.text}
              type="button"
              disabled={busy}
              onClick={() => playSample(ex.text)}
              className="flex items-center gap-2.5 rounded-xl border border-beige bg-card px-3 py-2 text-right transition hover:-translate-y-0.5 hover:border-apricot hover:shadow-paper disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wa text-green-900">
                <Mic size={15} aria-hidden />
              </span>
              <span>
                <span lang="ar" dir="rtl" className="block font-heading text-[15px] text-navy">
                  {ex.text}
                </span>
                <span className="block text-left text-xs text-muted">{ex.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Type ----------------------------------------------------- */}
      <div className="px-4 pt-4">
        <p id="examples-label" className="text-xs font-bold uppercase tracking-wider text-muted">
          Or type it like the notebook
        </p>
        <div role="group" aria-labelledby="examples-label" className="mt-2 flex flex-wrap gap-2">
          {DEMO_EXAMPLES.map((ex) => (
            <button
              key={ex.text}
              type="button"
              onClick={() => {
                setText(ex.text);
                if (ref && "current" in ref) ref.current?.focus();
              }}
              className="rounded-xl border border-beige bg-card px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-apricot hover:shadow-paper"
            >
              <span className="block font-hand text-xl leading-tight text-navy">{ex.text}</span>
              <span className="block text-xs text-muted">{ex.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <form
        className="mt-4 flex items-end gap-2 border-t border-beige p-3"
        onSubmit={(e) => {
          e.preventDefault();
          submitTyped();
        }}
      >
        <label htmlFor="entry-input" className="sr-only">
          Notebook entry
        </label>
        <textarea
          id="entry-input"
          ref={ref}
          rows={2}
          value={text}
          maxLength={500}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitTyped();
            }
          }}
          dir="auto"
          placeholder="e.g. 3am Ahmed 5ad 2 kilo gebna…"
          className="min-h-[56px] flex-1 resize-none rounded-xl border border-beige bg-paper/60 px-4 py-3 font-hand text-2xl leading-tight text-navy placeholder:text-muted/70 focus:border-ember focus:outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim() || busy}
          className="btn-primary h-14 w-14 shrink-0 !p-0"
          aria-label={loading ? "Reading entry" : "Send entry"}
        >
          {loading ? <LoaderCircle className="animate-spin" size={22} aria-hidden /> : <Send size={22} aria-hidden />}
        </button>
      </form>
    </div>
  );
});

export default EntryComposer;
