import { profile, socials } from "#constants";

// The resume, as a document. Rendered in the Resume window and as the
// print/PDF version. Its wording is tuned for a one-glance read, so it keeps
// its own copy instead of reusing the longer project write-ups.
const PROJECTS = [
  {
    title: "Dofixo",
    kind: "Multi-tenant SaaS",
    year: "2026",
    summary:
      "A hosted platform for small phone, laptop, and appliance repair shops. Each workshop gets an isolated workspace to manage operations from device intake to invoicing and profit reports.",
    points: [
      "Enforced tenant isolation through a Prisma extension that injects workspace IDs into queries, backed by PostgreSQL Row-Level Security (RLS).",
      "Propagated workspace context from verified JWTs through AsyncLocalStorage into PostgreSQL set_config, never from request bodies.",
    ],
    stack: ["React 19", "TypeScript", "Node.js", "Express 5", "PostgreSQL", "Prisma", "Tailwind CSS 4", "Docker", "Astro"],
  },
  {
    title: "Finora",
    kind: "Open-source product",
    year: "2026",
    summary:
      "A Persian-first household finance manager with RTL support, a Jalali calendar, and self-hosted data storage.",
    points: [
      "Derived account balances from transactions, with transfers excluded from spending calculations.",
      "Implemented loans with automatic instalment schedules, recurring payments, rollover budgets, savings goals, and asset price history.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Radix UI", "Tailwind CSS", "GSAP", "Three.js", "Recharts", "Docker"],
  },
  {
    title: "Secure Assessment Dashboard",
    kind: "Full-stack app",
    year: "2026",
    summary:
      "A full-stack dashboard for organizations to track security assessment projects and their findings, with organization-level data isolation and role-based permissions.",
    points: [
      "Enforced tenant isolation using organization IDs from verified access tokens; records belonging to other organizations return 404 to prevent existence disclosure.",
      "Implemented role-based access control, with route-level permissions enforced by the API and UI actions determined by API-provided permissions.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "NestJS 11", "PostgreSQL", "TypeORM", "Redis", "Tailwind CSS 4", "Docker", "Turborepo"],
  },
  {
    title: "NextApps",
    kind: "Founder · Studio website",
    year: "2026",
    summary:
      "Founded NextApps, a small digital product studio building websites, online stores, web applications, and SaaS products. Dofixo and Finora are part of its product work.",
    points: ["Developed a Persian RTL studio website featuring services, pricing, case studies, and blog sections."],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "SieManage",
    kind: "Full-stack app",
    year: "2025",
    summary:
      "A task management system where managers assign and track work while employees manage their daily tasks, with real-time notifications and a bilingual Persian/English interface.",
    points: [
      "Implemented JWT authentication with Manager and Employee roles.",
      "Built WebSocket notifications for assignments, status changes, approaching deadlines, and overdue tasks, driven by scheduled jobs.",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Socket.io", "Tailwind CSS", "i18next", "Docker", "Nginx"],
  },
];

const SKILLS = [
  ["Frontend", "React, Next.js, TypeScript, JavaScript, Redux, React Router"],
  ["Backend", "Node.js, Express, NestJS, Prisma, TypeORM, Socket.io, Zod"],
  ["Database", "PostgreSQL, Redis, MongoDB"],
  ["UI & Styling", "Tailwind CSS, Material UI, Radix UI, Sass"],
  ["Animation & Graphics", "GSAP, Framer Motion, Three.js"],
  ["DevOps & Tools", "Docker, Nginx, Caddy, Git, GitHub"],
];

const ResumeDocument = () => {
  const github = socials.find((s) => s.id === "github");

  return (
    <div className="resume-doc">
      <div className="resume-head">
        <div>
          <h1>{profile.name}</h1>
          <p className="resume-role">{profile.headline}</p>
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
          Software Engineer and founder of NextApps, focused on full-stack
          development and building scalable web applications and SaaS products.
          Experienced with React, Next.js, TypeScript, Node.js, and PostgreSQL,
          with a strong interest in product development and AI-powered
          applications.
        </p>
      </section>

      <section>
        <h2>Selected projects</h2>
        {PROJECTS.map((p) => (
          <div key={p.title} className="resume-item">
            <div className="resume-item-head">
              <h3>
                {p.title} <span>· {p.kind}</span>
              </h3>
              <span className="resume-year">{p.year}</span>
            </div>
            <p>{p.summary}</p>
            <ul>
              {p.points.map((point) => (
                <li key={point.slice(0, 24)}>{point}</li>
              ))}
            </ul>
            <p className="resume-stack">Tech Stack: {p.stack.join(" · ")}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <dl className="resume-skills">
          {SKILLS.map(([category, items]) => (
            <div key={category}>
              <dt>{category}</dt>
              <dd>{items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>Education</h2>
        <p>
          <strong>{profile.education}</strong>
          <br />
          {profile.university}
        </p>
      </section>
    </div>
  );
};

export default ResumeDocument;
