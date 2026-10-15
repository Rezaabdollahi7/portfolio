import { ChevronLeft, Minus, Plus, X } from "lucide-react";
import useWindowStore from "#store/window";
import { useWindowContext } from "./WindowContext";
import { useT } from "../../i18n";

// macOS traffic lights on desktop, an iOS back button on phones.
const WindowControls = ({ backLabel, onBack }) => {
  const t = useT();
  const label = backLabel ?? t("win.home");
  const { windowKey, isMobile, isMaximized } = useWindowContext();
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);

  if (isMobile) {
    return (
      <button
        type="button"
        className="ios-back"
        onClick={onBack ?? (() => closeWindow(windowKey))}
        aria-label={t("win.backTo", { label })}
      >
        <ChevronLeft aria-hidden="true" className="rtl-flip" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="traffic-lights">
      <button
        type="button"
        className="tl tl-close"
        aria-label={t("win.close")}
        onClick={() => closeWindow(windowKey)}
      >
        <X aria-hidden="true" strokeWidth={3} />
      </button>
      <button
        type="button"
        className="tl tl-min"
        aria-label={t("win.minimize")}
        onClick={() => minimizeWindow(windowKey)}
      >
        <Minus aria-hidden="true" strokeWidth={3} />
      </button>
      <button
        type="button"
        className="tl tl-max"
        aria-label={isMaximized ? t("win.restore") : t("win.zoom")}
        onClick={() => toggleMaximize(windowKey)}
      >
        <Plus aria-hidden="true" strokeWidth={3} />
      </button>
    </div>
  );
};

export default WindowControls;
