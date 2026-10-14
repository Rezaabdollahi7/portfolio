import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Copy, CornerDownLeft, Download, FileText, Moon, Search } from "lucide-react";
import { apps, notes, profile, projects } from "#constants";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
import { copyEmail, openApp, openProject, openWindow } from "../lib/actions";

const buildIndex = () => [
  ...apps
    .filter((a) => a.id !== "trash")
    .map((a) => ({
      id: `app-${a.id}`,
      group: "Applications",
      title: a.name,
      subtitle: a.href ? "Opens in a new tab" : "Application",
      icon: a.icon,
      terms: `${a.name} ${a.keywords}`,
      run: () => openApp(a.id),
    })),
  ...projects.map((p) => ({
    id: `project-${p.id}`,
    group: "Projects",
    title: p.title,
    subtitle: p.tagline,
    thumb: p.thumbnail,
    terms: `${p.title} ${p.tagline} ${p.kind} ${p.stack.join(" ")}`,
    run: () => openProject(p.id),
  })),
  ...notes.map((n) => ({
    id: `note-${n.id}`,
    group: "Notes",
    title: n.title,
    subtitle: "Note",
    glyph: FileText,
    terms: `${n.title} about notes`,
    run: () => openWindow("notes", { noteId: n.id }),
  })),
  {
    id: "act-email",
    group: "Actions",
    title: "Copy email address",
    subtitle: profile.email,
    glyph: Copy,
    terms: "copy email contact hire",
    run: copyEmail,
  },
  {
    id: "act-resume",
    group: "Actions",
    title: "Download resume (PDF)",
    subtitle: "reza-abdollahi-resume.pdf",
    glyph: Download,
    terms: "download resume cv pdf",
    run: () => {
      const a = document.createElement("a");
      a.href = profile.resumeUrl;
      a.download = "";
      a.click();
    },
  },
  {
    id: "act-theme",
    group: "Actions",
    title: "Toggle dark mode",
    subtitle: "Appearance",
    glyph: Moon,
    terms: "dark light theme appearance mode",
    run: () => {
      const s = useSettingsStore.getState();
      const dark = document.documentElement.classList.contains("dark");
      s.setAppearance(dark ? "light" : "dark");
    },
  },
];

const SUGGESTED = ["project-dofixo", "project-finora", "app-notes", "app-resume", "act-email"];

// Mounted only while open, so every open starts with a clean query.
const SpotlightPanel = () => {
  const closeSpotlight = useUiStore((s) => s.closeSpotlight);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [index] = useState(buildIndex);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUGGESTED.map((id) => index.find((r) => r.id === id));
    const words = q.split(/\s+/);
    return index
      .map((r) => {
        const hay = r.terms.toLowerCase();
        const title = r.title.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = title.startsWith(q) ? 0 : title.includes(q) ? 1 : 2;
        return { r, score };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score)
      .slice(0, 9)
      .map((x) => x.r);
  }, [query, index]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);


  const choose = (item) => {
    closeSpotlight();
    item?.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeSpotlight();
    }
  };

  return createPortal(
    <div className="spotlight-backdrop" onPointerDown={closeSpotlight}>
      <div
        className="spotlight"
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight search"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="spotlight-input">
          <Search aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search projects, apps, notes…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="spotlight-results"
            aria-activedescendant={results[active] ? `sl-${results[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="max-sm:hidden">esc</kbd>
        </div>

        <ul id="spotlight-results" ref={listRef} className="spotlight-results" role="listbox">
          {!query && <li className="spotlight-group">Suggestions</li>}
          {results.map((item, i) => {
            const showGroup = query && item.group !== results[i - 1]?.group;
            const Glyph = item.glyph;
            return (
              <li key={item.id} role="presentation">
                {showGroup && <p className="spotlight-group">{item.group}</p>}
                <button
                  id={`sl-${item.id}`}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  className={clsx("spotlight-item", i === active && "is-active")}
                  onPointerMove={() => setActive(i)}
                  onClick={() => choose(item)}
                >
                  {item.icon ? (
                    <img src={item.icon} alt="" className="spotlight-icon" />
                  ) : item.thumb ? (
                    <img src={item.thumb} alt="" className="spotlight-thumb" loading="lazy" />
                  ) : (
                    <span className="spotlight-glyph" aria-hidden="true">
                      <Glyph />
                    </span>
                  )}
                  <span className="min-w-0 flex-1 text-left">
                    <span className="spotlight-title">{item.title}</span>
                    <span className="spotlight-sub">{item.subtitle}</span>
                  </span>
                  {i === active && (
                    <CornerDownLeft aria-hidden="true" className="spotlight-enter" />
                  )}
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="spotlight-empty">No results for “{query}”</li>
          )}
        </ul>
      </div>
    </div>,
    document.body,
  );
};

const Spotlight = () => {
  const open = useUiStore((s) => s.spotlightOpen);
  return open ? <SpotlightPanel /> : null;
};

export default Spotlight;
