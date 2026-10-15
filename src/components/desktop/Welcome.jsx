import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../../lib/motion";
import { useLocale, useT } from "../../i18n";
import { useContent } from "../../i18n/content";

const WEIGHTS = {
  subtitle: { min: 100, max: 400, base: 100 },
  title: { min: 400, max: 900, base: 400 },
};

const renderText = (text, className, weight) =>
  [...text].map((char, i) => (
    <span
      key={i}
      aria-hidden="true"
      className={className}
      style={{ fontVariationSettings: `'wght' ${weight}` }}
    >
      {char === " " ? " " : char}
    </span>
  ));

// Letters swell toward the cursor (variable font weight). Latin only: split
// into spans, Persian letters would lose their joining forms.
const setupHover = (container, type) => {
  if (!container) return () => {};
  const letters = [...container.querySelectorAll("span[aria-hidden]")];
  const { min, max, base } = WEIGHTS[type];
  const to = (el, w, duration = 0.25) =>
    gsap.to(el, { duration, ease: "power2.out", fontVariationSettings: `'wght' ${w}` });

  const onMove = (e) => {
    letters.forEach((letter) => {
      const r = letter.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      to(letter, min + (max - min) * Math.exp(-(d ** 2) / 2000));
    });
  };
  const onLeave = () => letters.forEach((l) => to(l, base, 0.3));

  container.addEventListener("pointermove", onMove);
  container.addEventListener("pointerleave", onLeave);
  return () => {
    container.removeEventListener("pointermove", onMove);
    container.removeEventListener("pointerleave", onLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const rootRef = useRef(null);
  const t = useT();
  const locale = useLocale();
  const { profile } = useContent();
  const sub = t("welcome.sub", { name: profile.firstName });
  const title = t("welcome.title");
  const split = locale !== "fa";

  useGSAP(() => {
    if (!prefersReducedMotion()) {
      gsap.from(rootRef.current.children, {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }
    if (!split) return;
    const a = setupHover(titleRef.current, "title");
    const b = setupHover(subtitleRef.current, "subtitle");
    return () => {
      a();
      b();
    };
  }, [split]);

  return (
    <section ref={rootRef} className="welcome" aria-labelledby="welcome-title">
      <p ref={subtitleRef} className="welcome-sub">
        {split ? (
          <>
            <span className="sr-only">{sub}</span>
            {renderText(sub, "", 100)}
          </>
        ) : (
          sub
        )}
      </p>
      <h1 id="welcome-title" ref={titleRef} className="welcome-title">
        {split ? (
          <>
            <span className="sr-only">{title}</span>
            {renderText(title, "", 400)}
          </>
        ) : (
          title
        )}
      </h1>
      <p className="welcome-role">
        {profile.role} · {profile.location}
      </p>
    </section>
  );
};

export default Welcome;
