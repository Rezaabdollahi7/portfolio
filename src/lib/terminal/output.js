// Terminal output model.
//   line:  { spans: [{ text, cls?, run?, href? }] }
//   grid:  { grid: [span] }            (ls columns; one per line when piped)
//   fetch: { fetch: { logo, info } }   (neofetch)
//   echo:  { prompt: { cwd, cmd, ok } }

export const span = (text, cls, extra) => ({ text: String(text), cls, ...extra });

export const line = (...parts) => ({
  spans: parts.flat().filter((p) => p !== null && p !== undefined && p !== false).map((p) =>
    typeof p === "string" || typeof p === "number" ? span(p) : p,
  ),
});

export const text = (str, cls) => String(str).split("\n").map((t) => line(span(t, cls)));

export const toText = (lines) =>
  lines
    .map((l) =>
      l.grid
        ? l.grid.map((s) => s.text).join("\n")
        : l.fetch
          ? l.fetch.info.map((i) => i.spans.map((s) => s.text).join("")).join("\n")
          : (l.spans ?? []).map((s) => s.text).join(""),
    )
    .join("\n");

// Turn piped text back into lines.
export const fromText = (str) => {
  if (!str) return [];
  const parts = str.split("\n");
  if (parts[parts.length - 1] === "") parts.pop();
  return parts.map((t) => line(t));
};

export const ok = (out = []) => ({ out, err: [], code: 0 });
export const fail = (message, code = 1) => ({ out: [], err: text(message, "t-err"), code });
