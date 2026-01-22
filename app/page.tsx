import { HeroSection } from "@/components/ui/hero-section";
import { TechStack } from "@/components/ui/tech-stack";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 overflow-x-hidden selection:bg-green-500/30">
      <HeroSection />
      <TechStack />
      <ProjectShowcase />
      <Footer />
    </main>
  );
}
