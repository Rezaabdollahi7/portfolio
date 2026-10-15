import MenuBar from "./components/menubar/MenuBar";
import Dock from "./components/Dock";
import Welcome from "./components/desktop/Welcome";
import DesktopIcons from "./components/desktop/DesktopIcons";
import { CalendarWidget, WeatherWidget } from "./components/desktop/Widgets";
import GitHubWidget from "./components/desktop/GitHubWidget";
import MobileHome from "./components/mobile/MobileHome";
import Spotlight from "./components/Spotlight";
import MissionControl from "./components/MissionControl";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import ContextMenu from "./components/desktop/ContextMenu";
import Toast from "./components/Toast";
import { windows } from "./windows";
import useUiStore from "#store/ui";
import { useIsMobile } from "./hooks/useMediaQuery";
import { useApplyTheme } from "./hooks/useTheme";
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts";
import { useDeepLink } from "./hooks/useDeepLink";
import { useMobileBackNavigation } from "./hooks/useMobileBackNavigation";
import { openApp } from "./lib/actions";
import { useApplyLocale } from "./i18n/useApplyLocale";
import { useT } from "./i18n";

// Right-click on the bare desktop (not on icons or widgets) opens its menu.
const onDesktopContextMenu = (e) => {
  if (e.target.closest("button, a, .widget")) return;
  e.preventDefault();
  useUiStore.getState().openContextMenu(e.clientX, e.clientY);
};

const App = () => {
  useApplyTheme();
  useApplyLocale();
  const t = useT();
  const isMobile = useIsMobile();
  useGlobalShortcuts(isMobile);
  useMobileBackNavigation(isMobile);
  useDeepLink();
  const brightness = useUiStore((s) => s.brightness);

  return (
    <>
      <button type="button" className="skip-link" onClick={() => openApp("safari")}>
        {t("skip")}
      </button>

      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          <MenuBar />
          <main className="desktop" aria-label={t("menu.desktop")} onContextMenu={onDesktopContextMenu}>
            <div className="widgets">
              <CalendarWidget />
              <WeatherWidget />
            </div>
            <Welcome />
            <GitHubWidget className="is-desktop" />
            <DesktopIcons />
          </main>
          <Dock />
          <MissionControl />
          <ContextMenu />
        </>
      )}

      {windows.map(({ key, Component }) => (
        <Component key={key} />
      ))}

      <Spotlight />
      <KeyboardShortcuts />
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
