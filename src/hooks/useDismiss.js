import { useEffect } from "react";

// Close a popover on outside pointer-down or Escape.
export const useDismiss = (open, refs, onDismiss) => {
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (refs.some((r) => r.current?.contains(e.target))) return;
      onDismiss();
    };
    const onKey = (e) => e.key === "Escape" && onDismiss();
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onDismiss]);
};
