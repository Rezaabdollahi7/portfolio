import { useEffect, useId, useRef } from "react";
import { dropLayer, pushLayer } from "../lib/backStack";

// While `active`, the browser back button calls `onBack` instead of leaving.
// Change `step` to register a new back step (e.g. each in-app navigation).
export const useBackLayer = (active, onBack, { enabled = true, step = 0 } = {}) => {
  const id = useId();
  const onBackRef = useRef(onBack);

  useEffect(() => {
    onBackRef.current = onBack;
  });

  useEffect(() => {
    if (!active || !enabled) return;
    const layerId = `${id}:${step}`;
    pushLayer(layerId, () => onBackRef.current());
    return () => dropLayer(layerId);
  }, [active, enabled, id, step]);
};
