import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import useWindowStore, { selectFocusedKey, selectZIndex } from "#store/window";
import { windowTitles } from "#constants/apps.js";
import { useIsMobile } from "../hooks/useMediaQuery";
import { prefersReducedMotion } from "../lib/motion";
import { WindowContext } from "../components/window/WindowContext";
import WindowFallback from "../components/window/WindowFallback";

gsap.registerPlugin(Draggable, Flip);

const MENUBAR_H = 28;

const WindowWrapper = (Component, windowKey) => {
  const title = windowTitles[windowKey] ?? windowKey;

  const Wrapped = (props) => {
    const win = useWindowStore((s) => s.windows[windowKey]);
    const zIndex = useWindowStore(selectZIndex(windowKey));
    const isFocused = useWindowStore((s) => selectFocusedKey(s) === windowKey);
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const isMobile = useIsMobile();

    const ref = useRef(null);
    const prevVisible = useRef(false);
    const savedOffset = useRef({ x: 0, y: 0 });
    const [handle, setHandle] = useState(null);
    const [hasMounted, setHasMounted] = useState(win.isOpen);

    // Mount the (possibly lazy) content on first open, then keep it alive so
    // state like scroll position or open tabs survives close → reopen.
    if (win.isOpen && !hasMounted) setHasMounted(true);

    // Keep showing the last data while the close animation runs.
    const lastData = useRef(win.data);
    if (win.data != null) lastData.current = win.data;
    const data = win.data ?? lastData.current;

    const visible = win.isOpen && !win.isMinimized;

    // ── Open / close / minimise animations ────────────────────────────────
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      const wasVisible = prevVisible.current;
      prevVisible.current = visible;
      const duration = prefersReducedMotion() ? 0 : 1;

      if (visible && !wasVisible) {
        el.style.display = "flex";
        gsap.killTweensOf(el, "opacity,scale,yPercent");
        gsap.fromTo(
          el,
          isMobile
            ? { yPercent: 100, opacity: 1, scale: 1 }
            : win.isMinimized === false && el.dataset.minimized === "true"
              ? { yPercent: 60, scale: 0.3, opacity: 0 }
              : { yPercent: 2, scale: 0.96, opacity: 0 },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: (isMobile ? 0.38 : 0.26) * duration,
            ease: isMobile ? "expo.out" : "power3.out",
          },
        );
        el.dataset.minimized = "false";
        if (!isMobile) {
          (el.querySelector("[data-autofocus]") ?? el).focus({ preventScroll: true });
        }
      } else if (!visible && wasVisible) {
        const minimizing = win.isOpen && win.isMinimized;
        el.dataset.minimized = String(minimizing);
        gsap.killTweensOf(el, "opacity,scale,yPercent");
        gsap.to(el, {
          ...(isMobile
            ? { yPercent: 100 }
            : minimizing
              ? { yPercent: 60, scale: 0.3, opacity: 0 }
              : { scale: 0.96, opacity: 0 }),
          duration: (isMobile ? 0.28 : minimizing ? 0.32 : 0.18) * duration,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      } else if (!visible) {
        el.style.display = "none";
      }
    }, [visible, hasMounted, isMobile, win.isOpen, win.isMinimized]);

    // ── Dragging (desktop only, by the header) ────────────────────────────
    useEffect(() => {
      const el = ref.current;
      if (!el || !handle || isMobile) return;

      const [draggable] = Draggable.create(el, {
        trigger: handle,
        zIndexBoost: false,
        cursor: "default",
        activeCursor: "default",
        onPress() {
          // Keep at least part of the window reachable on screen.
          const r = el.getBoundingClientRect();
          this.applyBounds({
            minX: this.x - (r.right - 96),
            maxX: this.x + (window.innerWidth - 96 - r.left),
            minY: this.y - (r.top - MENUBAR_H),
            maxY: this.y + (window.innerHeight - 64 - r.top),
          });
        },
      });

      if (el.dataset.maximized === "true") draggable.disable();
      return () => draggable.kill();
    }, [handle, isMobile]);

    // Mobile: windows are full-screen sheets, so drop any desktop offset.
    useEffect(() => {
      if (isMobile && ref.current) gsap.set(ref.current, { x: 0, y: 0 });
    }, [isMobile]);

    // ── Zoom (maximise) with a FLIP transition ────────────────────────────
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || isMobile) return;
      const shouldMax = win.isMaximized;
      if ((el.dataset.maximized === "true") === shouldMax) return;

      const state = Flip.getState(el);
      const draggable = Draggable.get(el);
      if (shouldMax) {
        savedOffset.current = {
          x: gsap.getProperty(el, "x"),
          y: gsap.getProperty(el, "y"),
        };
        gsap.set(el, { x: 0, y: 0 });
        draggable?.disable();
      } else {
        gsap.set(el, savedOffset.current);
        draggable?.enable();
      }
      el.dataset.maximized = String(shouldMax);
      if (el.style.display !== "none" && !prefersReducedMotion()) {
        Flip.from(state, { duration: 0.32, ease: "power3.inOut" });
      }
    }, [win.isMaximized, isMobile, hasMounted]);

    const onPointerDownCapture = useCallback(() => {
      if (!isFocused) focusWindow(windowKey);
    }, [focusWindow, isFocused]);

    const ctx = useMemo(
      () => ({
        windowKey,
        title,
        isMobile,
        isFocused,
        isMaximized: win.isMaximized,
        setHandle,
      }),
      [isMobile, isFocused, win.isMaximized],
    );

    if (!hasMounted) return null;

    return (
      <WindowContext.Provider value={ctx}>
        <section
          ref={ref}
          id={windowKey}
          className={`window window-${windowKey}${isMobile ? " is-mobile" : ""}`}
          data-focused={isFocused}
          style={{ zIndex }}
          role="dialog"
          aria-label={title}
          aria-hidden={!visible}
          tabIndex={-1}
          onPointerDownCapture={onPointerDownCapture}
        >
          <Suspense fallback={<WindowFallback title={title} />}>
            <Component {...props} data={data} openCount={win.openCount} />
          </Suspense>
        </section>
      </WindowContext.Provider>
    );
  };

  Wrapped.displayName = `Window(${windowKey})`;
  return Wrapped;
};

export default WindowWrapper;
