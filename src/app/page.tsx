import { Hero } from "@/components/hero";
import { GlassNav } from "@/components/glass-nav";
import { About } from "@/components/about";
import { WorkSection } from "@/components/work-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Cursor } from "@/components/cursor";
import { Loader } from "@/components/loader";
import { AudioToggle } from "@/components/audio-toggle";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <GlassNav />
      <AudioToggle />
      <main className="relative min-h-screen overflow-hidden bg-[#0a0a0c] text-[#f5f5f7]">
        <Hero />
        <About />
        <WorkSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
