import { useEffect } from "react";
import { projects } from "#constants";
import useWindowStore from "#store/window";
import { openProject, openWindow } from "../lib/actions";

// #/projects, #/projects/<slug>, #/about, #/notes/<id>, #/resume, #/contact
const openFromHash = (hash) => {
  const [section, id] = hash.replace(/^#\/?/, "").split("/");
  switch (section) {
    case "projects": {
      const project = projects.find((p) => p.slug === id || p.id === id);
      return project ? openProject(project.id) : openWindow("safari", { home: Date.now() });
    }
    case "about":
      return openWindow("notes", { noteId: "about" });
    case "notes":
      return openWindow("notes", id ? { noteId: id } : undefined);
    case "resume":
    case "contact":
    case "terminal":
    case "photos":
    case "settings":
      return openWindow(section);
    default:
  }
};

export const useDeepLink = () => {
  useEffect(() => {
    if (window.location.hash) openFromHash(window.location.hash);
    const onHash = () => openFromHash(window.location.hash);
    window.addEventListener("hashchange", onHash);

    // Closing Safari clears its #/projects URL.
    const unsub = useWindowStore.subscribe((state, prev) => {
      if (
        prev.windows.safari.isOpen &&
        !state.windows.safari.isOpen &&
        window.location.hash.startsWith("#/projects")
      ) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });

    return () => {
      window.removeEventListener("hashchange", onHash);
      unsub();
    };
  }, []);
};
