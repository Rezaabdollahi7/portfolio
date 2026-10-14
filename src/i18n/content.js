import { useMemo } from "react";
import {
  archive,
  buildLocations,
  funFacts,
  funFactsFa,
  notes,
  notesFa,
  profile,
  profileFa,
  projectCategories,
  projects,
  skillCategoriesFa,
  skills,
  socials,
  trashedProjects,
} from "#constants";
import { archiveFa, categoriesFa, linkLabelsFa, projectsFa } from "#constants/projects.fa.js";
import { getLocale, useLocale } from "./locale";

// Everything content-shaped, in the current language. English is the source;
// Persian overrides are merged on top, falling back to English per field.
const build = (locale) => {
  if (locale !== "fa") {
    const content = {
      locale,
      profile,
      socials,
      skills,
      funFacts,
      projects,
      archive,
      trashedProjects,
      categories: projectCategories,
      notes,
    };
    return { ...content, locations: buildLocations(content, locale) };
  }

  const localizedProjects = projects.map((p) => ({
    ...p,
    ...projectsFa[p.id],
    links: p.links.map((l) => ({ ...l, label: linkLabelsFa[l.label] ?? l.label })),
  }));

  const content = {
    locale,
    profile: { ...profile, ...profileFa },
    socials,
    skills: skills.map((g) => ({ ...g, category: skillCategoriesFa[g.category] ?? g.category })),
    funFacts: funFactsFa,
    projects: localizedProjects,
    archive: archive.map((a) => ({ ...a, ...archiveFa[a.id] })),
    trashedProjects,
    categories: projectCategories.map((c) => ({ ...c, label: categoriesFa[c.id] ?? c.label })),
    notes: notesFa,
  };
  return { ...content, locations: buildLocations(content, locale) };
};

const cache = {};
export const getContent = (locale = getLocale()) => (cache[locale] ??= build(locale));

export const useContent = () => {
  const locale = useLocale();
  return useMemo(() => getContent(locale), [locale]);
};

// Both languages' names for a project, for search.
export const projectSearchTerms = (id) => {
  const p = projects.find((x) => x.id === id);
  const fa = projectsFa[id];
  return [p?.title, p?.tagline, fa?.title, fa?.tagline].filter(Boolean).join(" ");
};
