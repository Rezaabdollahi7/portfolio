import clsx from "clsx";
import { Check, ArrowUpRight } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import { wallpapers } from "#constants";
import useSettingsStore from "#store/settings";
import { useIsDark } from "../hooks/useTheme";

const APPEARANCES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "auto", label: "Auto" },
];

const Settings = () => {
  const { appearance, wallpaper, setAppearance, setWallpaper } = useSettingsStore();
  const isDark = useIsDark();
  const { isMobile } = useWindowContext();

  return (
    <>
      <WindowHeader title="System Settings" backLabel="Home" />
      <div className="window-body settings @container">
        <section className="settings-group" aria-labelledby="appearance-title">
          <h3 id="appearance-title" className="settings-title">
            Appearance
          </h3>
          <div className="settings-card">
            <div className="appearance-options" role="radiogroup" aria-label="Appearance">
              {APPEARANCES.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={appearance === opt.id}
                  className="appearance-option"
                  onClick={() => setAppearance(opt.id)}
                >
                  <span className={clsx("appearance-preview", `is-${opt.id}`)} aria-hidden="true">
                    <span className="ap-bar" />
                    <span className="ap-window" />
                  </span>
                  <span className="appearance-label">{opt.label}</span>
                </button>
              ))}
            </div>
            <p className="settings-hint">
              Auto follows your device. Currently showing {isDark ? "dark" : "light"} mode.
            </p>
          </div>
        </section>

        <section className="settings-group" aria-labelledby="wallpaper-title">
          <h3 id="wallpaper-title" className="settings-title">
            Wallpaper
          </h3>
          <div className="settings-card wallpaper-grid" role="radiogroup" aria-label="Wallpaper">
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                type="button"
                role="radio"
                aria-checked={wallpaper === wp.id}
                className="wallpaper-option"
                onClick={() => setWallpaper(wp.id)}
              >
                <span className="wallpaper-thumb">
                  <img
                    src={(isDark ? wp.dark : wp.light).replace("/wallpapers/", "/wallpapers/thumbs/")}
                    alt=""
                    decoding="async"
                    width="360"
                    height="225"
                  />
                  {wallpaper === wp.id && (
                    <span className="wallpaper-check" aria-hidden="true">
                      <Check strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className="wallpaper-name">{wp.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-group" aria-labelledby="about-title">
          <h3 id="about-title" className="settings-title">
            About this portfolio
          </h3>
          <dl className="settings-card settings-rows">
            <div>
              <dt>Version</dt>
              <dd>2.0</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>React 19 · Vite · Tailwind CSS 4 · GSAP · Zustand</dd>
            </div>
            {!isMobile && (
              <div>
                <dt>Shortcuts</dt>
                <dd>⌘K Spotlight · Double-click a title bar to zoom</dd>
              </div>
            )}
            <div>
              <dt>Source</dt>
              <dd>
                <a
                  href="https://github.com/Rezaabdollahi7/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  github.com/Rezaabdollahi7/portfolio
                  <ArrowUpRight aria-hidden="true" className="inline size-3.5" />
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
};

export default Settings;
