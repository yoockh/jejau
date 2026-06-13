"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Send, Loader2, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * TODO: Replace with your real Formspree form ID (https://formspree.io).
 * Example: const FORMSPREE_FORM_ID = "xqkrgvyz";
 */
const FORMSPREE_FORM_ID = "YOUR_FORMSPREE_FORM_ID";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClasses =
  "w-full rounded-xl border border-mint/20 bg-charcoal-deep/60 px-4 py-3 text-ivory placeholder:text-ivory/35 transition-all duration-300 focus:border-mint/60 focus:shadow-[0_0_0_1px_rgba(143,227,188,0.25),0_0_28px_rgba(47,166,120,0.18)] focus:outline-none";

/** Wraps a field with a luminous underline that grows while it's focused. */
function FieldGlow({ children }: { children: ReactNode }) {
  return (
    <div className="relative [&:focus-within>span]:scale-x-100">
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px left-4 right-4 h-px origin-left scale-x-0 bg-gradient-to-r from-mint via-forest-bright to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ boxShadow: "0 0 12px rgba(143,227,188,0.6)" }}
      />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-forest-bright" aria-hidden="true" />
        <h3 className="mt-6 font-display text-2xl font-bold text-ivory">
          Message planted.
        </h3>
        <p className="mt-3 max-w-xs text-ivory/65">
          Thanks for reaching out — we&apos;ll get back to you within a couple
          of days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-mint underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-ivory/80"
          >
            Name
          </label>
          <FieldGlow>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClasses}
            />
          </FieldGlow>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-ivory/80"
          >
            Email
          </label>
          <FieldGlow>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClasses}
            />
          </FieldGlow>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-ivory/80"
        >
          Message
        </label>
        <FieldGlow>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            placeholder="Tell us about your plants, your farm, or your idea…"
            className={`${fieldClasses} resize-y`}
          />
        </FieldGlow>
      </div>

      {/*
        TODO: reCAPTCHA — Formspree includes built-in spam filtering; to add
        Google reCAPTCHA v2, drop the widget here and enable it in your
        Formspree form settings.
      */}
      <p className="mt-4 inline-flex items-center gap-2 text-xs text-ivory/40">
        <ShieldCheck className="h-3.5 w-3.5 text-forest-bright" aria-hidden="true" />
        Protected against spam. reCAPTCHA can be enabled in Formspree settings.
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 flex items-center gap-2 rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-amber-soft"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Something went wrong — the form isn&apos;t connected yet or the
          network failed. Please try again or email us directly.
        </p>
      )}

      <div className="mt-8">
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
