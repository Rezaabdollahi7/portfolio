// context/ThemeContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem("wallpaper") || "default";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("wallpaper", wallpaper);

    const root = document.documentElement;

    switch (wallpaper) {
      case "default":
        root.style.setProperty(
          "--wallpaper-light",
          'url("/images/wallpapers/wallpaper.webp")',
        );
        root.style.setProperty(
          "--wallpaper-dark",
          'url("/images/wallpapers/dark-default.webp")',
        );
        break;

      case "nature":
        root.style.setProperty(
          "--wallpaper-light",
          'url("/images/wallpapers/light1.webp")',
        );
        root.style.setProperty(
          "--wallpaper-dark",
          'url("/images/wallpapers/dark1.webp")',
        );
        break;

      case "tech":
        root.style.setProperty(
          "--wallpaper-light",
          'url("/images/wallpapers/light2.webp")',
        );
        root.style.setProperty(
          "--wallpaper-dark",
          'url("/images/wallpapers/dark2.webp")',
        );
        break;

      case "abstract":
        root.style.setProperty(
          "--wallpaper-light",
          'url("/images/wallpapers/light3.webp")',
        );
        root.style.setProperty(
          "--wallpaper-dark",
          'url("/images/wallpapers/dark3.webp")',
        );
        break;

      default:
        root.style.setProperty(
          "--wallpaper-light",
          'url("/images/wallpapers/wallpaper.webp")',
        );
        root.style.setProperty(
          "--wallpaper-dark",
          'url("/images/wallpapers/dark-default.webp")',
        );
    }
  }, [wallpaper]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const changeWallpaper = (newWallpaper) => {
    setWallpaper(newWallpaper);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        wallpaper,
        changeWallpaper,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
