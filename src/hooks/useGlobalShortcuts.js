import { useEffect } from "react";
import useUiStore from "#store/ui";
import useWindowStore, { selectFocusedKey } from "#store/window";
import { toggleLocale } from "../i18n";

// Text fields keep their keys, except the terminal prompt, where ⌥ shortcuts
// still manage windows.
const typingIn = (el) =>
  Boolean(el) && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

// Option-key shortcuts use e.code: on a Mac ⌥W types "∑", so e.key won't do.
const WINDOW_KEYS = {
  KeyW: (s, key) => key && s.closeWindow(key),
  KeyM: (s, key) => key && s.minimizeWindow(key),
  KeyZ: (s, key) => key && s.toggleMaximize(key),
  Backquote: (s) => s.cycleWindows(),
  KeyD: (s) => s.toggleShowDesktop(),
  KeyL: () => toggleLocale(),
};

export const useGlobalShortcuts = (isMobile) => {
  useEffect(() => {
    const onKey = (e) => {
      const ui = useUiStore.getState();

      // ⌘K / Ctrl+K toggles Spotlight, like Raycast and most docs sites.
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.code === "KeyK") {
        e.preventDefault();
        if (ui.spotlightOpen) ui.closeSpotlight();
        else ui.openSpotlight();
        return;
      }
      if (isMobile || e.defaultPrevented) return;

      const typing = typingIn(e.target);
      const inTerminal = typing && e.target.closest(".terminal-body");

      // F3 or ⌃↑: Mission Control.
      if (e.code === "F3" || (e.ctrlKey && !e.metaKey && !e.altKey && e.code === "ArrowUp" && !typing)) {
        e.preventDefault();
        ui.toggleMissionControl();
        return;
      }
      if (ui.spotlightOpen || ui.missionControlOpen) return;

      if (e.altKey && !e.metaKey && !e.ctrlKey && (!typing || inTerminal)) {
        const run = WINDOW_KEYS[e.code];
        if (!run) return;
        e.preventDefault();
        const store = useWindowStore.getState();
        run(store, selectFocusedKey(store));
        return;
      }

      // "?" (or the Persian "؟") lists every shortcut.
      if (!typing && !e.metaKey && !e.ctrlKey && (e.key === "?" || e.key === "؟")) {
        e.preventDefault();
        if (ui.shortcutsOpen) ui.closeShortcuts();
        else ui.openShortcuts();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile]);
};
