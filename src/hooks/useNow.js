import { useEffect, useState } from "react";

// Re-renders on the minute boundary (or every `intervalMs`).
export const useNow = (intervalMs = 60_000) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer;
    const tick = () => {
      setNow(new Date());
      const delay = intervalMs - (Date.now() % intervalMs);
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, intervalMs - (Date.now() % intervalMs));
    return () => clearTimeout(timer);
  }, [intervalMs]);

  return now;
};
