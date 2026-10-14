import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeStorage } from "../lib/storage";

// Carry over choices saved by the previous version of the site.
const legacyTheme = safeStorage.getItem("theme");
const legacyWallpaper = safeStorage.getItem("wallpaper");

// Appearance: "auto" follows the OS, like macOS.
const useSettingsStore = create(
  persist(
    (set) => ({
      appearance:
        legacyTheme === "dark" || legacyTheme === "light" ? legacyTheme : "auto",
      wallpaper: legacyWallpaper || "default",
      setAppearance: (appearance) => set({ appearance }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: "portfolio:settings",
      storage: createJSONStorage(() => safeStorage),
      version: 1,
    },
  ),
);

export default useSettingsStore;
