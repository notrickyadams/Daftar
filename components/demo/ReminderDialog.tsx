"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, X } from "lucide-react";
import Logo from "../Logo";
import { buildReminder, whatsappLink } from "@/lib/ledger";
import type { Customer, LedgerEntry } from "@/lib/types";

interface ReminderDialogProps {
  entry: LedgerEntry | null;
  customer: Customer | null;
  onClose: () => void;
  onSavePhone: (customerId: string, phone: string) => void;
}

const EG_MOBILE = /^01[0125]\d{8}$/;

export default function ReminderDialog({ entry, customer, onClose, onSavePhone }: ReminderDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const open = !!entry && !!customer;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setPhone(customer?.phone ?? "");
      setCopied(false);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, customer]);

  const message = entry && customer ? buildReminder(entry, customer.displayAr) : "";
  const digits = phone.replace(/[\s-]/g, "");
  const validPhone = EG_MOBILE.test(digits);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="reminder-title"
      className="w-[min(440px,calc(100vw-2rem))] rounded-3xl border border-beige bg-card p-0 text-navy shadow-lift backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div>
          <div className="flex items-center justify-between bg-navy px-5 py-4 text-paper">
            <div className="flex items-center gap-3">
              <Logo size={32} decorative />
              <div className="leading-tight">
                <h2 id="reminder-title" className="font-heading font-semibold">
                  Reminder for {customer!.displayEn}
                </h2>
                <p className="text-xs text-paper/70">WhatsApp preview</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="rounded-lg p-2 hover:bg-white/10"
              aria-label="Close reminder preview"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <div className="bg-paper px-5 py-6" style={{ backgroundImage: "radial-gradient(rgba(29,43,58,.06) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
            <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-wa px-4 py-3 shadow-sm">
              <p lang="ar" dir="rtl" className="text-[17px] leading-loose">
                {message}
              </p>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div>
              <label htmlFor="reminder-phone" className="block text-sm font-semibold">
                Customer&apos;s WhatsApp number
              </label>
              <input
                id="reminder-phone"
                type="tel"
                inputMode="tel"
                autoComplete="off"
                placeholder="01X XXXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => validPhone && customer && digits !== customer.phone && onSavePhone(customer.id, digits)}
                className="mt-1 w-full rounded-xl border border-beige bg-paper px-3 py-2.5 focus:border-ember focus:outline-none"
              />
              {!validPhone && (
                <p className="mt-1 text-xs text-muted">
                  No valid number yet. WhatsApp will open and let you pick the chat.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={whatsappLink(validPhone ? digits : null, message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
                onClick={() => validPhone && customer && digits !== customer.phone && onSavePhone(customer.id, digits)}
              >
                Open in WhatsApp <ExternalLink size={16} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <button type="button" onClick={copy} className="btn-secondary">
                {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
                {copied ? "Copied" : "Copy text"}
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
