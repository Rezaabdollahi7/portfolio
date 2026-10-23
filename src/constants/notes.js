// Notes app content. Inspired by alanagoyal.com: the "about" lives in Notes.
// Inline syntax: [label](https://…) opens a link, [label](app:safari/dofixo)
// opens a window (app:<window>/<optional data id>).

import { profile, profileFa, skills, skillCategoriesFa, funFacts, funFactsFa } from "./profile";

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
        text: profile.summary[0],
      },
      {
        type: "p",
        text: profile.summary[1],
      },
      { type: "h2", text: "currently building and exploring" },
      { type: "ul", items: profile.focus },
      {
        type: "p",
        text: `Tech stack: ${profile.stack.join(" · ")}`,
      },
      { type: "h2", text: "right now" },
      {
        type: "ul",
        items: [
          "Founded and run [NextApps](app:safari/nextapps), a small digital product studio.",
          "Running [Dofixo](app:safari/dofixo), a multi-tenant SaaS for repair workshops.",
          "Building [Finora](app:safari/finora), an open-source, self-hosted finance manager.",
          "Shipped a [secure multi-tenant assessment dashboard](app:safari/assessment) with NestJS and Next.js.",
        ],
      },
      { type: "p", text: profile.motto },
      { type: "h2", text: "elsewhere" },
      {
        type: "ul",
        items: [
          "[GitHub](https://github.com/Rezaabdollahi7)",
          "[Telegram](https://t.me/rezaabdollahi7)",
          `[${profile.email}](mailto:${profile.email})`,
        ],
      },
      {
        type: "p",
        text: `${profile.availability}. [Send me a message](app:mail) or [read my resume](app:resume).`,
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
          { text: "Persian (RTL) version of this site", done: true },
          { text: "Contact form, live GitHub activity", done: true },
          { text: "Mission Control, window tiling and shortcuts", done: true },
          { text: "Personal dev blog", done: false },
          { text: "More color themes", done: false },
        ],
      },
    ],
  },
];

// ── Persian ────────────────────────────────────────────────────────────────

export const notesFa = [
  {
    id: "about",
    title: "درباره من",
    emoji: "👋",
    pinned: true,
    date: "مهر ۱۴۰۵",
    blocks: [
      { type: "h1", text: `سلام، من ${profileFa.firstName} هستم` },
      {
        type: "p",
        text: profileFa.summary[0],
      },
      {
        type: "p",
        text: profileFa.summary[1],
      },
      { type: "h2", text: "در حال ساخت و یادگیری" },
      { type: "ul", items: profileFa.focus },
      {
        type: "p",
        text: `تکنولوژی‌ها: ${profile.stack.join(" · ")}`,
      },
      { type: "h2", text: "این روزها" },
      {
        type: "ul",
        items: [
          "بنیان‌گذار [NextApps](app:safari/nextapps) هستم؛ یک استودیوی کوچک توسعه محصولات دیجیتال.",
          "[دوفیکسو](app:safari/dofixo) را اداره می‌کنم؛ یک SaaS چندمستاجره برای تعمیرگاه‌ها.",
          "[Finora](app:safari/finora) را می‌سازم؛ برنامه متن‌باز مدیریت مالی که روی سرور خودتان اجرا می‌شود.",
          "یک [داشبورد ارزیابی امنیتی چندمستاجره](app:safari/assessment) با NestJS و Next.js ساختم.",
        ],
      },
      { type: "p", text: profileFa.motto },
      { type: "h2", text: "جاهای دیگر" },
      {
        type: "ul",
        items: [
          "[گیت‌هاب](https://github.com/Rezaabdollahi7)",
          "[تلگرام](https://t.me/rezaabdollahi7)",
          `[${profile.email}](mailto:${profile.email})`,
        ],
      },
      {
        type: "p",
        text: `${profileFa.availability}. [برایم پیام بفرستید](app:mail) یا [رزومه‌ام را بخوانید](app:resume).`,
      },
    ],
  },
  {
    id: "building",
    title: "چه می‌سازم",
    emoji: "🛠️",
    pinned: true,
    date: "مهر ۱۴۰۵",
    blocks: [
      { type: "h1", text: "چه می‌سازم" },
      {
        type: "p",
        text: "بیشتر کارهای اخیرم نرم‌افزارهای فارسی‌محور است: از اول راست‌به‌چپ، با تاریخ شمسی و اعداد فارسی. نه ترجمه برنامه‌های خارجی.",
      },
      { type: "h2", text: "دوفیکسو" },
      {
        type: "p",
        text: "تعمیرگاه‌ها کل کارشان را با آن انجام می‌دهند: پذیرش دستگاه، وضعیت تعمیر، مشتریان، انبار، فاکتورها و گزارش سود. هر تعمیرگاه دو بار ایزوله می‌شود: یک بار در خود برنامه و یک بار با Row-Level Security در PostgreSQL. [مطالعه موردی](app:safari/dofixo) · [dofixo.ir](https://dofixo.ir)",
      },
      { type: "h2", text: "Finora" },
      {
        type: "p",
        text: "برنامه مدیریت مالی خانواده که با یک docker compose up روی سرور خودتان بالا می‌آید. موجودی‌ها از روی تراکنش‌ها محاسبه می‌شوند، نه دستی. [مطالعه موردی](app:safari/finora) · [سورس کد](https://github.com/Rezaabdollahi7/Finora)",
      },
      { type: "h2", text: "بقیه کارها" },
      {
        type: "p",
        text: "سایت مشتری‌ها، داشبوردها و گاهی هم یک آزمایش. [همه پروژه‌ها را ببینید](app:safari).",
      },
    ],
  },
  {
    id: "stack",
    title: "ابزارها و تکنولوژی‌ها",
    emoji: "🧰",
    date: "مهر ۱۴۰۵",
    blocks: [
      { type: "h1", text: "ابزارها و تکنولوژی‌ها" },
      ...skills.map((group) => ({
        type: "row",
        label: skillCategoriesFa[group.category] ?? group.category,
        text: group.items.join("، "),
      })),
      {
        type: "p",
        text: "نسخه تعاملی‌اش را می‌خواهید؟ [ترمینال](app:terminal) را باز کنید و help را بزنید.",
      },
    ],
  },
  {
    id: "facts",
    title: "چند واقعیت جالب",
    emoji: "⌨️",
    date: "شهریور ۱۴۰۵",
    blocks: [
      { type: "h1", text: "چند واقعیت جالب" },
      { type: "ul", items: funFactsFa },
    ],
  },
  {
    id: "roadmap",
    title: "نقشه راه پورتفولیو",
    emoji: "🗺️",
    date: "مهر ۱۴۰۵",
    blocks: [
      { type: "h1", text: "نقشه راه پورتفولیو" },
      {
        type: "todo",
        items: [
          { text: "دسکتاپ macOS با پنجره‌های قابل جابه‌جایی", done: true },
          { text: "پروژه‌ها در سافاری و تصاویر در عکس‌ها", done: true },
          { text: "جستجوی Spotlight و ترمینال تعاملی", done: true },
          { text: "صفحه اصلی شبیه iOS روی گوشی", done: true },
          { text: "پروژه‌ها از روی گیت‌هاب", done: true },
          { text: "نسخه فارسی (راست‌به‌چپ) این سایت", done: true },
          { text: "فرم تماس و فعالیت زنده گیت‌هاب", done: true },
          { text: "Mission Control، چیدمان پنجره‌ها و میان‌برها", done: true },
          { text: "وبلاگ شخصی", done: false },
          { text: "پوسته‌های رنگی بیشتر", done: false },
        ],
      },
    ],
  },
];

