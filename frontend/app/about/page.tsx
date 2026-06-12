import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { StoryFlow } from "@/components/about/StoryFlow";
import { NatureBand } from "@/components/about/NatureBand";
import { Team } from "@/components/about/Team";
import { Values } from "@/components/about/Values";
import { SectionSeam, seamColor } from "@/components/ui/SectionSeam";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jejau's mission: fuse nature and AI to give every plant a living health record. Meet the team behind it.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SectionSeam from={seamColor.charcoalDeep} to={seamColor.ivory} />
      <StoryFlow />
      <BotanicalDivider className="bg-ivory pb-20" />
      <SectionSeam from={seamColor.ivory} to={seamColor.charcoalDeep} />
      <NatureBand />
      <Team />
      <SectionSeam from={seamColor.charcoal} to={seamColor.ivory} />
      <Values />
    </>
  );
}
