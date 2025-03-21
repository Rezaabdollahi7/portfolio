import { portfolioProjects } from "@/consts/PortfolioProjects";
import PortfolioCard from "@/components/PortfolioCard";
export const ProjectsSection = () => {
  return (
    <section className="container pb-16 lg:py-24 px-3 lg:max-w-5xl">
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center">
          Real-world Results
        </p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl  text-center mt-6">
        Feautured Projects
      </h2>
      <p className="text-center md:text-lg lg:text-xl max-w-md mx-auto text-white/60 mt-4">
        See How I transformed concepts into engaging digital experiences.
      </p>
      <div className="flex flex-col mt-10 gap-20 md:mt-20  ">
        {portfolioProjects.map((project) => (
          <PortfolioCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
