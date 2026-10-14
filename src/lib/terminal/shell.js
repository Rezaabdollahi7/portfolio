import { projects, wallpapers } from "#constants";
import { COMMANDS, suggest } from "./commands";
import {
  ALIASES,
  HOME,
  HOSTNAME,
  USER,
  baseName,
  buildFs,
  displayPath,
  getNode,
  globToRegExp,
  isWritableDir,
  parentOf,
  resolvePath,
} from "./fs";
import { fail, line, span, text, toText } from "./output";

export const createSession = () => {
  const session = {
    fs: buildFs(Object.keys(COMMANDS)),
    cwd: HOME,
    oldCwd: null,
    history: [],
    lastCode: 0,
    startedAt: Date.now(),
    vars: {},
  };
  session.env = () => ({
    HOME,
    USER,
    LOGNAME: USER,
    HOSTNAME,
    SHELL: "/bin/zsh",
    PWD: session.cwd,
    OLDPWD: session.oldCwd ?? "",
    EDITOR: "code",
    LANG: "en_US.UTF-8",
    ...session.vars,
  });
  return session;
};

// ── Tokenizer ────────────────────────────────────────────────────────────────

const OPS = ["&&", "||", ">>", "|", ";", ">"];

export const tokenize = (input, env = {}, lastCode = 0) => {
  const tokens = [];
  let word = "";
  let inWord = false;
  let globbable = false;
  let quote = null;

  const push = () => {
    if (inWord) tokens.push({ word, glob: globbable });
    word = "";
    inWord = false;
    globbable = false;
  };

  const readVar = (i) => {
    const m = input.slice(i + 1).match(/^(\?|\{[A-Za-z_][A-Za-z0-9_]*\}|[A-Za-z_][A-Za-z0-9_]*)/);
    if (!m) return { value: "$", length: 1 };
    const name = m[1].replace(/[{}]/g, "");
    return { value: name === "?" ? String(lastCode) : (env[name] ?? ""), length: m[1].length + 1 };
  };

  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quote) {
      if (c === quote) quote = null;
      else if (quote === '"' && c === "$") {
        const v = readVar(i);
        word += v.value;
        i += v.length - 1;
      } else if (quote === '"' && c === "\\" && /["\\$]/.test(input[i + 1] ?? "")) word += input[++i];
      else word += c;
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      inWord = true;
      continue;
    }
    if (c === "\\") {
      word += input[++i] ?? "";
      inWord = true;
      continue;
    }
    if (/\s/.test(c)) {
      push();
      continue;
    }
    const op = OPS.find((o) => input.startsWith(o, i));
    if (op) {
      push();
      tokens.push({ op });
      i += op.length - 1;
      continue;
    }
    if (c === "$") {
      const v = readVar(i);
      word += v.value;
      i += v.length - 1;
      inWord = true;
      continue;
    }
    if (c === "~" && !inWord && (i + 1 === input.length || /[\s/]/.test(input[i + 1]))) {
      word += HOME;
      inWord = true;
      continue;
    }
    if (c === "*" || c === "?") globbable = true;
    word += c;
    inWord = true;
  }
  if (quote) throw new Error(`unterminated ${quote === '"' ? "double" : "single"} quote`);
  push();
  return tokens;
};

// Parse into [{ connector, pipeline: [{ argv, redirect }] }]
export const parse = (tokens) => {
  const sequence = [];
  let connector = null;
  let pipeline = [];
  let cmd = { argv: [], redirect: null };

  const endCmd = () => {
    if (!cmd.argv.length && !cmd.redirect) throw new Error("syntax error near unexpected token");
    pipeline.push(cmd);
    cmd = { argv: [], redirect: null };
  };
  const endPipeline = (next) => {
    endCmd();
    sequence.push({ connector, pipeline });
    pipeline = [];
    connector = next;
  };

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.op === "|") endCmd();
    else if (t.op === "&&" || t.op === "||" || t.op === ";") {
      if (t.op === ";" && !cmd.argv.length && !pipeline.length) continue;
      endPipeline(t.op);
    } else if (t.op === ">" || t.op === ">>") {
      const target = tokens[++i];
      if (!target?.word) throw new Error("syntax error: expected a file after >");
      cmd.redirect = { path: target.word, append: t.op === ">>" };
    } else cmd.argv.push(t);
  }
  if (cmd.argv.length || cmd.redirect || pipeline.length) endPipeline(null);
  return sequence;
};

// Expand * and ? in the last path segment. Unmatched patterns stay literal.
const expandGlob = (session, token) => {
  if (!token.glob) return [token.word];
  const pattern = token.word;
  const slash = pattern.lastIndexOf("/");
  const dirPart = slash === -1 ? "" : pattern.slice(0, slash + 1);
  const basePart = pattern.slice(slash + 1);
  if (!/[*?]/.test(basePart)) return [pattern];
  const dirNode = getNode(session.fs, resolvePath(session.cwd, dirPart || "."));
  if (dirNode?.type !== "dir") return [pattern];
  const re = globToRegExp(basePart);
  const matches = Object.keys(dirNode.children)
    .filter((n) => re.test(n) && (basePart.startsWith(".") || !n.startsWith(".")))
    .sort((a, b) => a.localeCompare(b))
    .map((n) => dirPart + n);
  return matches.length ? matches : [pattern];
};

// ── Execution ────────────────────────────────────────────────────────────────

const writeRedirect = (session, redirect, content) => {
  const abs = resolvePath(session.cwd, redirect.path);
  const existing = getNode(session.fs, abs);
  if (existing?.type === "dir") return `zsh: is a directory: ${redirect.path}`;
  if (existing && !existing.userCreated) return `zsh: permission denied: ${redirect.path}`;
  if (!existing && !isWritableDir(session.fs, parentOf(abs)))
    return `zsh: ${getNode(session.fs, parentOf(abs)) ? "read-only file system" : "no such file or directory"}: ${redirect.path}`;
  const body = content ? `${content}\n` : "";
  if (existing) {
    existing.content = redirect.append ? existing.content + body : body;
    existing.mtime = new Date();
  } else {
    getNode(session.fs, parentOf(abs)).children[baseName(abs)] = {
      type: "file",
      content: body,
      mtime: new Date(),
      userCreated: true,
    };
  }
  return null;
};

const runCommand = (session, io, cmd, stdin) => {
  let argv = cmd.argv.flatMap((t) => expandGlob(session, t));
  const invokedAs = argv[0];
  if (ALIASES[argv[0]]) argv = [...ALIASES[argv[0]].split(" "), ...argv.slice(1)];

  // VAR=value assignments
  if (argv.length === 1 && /^[A-Za-z_][A-Za-z0-9_]*=/.test(argv[0])) {
    const [k, ...v] = argv[0].split("=");
    session.vars[k] = v.join("=");
    return { out: [], err: [], code: 0 };
  }
  if (argv[0] === "export") {
    for (const a of argv.slice(1)) {
      const [k, ...v] = a.split("=");
      if (v.length) session.vars[k] = v.join("=");
    }
    return { out: [], err: [], code: 0 };
  }

  const [name, ...args] = argv;
  const command = COMMANDS[name];
  if (!command) {
    if (!name) return { out: [], err: [], code: 0 };
    const guess = suggest(name);
    return {
      out: [],
      err: [
        line(span(`zsh: command not found: ${name}`, "t-err")),
        ...(guess
          ? [line(span("Did you mean ", "t-muted"), span(guess, "t-cmd", { run: guess }), span("?", "t-muted"))]
          : [line(span("Type ", "t-muted"), span("help", "t-cmd", { run: "help" }), span(" to see every command.", "t-muted"))]),
      ],
      code: 127,
    };
  }
  try {
    return command.run({ name, invokedAs, args, stdin, session, io });
  } catch (e) {
    return fail(`${name}: ${e.message}`);
  }
};

// Run one input line. Returns the lines to print.
export const execute = (session, io, input) => {
  let sequence;
  try {
    sequence = parse(tokenize(input, session.env(), session.lastCode));
  } catch (e) {
    session.lastCode = 2;
    return text(`zsh: ${e.message}`, "t-err");
  }

  const printed = [];
  for (const { connector, pipeline } of sequence) {
    if (connector === "&&" && session.lastCode !== 0) continue;
    if (connector === "||" && session.lastCode === 0) continue;

    let stdin = null;
    let result = { out: [], err: [], code: 0 };
    pipeline.forEach((cmd, i) => {
      result = runCommand(session, io, cmd, stdin);
      printed.push(...result.err);
      const isLast = i === pipeline.length - 1;
      if (cmd.redirect) {
        const error = writeRedirect(session, cmd.redirect, toText(result.out));
        if (error) {
          printed.push(...text(error, "t-err"));
          result.code = 1;
        }
        stdin = "";
      } else if (!isLast) {
        stdin = toText(result.out);
      } else {
        printed.push(...result.out);
      }
    });
    session.lastCode = result.code;
  }
  return printed;
};

// ── Tab completion ───────────────────────────────────────────────────────────

const commonPrefix = (items) =>
  items.reduce((prefix, item) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === item[i]) i++;
    return prefix.slice(0, i);
  });

const DIR_ONLY = new Set(["cd", "tree", "mkdir"]);

// Returns { value } to replace the input, or { options } to list choices.
export const complete = (session, input) => {
  const match = input.match(/(?:^|[\s|;&]+)([^\s|;&]*)$/);
  const current = match ? match[1] : "";
  const before = input.slice(0, input.length - current.length);
  // Words of the command being typed (after the last |, ;, && or ||).
  const segment = before.split(/\|\||&&|[|;]/).pop();
  const segWords = segment.trim().split(/\s+/).filter(Boolean);
  const lastSep = segWords.length === 0;
  const cmd = segWords[0];

  let candidates = [];
  let isPath = false;

  if (lastSep) {
    candidates = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)]
      .filter((c) => c.startsWith(current))
      .map((c) => ({ insert: c, label: c, suffix: " " }));
  } else {
    const name = ALIASES[cmd]?.split(" ")[0] ?? cmd;
    if (name === "man" || name === "which") {
      candidates = Object.keys(COMMANDS)
        .filter((c) => c.startsWith(current))
        .map((c) => ({ insert: c, label: c, suffix: " " }));
    } else if (name === "theme") {
      candidates = ["light", "dark", "auto"].filter((c) => c.startsWith(current)).map((c) => ({ insert: c, label: c, suffix: " " }));
    } else if (name === "wallpaper") {
      candidates = wallpapers
        .map((w) => w.name.toLowerCase())
        .filter((c) => c.startsWith(current))
        .map((c) => ({ insert: c, label: c, suffix: " " }));
    } else {
      isPath = true;
      const slash = current.lastIndexOf("/");
      const dirPart = slash === -1 ? "" : current.slice(0, slash + 1);
      const basePart = current.slice(slash + 1);
      const dirNode = getNode(session.fs, resolvePath(session.cwd, dirPart || "."));
      if (dirNode?.type === "dir") {
        candidates = Object.entries(dirNode.children)
          .filter(([n]) => n.startsWith(basePart) && (basePart.startsWith(".") || !n.startsWith(".")))
          .filter(([, node]) => !DIR_ONLY.has(name) || node.type === "dir")
          .map(([n, node]) => ({
            insert: dirPart + n,
            label: node.type === "dir" ? `${n}/` : n,
            suffix: node.type === "dir" ? "/" : " ",
          }));
      }
      // Project names work for cd/open from anywhere.
      if (!dirPart && (name === "cd" || name === "open")) {
        for (const p of projects) {
          if (p.id.startsWith(basePart) && !candidates.some((c) => c.insert === p.id))
            candidates.push({ insert: p.id, label: `${p.id}/`, suffix: name === "cd" ? "/" : " " });
        }
      }
    }
  }

  if (!candidates.length) return {};
  candidates.sort((a, b) => a.insert.localeCompare(b.insert));
  if (candidates.length === 1) {
    const [c] = candidates;
    return { value: before + c.insert + c.suffix };
  }
  const prefix = commonPrefix(candidates.map((c) => c.insert));
  if (prefix.length > current.length) return { value: before + prefix };
  return { options: candidates.map((c) => c.label), isPath };
};

export const promptPath = (session) => displayPath(session.cwd);
