import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, BatteryFull, Search, SignalHigh, Wifi } from "lucide-react";
import { apps, mobileDockApps, mobileHomeApps } from "#constants";
import useUiStore from "#store/ui";
import useWindowStore, { selectFocusedKey } from "#store/window";
import { useNow } from "../../hooks/useNow";
import { useBackLayer } from "../../hooks/useBackLayer";
import { openApp, openProject, openWindow } from "../../lib/actions";
import { prefersReducedMotion } from "../../lib/motion";
import { WeatherWidget } from "../desktop/Widgets";
import GitHubWidget from "../desktop/GitHubWidget";
import ControlCenter from "../menubar/ControlCenter";
import { formatDate, useLocale, useT } from "../../i18n";
import { useContent } from "../../i18n/content";

const byId = Object.fromEntries(apps.map((a) => [a.id, a]));
// On the phone, Finder is "Files", like iOS.
const MOBILE_NAMES = { finder: "app.files" };
const PULL_DISTANCE = 72;

const AppIcon = ({ id, showLabel = true }) => {
  const app = byId[id];
  const t = useT();
  const name = t(MOBILE_NAMES[id] ?? `app.${id}`);
  return (
    <button
      type="button"
      className="ios-app"
      onClick={() => openApp(id)}
      aria-label={app.href ? t("app.newTab", { name }) : name}
    >
      <img src={app.icon} alt="" width="60" height="60" draggable="false" />
      {showLabel && <span aria-hidden="true">{name}</span>}
    </button>
  );
};

// Pull down from the top of the home screen to search, like iOS.
const usePullToSearch = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startY = null;
    const onStart = (e) => {
      startY = e.touches.length === 1 && el.scrollTop <= 0 ? e.touches[0].clientY : null;
    };
    const onMove = (e) => {
      if (startY === null) return;
      const dy = e.touches[0].clientY - startY;
      el.style.setProperty("--pull", `${Math.max(0, Math.min(dy, PULL_DISTANCE)) / 3}px`);
      if (dy >= PULL_DISTANCE) {
        startY = null;
        el.style.removeProperty("--pull");
        useUiStore.getState().openSpotlight();
      }
    };
    const onEnd = () => {
      startY = null;
      el.style.removeProperty("--pull");
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [ref]);
};

const MobileHome = () => {
  const now = useNow();
  const t = useT();
  const locale = useLocale();
  const { profile, projects } = useContent();
  const rootRef = useRef(null);
  const homeRef = useRef(null);
  usePullToSearch(homeRef);
  const { controlCenterOpen, toggleControlCenter, closeControlCenter, openSpotlight } =
    useUiStore();
  useBackLayer(controlCenterOpen, closeControlCenter);

  useEffect(() => {
    if (!controlCenterOpen) return;
    const onKey = (e) => e.key === "Escape" && closeControlCenter();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [controlCenterOpen, closeControlCenter]);
  const featured = projects.find((p) => p.id === "dofixo");
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
          {locale === "fa"
            ? formatDate(now, { hour: "numeric", minute: "2-digit", hour12: false }, locale)
            : formatDate(now, { hour: "numeric", minute: "2-digit" }, locale).replace(/\s?[AP]M/, "")}
        </time>
        <button
          type="button"
          className="ios-status-icons"
          onClick={toggleControlCenter}
          aria-label={t("menu.controlCenter")}
          aria-expanded={controlCenterOpen}
        >
          <SignalHigh aria-hidden="true" />
          <Wifi aria-hidden="true" />
          <BatteryFull aria-hidden="true" />
        </button>
      </header>

      <main ref={homeRef} className="ios-home" aria-label={t("mobile.home")}>
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
                {t("mobile.available")}
              </span>
            </span>
            <span className="ios-profile-name">{profile.name}</span>
            <span className="ios-profile-role">
              {profile.role} · {t("weather.city")}
            </span>
            <span className="ios-profile-cta">
              {t("mobile.aboutMe")} <ArrowUpRight aria-hidden="true" className="rtl-flip" />
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
              aria-label={t("mobile.buildingAria", { title: featured.title, tagline: featured.tagline })}
            >
              <span className="ios-feature-label">{t("mobile.buildingNow")}</span>
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

        <GitHubWidget className="is-mobile ios-animate" weeks={20} commits={3} />

        <button type="button" className="ios-search ios-animate" onClick={openSpotlight}>
          <Search aria-hidden="true" /> {t("mobile.search")}
        </button>
      </main>

      <nav className="ios-dock" aria-label={t("dock")}>
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
