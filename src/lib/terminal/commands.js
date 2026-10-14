import { apps, funFacts, profile, projects, skills, socials, wallpapers } from "#constants";
import {
  ALIASES,
  HOME,
  HOSTNAME,
  USER,
  baseName,
  displayPath,
  getNode,
  globToRegExp,
  humanSize,
  isWritableDir,
  parentOf,
  resolvePath,
  sizeOf,
  walk,
} from "./fs";
import { fail, fromText, line, ok, span, text, toText } from "./output";

// ── helpers ──────────────────────────────────────────────────────────────────

// Split "-la" style flags from operands. `valued` flags consume the next arg.
const parseArgs = (args, valued = []) => {
  const flags = {};
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--") {
      rest.push(...args.slice(i + 1));
      break;
    }
    if (/^-\d+$/.test(a)) {
      flags.n = a.slice(1);
    } else if (a.startsWith("--") && a.length > 2) {
      flags[a.slice(2)] = true;
    } else if (a.startsWith("-") && a.length > 1) {
      for (const ch of a.slice(1)) {
        if (valued.includes(ch)) {
          flags[ch] = args[++i];
          break;
        }
        flags[ch] = true;
      }
    } else {
      rest.push(a);
    }
  }
  return { flags, rest };
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const lsDate = (d) =>
  `${months[d.getMonth()]} ${String(d.getDate()).padStart(2)} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const isText = (node) => node.type === "file" && !node.binary;

// Display a path the way the user typed it, for clickable `run` actions.
const shellPath = (abs) => displayPath(abs);

// How a filesystem entry looks in `ls`, and what clicking it does.
const entrySpan = (name, node, abs) => {
  if (node.type === "dir") return span(`${name}/`, "t-dir", { run: `cd ${shellPath(abs)}` });
  if (node.exe) return span(`${name}*`, "t-exe", { run: name });
  if (node.image) return span(name, "t-img", { run: `open ${shellPath(abs)}` });
  if (node.binary) return span(name, "t-pdf", { run: `open ${shellPath(abs)}` });
  if (name.startsWith(".")) return span(name, "t-muted", { run: `cat ${shellPath(abs)}` });
  return span(name, undefined, { run: `cat ${shellPath(abs)}` });
};

const childPath = (abs, name) => (abs === "/" ? `/${name}` : `${abs}/${name}`);

// Markdown-ish colouring for `cat` on .md files.
const mdLines = (content) =>
  content
    .replace(/\n$/, "")
    .split("\n")
    .map((t) =>
      t.startsWith("# ")
        ? line(span(t, "t-h1"))
        : t.startsWith("## ")
          ? line(span(t, "t-h2"))
          : t.startsWith("- ") || t.startsWith("[")
            ? line(span(t.slice(0, 2), "t-muted"), t.slice(2))
            : line(t),
    );

const readFile = (session, arg, cmd) => {
  const abs = resolvePath(session.cwd, arg);
  const node = getNode(session.fs, abs);
  if (!node) return { error: `${cmd}: ${arg}: No such file or directory` };
  if (node.type === "dir") return { error: `${cmd}: ${arg}: Is a directory` };
  if (node.binary) {
    return {
      error: `${cmd}: ${arg}: binary file`,
      hint: line(span("  try: ", "t-muted"), span(`open ${arg}`, "t-cmd", { run: `open ${arg}` })),
    };
  }
  return { abs, node, content: node.content ?? "" };
};

// Read named files, or stdin when none are given.
const inputs = (session, files, stdin, cmd) => {
  if (!files.length) return { sources: [{ name: null, content: stdin ?? "" }], err: [] };
  const sources = [];
  const err = [];
  for (const f of files) {
    const r = readFile(session, f, cmd);
    if (r.error) {
      err.push(...text(r.error, "t-err"));
      if (r.hint) err.push(r.hint);
    } else sources.push({ name: f, content: r.content });
  }
  return { sources, err };
};

const levenshtein = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return dp[a.length][b.length];
};

export const suggest = (name) => {
  const pool = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)];
  let best = null;
  for (const c of pool) {
    const d = levenshtein(name, c);
    if (d <= 2 && (!best || d < best.d)) best = { c, d };
  }
  return best?.c ?? null;
};

const findProject = (name) => {
  const q = name.toLowerCase().replace(/\/$/, "");
  return projects.find((p) => p.id === q || p.slug === q || p.title.toLowerCase() === q);
};

const APP_NAMES = {
  projects: "safari",
  safari: "safari",
  notes: "notes",
  photos: "photos",
  finder: "finder",
  files: "finder",
  code: "vscode",
  vscode: "vscode",
  contact: "contact",
  contacts: "contact",
  resume: "resume",
  settings: "settings",
  terminal: "terminal",
  github: "github",
  telegram: "telegram",
  mail: "mail",
  trash: "trash",
};

const NEOFETCH_LOGO = [
  ["                    'c.", "t-green"],
  ["                 ,xNMM.", "t-green"],
  ["               .OMMMMo", "t-green"],
  ["               OMMM0,", "t-green"],
  ["     .;loddo:' loolloddol;.", "t-green"],
  ["   cKMMMMMMMMMMNWMMMMMMMMMM0:", "t-green"],
  [" .KMMMMMMMMMMMMMMMMMMMMMMMWd.", "t-yellow"],
  [" XMMMMMMMMMMMMMMMMMMMMMMMX.", "t-yellow"],
  [";MMMMMMMMMMMMMMMMMMMMMMMM:", "t-orange"],
  [":MMMMMMMMMMMMMMMMMMMMMMMM:", "t-orange"],
  [".MMMMMMMMMMMMMMMMMMMMMMMMX.", "t-red"],
  [" kMMMMMMMMMMMMMMMMMMMMMMMMWd.", "t-red"],
  [" .XMMMMMMMMMMMMMMMMMMMMMMMMMMk", "t-purple"],
  ["  .XMMMMMMMMMMMMMMMMMMMMMMMMK.", "t-purple"],
  ["    kMMMMMMMMMMMMMMMMMMMMMMd", "t-blue"],
  ["     ;KMMMMMMMWXXWMMMMMMMk.", "t-blue"],
  ["       .cooc,.    .,coo:.", "t-blue"],
];

const uptimeText = (startedAt) => {
  const mins = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
  return mins < 60 ? `${mins} min${mins === 1 ? "" : "s"}` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

const cow = (msg) => {
  const t = msg || "Moo. Hire Reza.";
  const border = "-".repeat(t.length + 2);
  return [
    ` ${"_".repeat(t.length + 2)}`,
    `< ${t} >`,
    ` ${border}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");
};

// ── commands ─────────────────────────────────────────────────────────────────

const cat = ({ args, stdin, session, name }) => {
  const { rest } = parseArgs(args);
  const { sources, err } = inputs(session, rest, stdin, name);
  const out = sources.flatMap((s) =>
    s.name?.endsWith(".md") ? mdLines(s.content) : fromText(s.content),
  );
  return { out, err, code: err.length ? 1 : 0 };
};

const headTail = (which) => ({ args, stdin, session }) => {
  const { flags, rest } = parseArgs(args, ["n"]);
  const n = Number(flags.n ?? 10);
  const { sources, err } = inputs(session, rest, stdin, which);
  const out = sources.flatMap((s, i) => {
    const lines = s.content.replace(/\n$/, "").split("\n");
    const picked = which === "head" ? lines.slice(0, n) : lines.slice(-n);
    const header =
      sources.length > 1 ? [...(i ? [line("")] : []), line(span(`==> ${s.name} <==`, "t-muted"))] : [];
    return [...header, ...picked.map((t) => line(t))];
  });
  return { out, err, code: err.length ? 1 : 0 };
};

export const COMMANDS = {
  // Navigation
  pwd: {
    group: "Navigation",
    summary: "print the current directory",
    run: ({ session }) => ok([line(session.cwd)]),
  },
  cd: {
    group: "Navigation",
    summary: "change directory (cd -, cd ~, cd .., cd dofixo)",
    usage: "cd [dir]",
    run: ({ args, session }) => {
      const target = args[0] ?? "~";
      if (target === "-") {
        const prev = session.oldCwd ?? session.cwd;
        session.oldCwd = session.cwd;
        session.cwd = prev;
        return ok([line(displayPath(prev))]);
      }
      let abs = resolvePath(session.cwd, target);
      let node = getNode(session.fs, abs);
      let viaCdpath = false;
      // zsh-style cdpath: `cd dofixo` works from anywhere.
      const bare = target.replace(/\/+$/, "");
      if (!node && bare && !bare.includes("/")) {
        const project = findProject(bare);
        for (const candidate of [
          project && `${HOME}/projects/${project.id}`,
          `${HOME}/projects/archive/${bare}`,
          `${HOME}/${bare}`,
        ]) {
          if (candidate && getNode(session.fs, candidate)?.type === "dir") {
            abs = candidate;
            node = getNode(session.fs, candidate);
            viaCdpath = true;
            break;
          }
        }
      }
      if (!node) return fail(`cd: no such file or directory: ${target}`);
      if (node.type !== "dir") return fail(`cd: not a directory: ${target}`);
      session.oldCwd = session.cwd;
      session.cwd = abs;
      return ok(viaCdpath ? [line(span(displayPath(abs), "t-muted"))] : []);
    },
  },
  ls: {
    group: "Navigation",
    summary: "list files (-a hidden, -l details)",
    usage: "ls [-al] [path...]",
    run: ({ args, session }) => {
      const { flags, rest } = parseArgs(args);
      const targets = rest.length ? rest : ["."];
      const out = [];
      const err = [];
      targets.forEach((t, i) => {
        const abs = resolvePath(session.cwd, t);
        const node = getNode(session.fs, abs);
        if (!node) {
          err.push(...text(`ls: ${t}: No such file or directory`, "t-err"));
          return;
        }
        const entries =
          node.type === "dir"
            ? [
                ...(flags.a ? [[".", node, abs], ["..", getNode(session.fs, parentOf(abs)), parentOf(abs)]] : []),
                ...Object.keys(node.children)
                  .filter((n) => flags.a || !n.startsWith("."))
                  .sort((a, b) => a.localeCompare(b))
                  .map((n) => [n, node.children[n], childPath(abs, n)]),
              ]
            : [[t, node, abs]];
        if (targets.length > 1) {
          if (i) out.push(line(""));
          out.push(line(span(`${t}:`, "t-muted")));
        }
        if (flags.l) {
          if (node.type === "dir") {
            const blocks = entries.reduce((sum, [, n]) => sum + Math.ceil(sizeOf(n) / 512), 0);
            out.push(line(span(`total ${blocks}`, "t-muted")));
          }
          for (const [name, n, p] of entries) {
            const mode =
              n.type === "dir" ? "drwxr-xr-x" : n.exe ? "-rwxr-xr-x" : n.userCreated ? "-rw-r--r--" : "-r--r--r--";
            out.push(
              line(
                span(`${mode}  ${USER}  staff  ${humanSize(sizeOf(n)).padStart(5)}  ${lsDate(n.mtime)}  `, "t-muted"),
                entrySpan(name, n, p),
              ),
            );
          }
        } else if (entries.length) {
          out.push({ grid: entries.map(([name, n, p]) => entrySpan(name, n, p)) });
        }
      });
      return { out, err, code: err.length ? 1 : 0 };
    },
  },
  tree: {
    group: "Navigation",
    summary: "show a directory tree (-L depth, -a hidden)",
    usage: "tree [-a] [-L depth] [path]",
    run: ({ args, session }) => {
      const { flags, rest } = parseArgs(args, ["L"]);
      const start = rest[0] ?? ".";
      const abs = resolvePath(session.cwd, start);
      const root = getNode(session.fs, abs);
      if (!root) return fail(`tree: ${start}: No such file or directory`);
      const maxDepth = flags.L ? Number(flags.L) : Infinity;
      const out = [line(span(start, "t-dir", { run: `cd ${shellPath(abs)}` }))];
      let dirs = 0;
      let files = 0;
      const visit = (node, path, prefix, depth) => {
        if (node.type !== "dir" || depth > maxDepth) return;
        const names = Object.keys(node.children)
          .filter((n) => flags.a || !n.startsWith("."))
          .sort((a, b) => a.localeCompare(b));
        names.forEach((n, i) => {
          const last = i === names.length - 1;
          const child = node.children[n];
          const p = childPath(path, n);
          child.type === "dir" ? dirs++ : files++;
          out.push(line(span(`${prefix}${last ? "└── " : "├── "}`, "t-muted"), entrySpan(n, child, p)));
          visit(child, p, `${prefix}${last ? "    " : "│   "}`, depth + 1);
        });
      };
      visit(root, abs, "", 1);
      out.push(line(""), line(span(`${dirs} directories, ${files} files`, "t-muted")));
      return ok(out);
    },
  },
  find: {
    group: "Navigation",
    summary: "search for files by name",
    usage: "find [path] [-name pattern] [-type f|d]",
    run: ({ args, session }) => {
      const start = args[0] && !args[0].startsWith("-") ? args[0] : ".";
      const nameIdx = args.indexOf("-name");
      const typeIdx = args.indexOf("-type");
      const pattern = nameIdx !== -1 ? globToRegExp(args[nameIdx + 1] ?? "*") : null;
      const type = typeIdx !== -1 ? args[typeIdx + 1] : null;
      const abs = resolvePath(session.cwd, start);
      if (!getNode(session.fs, abs)) return fail(`find: ${start}: No such file or directory`);
      const out = [];
      for (const [p, node] of walk(session.fs, abs)) {
        if (pattern && !pattern.test(baseName(p))) continue;
        if (type === "f" && node.type !== "file") continue;
        if (type === "d" && node.type !== "dir") continue;
        const shown = start.replace(/\/$/, "") + p.slice(abs.length);
        out.push(line(entrySpan(shown || start, node, p)));
      }
      return { out, err: [], code: out.length ? 0 : 1 };
    },
  },

  // Files
  cat: { group: "Files", summary: "print a file", usage: "cat <file...>", run: cat },
  less: { group: "Files", summary: "read a file (same as cat here)", usage: "less <file>", run: cat },
  head: { group: "Files", summary: "first lines of a file", usage: "head [-n N] [file]", run: headTail("head") },
  tail: { group: "Files", summary: "last lines of a file", usage: "tail [-n N] [file]", run: headTail("tail") },
  grep: {
    group: "Files",
    summary: "search text (-i, -n, -r, -v, -c)",
    usage: "grep [-inrvc] <pattern> [path...]",
    run: ({ args, stdin, session }) => {
      const { flags, rest } = parseArgs(args);
      const [pattern, ...paths] = rest;
      if (!pattern) return fail("usage: grep [-inrvc] <pattern> [path...]", 2);
      let re;
      try {
        re = new RegExp(pattern, flags.i ? "gi" : "g");
      } catch {
        re = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags.i ? "gi" : "g");
      }
      const sources = [];
      const err = [];
      if (!paths.length) sources.push({ name: null, content: stdin ?? "" });
      for (const p of paths) {
        const abs = resolvePath(session.cwd, p);
        const node = getNode(session.fs, abs);
        if (!node) err.push(...text(`grep: ${p}: No such file or directory`, "t-err"));
        else if (node.type === "dir") {
          if (!flags.r) err.push(...text(`grep: ${p}: Is a directory (use -r)`, "t-err"));
          else
            for (const [fp, n] of walk(session.fs, abs))
              if (isText(n)) sources.push({ name: p.replace(/\/$/, "") + fp.slice(abs.length), abs: fp, content: n.content });
        } else if (isText(node)) sources.push({ name: p, abs, content: node.content });
      }
      const showName = sources.length > 1 || flags.r;
      const out = [];
      for (const s of sources) {
        let count = 0;
        s.content.replace(/\n$/, "").split("\n").forEach((t, i) => {
          re.lastIndex = 0;
          const hit = re.test(t);
          if (hit === Boolean(flags.v)) return;
          count++;
          if (flags.c) return;
          const parts = [];
          if (showName && s.name) parts.push(span(`${s.name}:`, "t-purple", s.abs ? { run: `cat ${shellPath(s.abs)}` } : undefined));
          if (flags.n) parts.push(span(`${i + 1}:`, "t-green"));
          if (flags.v) parts.push(t);
          else {
            let last = 0;
            re.lastIndex = 0;
            for (const m of t.matchAll(re)) {
              parts.push(t.slice(last, m.index), span(m[0], "t-match"));
              last = m.index + m[0].length;
            }
            parts.push(t.slice(last));
          }
          out.push(line(parts));
        });
        if (flags.c) out.push(line(showName && s.name ? `${s.name}:${count}` : String(count)));
      }
      const matched = flags.c ? out.some((l) => !/:0$|^0$/.test(toText([l]))) : out.length > 0;
      return { out, err, code: err.length ? 2 : matched ? 0 : 1 };
    },
  },
  wc: {
    group: "Files",
    summary: "count lines, words and bytes",
    usage: "wc [-lwc] [file...]",
    run: ({ args, stdin, session }) => {
      const { flags, rest } = parseArgs(args);
      const { sources, err } = inputs(session, rest, stdin, "wc");
      const all = !flags.l && !flags.w && !flags.c;
      const out = sources.map((s) => {
        const l = s.content ? s.content.split("\n").length - (s.content.endsWith("\n") ? 1 : 0) : 0;
        const w = s.content.split(/\s+/).filter(Boolean).length;
        const c = new TextEncoder().encode(s.content).length;
        const cols = [all || flags.l ? l : null, all || flags.w ? w : null, all || flags.c ? c : null]
          .filter((x) => x !== null)
          .map((x) => String(x).padStart(7));
        return line(cols.join(" ") + (s.name ? ` ${s.name}` : ""));
      });
      return { out, err, code: err.length ? 1 : 0 };
    },
  },
  sort: {
    group: "Files",
    summary: "sort lines (-r reverse)",
    usage: "sort [-r] [file]",
    run: ({ args, stdin, session }) => {
      const { flags, rest } = parseArgs(args);
      const { sources, err } = inputs(session, rest, stdin, "sort");
      const lines = sources.flatMap((s) => s.content.replace(/\n$/, "").split("\n")).filter((l, i, a) => l || i < a.length - 1);
      lines.sort((a, b) => a.localeCompare(b));
      if (flags.r) lines.reverse();
      return { out: lines.map((l) => line(l)), err, code: err.length ? 1 : 0 };
    },
  },
  echo: {
    group: "Files",
    summary: "print text (try: echo hi > note.txt)",
    usage: "echo [text]",
    run: ({ args }) => ok([line(args.join(" "))]),
  },
  touch: {
    group: "Files",
    summary: "create an empty file",
    usage: "touch <file>",
    run: ({ args, session }) => {
      if (!args.length) return fail("usage: touch <file>");
      for (const f of args) {
        const abs = resolvePath(session.cwd, f);
        const existing = getNode(session.fs, abs);
        if (existing) {
          existing.mtime = new Date();
          continue;
        }
        const parent = getNode(session.fs, parentOf(abs));
        if (!isWritableDir(session.fs, parentOf(abs)))
          return fail(`touch: ${f}: ${parent ? "Read-only file system" : "No such file or directory"}`);
        parent.children[baseName(abs)] = { type: "file", content: "", mtime: new Date(), userCreated: true };
      }
      return ok();
    },
  },
  mkdir: {
    group: "Files",
    summary: "create a directory (-p parents)",
    usage: "mkdir [-p] <dir>",
    run: ({ args, session }) => {
      const { flags, rest } = parseArgs(args);
      if (!rest.length) return fail("usage: mkdir [-p] <dir>");
      for (const d of rest) {
        const abs = resolvePath(session.cwd, d);
        const parts = abs.split("/").filter(Boolean);
        let path = "";
        for (let i = 0; i < parts.length; i++) {
          const parentPath = path || "/";
          path += `/${parts[i]}`;
          const node = getNode(session.fs, path);
          const isLast = i === parts.length - 1;
          if (node) {
            if (isLast && !flags.p) return fail(`mkdir: ${d}: File exists`);
            continue;
          }
          if (!isLast && !flags.p) return fail(`mkdir: ${d}: No such file or directory`);
          if (!isWritableDir(session.fs, parentPath)) return fail(`mkdir: ${d}: Read-only file system`);
          getNode(session.fs, parentPath).children[parts[i]] = {
            type: "dir",
            children: {},
            mtime: new Date(),
            userCreated: true,
          };
        }
      }
      return ok();
    },
  },
  rm: {
    group: "Files",
    summary: "remove files you created (-r for folders)",
    usage: "rm [-rf] <path>",
    run: ({ args, session }) => {
      const { flags, rest } = parseArgs(args);
      if (!rest.length) return fail("usage: rm [-rf] <path>");
      if (flags.r && rest.some((r) => ["/", "~", HOME, "*", "/*"].includes(r)))
        return fail("rm: nice try. This portfolio took weeks. 🙂");
      for (const r of rest) {
        const abs = resolvePath(session.cwd, r);
        const node = getNode(session.fs, abs);
        if (!node) {
          if (flags.f) continue;
          return fail(`rm: ${r}: No such file or directory`);
        }
        if (!node.userCreated) return fail(`rm: ${r}: Operation not permitted (it's load-bearing)`);
        if (node.type === "dir" && !flags.r) return fail(`rm: ${r}: is a directory`);
        delete getNode(session.fs, parentOf(abs)).children[baseName(abs)];
      }
      return ok();
    },
  },
  open: {
    group: "Files",
    summary: "open a file, folder, project, app or URL",
    usage: "open <path|project|app|url>",
    run: ({ args, session, io }) => {
      const target = args[0];
      if (!target) return fail("usage: open <path|project|app|url>   (try: open .)");
      if (/^(https?:|mailto:)/.test(target)) {
        io.openExternal(target);
        return ok([line(span(`Opening ${target}…`, "t-ok"))]);
      }
      const abs = resolvePath(session.cwd, target);
      const node = getNode(session.fs, abs);
      if (node?.type === "dir") {
        if (node.project) {
          const p = projects.find((x) => x.id === node.project);
          io.openProject(p.id);
          return ok([line(span(`Opening the ${p.title} case study…`, "t-ok"))]);
        }
        if (node.app) {
          io.openWindow(node.app);
          return ok([line(span(`Opening ${node.app}…`, "t-ok"))]);
        }
        if (node.finder) {
          io.openWindow("finder", { location: node.finder });
          return ok([line(span(`Opening ${displayPath(abs)} in Finder…`, "t-ok"))]);
        }
        return fail(`open: ${target}: no application knows how to open this folder`);
      }
      if (node?.type === "file") {
        const name = baseName(abs);
        if (node.image) io.openWindow("imgfile", { name, imageUrl: node.image });
        else if (node.app) io.openWindow(node.app);
        else if (node.note) io.openWindow("notes", { noteId: node.note });
        else if (node.exe) return fail(`open: ${name} is a command. Type ${name} to run it.`);
        else
          io.openWindow("txtfile", {
            name,
            title: name,
            description: (node.content || "(empty file)").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
          });
        return ok([line(span(`Opening ${name}…`, "t-ok"))]);
      }
      const project = findProject(target);
      if (project) {
        io.openProject(project.id);
        return ok([line(span(`Opening the ${project.title} case study…`, "t-ok"))]);
      }
      const appId = APP_NAMES[target.toLowerCase()];
      if (appId) {
        io.openApp(appId);
        return ok([line(span(`Opening ${apps.find((a) => a.id === appId)?.name ?? target}…`, "t-ok"))]);
      }
      return fail(`open: ${target}: No such file, project or app`);
    },
  },
  file: {
    group: "Files",
    summary: "describe a file's type",
    usage: "file <path>",
    run: ({ args, session }) => {
      if (!args.length) return fail("usage: file <path>");
      return ok(
        args.map((a) => {
          const node = getNode(session.fs, resolvePath(session.cwd, a));
          const kind = !node
            ? "cannot open (No such file or directory)"
            : node.type === "dir"
              ? "directory"
              : node.exe
                ? "Mach-O 64-bit executable arm64 (powered by coffee)"
                : node.image
                  ? "Web/P image data, VP8 encoding"
                  : node.binary
                    ? "PDF document, version 1.7"
                    : a.endsWith(".md")
                      ? "Markdown document, UTF-8 Unicode text"
                      : "UTF-8 Unicode text";
          return line(span(`${a}: `, "t-muted"), kind);
        }),
      );
    },
  },
  code: {
    group: "Files",
    summary: "open VS Code (vim and nano too)",
    usage: "code [path]",
    run: ({ invokedAs, io }) => {
      io.openApp("vscode");
      return ok([
        line(
          span(
            invokedAs === "vim" || invokedAs === "vi"
              ? "Opening VS Code instead. (Nobody remembers how to quit vim.)"
              : "Opening VS Code…",
            "t-ok",
          ),
        ),
      ]);
    },
  },

  // Portfolio
  about: {
    group: "Portfolio",
    summary: "who I am",
    run: ({ session }) => ok(mdLines(getNode(session.fs, `${HOME}/about.md`).content)),
  },
  projects: {
    group: "Portfolio",
    summary: "list my projects (click one to cd into it)",
    run: () =>
      ok([
        ...projects.map((p) =>
          line(
            span(p.id.padEnd(12), "t-dir", { run: `cd ~/projects/${p.id}` }),
            span(`${p.year}  `, "t-muted"),
            span(p.title, "t-strong"),
            span(` · ${p.tagline}`, "t-muted"),
          ),
        ),
        line(""),
        line(
          span("Try: ", "t-muted"),
          span("cd dofixo", "t-cmd", { run: "cd dofixo" }),
          span(" → ", "t-muted"),
          span("cat README.md", "t-cmd", { run: "cat ~/projects/dofixo/README.md" }),
          span(" → ", "t-muted"),
          span("open .", "t-cmd", { run: "open ~/projects/dofixo" }),
        ),
      ]),
  },
  skills: {
    group: "Portfolio",
    summary: "my tech stack",
    run: () =>
      ok([
        ...skills.map((g) => line(span("✓ ", "t-green"), span(g.category.padEnd(10), "t-yellow"), g.items.join(", "))),
        line(span(`✓ ${skills.length} of ${skills.length} stacks loaded`, "t-green")),
      ]),
  },
  contact: {
    group: "Portfolio",
    summary: "how to reach me",
    run: () =>
      ok([
        ...socials.map((s) => line(span(s.label.padEnd(10), "t-yellow"), span(s.handle, "t-link", { href: s.href }))),
        line(span("Phone".padEnd(10), "t-yellow"), span(profile.phone, "t-link", { href: profile.phoneHref })),
        line(""),
        line(span(`${profile.availability}. `, "t-muted"), span("hire", "t-cmd", { run: "hire" })),
      ]),
  },
  resume: {
    group: "Portfolio",
    summary: "open my resume",
    run: ({ io }) => {
      io.openApp("resume");
      return ok([line(span("Opening Resume.pdf…", "t-ok"))]);
    },
  },
  hire: {
    group: "Portfolio",
    summary: "the best command here",
    run: ({ io }) => {
      io.openApp("contact");
      return ok([
        line(span("Excellent decision.", "t-h1")),
        line(`${profile.availability}. Opening Contacts…`),
      ]);
    },
  },
  github: {
    group: "Portfolio",
    summary: "open my GitHub",
    run: ({ io }) => {
      io.openExternal(socials.find((s) => s.id === "github").href);
      return ok([line(span("Opening GitHub…", "t-ok"))]);
    },
  },
  git: {
    group: "Portfolio",
    summary: "git, sort of (status, log, remote)",
    usage: "git <status|log|remote>",
    run: ({ args, session }) => {
      let node = null;
      for (let p = session.cwd; p.startsWith(`${HOME}/projects/`); p = parentOf(p)) {
        node = getNode(session.fs, p);
        if (node?.project) break;
      }
      const source = node?.project ? node.source : "https://github.com/Rezaabdollahi7/portfolio";
      const sub = args[0];
      if (sub === "status")
        return ok([line("On branch main"), line("nothing to commit, working tree clean")]);
      if (sub === "remote" || sub === "log" || !sub)
        return source
          ? ok([
              line(span("origin  ", "t-yellow"), span(source, "t-link", { href: source })),
              ...(sub === "log" ? [line(span("Full history lives on GitHub ↑", "t-muted"))] : []),
            ])
          : fail("fatal: this project's repository is private");
      return fail(`git: '${sub}' is not supported here. Try git status, git log, git remote.`);
    },
  },
  theme: {
    group: "Portfolio",
    summary: "switch appearance: light | dark | auto",
    usage: "theme [light|dark|auto]",
    run: ({ args, io }) => {
      const mode = args[0]?.toLowerCase();
      if (!mode) return ok([line(`Current appearance: ${io.getAppearance()}`)]);
      if (!["light", "dark", "auto"].includes(mode)) return fail("usage: theme light | dark | auto");
      io.setAppearance(mode);
      return ok([line(span(`Appearance set to ${mode}.`, "t-ok"))]);
    },
  },
  wallpaper: {
    group: "Portfolio",
    summary: "change the desktop wallpaper",
    usage: `wallpaper [${wallpapers.map((w) => w.name.toLowerCase()).join("|")}]`,
    run: ({ args, io }) => {
      const q = args[0]?.toLowerCase();
      if (!q)
        return ok(
          wallpapers.map((w) => line(span(w.name.toLowerCase(), "t-cmd", { run: `wallpaper ${w.name.toLowerCase()}` }))),
        );
      const wp = wallpapers.find((w) => w.id === q || w.name.toLowerCase() === q);
      if (!wp) return fail(`wallpaper: unknown wallpaper '${q}'`);
      io.setWallpaper(wp.id);
      return ok([line(span(`Wallpaper set to ${wp.name}.`, "t-ok"))]);
    },
  },

  // System
  whoami: { group: "System", summary: "print the user", run: () => ok([line(USER)]) },
  hostname: { group: "System", summary: "print the host name", run: () => ok([line(HOSTNAME)]) },
  uname: {
    group: "System",
    summary: "system information (-a)",
    run: ({ args }) =>
      ok([line(args.includes("-a") ? `PortfolioOS ${HOSTNAME} 2.0.0 React-19.2 Vite-7 arm64` : "PortfolioOS")]),
  },
  date: {
    group: "System",
    summary: "current date in Tehran",
    run: () =>
      ok([
        line(
          new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            year: "numeric",
            timeZone: profile.timezone,
          })
            .format(new Date())
            .replace(/,/g, "") + " IRST",
        ),
      ]),
  },
  uptime: {
    group: "System",
    summary: "how long you've been here",
    run: ({ session }) =>
      ok([line(`up ${uptimeText(session.startedAt)}, 1 user, load averages: ☕ ☕ ☕`)]),
  },
  neofetch: {
    group: "System",
    summary: "system info, with style",
    run: ({ session, io }) => {
      const row = (k, v) => line(span(`${k}: `, "t-blue"), v);
      const info = [
        line(span(`${USER}@${HOSTNAME}`, "t-green")),
        line(span("─".repeat(`${USER}@${HOSTNAME}`.length), "t-muted")),
        row("OS", "PortfolioOS 2.0 (macOS edition)"),
        row("Host", "srezadev.ir"),
        row("Kernel", "React 19 · Vite 7"),
        row("Uptime", uptimeText(session.startedAt)),
        row("Shell", `zsh (simulated) · ${Object.keys(COMMANDS).length} commands`),
        row("Resolution", `${window.innerWidth}x${window.innerHeight}`),
        row("Theme", io.isDark() ? "Dark" : "Light"),
        row("Terminal Font", "Geist Mono"),
        row("CPU", "Reza (1 core, coffee-cooled)"),
        row("Role", `${profile.role}, ${profile.location}`),
        row("Stack", "React, Next.js, TypeScript, Node.js"),
        row("Projects", `${projects.length} featured · cd ~/projects`),
        row("Status", profile.availability),
        line(""),
        line(
          ["t-black", "t-red", "t-green", "t-yellow", "t-blue", "t-purple", "t-cyan", "t-white"].map((c) =>
            span("███", c),
          ),
        ),
      ];
      return ok([{ fetch: { logo: NEOFETCH_LOGO.map(([t, c]) => span(t, c)), info } }]);
    },
  },
  history: {
    group: "System",
    summary: "command history (-c to clear)",
    run: ({ args, session }) => {
      if (args[0] === "-c") {
        session.history.length = 0;
        return ok();
      }
      return ok(
        session.history.map((h, i) =>
          line(span(String(i + 1).padStart(4) + "  ", "t-muted"), span(h, undefined, { run: h })),
        ),
      );
    },
  },
  alias: {
    group: "System",
    summary: "list shortcuts",
    run: () => ok(Object.entries(ALIASES).map(([k, v]) => line(span(k, "t-yellow"), `='${v}'`))),
  },
  which: {
    group: "System",
    summary: "locate a command",
    usage: "which <command>",
    run: ({ args }) => {
      if (!args.length) return fail("usage: which <command>");
      const out = [];
      let code = 0;
      for (const a of args) {
        if (ALIASES[a]) out.push(line(`${a}: aliased to ${ALIASES[a]}`));
        else if (COMMANDS[a]) out.push(line(`/usr/bin/${a}`));
        else {
          out.push(line(span(`${a} not found`, "t-err")));
          code = 1;
        }
      }
      return { out, err: [], code };
    },
  },
  man: {
    group: "System",
    summary: "manual for a command",
    usage: "man <command>",
    run: ({ args }) => {
      const name = args[0];
      if (!name) return fail("What manual page do you want? Try: man ls");
      const cmd = COMMANDS[name];
      if (!cmd) return fail(`No manual entry for ${name}`);
      return ok([
        line(span("NAME", "t-h2")),
        line(`     ${name} - ${cmd.summary}`),
        line(""),
        line(span("SYNOPSIS", "t-h2")),
        line(`     ${cmd.usage ?? name}`),
      ]);
    },
  },
  help: {
    group: "System",
    summary: "list every command",
    run: () => {
      const groups = {};
      for (const [name, c] of Object.entries(COMMANDS)) (groups[c.group] ??= []).push([name, c]);
      const out = [];
      for (const [group, cmds] of Object.entries(groups)) {
        out.push(line(span(group, "t-h2")));
        for (const [name, c] of cmds)
          out.push(
            line(
              span(name.padEnd(10), "t-cmd", { run: c.usage?.includes("<") ? `man ${name}` : name }),
              span(c.summary, "t-muted"),
            ),
          );
        out.push(line(""));
      }
      out.push(line(span("Pipes, &&, ;, > and *.md globs work too. Tab completes, ↑↓ history, Ctrl+C cancels.", "t-muted")));
      return ok(out);
    },
  },
  env: {
    group: "System",
    summary: "environment variables",
    run: ({ session }) => ok(Object.entries(session.env()).map(([k, v]) => line(span(k, "t-yellow"), `=${v}`))),
  },
  clear: { group: "System", summary: "clear the screen (Ctrl+L)", run: ({ io }) => (io.clear(), ok()) },
  exit: { group: "System", summary: "close the terminal", run: ({ io }) => (io.close(), ok()) },

  // Fun
  fortune: {
    group: "Fun",
    summary: "a random fact about me",
    run: () => ok([line(funFacts[Math.floor(Math.random() * funFacts.length)])]),
  },
  cowsay: {
    group: "Fun",
    summary: "a cow says things",
    usage: "cowsay [text]",
    run: ({ args, stdin }) => ok(text(cow(args.join(" ") || stdin?.trim()))),
  },
  coffee: {
    group: "Fun",
    summary: "refuel",
    run: () => ok([line(span("☕ Brewing… done. Productivity +200%.", "t-ok"))]),
  },
  sudo: {
    group: "Fun",
    summary: "you wish",
    run: () => fail(`${USER} is not in the sudoers file. This incident will be reported.`),
  },
};

export const commandNames = Object.keys(COMMANDS);
