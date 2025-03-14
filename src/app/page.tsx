import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center ">
      <Header />
      <HeroSection />
    </div>
  );
}
