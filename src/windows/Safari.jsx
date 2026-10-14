import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Plus,
  RotateCw,
  Share,
  X,
} from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import ProjectsIndex from "../components/safari/ProjectsIndex";
import ProjectDetail from "../components/safari/ProjectDetail";
import { getProject } from "#constants";
import useUiStore from "#store/ui";
import { useBackLayer } from "../hooks/useBackLayer";

const HOST = "srezadev.ir";
const INDEX = { type: "index" };

const pagePath = (page) =>
  page.type === "project" ? `/projects/${getProject(page.id)?.slug}` : "/projects";

const pageTitle = (page) =>
  page.type === "project" ? getProject(page.id)?.title ?? "Project" : "Projects";

let tabSeq = 0;
const newTab = (page = INDEX) => ({ id: ++tabSeq, history: [page], index: 0 });

const Safari = ({ data, openCount }) => {
  const { isMobile, isVisible } = useWindowContext();
  const showToast = useUiStore((s) => s.showToast);
  const [tabs, setTabs] = useState(() => [
    newTab(data?.projectId ? { type: "project", id: data.projectId } : INDEX),
  ]);
  const [activeId, setActiveId] = useState(() => tabs[0].id);
  const scrollRef = useRef(null);

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const page = active.history[active.index];

  const updateTab = (id, fn) =>
    setTabs((prev) => prev.map((t) => (t.id === id ? fn(t) : t)));

  const navigate = (next, { newTabToo = false } = {}) => {
    if (newTabToo) {
      const tab = newTab(next);
      setTabs((prev) => [...prev, tab]);
      setActiveId(tab.id);
      return;
    }
    updateTab(active.id, (t) => {
      const current = t.history[t.index];
      if (current.type === next.type && current.id === next.id) return t;
      const history = [...t.history.slice(0, t.index + 1), next];
      return { ...t, history, index: history.length - 1 };
    });
  };

  // Opened from elsewhere (Notes link, Finder, Spotlight, deep link).
  const [handled, setHandled] = useState(openCount);
  if (openCount !== handled) {
    setHandled(openCount);
    if (data?.projectId) navigate({ type: "project", id: data.projectId });
    else if (data?.home) navigate(INDEX);
  }

  // Scroll to top on navigation, and mirror the page in the URL hash.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    const hash = `#${pagePath(page)}`;
    if (window.location.hash !== hash) window.history.replaceState(window.history.state, "", hash);
  }, [page]);

  const go = (delta) =>
    updateTab(active.id, (t) => ({
      ...t,
      index: Math.min(Math.max(t.index + delta, 0), t.history.length - 1),
    }));

  // Phone back button walks back through Safari's own history first.
  useBackLayer(active.index > 0, () => go(-1), {
    enabled: isMobile && isVisible,
    step: `${active.id}:${active.index}`,
  });

  const closeTab = (id) => {
    if (tabs.length === 1) return;
    const i = tabs.findIndex((t) => t.id === id);
    const rest = tabs.filter((t) => t.id !== id);
    setTabs(rest);
    if (id === activeId) setActiveId(rest[Math.max(0, i - 1)].id);
  };

  const share = async () => {
    const url = `https://${HOST}/#${pagePath(page)}`;
    try {
      if (isMobile && navigator.share) {
        await navigator.share({ title: pageTitle(page), url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("Link copied");
      }
    } catch {
      /* dismissed */
    }
  };

  const openProject = (project, inNewTab) =>
    navigate({ type: "project", id: project.id }, { newTabToo: inNewTab && !isMobile });

  const project = page.type === "project" ? getProject(page.id) : null;

  return (
    <>
      <WindowHeader
        className="safari-toolbar"
        backLabel="Home"
        hideTitleOnMobile
      >
        <div className="safari-nav" data-no-drag>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => go(-1)}
            disabled={active.index === 0}
            aria-label="Go back"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="toolbar-btn max-sm:hidden"
            onClick={() => go(1)}
            disabled={active.index >= active.history.length - 1}
            aria-label="Go forward"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="safari-address">
          <Lock aria-hidden="true" className="safari-lock" />
          <span className="truncate">
            <span className="safari-host">{HOST}</span>
            <span className="safari-path">{pagePath(page)}</span>
          </span>
          <RotateCw aria-hidden="true" className="safari-reload max-sm:hidden" />
        </div>

        <div className="safari-actions" data-no-drag>
          <button
            type="button"
            className="toolbar-btn"
            onClick={share}
            aria-label="Share link to this page"
          >
            <Share aria-hidden="true" />
          </button>
          <button
            type="button"
            className="toolbar-btn max-md:hidden"
            onClick={() => navigate(INDEX, { newTabToo: true })}
            aria-label="New tab"
          >
            <Plus aria-hidden="true" />
          </button>
        </div>
      </WindowHeader>

      {tabs.length > 1 && (
        <div className="safari-tabs" aria-label="Open tabs">
          {tabs.map((tab) => {
            const p = tab.history[tab.index];
            return (
              <div
                key={tab.id}
                className={clsx("safari-tab", tab.id === activeId && "is-active")}
              >
                <button
                  type="button"
                  aria-current={tab.id === activeId ? "page" : undefined}
                  className="safari-tab-label"
                  onClick={() => setActiveId(tab.id)}
                >
                  {pageTitle(p)}
                </button>
                <button
                  type="button"
                  className="safari-tab-close"
                  onClick={() => closeTab(tab.id)}
                  aria-label={`Close ${pageTitle(p)} tab`}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div ref={scrollRef} className="window-body safari-page @container">
        {project ? (
          <ProjectDetail
            key={project.id}
            project={project}
            onBack={() => navigate(INDEX)}
            onOpen={(p) => openProject(p, false)}
          />
        ) : (
          <ProjectsIndex onOpen={openProject} />
        )}
      </div>
    </>
  );
};

export default Safari;
