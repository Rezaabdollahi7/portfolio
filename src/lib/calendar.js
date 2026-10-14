// Month grids for the calendar widget: Gregorian (weeks start Sunday) or
// Jalali/Solar Hijri for Persian (weeks start Saturday, Friday is the weekend).

const jalaliParts = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const toJalali = (date) => {
  const parts = Object.fromEntries(jalaliParts.formatToParts(date).map((p) => [p.type, p.value]));
  return { y: Number(parts.year), m: Number(parts.month), d: Number(parts.day) };
};

// Noon avoids DST edges when stepping by whole days.
const atNoon = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n, 12);

const jalaliMonthStart = (date) => addDays(date, 1 - toJalali(date).d);

const shiftJalaliMonth = (start, offset) => {
  let first = start;
  for (let i = 0; i < Math.abs(offset); i++) {
    first = jalaliMonthStart(offset > 0 ? addDays(first, 32) : addDays(first, -1));
  }
  return first;
};

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const WEEKDAYS = {
  en: ["S", "M", "T", "W", "T", "F", "S"],
  fa: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
};

export const monthGrid = (now, offset, locale) => {
  const today = atNoon(now);

  if (locale === "fa") {
    const first = shiftJalaliMonth(jalaliMonthStart(today), offset);
    const next = shiftJalaliMonth(first, 1);
    const length = Math.round((next - first) / 86_400_000);
    const view = toJalali(first);
    return {
      first,
      weekdays: WEEKDAYS.fa,
      // Saturday is column 0.
      leading: (first.getDay() + 1) % 7,
      days: Array.from({ length }, (_, i) => {
        const date = addDays(first, i);
        return { n: i + 1, isToday: sameDay(date, today), weekend: date.getDay() === 5 };
      }),
      showYear: view.y !== toJalali(today).y,
    };
  }

  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1, 12);
  const length = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return {
    first,
    weekdays: WEEKDAYS.en,
    leading: first.getDay(),
    days: Array.from({ length }, (_, i) => {
      const date = new Date(first.getFullYear(), first.getMonth(), i + 1, 12);
      return { n: i + 1, isToday: sameDay(date, today), weekend: false };
    }),
    showYear: first.getFullYear() !== today.getFullYear(),
  };
};
