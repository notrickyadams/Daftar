"use client";

import { useEffect, useRef, useState } from "react";
import { UserPlus } from "lucide-react";

interface CustomerPromptProps {
  name: string;
  onSubmit: (phone: string | null) => void;
}

const EG_MOBILE = /^01[0125]\d{8}$/;

export default function CustomerPrompt({ name, onSubmit }: CustomerPromptProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="rounded-xl border-2 border-apricot bg-apricot/10 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        const digits = phone.replace(/[\s-]/g, "");
        if (!EG_MOBILE.test(digits)) {
          setError("Enter an Egyptian mobile number like 010 1234 5678.");
          return;
        }
        onSubmit(digits);
      }}
    >
      <p className="flex items-center gap-2 font-heading font-semibold text-navy">
        <UserPlus size={18} className="text-ember" aria-hidden />
        New customer: {name}
      </p>
      <p className="mt-1 text-sm text-muted">Add their WhatsApp number to create a profile and send reminders later.</p>
      <label htmlFor="new-customer-phone" className="mt-3 block text-sm font-semibold text-navy">
        Phone number
      </label>
      <div className="mt-1 flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          id="new-customer-phone"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          placeholder="01X XXXX XXXX"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "new-customer-phone-error" : undefined}
          className="min-w-0 flex-1 rounded-xl border border-beige bg-card px-3 py-2.5 text-navy focus:border-ember focus:outline-none"
        />
        <button type="submit" className="btn-primary !py-2.5">
          Create profile
        </button>
      </div>
      {error && (
        <p id="new-customer-phone-error" role="alert" className="mt-2 text-sm font-semibold text-ember-dark">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => onSubmit(null)}
        className="mt-3 text-sm font-semibold text-muted underline underline-offset-4 hover:text-navy"
      >
        Skip the number for now
      </button>
    </form>
  );
}
