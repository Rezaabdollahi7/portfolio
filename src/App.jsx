import MenuBar from "./components/menubar/MenuBar";
import Dock from "./components/Dock";
import Welcome from "./components/desktop/Welcome";
import DesktopIcons from "./components/desktop/DesktopIcons";
import { CalendarWidget, WeatherWidget } from "./components/desktop/Widgets";
import MobileHome from "./components/mobile/MobileHome";
import Spotlight from "./components/Spotlight";
import Toast from "./components/Toast";
import { windows } from "./windows";
import useUiStore from "#store/ui";
import { useIsMobile } from "./hooks/useMediaQuery";
import { useApplyTheme } from "./hooks/useTheme";
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts";
import { useDeepLink } from "./hooks/useDeepLink";
import { useMobileBackNavigation } from "./hooks/useMobileBackNavigation";
import { openApp } from "./lib/actions";

const App = () => {
  useApplyTheme();
  useGlobalShortcuts();
  const isMobile = useIsMobile();
  useMobileBackNavigation(isMobile);
  useDeepLink();
  const brightness = useUiStore((s) => s.brightness);

  return (
    <>
      <button type="button" className="skip-link" onClick={() => openApp("safari")}>
        Skip to projects
      </button>

      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          <MenuBar />
          <main className="desktop" aria-label="Desktop">
            <div className="widgets">
              <CalendarWidget />
              <WeatherWidget />
            </div>
            <Welcome />
            <DesktopIcons />
          </main>
          <Dock />
        </>
      )}

      {windows.map(({ key, Component }) => (
        <Component key={key} />
      ))}

      <Spotlight />
      <Toast />
      <div
        className="brightness-overlay"
        style={{ opacity: ((100 - brightness) / 100) * 0.85 }}
        aria-hidden="true"
      />
    </>
  );
};

export default App;
