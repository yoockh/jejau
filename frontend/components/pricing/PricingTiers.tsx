"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

type Tier = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  popular?: boolean;
  comingSoon?: boolean;
  features: string[];
  cta: { label: string; href: string; variant: "primary" | "outline" };
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Start your first health records.",
    features: [
      "Up to 3 plants",
      "AI disease detection",
      "Basic health history",
      "Basic care reminders",
    ],
    cta: { label: "Start free", href: "/register", variant: "outline" as const },
  },
  {
    name: "Pro",
    price: "$6",
    period: "/month",
    tagline: "The full memory of every plant you own.",
    popular: true,
    features: [
      "Unlimited plants",
      "Full health timeline analytics",
      "Full adaptive care calendar",
      "History export (PDF & CSV)",
      "AI care assistant",
    ],
    cta: { label: "Get Pro", href: "/register", variant: "primary" as const },
  },
  {
    name: "Garden",
    price: "Coming soon",
    period: "",
    tagline: "For nurseries, farms, and plant communities.",
    comingSoon: true,
    features: [
      "Everything in Pro",
      "Multi-user workspaces",
      "Shared plant records",
      "Roles & permissions",
    ],
    cta: { label: "Join the waitlist", href: "/contact", variant: "outline" as const },
  },
];

export function PricingTiers() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep pb-28 pt-40 text-ivory sm:pt-44">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(31,111,84,0.4),transparent_60%),radial-gradient(ellipse_at_85%_90%,rgba(20,80,60,0.25),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="bio-grid absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center"
          >
            <SectionLabel tone="light">Pricing</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Care that{" "}
            <span className="text-glow bg-gradient-to-r from-mint to-forest-bright bg-clip-text text-transparent">
              grows with you.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-6 text-lg text-ivory/65"
          >
            Start free with your first three plants. Upgrade when your jungle
            does. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        {/* Tier cards — sides slide inward while Pro rises from below */}
        <div className="mt-20 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-0">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              x={i === 0 ? -52 : i === 2 ? 52 : 0}
              y={i === 1 ? 64 : 0}
              delay={i === 1 ? 0.2 : 0.05}
              className="flex"
            >
              <article
                className={`relative flex w-full flex-col rounded-3xl p-8 transition-all duration-500 ${
                  tier.popular
                    ? "animate-breathe z-10 border border-mint/50 bg-gradient-to-b from-forest-deep/80 to-charcoal-deep shadow-[0_0_70px_rgba(47,166,120,0.3)] hover:shadow-[0_0_90px_rgba(47,166,120,0.45)] lg:-my-6 lg:scale-[1.03] lg:px-9 lg:py-12"
                    : tier.comingSoon
                      ? "glass opacity-75 hover:opacity-95 lg:rounded-l-none lg:border-l-0"
                      : "glass hover:-translate-y-1 hover:border-mint/35 lg:rounded-r-none lg:border-r-0"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-amber px-4 py-1 text-xs font-bold uppercase tracking-wider text-charcoal-deep shadow-[0_0_24px_rgba(232,178,58,0.45)]">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Most popular
                  </span>
                )}
                {tier.comingSoon && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-charcoal-deep px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-soft">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    Coming soon
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold">{tier.name}</h2>
                  {tier.comingSoon && (
                    <Users className="h-4 w-4 text-ivory/40" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-1.5 text-sm text-ivory/55">{tier.tagline}</p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={`font-display font-bold tracking-tight ${
                      tier.comingSoon
                        ? "text-2xl text-ivory/70"
                        : "text-5xl"
                    } ${tier.popular ? "text-glow text-mint" : ""}`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-ivory/50">{tier.period}</span>
                  )}
                </p>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {tier.features.map((feature, j) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.45,
                        delay: 0.45 + j * 0.07,
                        ease,
                      }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          tier.popular ? "bg-forest-bright/25" : "bg-mint/10"
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 ${
                            tier.popular ? "text-mint" : "text-forest-bright"
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-ivory/75">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-9">
                  <Button
                    href={tier.cta.href}
                    variant={tier.cta.variant}
                    size="lg"
                    className="w-full"
                  >
                    {tier.cta.label}
                    {!tier.comingSoon && (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-16 text-center text-sm text-ivory/45">
            All plans include secure photo storage and work on any device.
            Prices in USD — local pricing coming with launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
