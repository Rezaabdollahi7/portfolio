import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { openProject, openWindow } from "../../lib/actions";
import { prefetchWindow } from "../../windows";
import { useT } from "../../i18n";
import { useContent } from "../../i18n/content";

gsap.registerPlugin(Draggable);

// `label` is a ui.js key; `project` takes its (localized) title.
const ICONS = [
  { id: "projects", label: "desktop.projects", icon: "/images/folder.png", open: () => openWindow("finder", { location: "work" }), prefetch: "finder" },
  { id: "dofixo", project: "dofixo", icon: "/images/folder.png", open: () => openProject("dofixo"), prefetch: "safari" },
  { id: "finora", project: "finora", icon: "/images/folder.png", open: () => openProject("finora"), prefetch: "safari" },
  { id: "about", label: "desktop.about", icon: "/images/txt.png", open: () => openWindow("notes", { noteId: "about" }), prefetch: "notes" },
  { id: "resume", label: "desktop.resume", icon: "/images/pdf.png", open: () => openWindow("resume"), prefetch: "resume" },
];

// Files on the desktop. Drag them around; click to open.
const DesktopIcons = () => {
  const ref = useRef(null);
  const lastDrag = useRef(0);
  const t = useT();
  const { projects } = useContent();
  const nameOf = (item) =>
    item.project ? projects.find((p) => p.id === item.project)?.title : t(item.label);

  useGSAP(
    () => {
      const items = ref.current.querySelectorAll(".desktop-icon");
      const instances = [...items].map((el) =>
        Draggable.create(el, {
          bounds: ref.current.parentElement,
          zIndexBoost: false,
          dragClickables: true,
          minimumMovement: 4,
          onDragEnd: () => {
            lastDrag.current = Date.now();
          },
        })[0],
      );
      return () => instances.forEach((d) => d.kill());
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className="desktop-icons" aria-label={t("desktop.icons")}>
      {ICONS.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className="desktop-icon"
            onPointerEnter={() => prefetchWindow(item.prefetch)}
            onClick={() => Date.now() - lastDrag.current > 250 && item.open()}
          >
            <img src={item.icon} alt="" width="64" height="64" draggable="false" />
            <span>{nameOf(item)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DesktopIcons;
