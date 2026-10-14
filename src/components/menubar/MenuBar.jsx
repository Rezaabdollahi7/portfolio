import { useCallback, useRef, useState } from "react";
import { Search, SlidersHorizontal, Wifi } from "lucide-react";
import AppleLogo from "./AppleLogo";
import ControlCenter from "./ControlCenter";
import { menuLinks, windowTitles } from "#constants";
import useWindowStore, { selectFocusedKey } from "#store/window";
import useUiStore from "#store/ui";
import { useNow } from "../../hooks/useNow";
import { useDismiss } from "../../hooks/useDismiss";
import { useToggleDark, useIsDark } from "../../hooks/useTheme";
import { openApp, openWindow } from "../../lib/actions";
import { prefetchWindow } from "../../windows";

const clockFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const AppleMenu = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, [btnRef, menuRef], close);
  const toggleDark = useToggleDark();
  const isDark = useIsDark();
  const closeAll = useWindowStore((s) => s.closeAll);

  const items = [
    { label: "About Reza", run: () => openApp("notes") },
    { label: "Projects", run: () => openApp("safari") },
    { label: "Resume", run: () => openApp("resume") },
    "-",
    { label: "System Settings…", run: () => openApp("settings") },
    { label: isDark ? "Light Mode" : "Dark Mode", run: toggleDark },
    { label: "Spotlight Search", hint: "⌘K", run: () => useUiStore.getState().openSpotlight() },
    "-",
    { label: "Close All Windows", run: closeAll },
  ];

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        className="menubar-item menubar-apple"
        aria-label="Apple menu"
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
                key={item.label}
                type="button"
                role="menuitem"
                className="menu-item"
                onClick={() => {
                  item.run();
                  close();
                }}
              >
                <span>{item.label}</span>
                {item.hint && <kbd>{item.hint}</kbd>}
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
  const focused = useWindowStore(selectFocusedKey);
  const { controlCenterOpen, toggleControlCenter, closeControlCenter, openSpotlight } =
    useUiStore();
  const ccBtnRef = useRef(null);
  const ccRef = useRef(null);
  useDismiss(controlCenterOpen, [ccBtnRef, ccRef], closeControlCenter);

  return (
    <header className="menubar">
      <nav className="menubar-left" aria-label="Menu bar">
        <AppleMenu />
        <span className="menubar-item menubar-app">
          {focused ? windowTitles[focused] : "Reza Abdollahi"}
        </span>
        {menuLinks.map((link) => (
          <button
            key={link.label}
            type="button"
            className="menubar-item"
            onPointerEnter={() => prefetchWindow(link.window)}
            onClick={() => openWindow(link.window)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="notch" aria-hidden="true" />

      <div className="menubar-right">
        <span className="menubar-item max-lg:hidden" aria-hidden="true">
          <Wifi className="size-4" />
        </span>
        <button
          type="button"
          className="menubar-item"
          onClick={openSpotlight}
          aria-label="Spotlight search (Command K)"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
        <button
          ref={ccBtnRef}
          type="button"
          className="menubar-item"
          onClick={toggleControlCenter}
          aria-label="Control Center"
          aria-expanded={controlCenterOpen}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
        </button>
        <time className="menubar-item menubar-clock tabular-nums" dateTime={now.toISOString()}>
          {clockFormat.format(now).replace(",", "").replace(" at", "")}
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
