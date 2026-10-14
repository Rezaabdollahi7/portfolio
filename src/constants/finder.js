// Finder tree, generated from the project data so it never drifts.

import { profile } from "./profile";
import { projects, archive, trashedProjects } from "./projects";

const projectFolder = (project) => {
  const children = [
    {
      id: `${project.id}-txt`,
      name: `${project.title}.txt`,
      kind: "file",
      fileType: "txt",
      icon: "/images/txt.png",
      title: project.title,
      subtitle: project.tagline,
      description: [project.summary, ...project.description.slice(1)],
    },
    {
      id: `${project.id}-case`,
      name: "Case study",
      kind: "file",
      fileType: "app",
      icon: "/images/safari.png",
      target: { window: "safari", data: { projectId: project.id } },
    },
    ...project.links.map((link, i) => ({
      id: `${project.id}-link-${i}`,
      name: link.kind === "source" ? "Source code" : link.label,
      kind: "file",
      fileType: "url",
      icon: link.kind === "source" ? "/images/github.webp" : "/images/safari.png",
      href: link.href,
    })),
    ...project.screenshots.slice(0, 3).map((src, i) => ({
      id: `${project.id}-img-${i}`,
      name: `${project.slug}-${i + 1}.webp`,
      kind: "file",
      fileType: "img",
      icon: "/images/image.png",
      imageUrl: src,
    })),
  ];

  return {
    id: project.id,
    name: project.title,
    kind: "folder",
    icon: "/images/folder.png",
    children,
  };
};

const WORK = {
  id: "work",
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    ...projects.map(projectFolder),
    {
      id: "archive",
      name: "Archive",
      kind: "folder",
      icon: "/images/folder.png",
      children: archive.map((item) => ({
        id: `archive-${item.id}`,
        name: item.title,
        kind: "file",
        fileType: "url",
        icon: "/images/safari.png",
        href: item.live,
      })),
    },
  ],
};

const ABOUT = {
  id: "about",
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: "about-txt",
      name: "about-me.txt",
      kind: "file",
      fileType: "txt",
      icon: "/images/txt.png",
      title: profile.name,
      subtitle: profile.headline,
      description: profile.summary,
    },
    {
      id: "about-notes",
      name: "Notes",
      kind: "file",
      fileType: "app",
      icon: "/images/Notes.png",
      target: { window: "notes" },
    },
    {
      id: "about-contact",
      name: "reza.vcf",
      kind: "file",
      fileType: "app",
      icon: "/images/contact.webp",
      target: { window: "contact" },
    },
    {
      id: "about-resume",
      name: "Resume.pdf",
      kind: "file",
      fileType: "app",
      icon: "/images/pdf.png",
      target: { window: "resume" },
    },
  ],
};

const RESUME = {
  id: "resume",
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: "resume-pdf",
      name: "Resume.pdf",
      kind: "file",
      fileType: "app",
      icon: "/images/pdf.png",
      target: { window: "resume" },
    },
  ],
};

const TRASH = {
  id: "trash",
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: "trash-readme",
      name: "why-these-are-here.txt",
      kind: "file",
      fileType: "txt",
      icon: "/images/txt.png",
      title: "Why these are here",
      subtitle: "Old experiments, kept for nostalgia",
      description: [
        "These are some of my first projects from 2023 and 2024: static HTML sites and early React experiments.",
        "They taught me a lot, but they don't represent how I build today, so they live in the Trash. The repos are still on GitHub if you're curious.",
      ],
    },
    ...trashedProjects.map((item) => ({
      id: `trash-${item.name}`,
      name: item.name,
      kind: "file",
      fileType: "url",
      icon: "/images/folder.png",
      href: item.href,
    })),
  ],
};

export const locations = {
  work: WORK,
  about: ABOUT,
  resume: RESUME,
  trash: TRASH,
};
