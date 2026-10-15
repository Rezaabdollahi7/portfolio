import WindowHeader from "./WindowHeader";
import { useT } from "../../i18n";

const WindowFallback = ({ title }) => {
  const t = useT();
  return (
  <>
    <WindowHeader title={title} />
    <div className="window-body grid place-items-center" aria-busy="true">
      <div className="spinner" aria-label={t("win.loading")} />
    </div>
  </>
  );
};

export default WindowFallback;
