import { safeStorage } from "./storage";

// Public GitHub activity, fetched in the browser (no token needed):
// - the contribution calendar from github-contributions-api.jogruber.de
//   (the same data as the green squares on a GitHub profile), and
// - recent commits from GitHub's commit search, falling back to push events.
// Responses are cached in localStorage; a stale copy beats an empty widget.

export const GITHUB_USER = "Rezaabdollahi7";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

const CONTRIB_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;
const SEARCH_URL =
  `https://api.github.com/search/commits?q=author:${GITHUB_USER}` +
  "&sort=author-date&order=desc&per_page=8";
const EVENTS_URL = `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`;

const MAX_AGE = 30 * 60 * 1000;
const CACHE_PREFIX = "portfolio:gh:";

const readCache = (key) => {
  try {
    return JSON.parse(safeStorage.getItem(CACHE_PREFIX + key) ?? "null");
  } catch {
    return null;
  }
};

const cachedJson = async (key, url, signal) => {
  const cached = readCache(key);
  if (cached && Date.now() - cached.t < MAX_AGE) return cached.v;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const v = await res.json();
    safeStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ t: Date.now(), v }));
    return v;
  } catch (err) {
    if (cached && err.name !== "AbortError") return cached.v;
    throw err;
  }
};

const firstLine = (message = "") => message.split("\n")[0].trim();

const fromSearch = (data) =>
  (data?.items ?? []).map((item) => ({
    id: item.sha,
    repo: item.repository?.name ?? "",
    message: firstLine(item.commit?.message),
    date: item.commit?.author?.date ?? item.commit?.committer?.date,
    url: item.html_url,
  }));

// Push events may or may not list their commits; fall back to the head SHA.
const fromEvents = (events) =>
  (Array.isArray(events) ? events : [])
    .filter((e) => e.type === "PushEvent")
    .flatMap((e) => {
      const repo = e.repo?.name ?? "";
      const short = repo.split("/")[1] ?? repo;
      const commits = e.payload?.commits ?? [];
      if (commits.length) {
        return commits
          .slice()
          .reverse()
          .map((c) => ({
            id: c.sha,
            repo: short,
            message: firstLine(c.message),
            date: e.created_at,
            url: `https://github.com/${repo}/commit/${c.sha}`,
          }));
      }
      const sha = e.payload?.head;
      return [
        {
          id: e.id,
          repo: short,
          branch: e.payload?.ref?.replace("refs/heads/", ""),
          message: "",
          date: e.created_at,
          url: sha ? `https://github.com/${repo}/commit/${sha}` : `https://github.com/${repo}`,
        },
      ];
    });

const dayKey = (date) => {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const levelFor = (count) => (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4);

// Rough calendar from push events (last ~90 days) when the calendar API is down.
const calendarFromEvents = (events) => {
  const counts = {};
  for (const e of Array.isArray(events) ? events : []) {
    if (e.type !== "PushEvent") continue;
    const key = dayKey(e.created_at);
    counts[key] = (counts[key] ?? 0) + Math.max(1, e.payload?.size ?? e.payload?.commits?.length ?? 1);
  }
  return counts;
};

const parseActivity = ({ contrib, search, events }) => {
  let commits = search ? fromSearch(search) : [];
  if (!commits.length && events) commits = fromEvents(events);

  let counts = null;
  let levels = null;
  let total = null;
  if (Array.isArray(contrib?.contributions)) {
    counts = {};
    levels = {};
    for (const c of contrib.contributions) {
      counts[c.date] = c.count;
      levels[c.date] = c.level;
    }
    total = contrib.total?.lastYear ?? Object.values(counts).reduce((a, b) => a + b, 0);
  } else if (events) {
    counts = calendarFromEvents(events);
  }

  if (!commits.length && !counts) return null;
  return { commits: commits.slice(0, 5), counts: counts ?? {}, levels, total };
};

// Whatever is cached, however old: paints the widget instantly on return visits.
export const cachedGitHubActivity = () =>
  parseActivity({
    contrib: readCache("contrib")?.v,
    search: readCache("search")?.v,
    events: readCache("events")?.v,
  });

export const fetchGitHubActivity = async (signal) => {
  const [contrib, search, events] = await Promise.allSettled([
    cachedJson("contrib", CONTRIB_URL, signal),
    cachedJson("search", SEARCH_URL, signal),
    cachedJson("events", EVENTS_URL, signal),
  ]);
  const value = (r) => (r.status === "fulfilled" ? r.value : null);
  const activity = parseActivity({ contrib: value(contrib), search: value(search), events: value(events) });
  if (!activity) throw new Error("GitHub unavailable");
  return activity;
};

// The last `weeks` weeks as columns of 7 days, ending today.
export const buildWeeks = ({ counts, levels }, weeks, weekStart = 0, today = new Date()) => {
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  const back = (end.getDay() - weekStart + 7) % 7;
  const start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - back - (weeks - 1) * 7, 12);
  const days = [];
  for (let d = new Date(start); d <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 12)) {
    const key = dayKey(d);
    const count = counts[key] ?? 0;
    days.push({ key, date: d, count, level: levels?.[key] ?? levelFor(count) });
  }
  return days;
};
