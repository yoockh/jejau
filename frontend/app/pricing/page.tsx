import type { Metadata } from "next";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { PricingFaq } from "@/components/pricing/PricingFaq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free with three plants. Upgrade to Pro for unlimited plants, full timeline analytics, and the AI care assistant. Garden for nurseries is coming soon.",
};

export default function PricingPage() {
  return (
    <>
      <PricingTiers />
      <PricingFaq />
    </>
  );
}
