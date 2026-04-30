import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { BackgroundNoise } from "@/components/portfolio/BackgroundNoise";
import { Hero } from "@/components/portfolio/Hero";
import { CoreSectors } from "@/components/portfolio/CoreSectors";
import { CareerJourney } from "@/components/portfolio/CareerJourney";
import { Manifesto } from "@/components/portfolio/Manifesto";
import { MarqueeProof } from "@/components/portfolio/MarqueeProof";
import { SkillMap } from "@/components/portfolio/SkillMap";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { SocialOps } from "@/components/portfolio/SocialOps";
import { Contact } from "@/components/portfolio/Contact";
import { CareerAmbience } from "@/components/portfolio/CareerAmbience";
import { JourneyIndicator } from "@/components/portfolio/JourneyIndicator";
import { TheaterEasterEgg } from "@/components/portfolio/TheaterEasterEgg";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <BackgroundNoise />
      <CursorGlow />
      <CareerAmbience />
      <JourneyIndicator />
      <TheaterEasterEgg />

      <div className="relative z-10 flex flex-col max-w-[1920px] mx-auto">
        <Hero />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-40" />

        <CoreSectors />

        <CareerJourney />

        <Manifesto />

        <MarqueeProof />

        <SkillMap />

        <FeaturedProjects />

        <SocialOps />

        <Contact />
      </div>
    </main>
  );
}
