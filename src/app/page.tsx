import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
export default function Home() {
  return (
    <div className="relative flex flex-col items-center ">
      <Header />
      <HeroSection />
      <ProjectsSection />
    </div>
  );
}
