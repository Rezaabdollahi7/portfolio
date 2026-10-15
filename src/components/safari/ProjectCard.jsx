import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { localizeDigits, useT } from "../../i18n";

const ProjectCard = ({ project, onOpen, featured = false }) => {
  const t = useT();
  return (
    <article className={clsx("project-card group", featured && "is-featured")}>
      <button
        type="button"
        className="project-card-hit"
        onClick={(e) => onOpen(project, e.metaKey || e.ctrlKey)}
        onAuxClick={(e) => e.button === 1 && onOpen(project, true)}
        aria-label={t("projects.open", { title: project.title })}
      />
      <div className="project-card-media">
        <img
          src={project.thumbnail}
          alt={`${project.title}: ${project.tagline}`}
          loading="lazy"
          decoding="async"
          width="1440"
          height="900"
        />
      </div>
      <div className="project-card-body">
        <div className="project-card-meta">
          <span>{project.kind}</span>
          <span aria-hidden="true">·</span>
          <span>{localizeDigits(project.year)}</span>
          <span className="status-pill" data-status={project.status}>
            {t(`status.${project.status}`)}
          </span>
        </div>
        <h3 className="project-card-title">
          {project.title}
          <ArrowUpRight className="project-card-arrow rtl-flip" aria-hidden="true" />
        </h3>
        <p className="project-card-tagline">{project.tagline}</p>
        <p className="project-card-stack">{project.stack.slice(0, 5).join(" · ")}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
