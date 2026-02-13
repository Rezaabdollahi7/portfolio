// components/ProjectsGrid.jsx

import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = ({ projects, onProjectClick }) => {
  return (
    <div className="projects-grid">
      {/* Grid Layout */}
      <div className="projects-grid-items">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="projects-grid-empty">
          <svg
            className="empty-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p>No projects found</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
