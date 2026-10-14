import { create } from "zustand";

let toastTimer;

const useUiStore = create((set) => ({
  spotlightOpen: false,
  controlCenterOpen: false,
  brightness: 100,
  toast: null,

  openSpotlight: () => set({ spotlightOpen: true, controlCenterOpen: false }),
  closeSpotlight: () => set({ spotlightOpen: false }),
  toggleControlCenter: () =>
    set((s) => ({ controlCenterOpen: !s.controlCenterOpen })),
  closeControlCenter: () => set({ controlCenterOpen: false }),
  setBrightness: (brightness) => set({ brightness }),

  showToast: (message) => {
    clearTimeout(toastTimer);
    set({ toast: { message, id: Date.now() } });
    toastTimer = setTimeout(() => set({ toast: null }), 2400);
  },
}));

export default useUiStore;
