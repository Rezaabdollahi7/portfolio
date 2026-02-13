// components/ProjectCard.jsx

import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="project-card  rounded-2xl overflow-hidden border border-gray-300/50 hover:border-gray-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group relative "
      onClick={onClick}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail */}
      <div className="relative w-full h-52 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent z-10" />
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 relative z-10">
        <h3 className="text-lg font-semibold text-[#51515] mb-2 group-hover:text-[#528abf] transition-colors">
          {project.title}
        </h3>
        <p className="text-[#999999] text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="flex items-center gap-1.5  text-gray-500 px-2.5 py-1 rounded-full border border-gray-300/50 hover:border-[#528abf] transition-all"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span>{tech.name}</span>
            </span>
          ))}
        </div>

        {/* View Button */}
        <button className="w-full py-2.5 bg-[#f6c94e] text-black/70 rounded-lg font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-blue-500/30">
          <span>View Project</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
