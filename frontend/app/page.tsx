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
import { StackPair } from "@/components/ui/StackPair";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionSeam from={seamColor.charcoalDeep} to={seamColor.ivory} />
      <ProblemSolution />
      <SectionSeam from={seamColor.ivory} to={seamColor.charcoalDeep} />
      <AgricultureBand />
      <SectionSeam from={seamColor.charcoalDeep} to={seamColor.ivoryDim} />
      <HowItWorks />
      <SectionSeam from={seamColor.ivoryDim} to={seamColor.charcoal} />
      <Features />
      <SectionSeam from={seamColor.charcoal} to={seamColor.ivory} />
      <GrowthSection />
      <SectionSeam from={seamColor.ivory} to={seamColor.charcoalDeep} />
      {/* the showcase pins and recedes while the future band stacks over it */}
      <StackPair back={<IntelligenceShowcase />} front={<FutureBand />} />
      <SectionSeam from={seamColor.charcoalDeep} to={seamColor.ivory} />
      <FinalCta />
    </>
  );
}
