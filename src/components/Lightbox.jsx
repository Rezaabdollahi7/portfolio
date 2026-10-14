import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";
import { useBackLayer } from "../hooks/useBackLayer";
import { localizeDigits, useT } from "../i18n";

// Full-screen image viewer. Portaled to <body> so window transforms
// can't trap it. Arrow keys, Escape and swipe all work.
const Lightbox = ({ images, index, onClose, title }) => {
  const [current, setCurrent] = useState(index);
  const touchX = useRef(null);
  const closeRef = useRef(null);
  const count = images.length;
  const t = useT();
  useBackLayer(true, onClose, { enabled: useIsMobile() });

  const prev = useCallback(() => setCurrent((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % count), [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey, true);
  }, [prev, next, onClose]);

  return createPortal(
    // Physical layout on purpose: arrows and swipes match the screen, not the
    // reading direction.
    <div
      className="lightbox"
      dir="ltr"
      role="dialog"
      aria-modal="true"
      aria-label={title ? t("lightbox.aria", { title }) : t("lightbox.viewer")}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-counter" dir="auto">
          {title ? `${title} · ` : ""}
          {localizeDigits(current + 1)} / {localizeDigits(count)}
        </span>
        <button
          ref={closeRef}
          type="button"
          className="lightbox-btn"
          onClick={onClose}
          aria-label={t("lightbox.close")}
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <figure className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <img
          key={current}
          src={images[current]}
          alt={t("lightbox.alt", { title: title ?? t("lightbox.screenshot"), n: current + 1, count })}
          className="lightbox-img"
          decoding="async"
        />
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lightbox-btn lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={t("lightbox.prev")}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lightbox-btn lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={t("lightbox.next")}
          >
            <ChevronRight aria-hidden="true" />
          </button>
          <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className="lightbox-thumb"
                data-active={i === current}
                onClick={() => setCurrent(i)}
                aria-label={t("lightbox.show", { n: i + 1 })}
              >
                <img src={src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>,
    document.body,
  );
};

export default Lightbox;
