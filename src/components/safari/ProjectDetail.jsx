import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Lock } from "lucide-react";
import { projects } from "#constants";
import Lightbox from "../Lightbox";

const ProjectDetail = ({ project, onBack, onOpen }) => {
  const [lightbox, setLightbox] = useState(null);
  const index = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(index + 1) % projects.length];
  const [primary, ...secondary] = project.links;

  return (
    <article className="page project-detail">
      <button type="button" className="back-link" onClick={onBack}>
        <ArrowLeft aria-hidden="true" /> All projects
      </button>

      <div className="detail-hero">
        <p className="eyebrow">
          {project.kind} · {project.year}
          <span className="status-pill" data-status={project.status}>
            {project.status}
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
              <ArrowUpRight aria-hidden="true" />
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
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
          {project.privateSource && (
            <span className="private-note">
              <Lock aria-hidden="true" /> Private repository
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="detail-cover"
        onClick={() => setLightbox(0)}
        aria-label={`View ${project.title} screenshots`}
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
              Overview
            </h2>
            {project.description.map((para) => (
              <p key={para.slice(0, 24)} className="prose-p">
                {para}
              </p>
            ))}
          </section>

          <section aria-labelledby="highlights">
            <h2 id="highlights" className="section-title">
              Highlights
            </h2>
            <ul className="highlights">
              {project.highlights.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="detail-aside" aria-label="Project facts">
          <dl>
            <div>
              <dt>Type</dt>
              <dd>{project.kind}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd className="tabular-nums">{project.year}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            {project.rtl && (
              <div>
                <dt>Language</dt>
                <dd>Persian · RTL</dd>
              </div>
            )}
          </dl>
          <p className="aside-label">Stack</p>
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
          Screens
        </h2>
        <div className="shots">
          {project.screenshots.map((src, i) => (
            <button
              key={src}
              type="button"
              className="shot"
              onClick={() => setLightbox(i)}
              aria-label={`Open screenshot ${i + 1}`}
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
        <span className="eyebrow">Next project</span>
        <span className="next-project-title">
          {nextProject.title}
          <ArrowRight aria-hidden="true" />
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
