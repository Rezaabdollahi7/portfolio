import { useEffect } from "react";
import { useLocale } from "./locale";

const META = {
  en: {
    title: "Reza Abdollahi · Software Engineer",
    description:
      "Reza Abdollahi is a full-stack software engineer in Tehran and founder of NextApps, building practical, scalable products with React, Next.js, TypeScript and Node.js. Explore projects like Dofixo and Finora in a macOS-style portfolio.",
  },
  fa: {
    title: "رضا عبداللهی · مهندس نرم‌افزار",
    description:
      "رضا عبداللهی، مهندس نرم‌افزار فول‌استک در تهران و بنیان‌گذار NextApps. محصولات نرم‌افزاری کاربردی و مقیاس‌پذیر با React، Next.js، TypeScript و Node.js می‌سازد. پروژه‌هایی مثل دوفیکسو و Finora را در پورتفولیویی به سبک macOS ببینید.",
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
