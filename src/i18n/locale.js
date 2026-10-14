import { create } from "zustand";
import { safeStorage } from "../lib/storage";

export const LOCALES = ["en", "fa"];
const KEY = "portfolio:locale";

// URL wins (/fa/ is a real page for search engines), then the visitor's
// saved choice, then the browser language.
const initialLocale = () => {
  if (typeof window === "undefined") return "en";
  if (/^\/fa(\/|$)/.test(window.location.pathname)) return "fa";
  const saved = safeStorage.getItem(KEY);
  if (LOCALES.includes(saved)) return saved;
  return navigator.language?.toLowerCase().startsWith("fa") ? "fa" : "en";
};

const pathFor = (locale) => (locale === "fa" ? "/fa/" : "/");

// Keep the address bar on the language's own path (/ or /fa/), so a copied
// link opens in the same language.
const syncPath = (locale) => {
  const { pathname, search, hash } = window.location;
  if (pathname === pathFor(locale)) return;
  window.history.replaceState(window.history.state, "", pathFor(locale) + search + hash);
};

const useLocaleStore = create((set) => ({
  locale: initialLocale(),
  setLocale: (locale) => {
    if (!LOCALES.includes(locale)) return;
    safeStorage.setItem(KEY, locale);
    syncPath(locale);
    set({ locale });
  },
}));

if (typeof window !== "undefined") {
  syncPath(useLocaleStore.getState().locale);
  // Back-button guard entries were pushed under the previous path.
  window.addEventListener("popstate", () => syncPath(useLocaleStore.getState().locale));
}

export const useLocale = () => useLocaleStore((s) => s.locale);
export const getLocale = () => useLocaleStore.getState().locale;
export const setLocale = (locale) => useLocaleStore.getState().setLocale(locale);
export const toggleLocale = () => setLocale(getLocale() === "fa" ? "en" : "fa");

export default useLocaleStore;
