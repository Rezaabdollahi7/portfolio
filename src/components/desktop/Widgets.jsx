import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import { useNow } from "../../hooks/useNow";
import WeatherIcon from "../WeatherIcon";

const MONTHS = new Intl.DateTimeFormat("en-US", { month: "long" });
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const CalendarWidget = () => {
  const today = useNow();
  const [offset, setOffset] = useState(0);
  const view = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const firstDay = view.getDay();
  const isCurrentMonth = offset === 0;

  return (
    <section className="widget calendar-widget" aria-label="Calendar">
      <div className="calendar-head">
        <h2>
          {MONTHS.format(view)}
          {view.getFullYear() !== today.getFullYear() && (
            <span className="calendar-year"> {view.getFullYear()}</span>
          )}
        </h2>
        <div className="flex">
          <button type="button" onClick={() => setOffset((o) => o - 1)} aria-label="Previous month">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setOffset((o) => o + 1)} aria-label="Next month">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="calendar-weekday" aria-hidden="true">
            {d}
          </span>
        ))}
        {Array.from({ length: firstDay }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = isCurrentMonth && day === today.getDate();
          return (
            <span
              key={day}
              className="calendar-day"
              data-today={isToday || undefined}
              aria-current={isToday ? "date" : undefined}
            >
              {day}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export const WeatherWidget = ({ compact = false }) => {
  const w = useWeather();
  return (
    <section
      className={compact ? "widget weather-widget is-compact" : "widget weather-widget"}
      aria-label={`Weather in ${w.city}: ${w.temperature} degrees, ${w.condition}`}
    >
      <p className="weather-city">{w.city}</p>
      <p className="weather-temp tabular-nums">{w.temperature}°</p>
      <div className="weather-foot">
        <WeatherIcon code={w.code} className="weather-icon" />
        <p className="weather-cond">{w.condition}</p>
        <p className="weather-range tabular-nums">
          H:{w.high}° L:{w.low}°
        </p>
      </div>
    </section>
  );
};
