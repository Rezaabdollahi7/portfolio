import { Fragment, useEffect, useRef, useState } from "react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import useWindowStore from "#store/window";
import useSettingsStore from "#store/settings";
import { openApp, openExternal, openProject } from "../lib/actions";
import { complete, createSession, execute, promptPath } from "../lib/terminal/shell";
import { line, span } from "../lib/terminal/output";
import { safeStorage } from "../lib/storage";
import { USER, HOSTNAME } from "../lib/terminal/fs";

const HISTORY_KEY = "portfolio:terminal-history";
const MAX_BLOCKS = 120;
const QUICK = ["Tab", "↑", "ls", "cd ..", "projects", "help", "clear"];

let blockSeq = 0;

const loadHistory = () => {
  try {
    const saved = JSON.parse(safeStorage.getItem(HISTORY_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.slice(-200) : [];
  } catch {
    return [];
  }
};

// Plain text with clickable URLs and emails.
const LINKS = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;
const Linkified = ({ text }) => {
  const parts = text.split(LINKS);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part}
        target="_blank"
        rel="noopener noreferrer"
        className="t-link"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
};

const Span = ({ s, onRun }) => {
  if (s.run)
    return (
      <button type="button" className={`t-run ${s.cls ?? ""}`} onClick={() => onRun(s.run)}>
        {s.text}
      </button>
    );
  if (s.href)
    return (
      <a href={s.href} target="_blank" rel="noopener noreferrer" className={`t-link ${s.cls ?? ""}`}>
        {s.text}
      </a>
    );
  if (!s.cls) return <Linkified text={s.text} />;
  return <span className={s.cls}>{s.text}</span>;
};

const Line = ({ l, onRun }) => {
  if (l.grid)
    return (
      <div className="t-grid">
        {l.grid.map((s, i) => (
          <Span key={i} s={s} onRun={onRun} />
        ))}
      </div>
    );
  if (l.fetch)
    return (
      <div className="t-fetch">
        <pre className="t-logo" aria-hidden="true">
          {l.fetch.logo.map((s, i) => (
            <span key={i} className={s.cls}>
              {s.text}
              {"\n"}
            </span>
          ))}
        </pre>
        <div className="t-fetch-info">
          {l.fetch.info.map((info, i) => (
            <Line key={i} l={info} onRun={onRun} />
          ))}
        </div>
      </div>
    );
  return (
    <p className="t-line">
      {l.spans.length === 0 ? " " : l.spans.map((s, i) => <Span key={i} s={s} onRun={onRun} />)}
    </p>
  );
};

const Prompt = ({ cwd, ok }) => (
  <>
    <span className="t-path">{cwd}</span>
    <span className={ok ? "t-arrow" : "t-arrow is-error"}> ❯ </span>
  </>
);

const Terminal = () => {
  const { windowKey, isMobile } = useWindowContext();
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const [session] = useState(() => {
    const s = createSession();
    s.history = loadHistory();
    return s;
  });
  const [blocks, setBlocks] = useState(() => {
    const welcome = {
      id: ++blockSeq,
      lines: [
        line(span(`Last login: ${new Date().toString().slice(0, 21)} on ttys000`, "t-muted")),
        line(span("Welcome to Reza's terminal: a tiny zsh running inside this portfolio.", "t-h1")),
        line(
          span("Try ", "t-muted"),
          ...["help", "ls", "cd projects", "cat about.md", "open dofixo", "hire"].flatMap((c, i) => [
            i ? span("  ", "t-muted") : null,
            span(c, "t-cmd", { run: c }),
          ]),
        ),
        line(""),
      ],
    };
    const fetch = {
      id: ++blockSeq,
      prompt: { cwd: "~", cmd: "neofetch", ok: true },
      lines: execute(session, stubIo, "neofetch"),
    };
    return [welcome, fetch];
  });
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const io = {
    openWindow: (key, data) => useWindowStore.getState().openWindow(key, data),
    openProject,
    openApp,
    openExternal,
    setAppearance: (mode) => useSettingsStore.getState().setAppearance(mode),
    getAppearance: () => useSettingsStore.getState().appearance,
    setWallpaper: (id) => useSettingsStore.getState().setWallpaper(id),
    isDark: () => document.documentElement.classList.contains("dark"),
    clear: () => {
      io.cleared = true;
    },
    close: () => closeWindow(windowKey),
  };

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [blocks]);

  // First open: the window may focus before this lazy chunk mounts.
  useEffect(() => {
    if (!isMobile) inputRef.current?.focus({ preventScroll: true });
  }, [isMobile]);

  const append = (block) =>
    setBlocks((prev) => [...prev, { id: ++blockSeq, ...block }].slice(-MAX_BLOCKS));

  const run = (raw) => {
    const cmd = raw.trim();
    if (cmd && session.history[session.history.length - 1] !== cmd) {
      session.history.push(cmd);
      safeStorage.setItem(HISTORY_KEY, JSON.stringify(session.history.slice(-200)));
    }
    const prompt = { cwd: promptPath(session), cmd: raw, ok: session.lastCode === 0 };
    io.cleared = false;
    const lines = cmd ? execute(session, io, cmd) : [];
    setValue("");
    setHistoryIndex(-1);
    if (io.cleared) setBlocks([]);
    else append({ prompt, lines });
    if (!isMobile) inputRef.current?.focus({ preventScroll: true });
  };

  const tabComplete = () => {
    const result = complete(session, value);
    if (result.value !== undefined) setValue(result.value);
    else if (result.options)
      append({
        prompt: { cwd: promptPath(session), cmd: value, ok: session.lastCode === 0 },
        lines: [{ grid: result.options.map((o) => span(o, o.endsWith("/") ? "t-dir" : undefined)) }],
      });
  };

  const historyStep = (dir) => {
    const h = session.history;
    if (!h.length) return;
    let next;
    if (dir < 0) next = historyIndex === -1 ? h.length - 1 : Math.max(0, historyIndex - 1);
    else {
      if (historyIndex === -1) return;
      next = historyIndex + 1;
      if (next >= h.length) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
    }
    setHistoryIndex(next);
    setValue(h[next]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
    } else if (e.key === "Tab") {
      e.preventDefault();
      tabComplete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      historyStep(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      historyStep(1);
    } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
      if (window.getSelection()?.toString()) return; // let copy work
      e.preventDefault();
      append({ prompt: { cwd: promptPath(session), cmd: `${value}^C`, ok: session.lastCode === 0 }, lines: [] });
      session.lastCode = 130;
      setValue("");
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setBlocks([]);
    } else if (e.ctrlKey && e.key.toLowerCase() === "u") {
      e.preventDefault();
      setValue("");
    }
  };

  const onQuick = (q) => {
    if (q === "Tab") tabComplete();
    else if (q === "↑") historyStep(-1);
    else run(q);
  };

  const cwd = promptPath(session);

  return (
    <>
      <WindowHeader title={`${USER}@${HOSTNAME}: ${cwd}`} backLabel="Home" />
      <div
        ref={bodyRef}
        className="window-body terminal-body"
        onClick={(e) => {
          if (e.target.closest("button, a")) return;
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <div className="terminal-lines" role="log" aria-label="Terminal output">
          {blocks.map((b) => (
            <div key={b.id} className="t-block">
              {b.prompt && (
                <p className="t-line">
                  <Prompt cwd={b.prompt.cwd} ok={b.prompt.ok} />
                  <span className="t-typed">{b.prompt.cmd}</span>
                </p>
              )}
              {b.lines.map((l, i) => (
                <Line key={i} l={l} onRun={run} />
              ))}
            </div>
          ))}
        </div>
        <label className="terminal-input-row">
          <Prompt cwd={cwd} ok={session.lastCode === 0} />
          <span className="sr-only">Terminal command</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            enterKeyHint="send"
            data-autofocus={isMobile ? undefined : true}
            className="terminal-input"
          />
        </label>
      </div>
      {isMobile && (
        <div className="terminal-quick" aria-label="Quick keys">
          {QUICK.map((q) => (
            <button
              key={q}
              type="button"
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => onQuick(q)}
              aria-label={q === "↑" ? "Previous command" : q === "Tab" ? "Complete" : undefined}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

// The welcome neofetch only needs to know the theme.
const stubIo = { isDark: () => document.documentElement.classList.contains("dark") };

export default Terminal;
