import { useCallback } from "react";
import { ui } from "./ui";
import { getLocale, useLocale } from "./locale";

export { useLocale, getLocale, setLocale, toggleLocale } from "./locale";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const toFaDigits = (value) => String(value).replace(/\d/g, (d) => FA_DIGITS[d]);

// Digits in the visitor's script.
export const localizeDigits = (value, locale = getLocale()) =>
  locale === "fa" ? toFaDigits(value) : String(value);

const translate = (locale, key, vars) => {
  let str = ui[locale]?.[key] ?? ui.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, typeof v === "number" ? localizeDigits(v, locale) : v);
    }
  }
  return str;
};

// For code outside React (actions, Spotlight index, toasts).
export const t = (key, vars) => translate(getLocale(), key, vars);

export const useT = () => {
  const locale = useLocale();
  return useCallback((key, vars) => translate(locale, key, vars), [locale]);
};

// Intl locale tags. Persian uses the Jalali (Solar Hijri) calendar.
export const intlLocale = (locale = getLocale()) => (locale === "fa" ? "fa-IR-u-ca-persian" : "en-US");

export const formatDate = (date, options, locale = getLocale()) =>
  new Intl.DateTimeFormat(intlLocale(locale), options).format(date);

export const isRtl = (locale = getLocale()) => locale === "fa";

const UNITS = [
  ["year", 365 * 864e5],
  ["month", 30 * 864e5],
  ["week", 7 * 864e5],
  ["day", 864e5],
  ["hour", 36e5],
  ["minute", 6e4],
];

// "3h ago" / "۳ ساعت پیش".
export const relativeTime = (date, locale = getLocale(), now = Date.now()) => {
  const diff = new Date(date).getTime() - now;
  const rtf = new Intl.RelativeTimeFormat(locale, { style: "narrow", numeric: "auto" });
  for (const [unit, ms] of UNITS) {
    if (Math.abs(diff) >= ms) return rtf.format(Math.round(diff / ms), unit);
  }
  return rtf.format(0, "minute");
};
