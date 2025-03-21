import React from "react";
import Image from "next/image";
import { GoCheckCircle } from "react-icons/go";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProjectType } from "@/types/ProjectType";

interface PortfolioCardProps {
  project: ProjectType;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  return (
    <div
      key={project.title}
      className="bg-gray-800 rounded-3xl px-6 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 relative z-0  overflow-hidden after:z-10 border border-white/20"
    >
      <div className="lg:grid lg:grid-cols-2 lg: gap-16 ">
        <div className="lg:pb-16">
          <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm bg-clip-text text-transparent">
            <span>{project.company}</span>
            <span>&bull;</span>
            <span>{project.year}</span>
          </div>

          <h3 className="font-serif text-2xl mt-2 md:text-4xl md:mt-4 ">
            {project.title}
          </h3>
          <hr className="border-t-2 border-white/5 mt-4 md:mt-8" />
          <ul className="flex flex-col gap-4 mt-4 md:mt-5">
            {project.results.map((res) => (
              <li
                key={res.title}
                className="flex gap-2 items-center text-sm md:text-base text-white/50"
              >
                <GoCheckCircle className="size-5 md:size-6" />
                <span>{res.title}</span>
              </li>
            ))}
          </ul>
          <a href={project.link} target="_blank">
            <button className="bg-white text-gray-950 h-12 w-full  px-4 rounded-xl font-semibold flex items-center justify-center gap-2 mt-8">
              <span>Visit Live Site</span>
              <MdOutlineArrowOutward className="size-4" />
            </button>
          </a>
        </div>
        <div className="relative">
          <Image
            src={project.image}
            alt={project.title}
            className="mt-8 -mb-4 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
