import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { AgricultureBand } from "@/components/home/AgricultureBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { GrowthSection } from "@/components/home/GrowthSection";
import { IntelligenceShowcase } from "@/components/home/IntelligenceShowcase";
import { FutureBand } from "@/components/home/FutureBand";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionSeam, seamColor } from "@/components/ui/SectionSeam";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <AgricultureBand />
      <HowItWorks />
      <Features />
      <GrowthSection />
      <IntelligenceShowcase />
      <FutureBand />
      <SectionSeam from={seamColor.charcoalDeep} to={seamColor.ivory} />
      <FinalCta />
    </>
  );
}
