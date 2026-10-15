import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Desktop window management: edge snapping (tiling) and resizing.

export const MENUBAR_H = 28;
const MIN_W = 360;
const MIN_H = 240;

// ── Snapping ─────────────────────────────────────────────────────────────
// Pushing the pointer into the menu bar fills the screen; into the left or
// right edge tiles the window to that half.
export const snapZone = (x, y) => {
  if (y <= MENUBAR_H) return "top";
  if (x <= 4) return "left";
  if (x >= window.innerWidth - 5) return "right";
  return null;
};

let preview;
export const showSnapPreview = (zone) => {
  if (!zone && !preview) return;
  if (!preview) {
    preview = document.createElement("div");
    preview.className = "snap-preview";
    preview.setAttribute("aria-hidden", "true");
    document.body.append(preview);
  }
  preview.dataset.zone = zone ?? "";
};

// ── Resizing ─────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(Math.max(v, min), Math.max(min, max));

// Freeze the CSS-computed geometry into custom properties the first time a
// window is resized, so later size changes can't move it.
const freeze = (el) => {
  if (el.dataset.sized) return;
  const cs = getComputedStyle(el);
  el.style.setProperty("--rl", cs.left);
  el.style.setProperty("--rt", cs.top);
  el.style.setProperty("--rw", `${el.offsetWidth}px`);
  el.style.setProperty("--rh", `${el.offsetHeight}px`);
  el.dataset.sized = "true";
};

export const startResize = (event, el, dir) => {
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  freeze(el);

  const handle = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const start = {
    px: event.clientX,
    py: event.clientY,
    w: el.offsetWidth,
    h: el.offsetHeight,
    x: gsap.getProperty(el, "x"),
    y: gsap.getProperty(el, "y"),
  };
  handle.setPointerCapture(event.pointerId);
  document.documentElement.dataset.resizing = dir;

  const onMove = (e) => {
    const dx = e.clientX - start.px;
    const dy = e.clientY - start.py;
    let { w, h, x, y } = start;
    if (dir.includes("e")) w = clamp(start.w + dx, MIN_W, window.innerWidth - rect.left - 4);
    if (dir.includes("w")) {
      w = clamp(start.w - dx, MIN_W, rect.right - 4);
      x = start.x + (start.w - w);
    }
    if (dir.includes("s")) h = clamp(start.h + dy, MIN_H, window.innerHeight - rect.top - 4);
    if (dir.includes("n")) {
      h = clamp(start.h - dy, MIN_H, rect.bottom - MENUBAR_H - 4);
      y = start.y + (start.h - h);
    }
    el.style.setProperty("--rw", `${Math.round(w)}px`);
    el.style.setProperty("--rh", `${Math.round(h)}px`);
    gsap.set(el, { x, y });
  };

  const onEnd = () => {
    handle.removeEventListener("pointermove", onMove);
    handle.removeEventListener("pointerup", onEnd);
    handle.removeEventListener("pointercancel", onEnd);
    delete document.documentElement.dataset.resizing;
    Draggable.get(el)?.update();
  };

  handle.addEventListener("pointermove", onMove);
  handle.addEventListener("pointerup", onEnd);
  handle.addEventListener("pointercancel", onEnd);
};

export const RESIZE_DIRS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
