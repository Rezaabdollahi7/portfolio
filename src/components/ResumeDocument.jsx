import { profile, projects, skills, socials } from "#constants";

// The resume, as a document. Rendered in the Resume window and as the
// print/PDF version. Only facts that appear elsewhere on this site.
const RESUME_PROJECTS = ["dofixo", "finora", "nextapps", "siemanage", "siemenspart", "dashstack"];

const ResumeDocument = () => {
  const items = RESUME_PROJECTS.map((id) => projects.find((p) => p.id === id));
  const github = socials.find((s) => s.id === "github");
  const linkedin = socials.find((s) => s.id === "linkedin");

  return (
    <div className="resume-doc">
      <div className="resume-head">
        <div>
          <h1>{profile.name}</h1>
          <p className="resume-role">{profile.role}</p>
        </div>
        <ul className="resume-contact">
          <li>{profile.location}</li>
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.phoneHref}>{profile.phone}</a>
          </li>
          <li>
            <a href={profile.website}>srezadev.ir</a>
          </li>
          <li>
            <a href={github.href}>github.com/Rezaabdollahi7</a>
          </li>
          <li>
            <a href={linkedin.href}>linkedin.com/in/{linkedin.handle}</a>
          </li>
        </ul>
      </div>

      <section>
        <h2>Profile</h2>
        <p>
          Frontend developer who builds fast, responsive, user-centric web apps
          with React, Next.js and TypeScript, and goes full-stack with Node.js,
          PostgreSQL and Docker when the product needs it. Focused on
          Persian-first, right-to-left products with careful interaction detail.
        </p>
      </section>

      <section>
        <h2>Selected projects</h2>
        {items.map((p) => (
          <div key={p.id} className="resume-item">
            <div className="resume-item-head">
              <h3>
                {p.title} <span>· {p.kind}</span>
              </h3>
              <span className="resume-year">{p.year}</span>
            </div>
            <p>{p.summary}</p>
            <ul>
              {p.highlights.slice(0, 2).map((h) => (
                <li key={h.slice(0, 20)}>{h}</li>
              ))}
            </ul>
            <p className="resume-stack">{p.stack.join(" · ")}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <dl className="resume-skills">
          {skills.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>Education</h2>
        <p>{profile.education}</p>
      </section>
    </div>
  );
};

export default ResumeDocument;
