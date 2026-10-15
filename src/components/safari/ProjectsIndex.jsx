import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useContent } from "../../i18n/content";
import { localizeDigits, useT } from "../../i18n";
import ProjectCard from "./ProjectCard";

const ProjectsIndex = ({ onOpen }) => {
  const t = useT();
  const { projects, archive, categories } = useContent();
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="page">
      <div className="page-hero">
        <p className="eyebrow">{t("projects.eyebrow", { count: projects.length })}</p>
        <h1 className="page-title">{t("projects.title")}</h1>
        <p className="page-lede">{t("projects.lede")}</p>
      </div>

      <div className="segmented" role="tablist" aria-label={t("projects.filter")}>
        {categories.map((c) => (
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
          {t("projects.earlier")}
        </h2>
        <ul className="archive-list">
          {archive.map((item) => (
            <li key={item.id} className="archive-row">
              <span className="archive-year">{localizeDigits(item.year)}</span>
              <div className="archive-main">
                <p className="archive-name">{item.title}</p>
                <p className="archive-desc">{item.description}</p>
                <p className="archive-stack">{item.stack.join(" · ")}</p>
              </div>
              <div className="archive-links">
                <a href={item.live} target="_blank" rel="noopener noreferrer">
                  {t("projects.live")} <ArrowUpRight aria-hidden="true" className="rtl-flip" />
                </a>
                <a href={item.source} target="_blank" rel="noopener noreferrer">
                  {t("projects.code")} <ArrowUpRight aria-hidden="true" className="rtl-flip" />
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
          {t("projects.github")}
          <ArrowUpRight aria-hidden="true" className="rtl-flip" />
        </a>
      </section>
    </div>
  );
};

export default ProjectsIndex;
