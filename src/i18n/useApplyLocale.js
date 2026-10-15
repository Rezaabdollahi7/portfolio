import { useEffect } from "react";
import { useLocale } from "./locale";

const META = {
  en: {
    title: "Reza Abdollahi · Frontend Developer",
    description:
      "Reza Abdollahi is a frontend developer in Tehran and founder of NextApps, building fast, Persian-first web products with React, Next.js and Node.js. Explore projects like Dofixo and Finora in a macOS-style portfolio.",
  },
  fa: {
    title: "رضا عبداللهی · توسعه‌دهنده فرانت‌اند",
    description:
      "رضا عبداللهی، توسعه‌دهنده فرانت‌اند در تهران و بنیان‌گذار NextApps. محصولات وب سریع و فارسی‌محور با React، Next.js و Node.js می‌سازد. پروژه‌هایی مثل دوفیکسو و Finora را در پورتفولیویی به سبک macOS ببینید.",
  },
};

// Keeps <html lang/dir>, the title and the description in sync with the
// chosen language. Mount once.
export const useApplyLocale = () => {
  const locale = useLocale();
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "fa" ? "rtl" : "ltr";
    document.title = META[locale].title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", META[locale].description);
  }, [locale]);
};
