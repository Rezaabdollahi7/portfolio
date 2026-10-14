// VS Code window content. Files are plain strings; the editor highlights them.

import { profile, skills, socials } from "./profile";
import { projects } from "./projects";

export const FILE_TREE = [
  {
    name: "portfolio",
    type: "folder",
    open: true,
    children: [
      {
        name: "src",
        type: "folder",
        open: true,
        children: [
          { name: "about.tsx", type: "file", lang: "tsx" },
          { name: "skills.ts", type: "file", lang: "ts" },
          { name: "projects.ts", type: "file", lang: "ts" },
          { name: "contact.tsx", type: "file", lang: "tsx" },
        ],
      },
      { name: "README.md", type: "file", lang: "md" },
      { name: "package.json", type: "file", lang: "json" },
    ],
  },
];

const q = (s) => JSON.stringify(s);

export const FILE_CONTENTS = {
  "about.tsx": {
    lang: "tsx",
    code: `const Developer = () => ({
  name: ${q(profile.name)},
  role: ${q(profile.role)},
  location: ${q(profile.location)},
  education: ${q(profile.education)},
  focus: ["React", "Next.js", "TypeScript", "Node.js"],
  available: true,
  coffee: "required",
});

// I turn coffee into code,
// and ideas into interfaces.

export default Developer;`,
  },
  "skills.ts": {
    lang: "ts",
    code: `type Category = ${skills.map((s) => q(s.category)).join(" | ")};

export const skills: Record<Category, string[]> = {
${skills.map((s) => `  ${q(s.category)}: [${s.items.map(q).join(", ")}],`).join("\n")}
};`,
  },
  "projects.ts": {
    lang: "ts",
    code: `interface Project {
  name: string;
  stack: string[];
  status: "Live" | "Open source";
}

export const projects: Project[] = [
${projects
  .map(
    (p) => `  {
    name: ${q(p.title)},
    stack: [${p.stack.slice(0, 4).map(q).join(", ")}],
    status: ${q(p.status)},
  },`,
  )
  .join("\n")}
];`,
  },
  "contact.tsx": {
    lang: "tsx",
    code: `export const contact = {
${socials.map((s) => `  ${s.id}: ${q(s.href.replace("mailto:", ""))},`).join("\n")}
  openTo: "freelance & full-time",
};

// Fastest reply: email or Telegram.`,
  },
  "README.md": {
    lang: "md",
    code: `# Hey, I'm ${profile.name}

${profile.headline}.

## Building
- Dofixo: multi-tenant SaaS for repair workshops
- Finora: self-hosted household finance manager

## Stack
- React / Next.js / TypeScript / Tailwind CSS
- GSAP / Framer Motion / Three.js
- Node.js / PostgreSQL / Prisma / Docker

## Get in touch
[Email](mailto:${profile.email})`,
  },
  "package.json": {
    lang: "json",
    code: `{
  "name": "portfolio",
  "author": ${q(profile.name)},
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "gsap": "^3.14.2",
    "react": "^19.2.0",
    "tailwindcss": "^4.1.18",
    "zustand": "^5.0.10"
  }
}`,
  },
};

export const TERMINAL_LINES = [
  { type: "dir", text: "portfolio on  main" },
  { type: "cmd", text: "pnpm dev" },
  { type: "info", text: "" },
  { type: "info", text: "  VITE v7.3.1  ready in 284 ms" },
  { type: "info", text: "" },
  { type: "success", text: "  ➜  Local:   http://localhost:5173/" },
  { type: "info", text: "  ➜  Network: use --host to expose" },
  { type: "info", text: "" },
  { type: "dir", text: "portfolio on  main" },
  { type: "cmd", text: "git log --oneline -5" },
  { type: "info", text: "1dc5cbb refactor: edit work locations, about me" },
  { type: "info", text: "afdee60 docs: add README with screenshots" },
  { type: "info", text: "1c994a6 feat: projects section with lightbox" },
  { type: "info", text: "0cb94f5 feat: add VSCode window" },
  { type: "info", text: "a692c39 feat: settings with theme & wallpaper" },
];
