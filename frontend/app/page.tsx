import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { FutureBand } from "@/components/home/FutureBand";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <FutureBand />
      <FinalCta />
    </>
  );
}
