import { ChevronLeft, Minus, Plus, X } from "lucide-react";
import useWindowStore from "#store/window";
import { useWindowContext } from "./WindowContext";

// macOS traffic lights on desktop, an iOS back button on phones.
const WindowControls = ({ backLabel = "Home", onBack }) => {
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
        aria-label={`Back to ${backLabel}`}
      >
        <ChevronLeft aria-hidden="true" />
        <span>{backLabel}</span>
      </button>
    );
  }

  return (
    <div className="traffic-lights">
      <button
        type="button"
        className="tl tl-close"
        aria-label="Close window"
        onClick={() => closeWindow(windowKey)}
      >
        <X aria-hidden="true" strokeWidth={3} />
      </button>
      <button
        type="button"
        className="tl tl-min"
        aria-label="Minimize window"
        onClick={() => minimizeWindow(windowKey)}
      >
        <Minus aria-hidden="true" strokeWidth={3} />
      </button>
      <button
        type="button"
        className="tl tl-max"
        aria-label={isMaximized ? "Restore window size" : "Zoom window"}
        onClick={() => toggleMaximize(windowKey)}
      >
        <Plus aria-hidden="true" strokeWidth={3} />
      </button>
    </div>
  );
};

export default WindowControls;
