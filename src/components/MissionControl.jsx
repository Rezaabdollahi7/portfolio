import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useUiStore from "#store/ui";
import useWindowStore from "#store/window";
import { apps, windowToApp } from "#constants";
import { prefersReducedMotion } from "../lib/motion";
import { useT } from "../i18n";

const iconFor = (key) => apps.find((a) => a.id === (windowToApp[key] ?? key))?.icon;

const TOP = 72;
const GAP = 28;
const LABEL = 30;

// Lay the open windows out in a grid, each scaled to fit its cell. Reads the
// windows' current boxes, so it runs once, as Mission Control opens.
const computeLayout = () => {
  const { order, windows } = useWindowStore.getState();
  const keys = order.filter((k) => windows[k].isOpen && !windows[k].isMinimized);
  const n = keys.length;
  if (!n) return [];

  const dockSpace = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dock-space")) || 92;
  const areaW = window.innerWidth - GAP * 2;
  const areaH = window.innerHeight - TOP - dockSpace - GAP;
  const cols = n <= 3 && areaW / areaH > 1.4 ? n : Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const cellW = areaW / cols;
  const cellH = areaH / rows;

  return keys.map((key, i) => {
    const el = document.getElementById(key);
    const r = el.getBoundingClientRect();
    const row = Math.floor(i / cols);
    const inRow = row === rows - 1 ? n - row * cols : cols;
    const offset = ((cols - inRow) * cellW) / 2;
    const scale = Math.min((cellW - GAP) / r.width, (cellH - GAP - LABEL) / r.height, 0.85);
    const cx = GAP + offset + cellW * (i % cols) + cellW / 2;
    const cy = TOP + cellH * row + (cellH - LABEL) / 2;
    const from = { x: gsap.getProperty(el, "x"), y: gsap.getProperty(el, "y") };
    return {
      key,
      from,
      scale,
      to: { x: from.x + cx - (r.left + r.width / 2), y: from.y + cy - (r.top + r.height / 2) },
      box: {
        left: cx - (r.width * scale) / 2,
        top: cy - (r.height * scale) / 2,
        width: r.width * scale,
        height: r.height * scale,
      },
    };
  });
};

// macOS Mission Control: every open window, side by side. Click one to bring
// it forward; Esc, F3 or a click on the background closes.
const MissionControl = () => {
  const open = useUiStore((s) => s.missionControlOpen);
  const close = useUiStore((s) => s.closeMissionControl);
  const t = useT();
  const [session, setSession] = useState(null);
  const pick = useRef(null);
  const rootRef = useRef(null);
  const current = useRef(null);

  // Start and end a session as the store flag flips (adjusting state during
  // render, so the windows are measured before anything moves). Reopening
  // mid-close keeps the original layout: the windows are still in flight.
  if (open && !session) setSession({ layout: computeLayout(), closing: false });
  if (open && session?.closing) setSession({ ...session, closing: false });
  if (!open && session && !session.closing) setSession({ ...session, closing: true });

  useLayoutEffect(() => {
    current.current = session;
    if (!session) return;
    const instant = prefersReducedMotion();
    const els = session.layout.map((w) => document.getElementById(w.key));
    const chrome = rootRef.current ? [...rootRef.current.children] : [];

    if (!session.closing) {
      document.documentElement.dataset.missionControl = "true";
      gsap.to(chrome, { opacity: 1, duration: instant ? 0 : 0.25, overwrite: "auto" });
      session.layout.forEach((w, i) => {
        Draggable.get(els[i])?.disable();
        gsap.to(els[i], {
          ...w.to,
          scale: w.scale,
          duration: instant ? 0 : 0.38,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
      rootRef.current?.querySelector("button")?.focus({ preventScroll: true });
      return;
    }

    const chosen = pick.current;
    pick.current = null;
    if (chosen) useWindowStore.getState().focusWindow(chosen);
    gsap.to(chrome, { opacity: 0, duration: instant ? 0 : 0.22, overwrite: "auto" });
    const tl = gsap.timeline({
      onComplete: () => {
        if (current.current !== session) return;
        session.layout.forEach((w, i) => {
          if (els[i]?.dataset.maximized !== "true") Draggable.get(els[i])?.enable().update();
        });
        delete document.documentElement.dataset.missionControl;
        setSession((s) => (s === session ? null : s));
      },
    });
    session.layout.forEach((w, i) => {
      if (!els[i]) return;
      tl.to(
        els[i],
        { ...w.from, scale: 1, duration: instant ? 0 : 0.32, ease: "power3.inOut", overwrite: "auto" },
        0,
      );
    });
  }, [session]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!session) return null;

  const choose = (key) => {
    pick.current = key;
    close();
  };

  return createPortal(
    <div
      ref={rootRef}
      className="mission-control"
      role="dialog"
      aria-modal="true"
      aria-label={t("mc.title")}
      data-closing={session.closing || undefined}
    >
      <div className="mc-backdrop" onClick={close} />
      {session.layout.length === 0 && <p className="mc-empty">{t("mc.empty")}</p>}
      {session.layout.map((w) => (
        <button
          key={w.key}
          type="button"
          className="mc-window"
          style={w.box}
          onClick={() => choose(w.key)}
        >
          <span className="mc-label">
            {iconFor(w.key) && <img src={iconFor(w.key)} alt="" width="18" height="18" />}
            {t(`window.${w.key}`)}
          </span>
        </button>
      ))}
      <p className="mc-hint">{t("mc.hint")}</p>
    </div>,
    document.body,
  );
};

export default MissionControl;
