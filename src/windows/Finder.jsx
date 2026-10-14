import { useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import useWindowStore from "#store/window";
import { openExternal } from "../lib/actions";
import { useBackLayer } from "../hooks/useBackLayer";
import { getContent, useContent } from "../i18n/content";
import { useT } from "../i18n";

// Folder ids from the root to `id`. Ids are the same in every language.
const findPathIds = (id, nodes, trail = []) => {
  for (const node of nodes) {
    if (node.kind !== "folder") continue;
    const path = [...trail, node.id];
    if (node.id === id) return path;
    const found = findPathIds(id, node.children ?? [], path);
    if (found) return found;
  }
  return null;
};

const rootsOf = (locations) => Object.values(locations);
const pathTo = (id, roots) => findPathIds(id, roots) ?? ["work"];

const Finder = ({ data, openCount }) => {
  const { isMobile, isVisible } = useWindowContext();
  const { locations } = useContent();
  const t = useT();
  const roots = rootsOf(locations);
  const openWindow = useWindowStore((s) => s.openWindow);
  const [pathIds, setPathIds] = useState(() =>
    pathTo(data?.location ?? "work", rootsOf(getContent().locations)),
  );
  const [selected, setSelected] = useState(null);
  // Re-opened from elsewhere (dock, Trash, a link): jump to that folder.
  const [handled, setHandled] = useState(openCount);
  if (openCount !== handled) {
    setHandled(openCount);
    setPathIds(pathTo(data?.location ?? "work", roots));
    setSelected(null);
  }

  // Resolve ids to folders in the current language.
  const path = [];
  let level = roots;
  for (const id of pathIds) {
    const node = level.find((n) => n.id === id);
    if (!node) break;
    path.push(node);
    level = node.children ?? [];
  }
  const setPath = (nodes) => setPathIds(nodes.map((n) => n.id));

  const folder = path[path.length - 1];
  useBackLayer(path.length > 1, () => setPathIds((p) => p.slice(0, -1)), {
    enabled: isMobile && isVisible,
    step: path.length,
  });

  const goTo = (id) => {
    setPathIds(pathTo(id, roots));
    setSelected(null);
  };

  const open = (item) => {
    if (item.kind === "folder") return goTo(item.id);
    if (item.fileType === "url") return openExternal(item.href);
    if (item.fileType === "app") return openWindow(item.target.window, item.target.data);
    if (item.fileType === "txt") return openWindow("txtfile", item);
    if (item.fileType === "img") return openWindow("imgfile", item);
  };

  const projectFolders = locations.work.children;

  const renderLink = (node) => (
    <li key={node.id}>
      <button
        type="button"
        className={clsx("sidebar-item", path.some((p) => p.id === node.id) && "is-active")}
        aria-current={folder.id === node.id ? "page" : undefined}
        onClick={() => goTo(node.id)}
      >
        <img src={node.icon} alt="" aria-hidden="true" />
        <span className="truncate">{node.name}</span>
      </button>
    </li>
  );

  return (
    <>
      <WindowHeader className="finder-toolbar">
        <div className="finder-nav" data-no-drag>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => path.length > 1 && setPath(path.slice(0, -1))}
            disabled={path.length < 2}
            aria-label={t("finder.up")}
          >
            <ChevronLeft aria-hidden="true" className="rtl-flip" />
          </button>
        </div>
        <nav className="finder-breadcrumb" aria-label={t("finder.path")}>
          {path.map((node, i) => (
            <span key={node.id} className="flex items-center gap-1 min-w-0">
              {i > 0 && <ChevronRight aria-hidden="true" className="crumb-sep rtl-flip" />}
              <button
                type="button"
                className={clsx("crumb", i === path.length - 1 && "is-current")}
                onClick={() => setPath(path.slice(0, i + 1))}
              >
                {node.name}
              </button>
            </span>
          ))}
        </nav>
      </WindowHeader>

      <div className="window-body finder-layout @container">
        <aside className="finder-sidebar" aria-label={t("finder.locations")}>
          <p className="sidebar-heading">{t("finder.favorites")}</p>
          <ul>
            {roots.map(renderLink)}
          </ul>
          {!isMobile && (
            <>
              <p className="sidebar-heading">{t("finder.projects")}</p>
              <ul>
                {projectFolders.map(renderLink)}
              </ul>
            </>
          )}
        </aside>

        <ul
          className="finder-grid"
          aria-label={t("finder.contents", { name: folder.name })}
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          {folder.children.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={clsx("finder-item", selected === item.id && "is-selected")}
                onClick={() => (isMobile ? open(item) : setSelected(item.id))}
                onDoubleClick={() => open(item)}
                onKeyDown={(e) => e.key === "Enter" && open(item)}
                title={isMobile ? undefined : t("finder.doubleClick")}
              >
                <img src={item.icon} alt="" aria-hidden="true" loading="lazy" />
                <span className="finder-item-name">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="finder-status">
        {t("finder.items", { count: folder.children.length })}
        {!isMobile && <span className="max-sm:hidden"> · {t("finder.doubleClick")}</span>}
      </div>
    </>
  );
};

export default Finder;
