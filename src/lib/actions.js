import useWindowStore from "#store/window";
import useUiStore from "#store/ui";
import { getApp } from "#constants/apps.js";
import { profile } from "#constants/profile.js";

export const openExternal = (href) => {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    window.location.href = href;
    return;
  }
  window.open(href, "_blank", "noopener,noreferrer");
};

export const openWindow = (key, data) =>
  useWindowStore.getState().openWindow(key, data);

// Open an app by id: focuses it if running, restores it if minimised.
export const openApp = (appId) => {
  const app = getApp(appId);
  if (!app) return;
  if (app.href) return openExternal(app.href);

  const { windows, openWindow: open, focusWindow } = useWindowStore.getState();
  const win = windows[app.window];
  if (win?.isOpen && !app.data) return focusWindow(app.window);
  open(app.window, app.data);
};

export const openProject = (projectId) =>
  openWindow("safari", { projectId, nonce: Date.now() });

// Handles "app:safari/dofixo", "app:notes/stack", "app:finder/trash", etc.
export const openInternalLink = (href) => {
  const [windowKey, id] = href.replace(/^app:/, "").split("/");
  if (windowKey === "safari") {
    return id ? openProject(id) : openWindow("safari", { home: Date.now() });
  }
  if (windowKey === "notes") return openWindow("notes", id ? { noteId: id } : undefined);
  if (windowKey === "finder") return openWindow("finder", { location: id || "work" });
  return openWindow(windowKey);
};

export const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    useUiStore.getState().showToast("Email copied to clipboard");
  } catch {
    window.location.href = `mailto:${profile.email}`;
  }
};
