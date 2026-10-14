import { useSyncExternalStore } from "react";

export const MOBILE_QUERY =
  "(max-width: 767px), (max-height: 500px) and (pointer: coarse)";

export const useMediaQuery = (query) =>
  useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );

export const useIsMobile = () => useMediaQuery(MOBILE_QUERY);
