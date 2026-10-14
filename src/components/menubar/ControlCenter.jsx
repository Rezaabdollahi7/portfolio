import clsx from "clsx";
import { Moon, Pause, Play, SkipBack, SkipForward, Sun, Volume2, Wifi } from "lucide-react";
import useUiStore from "#store/ui";
import useMusicStore, { tracks } from "#store/music";
import { useIsDark, useToggleDark } from "../../hooks/useTheme";

const Slider = ({ label, icon: Icon, value, min = 0, onChange }) => (
  <div className="cc-tile cc-slider">
    <p className="cc-label">{label}</p>
    <label className="cc-range">
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

  return (
    <div className={clsx("control-center", className)} role="dialog" aria-label="Control Center">
      <div className="cc-grid">
        <div className="cc-tile cc-toggles">
          <div className="cc-toggle">
            <span className="cc-icon is-on" aria-hidden="true">
              <Wifi />
            </span>
            <span>
              <span className="cc-toggle-title">Wi-Fi</span>
              <span className="cc-toggle-sub">Home</span>
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
              <span className="cc-toggle-title">Dark Mode</span>
              <span className="cc-toggle-sub">{isDark ? "On" : "Off"}</span>
            </span>
          </button>
        </div>

        <div className="cc-tile cc-music">
          <img src={track.cover} alt="" className="cc-cover" width="44" height="44" />
          <div className="min-w-0">
            <p className="cc-track truncate">{track.title}</p>
            <p className="cc-artist truncate">{track.artist}</p>
          </div>
          <div className="cc-music-controls">
            <button type="button" onClick={prev} aria-label="Previous track">
              <SkipBack aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="cc-play"
            >
              {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <button type="button" onClick={next} aria-label="Next track">
              <SkipForward aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Slider label="Display" icon={Sun} value={brightness} min={30} onChange={setBrightness} />
      <Slider label="Sound" icon={Volume2} value={volume} onChange={setVolume} />
    </div>
  );
};

export default ControlCenter;
