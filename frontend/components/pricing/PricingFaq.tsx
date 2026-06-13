"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const faqs = [
  {
    q: "Is the Free plan really free forever?",
    a: "Yes. Three plants, disease detection, and basic history cost nothing, with no time limit and no card required. Free isn't a trial — it's how most people should start.",
  },
  {
    q: "What counts as a plant?",
    a: "Each plant profile is one plant: it has its own photo log, health timeline, and care schedule. A monstera and its cutting are two plants, because they'll have two different stories.",
  },
  {
    q: "Can I cancel Pro at any time?",
    a: "Anytime, in one click, no questions asked. Your plants' records are never deleted — if you downgrade, your three most recent plants stay active and the rest are safely archived until you return.",
  },
  {
    q: "How accurate is the disease detection?",
    a: "Our vision model is trained on real crop and houseplant pathology and shows you its confidence with every diagnosis. And because Jejau keeps history, each new scan is read in the context of the last one — which catches what a single photo can miss.",
  },
  {
    q: "When is the Garden plan launching?",
    a: "We're building Garden together with a small group of nurseries and community gardens. Join the waitlist through the contact page and we'll let you know the moment multi-user workspaces open up.",
  },
];

function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        open
          ? "border-forest/30 bg-white shadow-[0_12px_40px_rgba(31,111,84,0.12)]"
          : "border-forest/10 bg-white/70 hover:-translate-y-0.5 hover:border-forest/25 hover:shadow-[0_10px_30px_rgba(31,111,84,0.1)]"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-display text-base font-semibold text-charcoal sm:text-lg">
            {q}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              open ? "bg-forest text-ivory" : "bg-forest/10 text-forest"
            }`}
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="px-6 pb-6 leading-relaxed text-charcoal/65">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-ivory py-24 sm:py-32">
      <div
        className="bio-grid-light absolute inset-0 [mask-image:linear-gradient(transparent,black_40%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <SectionLabel>Questions</SectionLabel>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Before you plant a decision.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.08}>
              <FaqItem
                {...faq}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-charcoal/60">
            Something else on your mind?{" "}
            <a
              href="/contact"
              className="font-semibold text-forest underline-offset-4 hover:underline"
            >
              Ask us directly →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
