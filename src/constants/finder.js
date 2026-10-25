// Finder tree, generated from the (localized) project data so it never drifts.
// `l` holds the folder and file labels for the current language.

export const finderLabels = {
  en: {
    projects: "Projects",
    archive: "Archive",
    about: "About me",
    resume: "Resume",
    trash: "Trash",
    caseStudy: "Case study",
    sourceCode: "Source code",
    aboutFile: "about-me.txt",
    notes: "Notes",
    resumeFile: "Resume.pdf",
    trashReadme: "why-these-are-here.txt",
    trashTitle: "Why these are here",
    trashSubtitle: "An old experiment, kept for nostalgia",
    trashBody: [
      "A university assignment from 2024: a small tool that minimises deterministic finite automata (DFAs).",
      "It taught me a lot, but it doesn't represent how I build today, so it lives in the Trash. My other early experiments are gone for good.",
    ],
  },
  fa: {
    projects: "پروژه‌ها",
    archive: "آرشیو",
    about: "درباره من",
    resume: "رزومه",
    trash: "سطل زباله",
    caseStudy: "مطالعه موردی",
    sourceCode: "سورس کد",
    aboutFile: "درباره-من.txt",
    notes: "یادداشت‌ها",
    resumeFile: "رزومه.pdf",
    trashReadme: "چرا-اینجا-هستند.txt",
    trashTitle: "چرا این‌ها اینجا هستند",
    trashSubtitle: "یک آزمایش قدیمی، به یادگار",
    trashBody: [
      "یک تمرین دانشگاهی از سال ۲۰۲۴: ابزاری کوچک برای کمینه‌سازی ماشین‌های متناهی قطعی (DFA).",
      "چیزهای زیادی از آن یاد گرفتم، اما نشان نمی‌دهد امروز چطور کار می‌کنم؛ برای همین در سطل زباله است. بقیه آزمایش‌های اولیه‌ام را کامل پاک کرده‌ام.",
    ],
  },
};

const projectFolder = (project, l) => ({
  id: project.id,
  name: project.title,
  kind: "folder",
  icon: "/images/folder.png",
  children: [
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
      name: l.caseStudy,
      kind: "file",
      fileType: "app",
      icon: "/images/safari.png",
      target: { window: "safari", data: { projectId: project.id } },
    },
    ...project.links.map((link, i) => ({
      id: `${project.id}-link-${i}`,
      name: link.kind === "source" ? l.sourceCode : link.label,
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
  ],
});

export const buildLocations = ({ profile, projects, archive, trashedProjects }, locale = "en") => {
  const l = finderLabels[locale] ?? finderLabels.en;
  return {
    work: {
      id: "work",
      name: l.projects,
      icon: "/icons/work.svg",
      kind: "folder",
      children: [
        ...projects.map((p) => projectFolder(p, l)),
        {
          id: "archive",
          name: l.archive,
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
    },
    about: {
      id: "about",
      name: l.about,
      icon: "/icons/info.svg",
      kind: "folder",
      children: [
        {
          id: "about-txt",
          name: l.aboutFile,
          kind: "file",
          fileType: "txt",
          icon: "/images/txt.png",
          title: profile.name,
          subtitle: profile.headline,
          description: profile.summary,
        },
        {
          id: "about-notes",
          name: l.notes,
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
          name: l.resumeFile,
          kind: "file",
          fileType: "app",
          icon: "/images/pdf.png",
          target: { window: "resume" },
        },
      ],
    },
    resume: {
      id: "resume",
      name: l.resume,
      icon: "/icons/file.svg",
      kind: "folder",
      children: [
        {
          id: "resume-pdf",
          name: l.resumeFile,
          kind: "file",
          fileType: "app",
          icon: "/images/pdf.png",
          target: { window: "resume" },
        },
      ],
    },
    trash: {
      id: "trash",
      name: l.trash,
      icon: "/icons/trash.svg",
      kind: "folder",
      children: [
        {
          id: "trash-readme",
          name: l.trashReadme,
          kind: "file",
          fileType: "txt",
          icon: "/images/txt.png",
          title: l.trashTitle,
          subtitle: l.trashSubtitle,
          description: l.trashBody,
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
    },
  };
};
