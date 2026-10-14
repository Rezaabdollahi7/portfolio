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
import { useT } from "../i18n";
import { useIsMobile } from "../hooks/useMediaQuery";
import { prefersReducedMotion } from "../lib/motion";
import { WindowContext } from "../components/window/WindowContext";
import WindowFallback from "../components/window/WindowFallback";
import {
  MENUBAR_H,
  RESIZE_DIRS,
  showSnapPreview,
  snapZone,
  startResize,
} from "../lib/windowGeometry";

gsap.registerPlugin(Draggable, Flip);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const t = useT();
    const title = t(`window.${windowKey}`);
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
      let zone = null;

      // Keep at least part of the window reachable on screen.
      // (Read the live transform: Draggable's own x/y can lag behind a set.)
      const applyBounds = (draggable) => {
        const r = el.getBoundingClientRect();
        const x = gsap.getProperty(el, "x");
        const y = gsap.getProperty(el, "y");
        draggable.applyBounds({
          minX: x - (r.right - 96),
          maxX: x + (window.innerWidth - 96 - r.left),
          minY: y - (r.top - MENUBAR_H),
          maxY: y + (window.innerHeight - 64 - r.top),
        });
      };

      const [draggable] = Draggable.create(el, {
        trigger: handle,
        zIndexBoost: false,
        cursor: "default",
        activeCursor: "default",
        minimumMovement: 3,
        onPress() {
          applyBounds(this);
        },
        onDragStart() {
          // Dragging a tiled window restores its own size under the pointer.
          if (!el.dataset.snap) return;
          const before = el.getBoundingClientRect();
          const ratio = (this.pointerX - before.left) / before.width;
          const grabY = this.pointerY - before.top;
          // The tiled bounds would clamp the restored position; lift them.
          this.applyBounds({ minX: -1e5, maxX: 1e5, minY: -1e5, maxY: 1e5 });
          delete el.dataset.snap;
          gsap.set(el, { x: 0, y: 0 });
          const r = el.getBoundingClientRect();
          gsap.set(el, {
            x: this.pointerX - r.left - r.width * ratio,
            y: Math.max(this.pointerY - grabY, MENUBAR_H) - r.top,
          });
          useWindowStore.getState().snapWindow(windowKey, null);
          // Restart the drag from the restored geometry.
          const e = this.pointerEvent;
          this.endDrag(e);
          this.startDrag(e);
        },
        onDrag() {
          const next = snapZone(this.pointerX, this.pointerY);
          if (next !== zone) {
            zone = next;
            showSnapPreview(zone);
          }
        },
        onDragEnd() {
          showSnapPreview(null);
          const target = zone;
          zone = null;
          if (!target) return;
          const store = useWindowStore.getState();
          if (target === "top") {
            if (!store.windows[windowKey].isMaximized) store.toggleMaximize(windowKey);
          } else {
            store.snapWindow(windowKey, target);
          }
        },
      });

      if (el.dataset.maximized === "true") draggable.disable();
      return () => {
        draggable.kill();
        showSnapPreview(null);
      };
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
      // Zooming a tiled window replaces the tiling.
      delete el.dataset.snap;
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

    // ── Tiling (left / right half) with the same FLIP transition ──────────
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el || isMobile) return;
      const target = win.snap ?? "";
      if ((el.dataset.snap ?? "") === target) return;

      const state = Flip.getState(el);
      if (target) {
        gsap.set(el, { x: 0, y: 0 });
        el.dataset.snap = target;
      } else {
        delete el.dataset.snap;
      }
      Draggable.get(el)?.update();
      if (visible && el.style.display !== "none" && !prefersReducedMotion()) {
        Flip.from(state, { duration: 0.3, ease: "power3.inOut" });
      }
    }, [win.snap, isMobile, hasMounted, visible]);

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
        isVisible: visible,
        setHandle,
      }),
      [isMobile, isFocused, win.isMaximized, visible, title],
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
          {!isMobile &&
            RESIZE_DIRS.map((dir) => (
              <div
                key={dir}
                className="win-resize"
                data-dir={dir}
                aria-hidden="true"
                onPointerDown={(e) => startResize(e, ref.current, dir)}
              />
            ))}
        </section>
      </WindowContext.Provider>
    );
  };

  Wrapped.displayName = `Window(${windowKey})`;
  return Wrapped;
};

export default WindowWrapper;
