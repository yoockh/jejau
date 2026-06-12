import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { StoryFlow } from "@/components/about/StoryFlow";
import { Team } from "@/components/about/Team";
import { Values } from "@/components/about/Values";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jejau's mission: fuse nature and AI to give every plant a living health record. Meet the team behind it.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StoryFlow />
      <Team />
      <Values />
    </>
  );
}
