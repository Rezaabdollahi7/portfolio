import { portfolioProjects } from "@/consts/PortfolioProjects";
import PortfolioCard from "@/components/PortfolioCard";
import SectionHeader from "@/components/SectionHeader";
export const ProjectsSection = () => {
  return (
    <section className="container pb-16 lg:py-24 px-3 lg:max-w-5xl">
      <SectionHeader
        eyebrow="Real-world Results"
        title="Feautured Projects"
        description="See How I transformed concepts into engaging digital
        experiences."
      />
      <div className="flex flex-col mt-10 gap-20 md:mt-20  ">
        {portfolioProjects.map((project) => (
          <PortfolioCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
