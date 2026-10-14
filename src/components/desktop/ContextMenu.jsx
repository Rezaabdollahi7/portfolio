import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useUiStore from "#store/ui";
import useWindowStore from "#store/window";
import { useDismiss } from "../../hooks/useDismiss";
import { useIsDark, useToggleDark } from "../../hooks/useTheme";
import { openApp } from "../../lib/actions";
import { toggleLocale, useLocale, useT } from "../../i18n";

const Menu = ({ x, y }) => {
  const ref = useRef(null);
  const close = useUiStore((s) => s.closeContextMenu);
  const t = useT();
  const locale = useLocale();
  const isDark = useIsDark();
  const toggleDark = useToggleDark();
  useDismiss(true, [ref], close);

  const ui = useUiStore.getState;
  const items = [
    { id: "mail", label: t("ctx.newMessage"), run: () => openApp("mail") },
    { id: "terminal", label: t("ctx.terminal"), run: () => openApp("terminal") },
    "-",
    { id: "mc", label: t("ctx.missionControl"), hint: "F3", run: () => ui().toggleMissionControl() },
    { id: "desktop", label: t("ctx.showDesktop"), hint: "⌥D", run: () => useWindowStore.getState().toggleShowDesktop() },
    "-",
    { id: "wallpaper", label: t("ctx.wallpaper"), run: () => openApp("settings") },
    { id: "dark", label: t(isDark ? "menu.lightMode" : "menu.darkMode"), run: toggleDark },
    { id: "lang", label: t("ctx.language"), run: toggleLocale },
    "-",
    { id: "kb", label: t("menu.shortcuts"), hint: "?", run: () => ui().openShortcuts() },
  ];

  // Open beside the pointer (to its left in Persian), kept on screen.
  useLayoutEffect(() => {
    const el = ref.current;
    const { width, height } = el.getBoundingClientRect();
    const rtl = locale === "fa";
    let left = rtl ? x - width : x;
    if (left + width > window.innerWidth - 6) left = x - width;
    if (left < 6) left = Math.min(x, window.innerWidth - width - 6);
    const top = y + height > window.innerHeight - 6 ? Math.max(6, y - height) : y;
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.querySelector("button")?.focus({ preventScroll: true });
  }, [x, y, locale]);

  useEffect(() => {
    window.addEventListener("resize", close);
    window.addEventListener("blur", close);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("blur", close);
    };
  }, [close]);

  const onKeyDown = (e) => {
    const buttons = [...ref.current.querySelectorAll("button")];
    const i = buttons.indexOf(document.activeElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      buttons[(i + step + buttons.length) % buttons.length]?.focus();
    } else if (e.key === "Tab") {
      e.preventDefault();
      close();
    }
  };

  return createPortal(
    <div
      ref={ref}
      className="menu-dropdown context-menu"
      role="menu"
      aria-label={t("ctx.desktop")}
      onKeyDown={onKeyDown}
      onContextMenu={(e) => e.preventDefault()}
    >
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
              close();
              item.run();
            }}
          >
            <span>{item.label}</span>
            {item.hint && <kbd className="ltr">{item.hint}</kbd>}
          </button>
        ),
      )}
    </div>,
    document.body,
  );
};

const ContextMenu = () => {
  const menu = useUiStore((s) => s.contextMenu);
  return menu ? <Menu key={`${menu.x},${menu.y}`} x={menu.x} y={menu.y} /> : null;
};

export default ContextMenu;
