import { useEffect } from "react";
import useSettingsStore from "#store/settings";
import { wallpapers } from "#constants";
import { useMediaQuery } from "./useMediaQuery";

export const useIsDark = () => {
  const appearance = useSettingsStore((s) => s.appearance);
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  return appearance === "dark" || (appearance === "auto" && systemDark);
};

// Applies the theme class, wallpaper and browser chrome color. Mount once.
export const useApplyTheme = () => {
  const isDark = useIsDark();
  const wallpaperId = useSettingsStore((s) => s.wallpaper);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#1c1c1e" : "#e9ecf2");
  }, [isDark]);

  useEffect(() => {
    const wp = wallpapers.find((w) => w.id === wallpaperId) ?? wallpapers[0];
    const root = document.documentElement;
    root.style.setProperty("--wallpaper-light", `url("${wp.light}")`);
    root.style.setProperty("--wallpaper-dark", `url("${wp.dark}")`);
  }, [wallpaperId]);
};

export const useToggleDark = () => {
  const isDark = useIsDark();
  const setAppearance = useSettingsStore((s) => s.setAppearance);
  return () => setAppearance(isDark ? "light" : "dark");
};
