import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WINDOW_KEYS } from "#constants/apps.js";

const BASE_Z = 100;

const createWindow = () => ({
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  // "left" | "right" when tiled to half the screen.
  snap: null,
  data: null,
  // Bumped on every open so content can react to "open again with new data".
  openCount: 0,
});

const bringToFront = (state, key) => {
  state.order = state.order.filter((k) => k !== key);
  state.order.push(key);
};

const useWindowStore = create(
  immer((set) => ({
    windows: Object.fromEntries(WINDOW_KEYS.map((key) => [key, createWindow()])),
    // Stacking order, bottom → top. Only open windows are listed.
    order: [],
    // Windows hidden by "Show Desktop", restored by the next toggle.
    desktopHidden: [],

    openWindow: (key, data) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;
        win.isOpen = true;
        win.isMinimized = false;
        win.openCount += 1;
        if (data !== undefined) win.data = data;
        bringToFront(state, key);
      }),

    closeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win) return;
        Object.assign(win, createWindow(), { openCount: win.openCount });
        state.order = state.order.filter((k) => k !== key);
      }),

    focusWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win?.isOpen) return;
        if (state.order[state.order.length - 1] === key && !win.isMinimized) return;
        win.isMinimized = false;
        bringToFront(state, key);
      }),

    minimizeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win?.isOpen) return;
        win.isMinimized = true;
      }),

    toggleMaximize: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win?.isOpen) return;
        win.isMaximized = !win.isMaximized;
        win.snap = null;
        bringToFront(state, key);
      }),

    snapWindow: (key, side) =>
      set((state) => {
        const win = state.windows[key];
        if (!win?.isOpen) return;
        win.snap = side;
        win.isMaximized = false;
        bringToFront(state, key);
      }),

    // ⌥` : send the front window to the back, so the next one comes forward.
    cycleWindows: () =>
      set((state) => {
        const visible = state.order.filter((k) => !state.windows[k].isMinimized);
        if (visible.length < 2) return;
        const front = visible[visible.length - 1];
        state.order = [front, ...state.order.filter((k) => k !== front)];
      }),

    toggleShowDesktop: () =>
      set((state) => {
        const visible = state.order.filter((k) => !state.windows[k].isMinimized);
        if (visible.length) {
          visible.forEach((k) => (state.windows[k].isMinimized = true));
          state.desktopHidden = visible;
        } else {
          state.desktopHidden.forEach((k) => {
            if (state.windows[k].isOpen) state.windows[k].isMinimized = false;
          });
          state.desktopHidden = [];
        }
      }),

    closeAll: () =>
      set((state) => {
        for (const key of WINDOW_KEYS) {
          Object.assign(state.windows[key], createWindow(), {
            openCount: state.windows[key].openCount,
          });
        }
        state.order = [];
        state.desktopHidden = [];
      }),
  })),
);

// Top-most visible window, or null.
export const selectFocusedKey = (state) => {
  for (let i = state.order.length - 1; i >= 0; i--) {
    const key = state.order[i];
    if (!state.windows[key].isMinimized) return key;
  }
  return null;
};

export const selectZIndex = (key) => (state) => {
  const index = state.order.indexOf(key);
  return index === -1 ? BASE_Z : BASE_Z + index + 1;
};

export default useWindowStore;
