import { useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import { locations } from "#constants";
import useWindowStore from "#store/window";
import { openExternal } from "../lib/actions";

const ROOTS = Object.values(locations);

// Find the path (root → … → folder) to a folder id.
const findPath = (id, nodes = ROOTS, trail = []) => {
  for (const node of nodes) {
    if (node.kind !== "folder") continue;
    const path = [...trail, node];
    if (node.id === id) return path;
    const found = findPath(id, node.children ?? [], path);
    if (found) return found;
  }
  return null;
};

const Finder = ({ data, openCount }) => {
  const { isMobile } = useWindowContext();
  const openWindow = useWindowStore((s) => s.openWindow);
  const [path, setPath] = useState(() => findPath(data?.location ?? "work"));
  const [selected, setSelected] = useState(null);
  // Re-opened from elsewhere (dock, Trash, a link): jump to that folder.
  const [handled, setHandled] = useState(openCount);
  if (openCount !== handled) {
    setHandled(openCount);
    setPath(findPath(data?.location ?? "work"));
    setSelected(null);
  }

  const folder = path[path.length - 1];

  const goTo = (id) => {
    setPath(findPath(id));
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
      <WindowHeader className="finder-toolbar" backLabel="Home">
        <div className="finder-nav" data-no-drag>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => path.length > 1 && setPath(path.slice(0, -1))}
            disabled={path.length < 2}
            aria-label="Up one folder"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
        </div>
        <nav className="finder-breadcrumb" aria-label="Folder path">
          {path.map((node, i) => (
            <span key={node.id} className="flex items-center gap-1 min-w-0">
              {i > 0 && <ChevronRight aria-hidden="true" className="crumb-sep" />}
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
        <aside className="finder-sidebar" aria-label="Locations">
          <p className="sidebar-heading">Favorites</p>
          <ul>
            {ROOTS.map(renderLink)}
          </ul>
          {!isMobile && (
            <>
              <p className="sidebar-heading">Projects</p>
              <ul>
                {projectFolders.map(renderLink)}
              </ul>
            </>
          )}
        </aside>

        <ul
          className="finder-grid"
          aria-label={`${folder.name} contents`}
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
                title={isMobile ? undefined : "Double-click to open"}
              >
                <img src={item.icon} alt="" aria-hidden="true" loading="lazy" />
                <span className="finder-item-name">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="finder-status">
        {folder.children.length} items
        {!isMobile && <span className="max-sm:hidden"> · Double-click to open</span>}
      </div>
    </>
  );
};

export default Finder;
