import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, BatteryFull, Search, SignalHigh, Wifi } from "lucide-react";
import { apps, mobileDockApps, mobileHomeApps, profile, getProject } from "#constants";
import useUiStore from "#store/ui";
import useWindowStore, { selectFocusedKey } from "#store/window";
import { useNow } from "../../hooks/useNow";
import { useBackLayer } from "../../hooks/useBackLayer";
import { openApp, openProject, openWindow } from "../../lib/actions";
import { prefersReducedMotion } from "../../lib/motion";
import { WeatherWidget } from "../desktop/Widgets";
import ControlCenter from "../menubar/ControlCenter";

const byId = Object.fromEntries(apps.map((a) => [a.id, a]));
const MOBILE_NAMES = { finder: "Files", safari: "Projects" };

const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

const AppIcon = ({ id, showLabel = true }) => {
  const app = byId[id];
  const name = MOBILE_NAMES[id] ?? app.name;
  return (
    <button
      type="button"
      className="ios-app"
      onClick={() => openApp(id)}
      aria-label={app.href ? `${name} (opens in new tab)` : name}
    >
      <img src={app.icon} alt="" width="60" height="60" draggable="false" />
      {showLabel && <span aria-hidden="true">{name}</span>}
    </button>
  );
};

const MobileHome = () => {
  const now = useNow();
  const rootRef = useRef(null);
  const { controlCenterOpen, toggleControlCenter, closeControlCenter, openSpotlight } =
    useUiStore();
  useBackLayer(controlCenterOpen, closeControlCenter);

  useEffect(() => {
    if (!controlCenterOpen) return;
    const onKey = (e) => e.key === "Escape" && closeControlCenter();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [controlCenterOpen, closeControlCenter]);
  const featured = getProject("dofixo");
  // While an app is open full-screen, the home screen is covered: keep it
  // out of the tab order and the accessibility tree.
  const appOpen = useWindowStore((s) => selectFocusedKey(s) !== null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".ios-animate", {
        opacity: 0,
        scale: 0.86,
        y: 12,
        duration: 0.5,
        ease: "back.out(1.6)",
        stagger: 0.025,
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="ios" inert={appOpen}>
      <header className="ios-status">
        <time className="tabular-nums" dateTime={now.toISOString()}>
          {timeFormat.format(now).replace(/\s?[AP]M/, "")}
        </time>
        <button
          type="button"
          className="ios-status-icons"
          onClick={toggleControlCenter}
          aria-label="Control Center"
          aria-expanded={controlCenterOpen}
        >
          <SignalHigh aria-hidden="true" />
          <Wifi aria-hidden="true" />
          <BatteryFull aria-hidden="true" />
        </button>
      </header>

      <main className="ios-home" aria-label="Home screen">
        <div className="ios-widgets">
          <button
            type="button"
            className="ios-animate widget ios-profile"
            onClick={() => openWindow("notes", { noteId: "about" })}
          >
            <span className="ios-profile-top">
              <span className="contact-avatar is-small" aria-hidden="true">
                {profile.initials}
              </span>
              <span className="availability is-compact">
                <span className="availability-dot" aria-hidden="true" />
                Available
              </span>
            </span>
            <span className="ios-profile-name">{profile.name}</span>
            <span className="ios-profile-role">
              {profile.role} · Tehran
            </span>
            <span className="ios-profile-cta">
              About me <ArrowUpRight aria-hidden="true" />
            </span>
          </button>

          <div className="ios-widget-col">
            <div className="ios-animate">
              <WeatherWidget compact />
            </div>
            <button
              type="button"
              className="ios-animate widget ios-feature"
              onClick={() => openProject(featured.id)}
              style={{ backgroundImage: `url(${featured.thumbnail})` }}
              aria-label={`Building now: ${featured.title}, ${featured.tagline}`}
            >
              <span className="ios-feature-label">Building now</span>
              <span className="ios-feature-title">{featured.title}</span>
            </button>
          </div>
        </div>

        <ul className="ios-grid">
          {mobileHomeApps.map((id) => (
            <li key={id} className="ios-animate">
              <AppIcon id={id} />
            </li>
          ))}
        </ul>

        <button type="button" className="ios-search ios-animate" onClick={openSpotlight}>
          <Search aria-hidden="true" /> Search
        </button>
      </main>

      <nav className="ios-dock" aria-label="Dock">
        {mobileDockApps.map((id) => (
          <AppIcon key={id} id={id} showLabel={false} />
        ))}
      </nav>

      {controlCenterOpen && (
        // The backdrop swallows the tap, so closing never opens the app below.
        <div
          className="ios-cc-wrap"
          onClick={(e) => e.target === e.currentTarget && closeControlCenter()}
        >
          <div className="w-full max-w-[380px]">
            <ControlCenter className="is-mobile" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHome;
