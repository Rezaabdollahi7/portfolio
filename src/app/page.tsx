import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
export default function Home() {
  return (
    <div className="relative flex flex-col items-center ">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection/>
      <AboutSection/>
    </div>
  );
}
