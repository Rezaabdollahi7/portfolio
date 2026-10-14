import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import {
  Copy,
  CornerDownLeft,
  Download,
  FileText,
  Keyboard,
  Languages,
  LayoutGrid,
  Mail,
  Moon,
  Search,
} from "lucide-react";
import { apps, notes as notesEn, notesFa } from "#constants";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
import { useIsMobile } from "../hooks/useMediaQuery";
import { useBackLayer } from "../hooks/useBackLayer";
import { copyEmail, openApp, openProject, openWindow } from "../lib/actions";
import { toggleLocale, useLocale, useT } from "../i18n";
import { ui as strings } from "../i18n/ui";
import { getContent, projectSearchTerms } from "../i18n/content";

// Arabic/Persian letter variants, ZWNJ and Persian digits all match.
const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const bothLanguages = (key) => `${strings.en[key] ?? ""} ${strings.fa[key] ?? ""}`;

const buildIndex = (locale, t) => {
  const { profile, projects } = getContent(locale);
  const notes = locale === "fa" ? notesFa : notesEn;
  const ui = useUiStore.getState;
  return [
    ...apps
      .filter((a) => a.id !== "trash")
      .map((a) => ({
        id: `app-${a.id}`,
        group: t("spotlight.apps"),
        title: t(`app.${a.id}`),
        subtitle: a.href ? t("spotlight.newTab") : t("spotlight.application"),
        icon: a.icon,
        terms: `${bothLanguages(`app.${a.id}`)} ${a.keywords}`,
        run: () => openApp(a.id),
      })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      group: t("spotlight.projects"),
      title: p.title,
      subtitle: p.tagline,
      thumb: p.thumbnail,
      terms: `${projectSearchTerms(p.id)} ${p.kind} ${p.stack.join(" ")}`,
      run: () => openProject(p.id),
    })),
    ...notes.map((n) => ({
      id: `note-${n.id}`,
      group: t("spotlight.notes"),
      title: n.title,
      subtitle: t("spotlight.note"),
      glyph: FileText,
      terms: [notesEn, notesFa].map((list) => list.find((x) => x.id === n.id)?.title).join(" ") + " about notes",
      run: () => openWindow("notes", { noteId: n.id }),
    })),
    {
      id: "act-message",
      group: t("spotlight.actions"),
      title: t("action.message"),
      subtitle: t("action.messageSub"),
      glyph: Mail,
      terms: `${bothLanguages("action.message")} email contact hire form write`,
      run: () => openApp("mail"),
    },
    {
      id: "act-email",
      group: t("spotlight.actions"),
      title: t("action.copyEmail"),
      subtitle: profile.email,
      glyph: Copy,
      terms: `${bothLanguages("action.copyEmail")} copy email contact hire`,
      run: copyEmail,
    },
    {
      id: "act-resume",
      group: t("spotlight.actions"),
      title: t("action.downloadResume"),
      subtitle: "reza-abdollahi-resume.pdf",
      glyph: Download,
      terms: `${bothLanguages("action.downloadResume")} download resume cv pdf`,
      run: () => {
        const a = document.createElement("a");
        a.href = profile.resumeUrl;
        a.download = "";
        a.click();
      },
    },
    {
      id: "act-language",
      group: t("spotlight.actions"),
      title: t("action.language"),
      subtitle: t("action.languageSub"),
      glyph: Languages,
      terms: `${bothLanguages("action.language")} language persian farsi english rtl`,
      run: toggleLocale,
    },
    {
      id: "act-theme",
      group: t("spotlight.actions"),
      title: t("action.toggleDark"),
      subtitle: t("action.appearance"),
      glyph: Moon,
      terms: `${bothLanguages("action.toggleDark")} dark light theme appearance mode`,
      run: () => {
        const s = useSettingsStore.getState();
        const dark = document.documentElement.classList.contains("dark");
        s.setAppearance(dark ? "light" : "dark");
      },
    },
    {
      id: "act-mc",
      group: t("spotlight.actions"),
      title: t("action.missionControl"),
      subtitle: t("action.missionControlSub"),
      glyph: LayoutGrid,
      desktopOnly: true,
      terms: `${bothLanguages("action.missionControl")} windows expose overview`,
      run: () => ui().toggleMissionControl(),
    },
    {
      id: "act-shortcuts",
      group: t("spotlight.actions"),
      title: t("menu.shortcuts"),
      subtitle: "?",
      glyph: Keyboard,
      desktopOnly: true,
      terms: `${bothLanguages("menu.shortcuts")} keyboard shortcuts keys help`,
      run: () => ui().openShortcuts(),
    },
  ].map((r) => ({ ...r, terms: normalize(`${r.title} ${r.terms}`) }));
};

const SUGGESTED = ["project-dofixo", "project-finora", "app-notes", "app-resume", "act-message"];

// Mounted only while open, so every open starts with a clean query.
const SpotlightPanel = () => {
  const closeSpotlight = useUiStore((s) => s.closeSpotlight);
  const isMobile = useIsMobile();
  useBackLayer(true, closeSpotlight, { enabled: isMobile });
  const t = useT();
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const index = useMemo(
    () => buildIndex(locale, t).filter((r) => !(isMobile && r.desktopOnly)),
    [locale, t, isMobile],
  );

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return SUGGESTED.map((id) => index.find((r) => r.id === id));
    const words = q.split(/\s+/);
    return index
      .map((r) => {
        const hay = r.terms;
        const title = normalize(r.title);
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
        aria-label={t("spotlight.aria")}
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
            placeholder={t("spotlight.placeholder")}
            aria-label={t("spotlight.search")}
            role="combobox"
            aria-expanded="true"
            aria-controls="spotlight-results"
            aria-activedescendant={results[active] ? `sl-${results[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="max-sm:hidden ltr">esc</kbd>
        </div>

        <ul id="spotlight-results" ref={listRef} className="spotlight-results" role="listbox">
          {!query && <li className="spotlight-group">{t("spotlight.suggestions")}</li>}
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
                  <span className="min-w-0 flex-1 text-start">
                    <span className="spotlight-title">{item.title}</span>
                    <span className="spotlight-sub">{item.subtitle}</span>
                  </span>
                  {i === active && (
                    <CornerDownLeft aria-hidden="true" className="spotlight-enter rtl-flip" />
                  )}
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="spotlight-empty">{t("spotlight.empty", { q: query })}</li>
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
