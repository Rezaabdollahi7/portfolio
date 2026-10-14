// A small in-memory filesystem for the Terminal, generated from site data so
// `cat ~/projects/dofixo/README.md` always matches the Projects app.
// Built-in files are read-only; you can create files in ~ and /tmp.

import {
  archive,
  funFacts,
  notes,
  profile,
  projects,
  skills,
  socials,
  trashedProjects,
} from "#constants";

export const HOME = "/home/reza";
export const USER = "reza";
export const HOSTNAME = "portfolio";

const BOOT = new Date(2026, 9, 14, 9, 41);

const dir = (children = {}, meta = {}) => ({ type: "dir", children, mtime: BOOT, ...meta });
const file = (content, meta = {}) => ({ type: "file", content, mtime: BOOT, ...meta });

// [label](https://…) → "label (https://…)", [label](app:…) → "label"
const plain = (text) =>
  text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) =>
    href.startsWith("app:")
      ? label
      : href.startsWith("mailto:")
        ? href.slice(7)
        : `${label} (${href})`,
  );

const noteToMarkdown = (note) =>
  note.blocks
    .map((b) => {
      switch (b.type) {
        case "h1":
          return `# ${b.text}`;
        case "h2":
          return `\n## ${b.text}`;
        case "p":
          return `${plain(b.text)}\n`;
        case "ul":
          return b.items.map((i) => `- ${plain(i)}`).join("\n") + "\n";
        case "row":
          return `${b.label.padEnd(10)} ${b.text}`;
        case "todo":
          return b.items.map((i) => `[${i.done ? "x" : " "}] ${i.text}`).join("\n");
        default:
          return "";
      }
    })
    .join("\n")
    .trim() + "\n";

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const projectReadme = (p) =>
  [
    `# ${p.title}`,
    p.tagline,
    "",
    `${p.kind} · ${p.year} · ${p.status}${p.rtl ? " · Persian, RTL" : ""}`,
    "",
    ...p.description.flatMap((d) => [d, ""]),
    "## Highlights",
    ...p.highlights.map((h) => `- ${h}`),
    "",
    "## Stack",
    p.stack.join(", "),
    "",
    "## Links",
    ...p.links.map((l) => `${l.label}: ${l.href}`),
    ...(p.privateSource ? ["Source: private repository"] : []),
    "",
    `Tip: run \`open .\` here to read the full case study.`,
    "",
  ].join("\n");

const projectDir = (p) =>
  dir(
    {
      "README.md": file(projectReadme(p)),
      "stack.txt": file(p.stack.join("\n") + "\n"),
      "links.txt": file(p.links.map((l) => `${l.label.padEnd(14)} ${l.href}`).join("\n") + "\n"),
      screenshots: dir(
        Object.fromEntries(
          p.screenshots.map((src, i) => [
            `${String(i + 1).padStart(2, "0")}-${src.split("/").pop()}`,
            file(null, { binary: true, image: src, size: 180_000 + i * 7_313 }),
          ]),
        ),
        { finder: p.id },
      ),
    },
    { project: p.id, finder: p.id, source: p.links.find((l) => l.kind === "source")?.href },
  );

const about = [
  `# ${profile.name}`,
  `${profile.role} · ${profile.location}`,
  "",
  ...profile.summary.flatMap((s) => [s, ""]),
  `${profile.availability}.`,
  "",
  "Try: cat contact.txt, cd projects, open resume.pdf",
  "",
].join("\n");

const contact = [
  `${"email".padEnd(10)} ${profile.email}`,
  `${"phone".padEnd(10)} ${profile.phone}`,
  `${"website".padEnd(10)} ${profile.website}`,
  ...socials
    .filter((s) => s.id !== "email")
    .map((s) => `${s.id.padEnd(10)} ${s.href}`),
  "",
].join("\n");

export const ALIASES = {
  ll: "ls -l",
  la: "ls -la",
  l: "ls",
  "..": "cd ..",
  "...": "cd ../..",
  proj: "cd ~/projects",
  cls: "clear",
  vim: "code",
  nano: "code",
  vi: "code",
};

const zshrc = [
  "# ~/.zshrc",
  'export EDITOR="code"',
  'export PROMPT="%~ ❯ "',
  "",
  ...Object.entries(ALIASES).map(([k, v]) => `alias ${k}='${v}'`),
  "",
  "# Most people never type ls -a. Hi.",
  "",
].join("\n");

export const buildFs = (commandNames = []) =>
  dir({
    home: dir({
      reza: dir(
        {
          "about.md": file(about),
          "contact.txt": file(contact),
          "skills.txt": file(
            skills.map((g) => `${g.category.padEnd(10)} ${g.items.join(", ")}`).join("\n") + "\n",
          ),
          "resume.pdf": file(null, { binary: true, app: "resume", size: 41_920 }),
          projects: dir(
            {
              ...Object.fromEntries(projects.map((p) => [p.id, projectDir(p)])),
              archive: dir(
                Object.fromEntries(
                  archive.map((a) => [
                    a.id,
                    dir({
                      "README.md": file(
                        [
                          `# ${a.title} (${a.year})`,
                          a.description,
                          "",
                          `Stack: ${a.stack.join(", ")}`,
                          `Live: ${a.live}`,
                          `Source: ${a.source}`,
                          "",
                        ].join("\n"),
                      ),
                    }),
                  ]),
                ),
                { finder: "archive" },
              ),
            },
            { finder: "work" },
          ),
          notes: dir(
            Object.fromEntries(
              notes.map((n) => [`${slug(n.title)}.md`, file(noteToMarkdown(n), { note: n.id })]),
            ),
            { app: "notes" },
          ),
          ".zshrc": file(zshrc),
          ".hidden-message.txt": file(
            "You found the hidden file. That's exactly the kind of curiosity I like\nin a teammate. Let's talk: " +
              profile.email +
              "\n",
          ),
          ".trash": dir(
            Object.fromEntries(
              trashedProjects.map((t) => [
                t.name,
                dir({
                  "README.md": file(
                    `# ${t.name} (${t.year})\nAn early experiment I've outgrown.\nSource: ${t.href}\n`,
                  ),
                }),
              ]),
            ),
            { finder: "trash" },
          ),
        },
        { writable: true, finder: "about" },
      ),
    }),
    etc: dir({
      hostname: file(`${HOSTNAME}\n`),
      motd: file(`${funFacts[0]}\n`),
      "os-release": file(
        'NAME="PortfolioOS"\nVERSION="2.0"\nID=portfolio\nPRETTY_NAME="PortfolioOS 2.0 (React 19)"\nHOME_URL="https://srezadev.ir"\n',
      ),
      shells: file("/bin/zsh\n"),
    }),
    usr: dir({
      bin: dir(
        Object.fromEntries(
          commandNames.map((name) => [name, file(null, { binary: true, exe: true, size: 18_432 })]),
        ),
      ),
    }),
    tmp: dir({}, { writable: true }),
  });

// ── Paths ─────────────────────────────────────────────────────────────────

export const resolvePath = (cwd, input = "") => {
  let path = input === "" ? HOME : input;
  if (path === "~" || path.startsWith("~/")) path = HOME + path.slice(1);
  const parts = (path.startsWith("/") ? path : `${cwd}/${path}`).split("/");
  const out = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return `/${out.join("/")}`;
};

export const displayPath = (abs) =>
  abs === HOME ? "~" : abs.startsWith(`${HOME}/`) ? `~${abs.slice(HOME.length)}` : abs;

export const getNode = (root, abs) => {
  let node = root;
  for (const part of abs.split("/").filter(Boolean)) {
    if (node?.type !== "dir") return null;
    node = node.children[part];
  }
  return node ?? null;
};

export const parentOf = (abs) => abs.replace(/\/[^/]+$/, "") || "/";
export const baseName = (abs) => abs.split("/").pop() || "/";

export const sizeOf = (node) =>
  node.type === "dir"
    ? 4096
    : (node.size ?? new TextEncoder().encode(node.content ?? "").length);

export const humanSize = (bytes) =>
  bytes < 1024
    ? `${bytes}B`
    : bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1).replace(/\.0$/, "")}K`
      : `${(bytes / 1024 / 1024).toFixed(1)}M`;

// Simple glob (* and ?) for one path segment.
export const globToRegExp = (pattern) =>
  new RegExp(
    `^${pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".")}$`,
  );

// Walk a subtree: yields [absPath, node].
export function* walk(root, abs) {
  const node = getNode(root, abs);
  if (!node) return;
  yield [abs, node];
  if (node.type !== "dir") return;
  for (const name of Object.keys(node.children).sort()) {
    yield* walk(root, abs === "/" ? `/${name}` : `${abs}/${name}`);
  }
}

// Writable if this dir (or an ancestor) is marked writable and the path is
// not inside a read-only built-in subtree.
export const isWritableDir = (root, abs) => {
  const node = getNode(root, abs);
  if (node?.type !== "dir") return false;
  if (node.writable || node.userCreated) return true;
  return false;
};
