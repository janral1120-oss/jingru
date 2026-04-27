import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { BackgroundNoise } from "@/components/portfolio/BackgroundNoise";
import { Hero } from "@/components/portfolio/Hero";
import { CareerJourney } from "@/components/portfolio/CareerJourney";
import { SkillMap } from "@/components/portfolio/SkillMap";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <BackgroundNoise />
      <CursorGlow />
      
      <div className="relative z-10 flex flex-col max-w-[1920px] mx-auto">
        <Hero />
        
        {/* Subtle separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-12 opacity-50" />
        
        <CareerJourney />
        
        <SkillMap />
        
        <FeaturedProjects />
        
        <footer className="py-12 text-center text-muted-foreground/60 text-sm border-t border-border mt-24">
          <p>© {new Date().getFullYear()} 王静茹 (Jingru Wang). Crafted with intentionality.</p>
        </footer>
      </div>
    </main>
  );
}