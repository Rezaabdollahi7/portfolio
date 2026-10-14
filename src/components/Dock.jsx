import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { apps, dockLayout } from "#constants";
import useWindowStore from "#store/window";
import { openApp } from "../lib/actions";
import { prefetchWindow } from "../windows";
import { prefersReducedMotion } from "../lib/motion";
import { useT } from "../i18n";

const byId = Object.fromEntries(apps.map((a) => [a.id, a]));

const Dock = () => {
  const dockRef = useRef(null);
  const windows = useWindowStore((s) => s.windows);
  const t = useT();

  // macOS magnification: icons near the cursor grow and lift.
  useGSAP(
    () => {
      const dock = dockRef.current;
      if (!dock || prefersReducedMotion()) return;
      const icons = [...dock.querySelectorAll(".dock-icon")];
      const animate = (icon, scale, y) =>
        gsap.to(icon, { scale, y, duration: 0.18, ease: "power2.out", overwrite: "auto" });

      // Measure from the resting layout so growing icons don't feed back.
      let centers = [];
      const measure = () => {
        centers = icons.map((icon) => {
          const r = icon.parentElement.getBoundingClientRect();
          return r.left + r.width / 2;
        });
      };

      const onEnter = measure;
      const onMove = (e) => {
        if (!centers.length) measure();
        icons.forEach((icon, i) => {
          const distance = Math.abs(e.clientX - centers[i]);
          const intensity = Math.exp(-(distance ** 2) / 4500);
          animate(icon, 1 + 0.42 * intensity, -12 * intensity);
        });
      };
      const onLeave = () => icons.forEach((icon) => animate(icon, 1, 0));

      dock.addEventListener("pointerenter", onEnter);
      dock.addEventListener("pointermove", onMove);
      dock.addEventListener("pointerleave", onLeave);
      return () => {
        dock.removeEventListener("pointerenter", onEnter);
        dock.removeEventListener("pointermove", onMove);
        dock.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: dockRef },
  );

  return (
    <nav className="dock" aria-label={t("dock")}>
      <ul ref={dockRef} className="dock-container">
        {dockLayout.map((id, i) => {
          if (id === "|") return <li key={`sep-${i}`} className="dock-sep" aria-hidden="true" />;
          const app = byId[id];
          const running =
            app.window && !app.data && windows[app.window]?.isOpen === true;
          const name = t(`app.${app.id}`);
          return (
            <li key={id} className="dock-item">
              <button
                type="button"
                className="dock-icon"
                aria-label={app.href ? t("app.newTab", { name }) : name}
                onPointerEnter={() => app.window && prefetchWindow(app.window)}
                onFocus={() => app.window && prefetchWindow(app.window)}
                onClick={() => openApp(app.id)}
              >
                <img src={app.icon} alt="" width="64" height="64" draggable="false" />
              </button>
              <span className="dock-tooltip" aria-hidden="true">
                {name}
              </span>
              {running && <span className="dock-dot" aria-hidden="true" />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Dock;
