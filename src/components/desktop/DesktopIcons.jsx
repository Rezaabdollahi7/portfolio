import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { openProject, openWindow } from "../../lib/actions";
import { prefetchWindow } from "../../windows";

gsap.registerPlugin(Draggable);

const ICONS = [
  { id: "projects", name: "Projects", icon: "/images/folder.png", open: () => openWindow("finder", { location: "work" }), prefetch: "finder" },
  { id: "dofixo", name: "Dofixo", icon: "/images/folder.png", open: () => openProject("dofixo"), prefetch: "safari" },
  { id: "finora", name: "Finora", icon: "/images/folder.png", open: () => openProject("finora"), prefetch: "safari" },
  { id: "about", name: "About me.txt", icon: "/images/txt.png", open: () => openWindow("notes", { noteId: "about" }), prefetch: "notes" },
  { id: "resume", name: "Resume.pdf", icon: "/images/pdf.png", open: () => openWindow("resume"), prefetch: "resume" },
];

// Files on the desktop. Drag them around; click to open.
const DesktopIcons = () => {
  const ref = useRef(null);
  const lastDrag = useRef(0);

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
    <ul ref={ref} className="desktop-icons" aria-label="Desktop">
      {ICONS.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className="desktop-icon"
            onPointerEnter={() => prefetchWindow(item.prefetch)}
            onClick={() => Date.now() - lastDrag.current > 250 && item.open()}
          >
            <img src={item.icon} alt="" width="64" height="64" draggable="false" />
            <span>{item.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DesktopIcons;
