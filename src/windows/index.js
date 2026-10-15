import { lazy } from "react";
import WindowWrapper from "#hoc/WindowWrapper";

// Each app's code is loaded the first time it opens (or when its dock icon
// is hovered), so the desktop paints with almost nothing but the shell.
export const loaders = {
  finder: () => import("./Finder"),
  safari: () => import("./Safari"),
  notes: () => import("./Notes"),
  photos: () => import("./Photos"),
  terminal: () => import("./Terminal"),
  vscode: () => import("./Vscode"),
  contact: () => import("./Contact"),
  resume: () => import("./Resume"),
  settings: () => import("./Settings"),
  txtfile: () => import("./Text"),
  imgfile: () => import("./ImageViewer"),
  mail: () => import("./Mail"),
};

export const prefetchWindow = (key) => {
  loaders[key]?.().catch(() => {});
};

export const windows = Object.entries(loaders).map(([key, load]) => ({
  key,
  Component: WindowWrapper(lazy(load), key),
}));
