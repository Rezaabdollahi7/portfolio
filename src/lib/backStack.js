// Phone back button / swipe-back closes the top-most layer (an app, the
// image viewer, Spotlight, an in-app page) instead of leaving the site.
//
// While any layer is open we keep exactly one extra "guard" history entry.
// Pressing back pops it: we close the top layer and, if more layers remain,
// push a fresh guard. Layers closed from the UI just leave the stack; if a
// stale guard is popped later with nothing open, we keep going back so a
// single press still leaves the site.

const GUARD = "__portfolioBack";
const layers = []; // [{ id, close }]
let armed = false;

const arm = () => {
  if (armed) return;
  window.history.pushState({ ...(window.history.state ?? {}), [GUARD]: true }, "");
  armed = true;
};

export const pushLayer = (id, close) => {
  const existing = layers.findIndex((l) => l.id === id);
  if (existing !== -1) layers.splice(existing, 1);
  layers.push({ id, close });
  arm();
};

export const dropLayer = (id) => {
  const index = layers.findIndex((l) => l.id === id);
  if (index !== -1) layers.splice(index, 1);
};

export const raiseLayer = (id) => {
  const index = layers.findIndex((l) => l.id === id);
  if (index === -1 || index === layers.length - 1) return;
  layers.push(...layers.splice(index, 1));
};

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    if (!armed) return;
    armed = false;
    const top = layers.pop();
    if (!top) {
      window.history.back();
      return;
    }
    top.close();
    if (layers.length) arm();
  });
}
