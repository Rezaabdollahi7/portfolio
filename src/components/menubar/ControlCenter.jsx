import clsx from "clsx";
import { Languages, Moon, Pause, Play, SkipBack, SkipForward, Sun, Volume2, Wifi } from "lucide-react";
import useUiStore from "#store/ui";
import useMusicStore, { tracks } from "#store/music";
import { useIsDark, useToggleDark } from "../../hooks/useTheme";
import { toggleLocale, useLocale, useT } from "../../i18n";

const Slider = ({ label, icon: Icon, value, min = 0, onChange }) => (
  <div className="cc-tile cc-slider">
    <p className="cc-label">{label}</p>
    <label className="cc-range" dir="ltr">
      <Icon aria-hidden="true" />
      <input
        type="range"
        min={min}
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{ "--value": `${((value - min) / (100 - min)) * 100}%` }}
      />
    </label>
  </div>
);

// macOS-style Control Center. Shared by the desktop menu bar and the
// phone home screen.
const ControlCenter = ({ className }) => {
  const isDark = useIsDark();
  const toggleDark = useToggleDark();
  const { brightness, setBrightness } = useUiStore();
  const { index, isPlaying, toggle, next, prev, volume, setVolume } = useMusicStore();
  const track = tracks[index];
  const t = useT();
  const locale = useLocale();

  return (
    <div className={clsx("control-center", className)} role="dialog" aria-label={t("menu.controlCenter")}>
      <div className="cc-grid">
        <div className="cc-tile cc-toggles">
          <div className="cc-toggle">
            <span className="cc-icon is-on" aria-hidden="true">
              <Wifi />
            </span>
            <span>
              <span className="cc-toggle-title">{t("cc.wifi")}</span>
              <span className="cc-toggle-sub">{t("cc.home")}</span>
            </span>
          </div>
          <button
            type="button"
            className="cc-toggle"
            onClick={toggleDark}
            aria-pressed={isDark}
          >
            <span className={clsx("cc-icon", isDark && "is-on")} aria-hidden="true">
              {isDark ? <Moon /> : <Sun />}
            </span>
            <span>
              <span className="cc-toggle-title">{t("cc.darkMode")}</span>
              <span className="cc-toggle-sub">{t(isDark ? "cc.on" : "cc.off")}</span>
            </span>
          </button>
          <button
            type="button"
            className="cc-toggle"
            onClick={toggleLocale}
            aria-label={t("menu.languageAria")}
          >
            <span className="cc-icon is-on" aria-hidden="true">
              <Languages />
            </span>
            <span>
              <span className="cc-toggle-title">{t("cc.language")}</span>
              <span className="cc-toggle-sub">{locale === "fa" ? "فارسی" : "English"}</span>
            </span>
          </button>
        </div>

        <div className="cc-tile cc-music">
          <img src={track.cover} alt="" className="cc-cover" width="44" height="44" />
          <div className="min-w-0">
            <p className="cc-track truncate">{track.title}</p>
            <p className="cc-artist truncate">{track.artist}</p>
          </div>
          <div className="cc-music-controls" dir="ltr">
            <button type="button" onClick={prev} aria-label={t("cc.prev")}>
              <SkipBack aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={t(isPlaying ? "cc.pause" : "cc.play")}
              className="cc-play"
            >
              {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <button type="button" onClick={next} aria-label={t("cc.next")}>
              <SkipForward aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Slider label={t("cc.display")} icon={Sun} value={brightness} min={30} onChange={setBrightness} />
      <Slider label={t("cc.sound")} icon={Volume2} value={volume} onChange={setVolume} />
    </div>
  );
};

export default ControlCenter;
