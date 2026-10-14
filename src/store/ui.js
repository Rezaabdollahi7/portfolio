import { create } from "zustand";

let toastTimer;

// Overlays that cover the desktop. Opening one closes the others.
const OVERLAYS_CLOSED = {
  spotlightOpen: false,
  controlCenterOpen: false,
  missionControlOpen: false,
  shortcutsOpen: false,
  contextMenu: null,
};

const useUiStore = create((set) => ({
  ...OVERLAYS_CLOSED,
  brightness: 100,
  toast: null,

  openSpotlight: () => set({ ...OVERLAYS_CLOSED, spotlightOpen: true }),
  closeSpotlight: () => set({ spotlightOpen: false }),
  toggleControlCenter: () =>
    set((s) => ({ ...OVERLAYS_CLOSED, controlCenterOpen: !s.controlCenterOpen })),
  closeControlCenter: () => set({ controlCenterOpen: false }),
  toggleMissionControl: () =>
    set((s) => ({ ...OVERLAYS_CLOSED, missionControlOpen: !s.missionControlOpen })),
  closeMissionControl: () => set({ missionControlOpen: false }),
  openShortcuts: () => set({ ...OVERLAYS_CLOSED, shortcutsOpen: true }),
  closeShortcuts: () => set({ shortcutsOpen: false }),
  // { x, y } in viewport pixels, or null.
  openContextMenu: (x, y) => set({ ...OVERLAYS_CLOSED, contextMenu: { x, y } }),
  closeContextMenu: () => set({ contextMenu: null }),
  setBrightness: (brightness) => set({ brightness }),

  showToast: (message) => {
    clearTimeout(toastTimer);
    set({ toast: { message, id: Date.now() } });
    toastTimer = setTimeout(() => set({ toast: null }), 2400);
  },
}));

export default useUiStore;
