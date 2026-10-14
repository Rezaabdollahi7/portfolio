import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { archive, projectCategories, projects } from "#constants";
import ProjectCard from "./ProjectCard";

const ProjectsIndex = ({ onOpen }) => {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="page">
      <div className="page-hero">
        <p className="eyebrow">Selected work · {projects.length} projects</p>
        <h1 className="page-title">Projects</h1>
        <p className="page-lede">
          Things I've built recently, from SaaS products to client sites. Most of
          them are Persian-first: right-to-left, Jalali dates, built for people
          who use them every day.
        </p>
      </div>

      <div className="segmented" role="tablist" aria-label="Filter projects">
        {projectCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={filter === c.id}
            className="segmented-item"
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visible.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
            featured={filter === "all" && i === 0}
          />
        ))}
      </div>

      <section className="archive" aria-labelledby="archive-title">
        <h2 id="archive-title" className="section-title">
          Earlier work
        </h2>
        <ul className="archive-list">
          {archive.map((item) => (
            <li key={item.id} className="archive-row">
              <span className="archive-year">{item.year}</span>
              <div className="archive-main">
                <p className="archive-name">{item.title}</p>
                <p className="archive-desc">{item.description}</p>
                <p className="archive-stack">{item.stack.join(" · ")}</p>
              </div>
              <div className="archive-links">
                <a href={item.live} target="_blank" rel="noopener noreferrer">
                  Live <ArrowUpRight aria-hidden="true" />
                </a>
                <a href={item.source} target="_blank" rel="noopener noreferrer">
                  Code <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <a
          className="github-cta"
          href="https://github.com/Rezaabdollahi7?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github aria-hidden="true" />
          Everything else is on GitHub
          <ArrowUpRight aria-hidden="true" />
        </a>
      </section>
    </div>
  );
};

export default ProjectsIndex;
