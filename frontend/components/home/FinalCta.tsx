"use client";

import { ArrowRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="relative bg-ivory px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-forest-deep via-forest to-forest-dark px-8 py-16 text-center text-ivory shadow-[0_30px_90px_rgba(31,111,84,0.35)] sm:px-16 sm:py-20">
          <div className="bio-grid absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-mint/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <span className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-ivory/10 backdrop-blur-sm">
              <Sprout className="h-7 w-7 text-mint" aria-hidden="true" />
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Start your plant&apos;s health record today.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/75">
              One photo is all it takes. Free to start — your plants&apos;
              memories are waiting to be written.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/register" variant="amber" size="lg">
                Get started free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                Meet the team
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
