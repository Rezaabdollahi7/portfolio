// components/ProjectDetail.jsx

import React, { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, Code as CodeIcon } from "lucide-react";
import ProjectDetailTabs from "./ProjectDetailTabs";
import ProjectDetailSkeleton from "./ProjectDetailSkeleton";

const ProjectDetail = ({ project }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [project.id]);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  return (
    <div className="project-detail-container w-full h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl font-bold text-[#454545]">
              {project.title}
            </h1>
          </div>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="flex items-center  gap-1.5  text-gray-500 px-2.5 py-1 rounded-full border border-gray-300/50 hover:border-blue-500/50 transition-all"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border-2 border-gray-500 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/20 transition-shadow duration-300">
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent z-10" />
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Detail Tabs */}
        <ProjectDetailTabs project={project} />

        {/* Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Challenges */}
            <div className="bg-white rounded-2xl p-8 border  border-gray-300/50 hover:border-gray-500/30 transition-all">
              <h3 className="text-2xl font-bold text-[#454545] mb-6 flex items-center gap-3">
                <span className="text-red-500 text-3xl">🎯</span>
                <span>Challenges & Solutions</span>
              </h3>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="text-gray-400 flex items-start gap-3 group"
                  >
                    <span className="text-gray-400  text-lg">•</span>
                    <span className="text-lg group-hover:text-black/70 transition-colors">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-1 space-y-4">
            <a
              href={project.demoUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full  bg-[#528abf] text-white py-4 px-6 rounded-xl font-bold text-center hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
            >
              <span className="text-lg">🚀 Live Demo</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={project.sourceUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full  bg-linear-to-r from-gray-800 to-gray-700 text-white py-4 px-6 rounded-xl font-bold text-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl hover:shadow-gray-700/30 border border-gray-700/50"
            >
              <span className="text-lg">💻 Source Code</span>
              <CodeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
