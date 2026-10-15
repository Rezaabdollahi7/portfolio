import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Lock } from "lucide-react";
import { useContent } from "../../i18n/content";
import { localizeDigits, useT } from "../../i18n";
import Lightbox from "../Lightbox";

const ProjectDetail = ({ project, onBack, onOpen }) => {
  const t = useT();
  const { projects } = useContent();
  const [lightbox, setLightbox] = useState(null);
  const index = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(index + 1) % projects.length];
  const [primary, ...secondary] = project.links;

  return (
    <article className="page project-detail">
      <button type="button" className="back-link" onClick={onBack}>
        <ArrowLeft aria-hidden="true" className="rtl-flip" /> {t("projects.allProjects")}
      </button>

      <div className="detail-hero">
        <p className="eyebrow">
          {project.kind} · {localizeDigits(project.year)}
          <span className="status-pill" data-status={project.status}>
            {t(`status.${project.status}`)}
          </span>
        </p>
        <h1 className="page-title">{project.title}</h1>
        <p className="page-lede">{project.tagline}</p>

        <div className="detail-actions">
          {primary && (
            <a
              className="btn btn-primary"
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {primary.kind === "source" ? (
                <Code2 aria-hidden="true" />
              ) : null}
              {primary.label}
              <ArrowUpRight aria-hidden="true" className="rtl-flip" />
            </a>
          )}
          {secondary.map((link) => (
            <a
              key={link.href}
              className="btn btn-secondary"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.kind === "source" ? <Code2 aria-hidden="true" /> : null}
              {link.label}
              <ArrowUpRight aria-hidden="true" className="rtl-flip" />
            </a>
          ))}
          {project.privateSource && (
            <span className="private-note">
              <Lock aria-hidden="true" /> {t("projects.private")}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="detail-cover"
        onClick={() => setLightbox(0)}
        aria-label={t("projects.viewShots", { title: project.title })}
      >
        <img
          src={project.thumbnail}
          alt={`${project.title} overview`}
          decoding="async"
          width="1440"
          height="900"
        />
      </button>

      <div className="detail-columns">
        <div className="detail-main">
          <section aria-labelledby="overview">
            <h2 id="overview" className="section-title">
              {t("projects.overview")}
            </h2>
            {project.description.map((para) => (
              <p key={para.slice(0, 24)} className="prose-p">
                {para}
              </p>
            ))}
          </section>

          <section aria-labelledby="highlights">
            <h2 id="highlights" className="section-title">
              {t("projects.highlights")}
            </h2>
            <ul className="highlights">
              {project.highlights.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="detail-aside" aria-label={t("projects.facts")}>
          <dl>
            <div>
              <dt>{t("projects.type")}</dt>
              <dd>{project.kind}</dd>
            </div>
            <div>
              <dt>{t("projects.year")}</dt>
              <dd className="tabular-nums">{localizeDigits(project.year)}</dd>
            </div>
            <div>
              <dt>{t("projects.status")}</dt>
              <dd>{t(`status.${project.status}`)}</dd>
            </div>
            {project.rtl && (
              <div>
                <dt>{t("projects.language")}</dt>
                <dd>{t("projects.rtl")}</dd>
              </div>
            )}
          </dl>
          <p className="aside-label">{t("projects.stack")}</p>
          <ul className="chips">
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section aria-labelledby="screens">
        <h2 id="screens" className="section-title">
          {t("projects.screens")}
        </h2>
        <div className="shots">
          {project.screenshots.map((src, i) => (
            <button
              key={src}
              type="button"
              className="shot"
              onClick={() => setLightbox(i)}
              aria-label={t("projects.openShot", { n: i + 1 })}
            >
              <img src={src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="next-project"
        onClick={() => onOpen(nextProject)}
      >
        <span className="eyebrow">{t("projects.next")}</span>
        <span className="next-project-title">
          {nextProject.title}
          <ArrowRight aria-hidden="true" className="rtl-flip" />
        </span>
        <span className="next-project-tagline">{nextProject.tagline}</span>
      </button>

      {lightbox !== null && (
        <Lightbox
          images={project.screenshots}
          index={lightbox}
          title={project.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </article>
  );
};

export default ProjectDetail;
