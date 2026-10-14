<div align="center">

# macOS Portfolio

### Reza Abdollahi's portfolio, built as a desktop you can explore

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?logo=greensock)](https://gsap.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange)](https://zustand-demo.pmnd.rs/)

[Live site](https://srezadev.ir) · [Resume (PDF)](https://srezadev.ir/files/reza-abdollahi-resume.pdf)

<img src="public/images/projects/Portfolio/desktop.webp" alt="Desktop with widgets, folders and dock" width="100%" />

</div>

## About

Instead of a scrolling page, this portfolio is an operating system. On a laptop
you get a macOS desktop with a menu bar, a dock and draggable windows. On a phone
the same apps open from an iOS-style home screen as full-screen sheets.

Every app shows a different side of my work, and every piece of content comes
from one set of data files, so projects, notes, the terminal, Spotlight and the
resume never drift apart.

## Apps

| App | What it does |
| --- | --- |
| **Projects** (Safari) | Case studies for each project with tabs, back/forward history, filters, screenshots and a lightbox. Pages are deep-linkable: `srezadev.ir/#/projects/dofixo` |
| **Notes** | The "about me", what I'm building, my stack and the site roadmap, in an Apple Notes layout with search |
| **Terminal** | A working shell: `help`, `about`, `projects`, `open dofixo`, `theme dark`, `cat about.txt`, history and Tab completion |
| **Finder** | Every project as a folder with its write-up, links and screenshots. Old experiments live in the Trash |
| **Photos** | Albums of screenshots, one per project |
| **VS Code** | The site's own data as code, with a small syntax highlighter, file search and source control panel |
| **Contacts** | Email (with copy), phone, Telegram, GitHub, LinkedIn and Tehran local time |
| **Resume** | An HTML resume with print styles and a PDF download |
| **System Settings** | Light, dark or auto appearance and four wallpapers, saved per visitor |

Plus **Spotlight** (<kbd>⌘K</kbd> / <kbd>Ctrl K</kbd>) across apps, projects,
notes and actions, a **Control Center** with dark mode, brightness, volume and a
music player, and live **Tehran weather** in a desktop widget.

<p align="center">
  <img src="public/images/projects/Portfolio/projects.webp" alt="Projects app" width="64%" />
  &nbsp;
  <img src="public/images/projects/Portfolio/mobile.webp" alt="iOS-style home screen on a phone" width="22%" />
</p>

## Featured projects

| Project | What it is |
| --- | --- |
| [Dofixo](https://dofixo.ir) | Multi-tenant SaaS for repair workshops: React 19, Node.js, PostgreSQL with row-level security, Prisma |
| [Finora](https://github.com/Rezaabdollahi7/Finora) | Self-hosted, Persian-first household finance manager: Next.js, Prisma, PostgreSQL, Three.js |
| [NextApps](https://nextapps.ir) | Website for a digital product studio: Next.js, TypeScript |
| [SieManage](https://siemanage.com) | Real-time task management for teams: React, Express, PostgreSQL, Socket.io |
| [Siemenspart](https://github.com/Rezaabdollahi7/siemenspart-landing) | Catalogue site for industrial CNC parts: Astro, React, Fuse.js |
| [DashStack](https://github.com/Rezaabdollahi7/DashStack) | Open-source admin dashboard template: React, Material UI, Tailwind CSS 4 |
| [Maliko](https://github.com/Rezaabdollahi7/maliko-landing) | Landing page for an SMS-powered finance app: Next.js, GSAP, Lottie |

## How it works

- **Window manager.** `src/store/window.js` keeps each window's open, minimised
  and zoomed state plus a stacking order. `src/hoc/WindowWrapper.jsx` turns any
  component into a window: drag by the title bar (GSAP Draggable, kept on screen),
  double-click to zoom (GSAP Flip), minimise to the dock, animated open and close,
  and a full-screen sheet on phones.
- **Code splitting.** Each app is a lazy chunk that loads the first time it opens
  or when you hover its dock icon. The shell (React, GSAP and the desktop) is about
  140 KB of gzipped JS, down from 270 KB before the redesign.
- **One content source.** `src/constants/` holds the profile, projects, notes,
  Finder tree and editor files. Everything else reads from there.
- **Responsive by container.** Windows use container queries, so layouts adapt to
  the window's size, whether it's zoomed, dragged small or on a phone.
- **Accessible.** Real buttons and links, visible focus rings, labelled controls,
  `prefers-reduced-motion` support, a skip link, and a `<noscript>` fallback.
- **Fast in Iran.** Fonts (Geist, Geist Mono, Georama) are self-hosted, so there
  are no Google Fonts requests. Music only downloads when you press play.

## Project structure

```
src/
├── App.jsx                 # Desktop or phone shell + windows
├── constants/              # profile, projects, notes, apps, finder, vscode
├── store/                  # window manager, settings (persisted), UI, music
├── hoc/WindowWrapper.jsx   # drag, focus, minimise, zoom, animations
├── hooks/                  # media queries, theme, weather, deep links, shortcuts
├── lib/                    # actions (open app/project), storage, motion
├── components/
│   ├── menubar/            # menu bar, Apple menu, Control Center
│   ├── desktop/            # welcome, widgets, desktop icons
│   ├── mobile/             # iOS home screen
│   ├── safari/             # projects index, cards, case study page
│   ├── window/             # header, traffic lights, context
│   ├── Dock.jsx · Spotlight.jsx · Lightbox.jsx · ResumeDocument.jsx
└── windows/                # one file per app, lazy-loaded from index.js
```

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build && pnpm preview
pnpm lint
```

### Editing content

- Projects: `src/constants/projects.js` (screenshots go in `public/images/projects/<Name>/`)
- About, notes and roadmap: `src/constants/notes.js` and `src/constants/profile.js`
- Resume: built from the same data in `src/components/ResumeDocument.jsx`. After
  editing, regenerate `public/files/reza-abdollahi-resume.pdf` by printing the
  Resume window to PDF (A4).
