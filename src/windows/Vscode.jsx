import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ChevronDown,
  ChevronRight,
  Files,
  GitBranch,
  Search,
  SquareTerminal,
  X,
} from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import { FILE_CONTENTS, FILE_TREE, TERMINAL_LINES } from "#constants";
import { useBackLayer } from "../hooks/useBackLayer";

// ── Tiny highlighter: good enough for the handful of files shown here ─────
const KEYWORDS =
  /^(const|let|var|export|default|import|from|return|interface|type|true|false|null|function|new)$/;
const TOKEN =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b[A-Za-z_$][\w$]*\b)(?=\s*:)|(\b[A-Za-z_$][\w$]*\b)|(\d+)|(\s+)|([^\w\s"]+)/g;

const highlightLine = (line, lang) => {
  if (lang === "md") {
    if (line.startsWith("#")) return [{ c: "tk-heading", v: line }];
    if (line.startsWith("- ")) return [{ c: "tk-punct", v: "- " }, { c: "tk-plain", v: line.slice(2) }];
    if (line.startsWith("[")) return [{ c: "tk-link", v: line }];
    return [{ c: "tk-plain", v: line }];
  }
  const out = [];
  for (const m of line.matchAll(TOKEN)) {
    const [v, comment, str, prop, word, num] = m;
    if (comment) out.push({ c: "tk-comment", v });
    else if (str) out.push({ c: lang === "json" && /^\s*:/.test(line.slice(m.index + v.length)) ? "tk-prop" : "tk-string", v });
    else if (prop) out.push({ c: "tk-prop", v });
    else if (word) out.push({ c: KEYWORDS.test(v) ? "tk-keyword" : /^[A-Z]/.test(v) ? "tk-type" : "tk-plain", v });
    else if (num) out.push({ c: "tk-number", v });
    else out.push({ c: "tk-punct", v });
  }
  return out;
};

const LANG_LABEL = { tsx: "TypeScript JSX", ts: "TypeScript", md: "Markdown", json: "JSON" };
const LANG_COLOR = { tsx: "#4fc1ff", ts: "#6cb6ff", md: "#7cc0dd", json: "#cbcb41" };

const FileIcon = ({ lang }) => (
  <span className="vsc-file-icon" style={{ color: LANG_COLOR[lang] }} aria-hidden="true">
    {lang === "json" ? "{}" : lang === "md" ? "M↓" : "TS"}
  </span>
);

const TreeNode = ({ node, depth = 0, activeFile, onOpen }) => {
  const [open, setOpen] = useState(node.open ?? true);
  const indent = { paddingLeft: depth * 12 + 8 };

  if (node.type === "folder") {
    return (
      <div>
        <button
          type="button"
          className="vsc-tree-row"
          style={indent}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
          <span className="font-semibold">{node.name}</span>
        </button>
        {open &&
          node.children.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onOpen={onOpen}
            />
          ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={clsx("vsc-tree-row", activeFile === node.name && "is-active")}
      style={indent}
      onClick={() => onOpen(node.name)}
    >
      <span className="w-3.5" />
      <FileIcon lang={node.lang} />
      <span>{node.name}</span>
    </button>
  );
};

const ACTIVITY = [
  { id: "explorer", icon: Files, label: "Explorer" },
  { id: "search", icon: Search, label: "Search" },
  { id: "git", icon: GitBranch, label: "Source Control" },
];

const Vscode = () => {
  const { isMobile, isVisible } = useWindowContext();
  const [activeFile, setActiveFile] = useState("about.tsx");
  const [openFiles, setOpenFiles] = useState(["about.tsx", "README.md"]);
  const [panel, setPanel] = useState(isMobile ? null : "explorer");
  const [showTerminal, setShowTerminal] = useState(!isMobile);
  const [query, setQuery] = useState("");
  useBackLayer(panel !== null, () => setPanel(null), { enabled: isMobile && isVisible });

  const file = activeFile ? FILE_CONTENTS[activeFile] : null;
  const lines = useMemo(
    () => (file ? file.code.split("\n").map((l) => highlightLine(l, file.lang)) : []),
    [file],
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.entries(FILE_CONTENTS).flatMap(([name, f]) =>
      f.code
        .split("\n")
        .map((text, i) => ({ name, line: i + 1, text: text.trim() }))
        .filter((r) => r.text.toLowerCase().includes(q)),
    );
  }, [query]);

  const openFile = (name) => {
    if (!FILE_CONTENTS[name]) return;
    setActiveFile(name);
    setOpenFiles((prev) => (prev.includes(name) ? prev : [...prev, name]));
    if (isMobile) setPanel(null);
  };

  const closeFile = (name) => {
    const next = openFiles.filter((f) => f !== name);
    setOpenFiles(next);
    if (activeFile === name) setActiveFile(next[next.length - 1] ?? null);
  };

  return (
    <>
      <WindowHeader
        className="vsc-titlebar"
        title={activeFile ? `${activeFile} — portfolio` : "portfolio"}
        hideTitleOnMobile
      >
        <button
          type="button"
          className="toolbar-btn vsc-toggle-term"
          onClick={() => setShowTerminal((v) => !v)}
          aria-label="Toggle terminal panel"
          aria-pressed={showTerminal}
        >
          <SquareTerminal aria-hidden="true" />
        </button>
      </WindowHeader>

      <div className="window-body vsc-body" dir="ltr">
        <nav className="vsc-activity" aria-label="Side bar views">
          {ACTIVITY.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              title={label}
              aria-label={label}
              aria-pressed={panel === id}
              className={clsx("vsc-activity-btn", panel === id && "is-active")}
              onClick={() => setPanel(panel === id ? null : id)}
            >
              <Icon aria-hidden="true" />
            </button>
          ))}
        </nav>

        {panel && (
          <aside className="vsc-sidebar">
            {panel === "explorer" && (
              <>
                <p className="vsc-sidebar-title">Explorer</p>
                {FILE_TREE.map((node) => (
                  <TreeNode key={node.name} node={node} activeFile={activeFile} onOpen={openFile} />
                ))}
              </>
            )}
            {panel === "search" && (
              <>
                <p className="vsc-sidebar-title">Search</p>
                <input
                  className="vsc-search"
                  placeholder="Search files"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search in files"
                />
                <ul className="vsc-results">
                  {searchResults.map((r) => (
                    <li key={`${r.name}:${r.line}`}>
                      <button type="button" onClick={() => openFile(r.name)}>
                        <span className="vsc-result-file">
                          {r.name}:{r.line}
                        </span>
                        <span className="vsc-result-text">{r.text}</span>
                      </button>
                    </li>
                  ))}
                  {query && searchResults.length === 0 && (
                    <li className="vsc-hint">No results for “{query}”.</li>
                  )}
                </ul>
              </>
            )}
            {panel === "git" && (
              <>
                <p className="vsc-sidebar-title">Source Control</p>
                <p className="vsc-hint">
                  <GitBranch aria-hidden="true" className="inline size-3.5" /> main · no pending
                  changes
                </p>
                <ul className="vsc-results">
                  {TERMINAL_LINES.filter((l) => /^[0-9a-f]{7} /.test(l.text)).map((l) => (
                    <li key={l.text} className="vsc-commit">
                      {l.text}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        )}

        <div className="vsc-main">
          <div className="vsc-tabs" aria-label="Open editors">
            {openFiles.map((name) => (
              <div key={name} className={clsx("vsc-tab", activeFile === name && "is-active")}>
                <button
                  type="button"
                  aria-current={activeFile === name ? "page" : undefined}
                  onClick={() => setActiveFile(name)}
                >
                  <FileIcon lang={FILE_CONTENTS[name].lang} />
                  {name}
                </button>
                <button
                  type="button"
                  className="vsc-tab-close"
                  onClick={() => closeFile(name)}
                  aria-label={`Close ${name}`}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="vsc-editor">
            {file ? (
              <pre className="vsc-code" aria-label={`${activeFile} contents`}>
                {lines.map((tokens, i) => (
                  <div key={i} className="vsc-line">
                    <span className="vsc-ln" aria-hidden="true">
                      {i + 1}
                    </span>
                    <code>
                      {tokens.length === 0
                        ? " "
                        : tokens.map((t, j) => (
                            <span key={j} className={t.c}>
                              {t.v}
                            </span>
                          ))}
                    </code>
                  </div>
                ))}
              </pre>
            ) : (
              <div className="vsc-empty">Open a file from the Explorer.</div>
            )}
          </div>

          {showTerminal && (
            <div className="vsc-terminal">
              <div className="vsc-terminal-head">
                <span>Terminal</span>
                <button
                  type="button"
                  onClick={() => setShowTerminal(false)}
                  aria-label="Close terminal panel"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <div className="vsc-terminal-body" tabIndex={0} aria-label="Terminal output">
                {TERMINAL_LINES.map((line, i) => (
                  <p key={i} className={`vt-${line.type}`}>
                    {line.type === "cmd" ? <span className="vt-prompt">❯ </span> : null}
                    {line.text || " "}
                  </p>
                ))}
                <p className="vt-dir">
                  portfolio on  main <span className="vt-prompt">❯</span>{" "}
                  <span className="vt-cursor">▋</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="vsc-status">
        <span>
          <GitBranch aria-hidden="true" /> main
        </span>
        <span>0 problems</span>
        <span className="ml-auto">{file ? LANG_LABEL[file.lang] : ""}</span>
        <span className="max-sm:hidden">UTF-8</span>
        <span className="tabular-nums">Ln {lines.length}</span>
      </div>
    </>
  );
};

export default Vscode;
