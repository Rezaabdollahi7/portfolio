import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import { useNow } from "../../hooks/useNow";
import WeatherIcon from "../WeatherIcon";
import { monthGrid } from "../../lib/calendar";
import { formatDate, localizeDigits, useLocale, useT } from "../../i18n";

export const CalendarWidget = () => {
  const today = useNow();
  const t = useT();
  const locale = useLocale();
  const [offset, setOffset] = useState(0);
  const grid = monthGrid(today, offset, locale);

  return (
    <section className="widget calendar-widget" aria-label={t("calendar.label")}>
      <div className="calendar-head">
        <h2>
          {formatDate(grid.first, { month: "long" }, locale)}
          {grid.showYear && (
            <span className="calendar-year"> {formatDate(grid.first, { year: "numeric" }, locale)}</span>
          )}
        </h2>
        <div className="flex">
          <button type="button" onClick={() => setOffset((o) => o - 1)} aria-label={t("calendar.prev")}>
            <ChevronLeft aria-hidden="true" className="rtl-flip" />
          </button>
          <button type="button" onClick={() => setOffset((o) => o + 1)} aria-label={t("calendar.next")}>
            <ChevronRight aria-hidden="true" className="rtl-flip" />
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {grid.weekdays.map((d, i) => (
          <span key={i} className="calendar-weekday" data-weekend={(locale === "fa" && i === 6) || undefined} aria-hidden="true">
            {d}
          </span>
        ))}
        {Array.from({ length: grid.leading }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {grid.days.map((day) => (
          <span
            key={day.n}
            className="calendar-day"
            data-today={day.isToday || undefined}
            data-weekend={day.weekend || undefined}
            aria-current={day.isToday ? "date" : undefined}
          >
            {localizeDigits(day.n, locale)}
          </span>
        ))}
      </div>
    </section>
  );
};

export const WeatherWidget = ({ compact = false }) => {
  const w = useWeather();
  const t = useT();
  const city = t("weather.city");
  const condition = t(`weather.${w.condition}`);
  return (
    <section
      className={compact ? "widget weather-widget is-compact" : "widget weather-widget"}
      aria-label={t("weather.aria", { city, temp: w.temperature, condition })}
    >
      <p className="weather-city">{city}</p>
      <p className="weather-temp tabular-nums">{localizeDigits(w.temperature)}°</p>
      <div className="weather-foot">
        <WeatherIcon code={w.code} className="weather-icon" />
        <p className="weather-cond">{condition}</p>
        <p className="weather-range tabular-nums">{t("weather.range", { high: w.high, low: w.low })}</p>
      </div>
    </section>
  );
};
