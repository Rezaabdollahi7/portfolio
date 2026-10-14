import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import useUiStore from "#store/ui";
import { useT } from "../i18n";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const CMD = isMac ? "⌘" : "Ctrl";
const OPT = isMac ? "⌥" : "Alt";
const CTRL = isMac ? "⌃" : "Ctrl";

const SHORTCUTS = [
  { keys: [[CMD, "K"]], label: "kb.spotlight" },
  { keys: [["F3"], [CTRL, "↑"]], label: "kb.missionControl" },
  { keys: [[OPT, "W"]], label: "kb.closeWindow" },
  { keys: [[OPT, "M"]], label: "kb.minimize" },
  { keys: [[OPT, "Z"]], label: "kb.zoom" },
  { keys: [[OPT, "`"]], label: "kb.cycle" },
  { keys: [[OPT, "D"]], label: "kb.showDesktop" },
  { keys: [[OPT, "L"]], label: "kb.language" },
  { keys: [["?"]], label: "kb.help" },
  { keys: [["Esc"]], label: "kb.esc" },
];

const GESTURES = ["kb.snap", "kb.resize", "kb.zoomDouble", "kb.rightClick"];

const Panel = () => {
  const close = useUiStore((s) => s.closeShortcuts);
  const t = useT();
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return createPortal(
    <div className="sheet-backdrop" onPointerDown={(e) => e.target === e.currentTarget && close()}>
      <div className="kb-sheet" role="dialog" aria-modal="true" aria-labelledby="kb-title">
        <div className="kb-head">
          <h2 id="kb-title">{t("kb.title")}</h2>
          <button ref={closeRef} type="button" className="toolbar-btn" onClick={close} aria-label={t("kb.close")}>
            <X aria-hidden="true" />
          </button>
        </div>
        <dl className="kb-list">
          {SHORTCUTS.map(({ keys, label }) => (
            <div key={label} className="kb-row">
              <dt>{t(label)}</dt>
              <dd className="ltr">
                {keys.map((combo, i) => (
                  <span key={i} className="kb-combo">
                    {i > 0 && <span className="kb-or">/</span>}
                    {combo.map((k) => (
                      <kbd key={k}>{k}</kbd>
                    ))}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <h3 className="kb-subtitle">{t("kb.gestures")}</h3>
        <ul className="kb-gestures">
          {GESTURES.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
};

const KeyboardShortcuts = () => {
  const open = useUiStore((s) => s.shortcutsOpen);
  return open ? <Panel /> : null;
};

export default KeyboardShortcuts;
