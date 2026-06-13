import type { Metadata } from "next";
import { Mail, MapPin, Clock, Globe, AtSign, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";
import { LitGrid } from "@/components/ui/LitGrid";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about Jejau, partnerships, or your plants? Send us a message — we'd love to hear from you.",
};

const details = [
  {
    Icon: Mail,
    label: "Email",
    value: "hello@jejau.app",
    href: "mailto:hello@jejau.app",
  },
  {
    Icon: MapPin,
    label: "Based in",
    value: "Indonesia · working worldwide",
  },
  {
    Icon: Clock,
    label: "Response time",
    value: "Usually within 48 hours",
  },
];

const socials = [
  { href: "https://github.com", label: "GitHub", Icon: Globe },
  { href: "https://instagram.com", label: "Instagram", Icon: AtSign },
  { href: "https://twitter.com", label: "Twitter / X", Icon: MessageCircle },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-charcoal-deep text-ivory">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(31,111,84,0.35),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(20,80,60,0.25),transparent_50%)]"
        aria-hidden="true"
      />
      {/* grid lines light up along the cursor's path */}
      <LitGrid />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-40 sm:px-8 sm:pt-44 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left: heading + contact details */}
        <div>
          <Reveal>
            <SectionLabel tone="light">Contact</SectionLabel>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Let&apos;s grow{" "}
              <span className="text-glow bg-gradient-to-r from-mint to-forest-bright bg-clip-text text-transparent">
                something together.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/65">
              Questions about Jejau, a partnership idea, or a plant mystery
              you&apos;d love solved? We read everything.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-6">
            {details.map(({ Icon, label, value, href }, i) => (
              <li key={label}>
                <Reveal
                  x={-36}
                  y={0}
                  delay={0.15 + i * 0.12}
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint/20 bg-mint/5 transition-all duration-300 group-hover:border-mint/50 group-hover:shadow-[0_0_24px_rgba(143,227,188,0.2)]">
                    <Icon className="h-5 w-5 text-mint" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ivory/45">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 block font-medium text-ivory transition-colors hover:text-mint"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-ivory">{value}</p>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.25}>
            <div className="mt-12 border-t border-mint/10 pt-8">
              <p className="text-xs uppercase tracking-wider text-ivory/45">
                Follow along
              </p>
              <div className="mt-4 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-full border border-mint/15 p-3 text-ivory/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: the form drifts in from the opposite side */}
        <Reveal x={44} y={0} delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
