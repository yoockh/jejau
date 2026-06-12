"use client";

import { Globe, Link2, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Section";

const team = [
  {
    name: "Aisiya Qutwatunnada",
    initials: "AQ",
    role: "Co-creator · Developer",
    bio: "Builds the intelligence behind Jejau — turning leaves and lesions into diagnoses, and diagnoses into records that learn.",
    gradient: "from-forest-bright to-forest-deep",
  },
  {
    name: "Allegra Fernanda Santoso",
    initials: "AS",
    role: "Co-creator · Developer",
    bio: "Crafts the experience of Jejau — making a plant's entire health history feel as effortless as taking a photo.",
    gradient: "from-amber to-forest",
  },
];

export function Team() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32">
      <div className="bio-grid absolute inset-0" aria-hidden="true" />
      <div
        className="orb-glow absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel tone="light">The team</SectionLabel>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Two people, one growing idea.
          </h2>
          <p className="mt-5 text-ivory/60">
            Jejau is designed and built by its founders — close to the code,
            close to the plants.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {team.map(({ name, initials, role, bio, gradient }, i) => (
            <Reveal key={name} delay={i * 0.15}>
              <article className="glass group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-mint/40 hover:shadow-[0_24px_70px_rgba(47,166,120,0.25)]">
                {/* amber accent line that grows on hover */}
                <span
                  className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-amber to-forest-bright transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />

                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} font-display text-2xl font-bold text-charcoal-deep shadow-[0_8px_30px_rgba(47,166,120,0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}
                  aria-hidden="true"
                >
                  {initials}
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold">{name}</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-amber-soft">
                  {role}
                </p>
                <p className="mt-4 leading-relaxed text-ivory/65">{bio}</p>

                <div className="mt-6 flex gap-2">
                  {[
                    { Icon: Globe, label: `${name}'s website` },
                    { Icon: Link2, label: `${name} on LinkedIn` },
                    { Icon: Mail, label: `Email ${name}` },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="rounded-full border border-mint/15 p-2.5 text-ivory/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
