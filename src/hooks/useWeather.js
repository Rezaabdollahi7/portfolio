import { useEffect, useState } from "react";
import { weatherFallback } from "#constants";
import { sessionCache } from "../lib/storage";

// Live Tehran weather from Open-Meteo (free, no key, CORS-enabled).
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=35.6892&longitude=51.389" +
  "&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min" +
  "&timezone=Asia%2FTehran&forecast_days=1";

const CACHE_KEY = "weather:tehran";
const MAX_AGE = 30 * 60 * 1000;

// WMO weather interpretation codes → short label.
export const describeWeather = (code) => {
  if (code === 0) return "Clear";
  if (code <= 2) return "Partly Cloudy";
  if (code === 3) return "Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow Showers";
  return "Thunderstorm";
};

export const useWeather = () => {
  const [weather, setWeather] = useState(
    () => sessionCache.get(CACHE_KEY, MAX_AGE) ?? weatherFallback,
  );

  useEffect(() => {
    if (sessionCache.get(CACHE_KEY, MAX_AGE)) return;
    const controller = new AbortController();

    fetch(URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        const next = {
          city: "Tehran",
          temperature: Math.round(data.current.temperature_2m),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          code: data.current.weather_code,
          condition: describeWeather(data.current.weather_code),
          live: true,
        };
        sessionCache.set(CACHE_KEY, next);
        setWeather(next);
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => controller.abort();
  }, []);

  return weather;
};
