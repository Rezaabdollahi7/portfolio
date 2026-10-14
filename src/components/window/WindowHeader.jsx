import clsx from "clsx";
import useWindowStore from "#store/window";
import WindowControls from "./WindowControls";
import { useWindowContext } from "./WindowContext";

// Title bar: drag handle on desktop (double-click to zoom), nav bar on phones.
const WindowHeader = ({
  title,
  children,
  className,
  backLabel,
  onBack,
  hideTitleOnMobile = false,
}) => {
  const { windowKey, setHandle, isMobile } = useWindowContext();
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);

  const onDoubleClick = (e) => {
    if (isMobile || e.target.closest("button, a, input, [data-no-drag]")) return;
    toggleMaximize(windowKey);
  };

  return (
    <div
      ref={setHandle}
      className={clsx("window-header", className)}
      onDoubleClick={onDoubleClick}
    >
      <WindowControls backLabel={backLabel} onBack={onBack} />
      {title && !(isMobile && hideTitleOnMobile) ? (
        <h2 className="window-title">{title}</h2>
      ) : null}
      {children}
    </div>
  );
};

export default WindowHeader;
