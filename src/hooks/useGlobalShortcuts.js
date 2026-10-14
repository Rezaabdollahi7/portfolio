import { useEffect } from "react";
import useUiStore from "#store/ui";

// ⌘K / Ctrl+K toggles Spotlight, like Raycast and most docs sites.
export const useGlobalShortcuts = () => {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const ui = useUiStore.getState();
        if (ui.spotlightOpen) ui.closeSpotlight();
        else ui.openSpotlight();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
};
