import { useCallback, useRef, useState } from "react";
import { Search, SlidersHorizontal, Wifi } from "lucide-react";
import AppleLogo from "./AppleLogo";
import ControlCenter from "./ControlCenter";
import { menuLinks } from "#constants";
import useWindowStore, { selectFocusedKey } from "#store/window";
import useUiStore from "#store/ui";
import { useNow } from "../../hooks/useNow";
import { useDismiss } from "../../hooks/useDismiss";
import { useToggleDark, useIsDark } from "../../hooks/useTheme";
import { openApp, openWindow } from "../../lib/actions";
import { prefetchWindow } from "../../windows";
import { formatDate, toggleLocale, useLocale, useT } from "../../i18n";
import { useContent } from "../../i18n/content";

const CLOCK = { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" };

const AppleMenu = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, [btnRef, menuRef], close);
  const toggleDark = useToggleDark();
  const isDark = useIsDark();
  const closeAll = useWindowStore((s) => s.closeAll);
  const t = useT();
  const ui = useUiStore.getState;

  const items = [
    { id: "about", label: t("menu.aboutReza"), run: () => openApp("notes") },
    { id: "projects", label: t("menu.projects"), run: () => openApp("safari") },
    { id: "resume", label: t("menu.resume"), run: () => openApp("resume") },
    "-",
    { id: "settings", label: t("menu.settings"), run: () => openApp("settings") },
    { id: "dark", label: t(isDark ? "menu.lightMode" : "menu.darkMode"), run: toggleDark },
    { id: "spotlight", label: t("menu.spotlight"), hint: "⌘K", run: () => ui().openSpotlight() },
    { id: "mc", label: t("menu.missionControl"), hint: "F3", run: () => ui().toggleMissionControl() },
    { id: "kb", label: t("menu.shortcuts"), hint: "?", run: () => ui().openShortcuts() },
    "-",
    { id: "closeAll", label: t("menu.closeAll"), run: closeAll },
  ];

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        className="menubar-item menubar-apple"
        aria-label={t("menu.appleMenu")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <AppleLogo className="h-[15px] w-auto" />
      </button>
      {open && (
        <div ref={menuRef} className="menu-dropdown" role="menu">
          {items.map((item, i) =>
            item === "-" ? (
              <div key={i} className="menu-sep" role="separator" />
            ) : (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className="menu-item"
                onClick={() => {
                  item.run();
                  close();
                }}
              >
                <span>{item.label}</span>
                {item.hint && <kbd className="ltr">{item.hint}</kbd>}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

const MenuBar = () => {
  const now = useNow();
  const t = useT();
  const locale = useLocale();
  const { profile } = useContent();
  const focused = useWindowStore(selectFocusedKey);
  const { controlCenterOpen, toggleControlCenter, closeControlCenter, openSpotlight } =
    useUiStore();
  const ccBtnRef = useRef(null);
  const ccRef = useRef(null);
  useDismiss(controlCenterOpen, [ccBtnRef, ccRef], closeControlCenter);

  const clock = formatDate(now, CLOCK, locale);

  return (
    <header className="menubar">
      <nav className="menubar-left" aria-label={t("menu.menuBar")}>
        <AppleMenu />
        <span className="menubar-item menubar-app">
          {focused ? t(`window.${focused}`) : profile.name}
        </span>
        {menuLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            className="menubar-item"
            onPointerEnter={() => prefetchWindow(link.window)}
            onClick={() => openWindow(link.window)}
          >
            {t(`menu.${link.id}`)}
          </button>
        ))}
      </nav>

      <div className="notch" aria-hidden="true" />

      <div className="menubar-right">
        <button
          type="button"
          className="menubar-item menubar-lang"
          onClick={toggleLocale}
          aria-label={t("menu.languageAria")}
          lang={locale === "fa" ? "en" : "fa"}
        >
          {t("menu.language")}
        </button>
        <span className="menubar-item max-lg:hidden" aria-hidden="true">
          <Wifi className="size-4" />
        </span>
        <button
          type="button"
          className="menubar-item"
          onClick={openSpotlight}
          aria-label={t("menu.spotlightAria")}
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
        <button
          ref={ccBtnRef}
          type="button"
          className="menubar-item"
          onClick={toggleControlCenter}
          aria-label={t("menu.controlCenter")}
          aria-expanded={controlCenterOpen}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
        </button>
        <time className="menubar-item menubar-clock tabular-nums" dateTime={now.toISOString()}>
          {locale === "fa" ? clock.replace("،", "") : clock.replace(",", "").replace(" at", "")}
        </time>
      </div>

      {controlCenterOpen && (
        <div ref={ccRef} className="contents">
          <ControlCenter />
        </div>
      )}
    </header>
  );
};

export default MenuBar;
