import { profile, projects, skills, socials } from "#constants";

// The resume, as a document. Rendered in the Resume window and as the
// print/PDF version. Only facts that appear elsewhere on this site.
const RESUME_PROJECTS = ["dofixo", "finora", "assessment", "nextapps", "siemanage", "dashstack"];

const ResumeDocument = () => {
  const items = RESUME_PROJECTS.map((id) => projects.find((p) => p.id === id));
  const github = socials.find((s) => s.id === "github");

  return (
    <div className="resume-doc">
      <div className="resume-head">
        <div className="resume-id">
          <img className="resume-photo" src="/images/profile/reza-256.webp" alt="" width="72" height="72" />
          <div>
            <h1>{profile.name}</h1>
            <p className="resume-role">{profile.headline}</p>
          </div>
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
        </ul>
      </div>

      <section>
        <h2>Profile</h2>
        <p>
          Software Engineer focused on full-stack development and building
          practical, scalable software products, and founder of NextApps, a small
          digital product studio. Works primarily with React, Next.js,
          TypeScript and Node.js, from modern web applications to SaaS
          platforms: turning ideas into real products, designing clean
          architectures and solving problems that matter to users.
        </p>
        <p className="resume-focus">
          <strong>Currently building and exploring:</strong> {profile.focus.join(" · ")}.
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
