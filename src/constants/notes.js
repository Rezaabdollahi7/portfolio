// Notes app content. Inspired by alanagoyal.com: the "about" lives in Notes.
// Inline syntax: [label](https://…) opens a link, [label](app:safari/dofixo)
// opens a window (app:<window>/<optional data id>).

import { profile, skills, funFacts } from "./profile";

export const notes = [
  {
    id: "about",
    title: "about me",
    emoji: "👋",
    pinned: true,
    date: "Oct 2026",
    blocks: [
      { type: "h1", text: `hey, I'm ${profile.firstName}` },
      {
        type: "p",
        text: "I'm a frontend developer in Tehran. I build fast, responsive web apps with React, Next.js and TypeScript, and I go full-stack (Node.js, PostgreSQL, Docker) when a product needs it.",
      },
      {
        type: "p",
        text: "I care about the details people feel but rarely notice: how a window settles when you drop it, whether a number lines up, how an RTL layout handles a Jalali date.",
      },
      { type: "h2", text: "right now" },
      {
        type: "ul",
        items: [
          "Running [Dofixo](app:safari/dofixo), a multi-tenant SaaS for repair workshops.",
          "Building [Finora](app:safari/finora), an open-source, self-hosted finance manager.",
          "Working with [NextApps](app:safari/nextapps), a small product studio.",
        ],
      },
      { type: "h2", text: "elsewhere" },
      {
        type: "ul",
        items: [
          "[GitHub](https://github.com/Rezaabdollahi7)",
          "[LinkedIn](https://www.linkedin.com/in/seyedreza-abdollahi)",
          "[Telegram](https://t.me/rezaabdollahi7)",
          `[${profile.email}](mailto:${profile.email})`,
        ],
      },
      {
        type: "p",
        text: `${profile.availability}. [Get in touch](app:contact) or [read my resume](app:resume).`,
      },
    ],
  },
  {
    id: "building",
    title: "what I'm building",
    emoji: "🛠️",
    pinned: true,
    date: "Oct 2026",
    blocks: [
      { type: "h1", text: "what I'm building" },
      {
        type: "p",
        text: "Most of my recent work is Persian-first software: right-to-left from the start, Jalali dates, Persian numerals. Not translations of Western apps.",
      },
      { type: "h2", text: "Dofixo" },
      {
        type: "p",
        text: "Repair workshops run their whole shop in it: device intake, repair status, customers, inventory, invoices and profit reports. Each workshop is isolated twice, by the app and by PostgreSQL row-level security. [Case study](app:safari/dofixo) · [dofixo.ir](https://dofixo.ir)",
      },
      { type: "h2", text: "Finora" },
      {
        type: "p",
        text: "A household finance manager you host yourself with one docker compose up. Balances come from transactions, never typed in. [Case study](app:safari/finora) · [Source](https://github.com/Rezaabdollahi7/Finora)",
      },
      { type: "h2", text: "everything else" },
      {
        type: "p",
        text: "Client sites, dashboards and the occasional experiment. [See all projects](app:safari).",
      },
    ],
  },
  {
    id: "stack",
    title: "stack & tools",
    emoji: "🧰",
    date: "Oct 2026",
    blocks: [
      { type: "h1", text: "stack & tools" },
      ...skills.map((group) => ({
        type: "row",
        label: group.category,
        text: group.items.join(", "),
      })),
      {
        type: "p",
        text: "Want the interactive version? Open the [Terminal](app:terminal) and type help.",
      },
    ],
  },
  {
    id: "facts",
    title: "fun facts",
    emoji: "⌨️",
    date: "Sep 2026",
    blocks: [
      { type: "h1", text: "fun facts" },
      { type: "ul", items: funFacts },
    ],
  },
  {
    id: "roadmap",
    title: "portfolio roadmap",
    emoji: "🗺️",
    date: "Oct 2026",
    blocks: [
      { type: "h1", text: "portfolio roadmap" },
      {
        type: "todo",
        items: [
          { text: "macOS desktop with draggable windows", done: true },
          { text: "Projects in Safari, screenshots in Photos", done: true },
          { text: "Spotlight search and an interactive terminal", done: true },
          { text: "iOS home screen on phones", done: true },
          { text: "Projects curated from GitHub", done: true },
          { text: "Personal dev blog", done: false },
          { text: "Persian (RTL) version of this site", done: false },
          { text: "More color themes", done: false },
        ],
      },
    ],
  },
];
