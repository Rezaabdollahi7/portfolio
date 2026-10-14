import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";
import { useBackLayer } from "../hooks/useBackLayer";

// Full-screen image viewer. Portaled to <body> so window transforms
// can't trap it. Arrow keys, Escape and swipe all work.
const Lightbox = ({ images, index, onClose, title }) => {
  const [current, setCurrent] = useState(index);
  const touchX = useRef(null);
  const closeRef = useRef(null);
  const count = images.length;
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
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} screenshots` : "Image viewer"}
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
        <span className="lightbox-counter">
          {title ? `${title} · ` : ""}
          {current + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          className="lightbox-btn"
          onClick={onClose}
          aria-label="Close viewer"
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <figure className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <img
          key={current}
          src={images[current]}
          alt={`${title ?? "Screenshot"} ${current + 1} of ${count}`}
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
            aria-label="Previous image"
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
            aria-label="Next image"
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
                aria-label={`Show image ${i + 1}`}
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
