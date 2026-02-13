// components/ProjectCard.jsx

import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card group" onClick={onClick}>
      {/* Animated Background */}
      <div className="project-card-bg" />

      {/* Thumbnail */}
      <div className="project-card-thumbnail">
        <div className="project-card-overlay" />
        <img
          src={project.thumbnail}
          alt={project.title}
          className="project-card-image"
        />
      </div>

      {/* Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>

        {/* Tech Stack Badges */}
        <div className="project-card-tech-stack">
          {project.techStack.map((tech, index) => (
            <span key={index} className="project-card-tech-badge">
              <img
                src={tech.icon}
                alt={tech.name}
                className="project-card-tech-icon"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span>{tech.name}</span>
            </span>
          ))}
        </div>

        {/* View Button */}
        <button className="project-card-view-btn">
          <span>View Project</span>
          <svg
            className="project-card-arrow"
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
