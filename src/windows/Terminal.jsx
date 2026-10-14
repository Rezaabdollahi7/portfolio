import { useEffect, useRef, useState } from "react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import { profile, projects, skills, socials, wallpapers } from "#constants";
import useWindowStore from "#store/window";
import useSettingsStore from "#store/settings";
import { openApp, openExternal, openProject } from "../lib/actions";

const PROMPT = "reza@portfolio ~ %";

const APP_ALIASES = {
  projects: "safari",
  safari: "safari",
  notes: "notes",
  about: "notes",
  photos: "photos",
  finder: "finder",
  code: "vscode",
  vscode: "vscode",
  contact: "contact",
  resume: "resume",
  settings: "settings",
  github: "github",
  telegram: "telegram",
  mail: "mail",
};

const COMMANDS = {
  help: "List available commands",
  about: "Who I am",
  skills: "My tech stack",
  projects: "Things I've built",
  open: "Open an app or project, e.g. open dofixo",
  contact: "How to reach me",
  resume: "Open my resume",
  theme: "Switch appearance: theme light | dark | auto",
  wallpaper: "Change wallpaper: wallpaper <name>",
  date: "Show the date in Tehran",
  echo: "Print text",
  ls: "List files",
  cat: "Print a file",
  history: "Show command history",
  clear: "Clear the screen (or press Ctrl+L)",
  exit: "Close the terminal",
};

const FILES = {
  "about.txt": () => profile.summary.join("\n\n"),
  "contact.txt": () => socials.map((s) => `${s.label.padEnd(10)} ${s.handle}`).join("\n"),
  "projects.txt": () => projects.map((p) => `${p.title}: ${p.tagline}`).join("\n"),
};

const pad = (s, n) => s.padEnd(n, " ");

const run = (raw, ctx) => {
  const [cmd = "", ...args] = raw.trim().split(/\s+/);
  const arg = args.join(" ");

  switch (cmd.toLowerCase()) {
    case "":
      return [];
    case "help":
      return [
        { kind: "muted", text: "Available commands:" },
        ...Object.entries(COMMANDS).map(([name, desc]) => ({
          kind: "row",
          label: name,
          text: desc,
        })),
        { kind: "muted", text: "Tip: Tab completes, ↑/↓ walks history." },
      ];
    case "about":
    case "whoami":
      return [
        { kind: "accent", text: `${profile.name} · ${profile.role}` },
        { kind: "out", text: profile.location },
        { kind: "out", text: "" },
        ...profile.summary.map((text) => ({ kind: "out", text })),
      ];
    case "skills":
    case "stack":
      return [
        ...skills.map((g) => ({ kind: "check", label: g.category, text: g.items.join(", ") })),
        { kind: "success", text: `✓ ${skills.length} of ${skills.length} stacks loaded` },
      ];
    case "projects":
    case "ls-projects":
      return [
        ...projects.map((p) => ({
          kind: "row",
          label: p.id,
          text: `${p.title}: ${p.tagline} (${p.year})`,
        })),
        { kind: "muted", text: "Type: open <name> to read the case study." },
      ];
    case "open": {
      const target = arg.toLowerCase();
      if (!target) return [{ kind: "err", text: "usage: open <app|project>" }];
      const project = projects.find(
        (p) => p.id === target || p.title.toLowerCase() === target,
      );
      if (project) {
        openProject(project.id);
        return [{ kind: "success", text: `Opening ${project.title}…` }];
      }
      if (APP_ALIASES[target]) {
        openApp(APP_ALIASES[target]);
        return [{ kind: "success", text: `Opening ${target}…` }];
      }
      return [{ kind: "err", text: `open: ${target}: no such app or project` }];
    }
    case "contact":
    case "socials":
      return [
        ...socials.map((s) => ({ kind: "link", label: s.label, text: s.handle, href: s.href })),
        { kind: "muted", text: profile.availability + "." },
      ];
    case "resume":
    case "cv":
      openApp("resume");
      return [{ kind: "success", text: "Opening Resume.pdf…" }];
    case "github":
    case "telegram":
    case "linkedin": {
      const s = socials.find((x) => x.id === cmd.toLowerCase());
      openExternal(s.href);
      return [{ kind: "success", text: `Opening ${s.label}…` }];
    }
    case "theme": {
      const mode = arg.toLowerCase();
      if (!["light", "dark", "auto"].includes(mode))
        return [{ kind: "err", text: "usage: theme light | dark | auto" }];
      useSettingsStore.getState().setAppearance(mode);
      return [{ kind: "success", text: `Appearance set to ${mode}.` }];
    }
    case "wallpaper": {
      const wp = wallpapers.find(
        (w) => w.id === arg.toLowerCase() || w.name.toLowerCase() === arg.toLowerCase(),
      );
      if (!wp)
        return [
          {
            kind: "err",
            text: `usage: wallpaper ${wallpapers.map((w) => w.name.toLowerCase()).join(" | ")}`,
          },
        ];
      useSettingsStore.getState().setWallpaper(wp.id);
      return [{ kind: "success", text: `Wallpaper set to ${wp.name}.` }];
    }
    case "date":
      return [
        {
          kind: "out",
          text: new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: profile.timezone,
          }).format(new Date()) + " (Tehran)",
        },
      ];
    case "echo":
      return [{ kind: "out", text: arg }];
    case "pwd":
      return [{ kind: "out", text: "/Users/reza/portfolio" }];
    case "ls":
      return [{ kind: "out", text: Object.keys(FILES).join("    ") }];
    case "cat": {
      const file = FILES[arg];
      return file
        ? file().split("\n").map((text) => ({ kind: "out", text }))
        : [{ kind: "err", text: `cat: ${arg || "<file>"}: No such file. Try ls.` }];
    }
    case "history":
      return ctx.history.map((h, i) => ({ kind: "out", text: `${pad(String(i + 1), 4)}${h}` }));
    case "sudo":
      return [{ kind: "err", text: "reza is not in the sudoers file. This incident will be reported." }];
    case "rm":
      return [{ kind: "err", text: "Nice try. Old projects go to the Trash, not /dev/null." }];
    case "exit":
      ctx.close();
      return [];
    case "clear":
      ctx.clear();
      return null;
    default:
      return [{ kind: "err", text: `zsh: command not found: ${cmd}. Type help.` }];
  }
};

const complete = (value) => {
  const [cmd, ...rest] = value.split(" ");
  if (rest.length === 0) {
    const match = Object.keys(COMMANDS).filter((c) => c.startsWith(cmd));
    return match.length === 1 ? `${match[0]} ` : null;
  }
  const arg = rest.join(" ").toLowerCase();
  const pool =
    cmd === "open"
      ? [...projects.map((p) => p.id), ...Object.keys(APP_ALIASES)]
      : cmd === "cat"
        ? Object.keys(FILES)
        : cmd === "theme"
          ? ["light", "dark", "auto"]
          : cmd === "wallpaper"
            ? wallpapers.map((w) => w.name.toLowerCase())
            : [];
  const match = [...new Set(pool)].filter((p) => p.startsWith(arg));
  return match.length === 1 ? `${cmd} ${match[0]}` : null;
};

const QUICK = ["help", "about", "projects", "skills", "contact"];

const Line = ({ line }) => {
  switch (line.kind) {
    case "cmd":
      return (
        <p>
          <span className="term-prompt">{PROMPT}</span> {line.text}
        </p>
      );
    case "row":
      return (
        <p>
          <span className="term-key">{pad(line.label, 12)}</span>
          {line.text}
        </p>
      );
    case "check":
      return (
        <p>
          <span className="term-success">✓ </span>
          <span className="term-key">{pad(line.label, 10)}</span>
          {line.text}
        </p>
      );
    case "link":
      return (
        <p>
          <span className="term-key">{pad(line.label, 10)}</span>
          <a href={line.href} target="_blank" rel="noopener noreferrer" className="term-link">
            {line.text}
          </a>
        </p>
      );
    default:
      return <p className={`term-${line.kind}`}>{line.text || " "}</p>;
  }
};

const initialLines = () => [
  {
    kind: "muted",
    text: `Last login: ${new Date().toDateString()} on ttys000`,
  },
  { kind: "accent", text: `Welcome to Reza's terminal. Type help to see what I can do.` },
  { kind: "cmd", text: "skills" },
  ...run("skills", {}),
];

const Terminal = () => {
  const { windowKey, isMobile } = useWindowContext();
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const [lines, setLines] = useState(initialLines);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  // First open: the window may focus before this lazy chunk mounts.
  useEffect(() => {
    if (!isMobile) inputRef.current?.focus({ preventScroll: true });
  }, [isMobile]);

  const execute = (raw) => {
    const ctx = {
      history: [...history, raw],
      clear: () => setLines([]),
      close: () => closeWindow(windowKey),
    };
    const output = run(raw, ctx);
    if (raw.trim()) setHistory((h) => [...h, raw]);
    setCursor(-1);
    setValue("");
    if (output === null) return;
    setLines((prev) => [...prev, { kind: "cmd", text: raw }, ...output]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(value);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const done = complete(value);
      if (done) setValue(done);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <>
      <WindowHeader title="reza — zsh" backLabel="Home" />
      <div
        ref={bodyRef}
        className="window-body terminal-body"
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <div className="terminal-lines" aria-live="polite">
          {lines.map((line, i) => (
            <Line key={i} line={line} />
          ))}
        </div>
        <label className="terminal-input-row">
          <span className="term-prompt">{PROMPT}</span>
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
        <div className="terminal-quick" aria-label="Quick commands">
          {QUICK.map((cmd) => (
            <button key={cmd} type="button" onClick={() => execute(cmd)}>
              {cmd}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Terminal;
