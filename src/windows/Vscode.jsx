import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControlls } from "#components";
import { FILE_TREE, FILE_CONTENTS, TERMINAL_LINES } from "#constants";
import { FolderOpen, Search, GitCompare, Settings } from "lucide-react";

// ─── File Icon ────────────────────────────────────────────────────────────────

const FileIcon = ({ lang, size = 14 }) => {
  const colors = {
    tsx: "#61dafb",
    ts: "#3178c6",
    md: "#519aba",
    json: "#f5de19",
    folder: "#e8c07d",
  };
  const labels = { tsx: "T", ts: "T", md: "M", json: "{}", folder: "📁" };
  const color = colors[lang] || "#888";
  const label = labels[lang] ?? "•";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        fontSize: size * 0.9,
        color,
        fontWeight: 700,
        fontFamily: "monospace",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
};

// ─── Token Renderer ───────────────────────────────────────────────────────────

const Token = ({ type, value }) => {
  const styles = {
    keyword: { color: "#c586c0" },
    fn: { color: "#dcdcaa" },
    string: { color: "#ce9178" },
    prop: { color: "#9cdcfe" },
    comment: { color: "#6a9955", fontStyle: "italic" },
    plain: { color: "#d4d4d4" },
    space: { color: "#d4d4d4" },
    "md-h1": { color: "#569cd6", fontWeight: 700, fontSize: 15 },
    "md-h2": { color: "#569cd6", fontWeight: 600 },
    "md-li": { color: "#d4d4d4" },
    "md-link": { color: "#4ec9b0" },
  };
  return <span style={styles[type] || { color: "#d4d4d4" }}>{value}</span>;
};

// ─── File Tree Node ───────────────────────────────────────────────────────────

const TreeNode = ({ node, depth = 0, activeFile, onFileClick }) => {
  const [open, setOpen] = useState(node.open ?? true);

  if (node.type === "folder") {
    return (
      <div>
        <div
          className="vsc-tree-row"
          style={{ paddingLeft: depth * 12 + 8 }}
          onClick={() => setOpen(!open)}
        >
          <span className="vsc-arrow">{open ? "▾" : "▸"}</span>
          <FileIcon lang="folder" />
          <span className="vsc-tree-name folder">{node.name}</span>
        </div>
        {open &&
          node.children?.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onFileClick={onFileClick}
            />
          ))}
      </div>
    );
  }

  return (
    <div
      className={`vsc-tree-row file ${activeFile === node.name ? "active" : ""}`}
      style={{ paddingLeft: depth * 12 + 8 }}
      onClick={() => onFileClick(node.name)}
    >
      <span className="vsc-arrow" />
      <FileIcon lang={node.lang} />
      <span className="vsc-tree-name">{node.name}</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Vscode = () => {
  const [activeFile, setActiveFile] = useState("about.tsx");
  const [openFiles, setOpenFiles] = useState(["about.tsx"]);
  const [activePanel, setActivePanel] = useState("explorer"); // explorer | search | git
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalInput, setTerminalInput] = useState("");

  const handleFileClick = (fileName) => {
    if (!FILE_CONTENTS[fileName]) return;
    setActiveFile(fileName);
    if (!openFiles.includes(fileName)) {
      setOpenFiles((prev) => [...prev, fileName]);
    }
  };

  const handleCloseTab = (fileName, e) => {
    e.stopPropagation();
    const next = openFiles.filter((f) => f !== fileName);
    setOpenFiles(next);
    if (activeFile === fileName) {
      setActiveFile(next[next.length - 1] || null);
    }
  };

  const content = activeFile ? FILE_CONTENTS[activeFile] : null;

  return (
    <section id="vscode">
      {/* Title Bar */}
      <div className="vsc-titlebar">
        <WindowControlls target="vscode" />
        <span className="vsc-title">
          {activeFile ? `${activeFile} — portfolio` : "portfolio"}
        </span>
        <div className="vsc-titlebar-actions">
          <span
            onClick={() => setShowTerminal(!showTerminal)}
            title="Toggle Terminal"
          >
            ⌃`
          </span>
        </div>
      </div>

      <div className="vsc-body">
        {/* Activity Bar */}
        <div className="vsc-activity-bar">
          {[
            {
              id: "explorer",
              icon: <FolderOpen size={20} />,
              label: "Explorer",
            },
            { id: "search", icon: <Search size={20} />, label: "Search" },
            {
              id: "git",
              icon: <GitCompare size={20} />,
              label: "Source Control",
            },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              title={label}
              className={`vsc-activity-btn ${activePanel === id ? "active" : ""}`}
              onClick={() => setActivePanel(activePanel === id ? null : id)}
            >
              {icon}
            </button>
          ))}
          <div className="vsc-activity-spacer" />
          <button className="vsc-activity-btn" title="Settings">
            <Settings size={20} />
          </button>
        </div>

        {/* Sidebar */}
        {activePanel && (
          <div className="vsc-sidebar">
            {activePanel === "explorer" && (
              <>
                <div className="vsc-sidebar-title">EXPLORER</div>
                <div className="vsc-tree">
                  {FILE_TREE.map((node) => (
                    <TreeNode
                      key={node.name}
                      node={node}
                      activeFile={activeFile}
                      onFileClick={handleFileClick}
                    />
                  ))}
                </div>
              </>
            )}

            {activePanel === "search" && (
              <>
                <div className="vsc-sidebar-title">SEARCH</div>
                <div className="vsc-search-box">
                  <input placeholder="Search..." className="vsc-search-input" />
                </div>
                <div className="vsc-search-hint">
                  Type to search across files
                </div>
              </>
            )}

            {activePanel === "git" && (
              <>
                <div className="vsc-sidebar-title">SOURCE CONTROL</div>
                <div className="vsc-git-section">
                  <div className="vsc-git-branch">⎇ main</div>
                  <div className="vsc-git-clean">✓ No pending changes</div>
                  <div className="vsc-git-log">
                    {TERMINAL_LINES.filter(
                      (l) => l.type === "info" && l.text.includes("feat"),
                    ).map((l, i) => (
                      <div key={i} className="vsc-git-commit">
                        {l.text}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Editor + Terminal */}
        <div className="vsc-main">
          {/* Tabs */}
          <div className="vsc-tabs">
            {openFiles.map((f) => (
              <div
                key={f}
                className={`vsc-tab ${activeFile === f ? "active" : ""}`}
                onClick={() => setActiveFile(f)}
              >
                <FileIcon lang={FILE_CONTENTS[f]?.lang} size={12} />
                <span>{f}</span>
                <button
                  className="vsc-tab-close"
                  onClick={(e) => handleCloseTab(f, e)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="vsc-editor">
            {content ? (
              <div className="vsc-code">
                {content.lines.map((line, i) => (
                  <div key={i} className="vsc-line">
                    <span className="vsc-ln">{i + 1}</span>
                    <span className="vsc-line-content">
                      {line.tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        line.tokens.map((tok, j) => (
                          <Token key={j} type={tok.t} value={tok.v} />
                        ))
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="vsc-empty-editor">
                <div className="vsc-logo">{}</div>
                <p>Select a file to view</p>
              </div>
            )}
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div className="vsc-terminal">
              <div className="vsc-terminal-header">
                <span className="vsc-terminal-tab active">TERMINAL</span>
                <button
                  className="vsc-terminal-close"
                  onClick={() => setShowTerminal(false)}
                >
                  ×
                </button>
              </div>
              <div className="vsc-terminal-body">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} className={`vsc-term-line ${line.type}`}>
                    {line.type === "dir" && (
                      <span className="term-dir">{line.text} </span>
                    )}
                    {line.type === "cmd" && (
                      <>
                        <span className="term-prompt">❯ </span>
                        <span className="term-cmd">{line.text}</span>
                      </>
                    )}
                    {line.type === "info" && (
                      <span className="term-info">{line.text}</span>
                    )}
                    {line.type === "success" && (
                      <span className="term-success">{line.text}</span>
                    )}
                  </div>
                ))}
                <div className="vsc-term-line dir">
                  <span className="term-dir">portfolio on main </span>
                  <span className="term-prompt">❯ </span>
                  <span className="term-cursor">█</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="vsc-statusbar">
        <span className="vsc-status-left">⎇ main</span>
        <span className="vsc-status-left">✓ 0 errors</span>
        <div className="vsc-status-spacer" />
        <span className="vsc-status-right">
          {content?.lang === "tsx" || content?.lang === "ts"
            ? "TypeScript React"
            : content?.lang === "ts"
              ? "TypeScript"
              : content?.lang === "md"
                ? "Markdown"
                : content?.lang === "json"
                  ? "JSON"
                  : ""}
        </span>
        <span className="vsc-status-right">UTF-8</span>
        <span className="vsc-status-right">
          Ln {content?.lines.length ?? 0}
        </span>
      </div>
    </section>
  );
};

const VscodeWindow = WindowWrapper(Vscode, "vscode");
export default VscodeWindow;
