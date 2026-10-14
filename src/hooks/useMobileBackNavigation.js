import { useEffect } from "react";
import useWindowStore, { selectFocusedKey } from "#store/window";
import { WINDOW_KEYS } from "#constants/apps.js";
import { dropLayer, pushLayer, raiseLayer } from "../lib/backStack";

// On phones every open app is a back step: back closes the app on top.
export const useMobileBackNavigation = (isMobile) => {
  useEffect(() => {
    if (!isMobile) return;
    const registered = new Set();
    const layerId = (key) => `window:${key}`;
    let lastFocused = null;

    const sync = (state) => {
      for (const key of WINDOW_KEYS) {
        const win = state.windows[key];
        const visible = win.isOpen && !win.isMinimized;
        if (visible && !registered.has(key)) {
          registered.add(key);
          pushLayer(layerId(key), () => useWindowStore.getState().closeWindow(key));
        } else if (!visible && registered.has(key)) {
          registered.delete(key);
          dropLayer(layerId(key));
        }
      }
      // Bringing an already-open app in front of another moves it to the top.
      // (Focus falling back after the top app closes changes nothing.)
      const focused = selectFocusedKey(state);
      const previous = lastFocused && state.windows[lastFocused];
      const previousStillVisible = previous?.isOpen && !previous.isMinimized;
      if (focused !== lastFocused && registered.has(focused) && previousStillVisible) {
        raiseLayer(layerId(focused));
      }
      lastFocused = focused;
    };

    sync(useWindowStore.getState());
    const unsubscribe = useWindowStore.subscribe(sync);

    return () => {
      unsubscribe();
      registered.forEach((key) => dropLayer(layerId(key)));
    };
  }, [isMobile]);
};
