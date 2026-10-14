// App registry: what lives in the dock, on the iOS home screen and in Spotlight.
// `window` = which window key the app opens; `href` = external link instead.

export const apps = [
  {
    id: "finder",
    name: "Finder",
    icon: "/images/finder.png",
    window: "finder",
    keywords: "files folders projects browse",
  },
  {
    id: "safari",
    name: "Projects",
    icon: "/images/safari.png",
    window: "safari",
    keywords: "work portfolio case studies safari",
  },
  {
    id: "notes",
    name: "Notes",
    icon: "/images/Notes.png",
    window: "notes",
    keywords: "about me bio now notes",
  },
  {
    id: "photos",
    name: "Photos",
    icon: "/images/photos.png",
    window: "photos",
    keywords: "screenshots gallery images",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "/images/terminal.png",
    window: "terminal",
    keywords: "shell skills command line",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "/images/microsoft_visual_studio_code.png",
    window: "vscode",
    keywords: "code editor source",
  },
  {
    id: "contact",
    name: "Contacts",
    icon: "/images/contact.webp",
    window: "contact",
    keywords: "contact email phone hire",
  },
  {
    id: "resume",
    name: "Resume",
    icon: "/images/pdf.png",
    window: "resume",
    keywords: "cv resume download",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "/images/settings.png",
    window: "settings",
    keywords: "preferences wallpaper appearance dark mode",
  },
  {
    id: "mail",
    name: "Mail",
    icon: "/images/mail.webp",
    href: "mailto:srezaabdollahi7@gmail.com",
    keywords: "email write",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/images/github.webp",
    href: "https://github.com/Rezaabdollahi7",
    keywords: "source repositories code",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "/images/telegram.png",
    href: "https://t.me/rezaabdollahi7",
    keywords: "message chat",
  },
  {
    id: "trash",
    name: "Trash",
    icon: "/images/trash.png",
    window: "finder",
    data: { location: "trash" },
    keywords: "old deleted",
  },
];

export const getApp = (id) => apps.find((a) => a.id === id);

// macOS dock order. "|" renders a separator.
export const dockLayout = [
  "finder",
  "safari",
  "notes",
  "photos",
  "terminal",
  "vscode",
  "contact",
  "resume",
  "settings",
  "|",
  "mail",
  "github",
  "telegram",
  "|",
  "trash",
];

// iOS home screen.
export const mobileHomeApps = [
  "safari",
  "notes",
  "photos",
  "finder",
  "terminal",
  "vscode",
  "resume",
  "settings",
  "github",
  "telegram",
  "trash",
];
export const mobileDockApps = ["safari", "notes", "contact", "mail"];

export const menuLinks = [
  { label: "About", window: "notes" },
  { label: "Projects", window: "safari" },
  { label: "Resume", window: "resume" },
  { label: "Contact", window: "contact" },
];

// Window titles shown in the menu bar when the window is focused.
export const windowTitles = {
  finder: "Finder",
  safari: "Safari",
  notes: "Notes",
  photos: "Photos",
  terminal: "Terminal",
  vscode: "Code",
  contact: "Contacts",
  resume: "Preview",
  settings: "System Settings",
  txtfile: "TextEdit",
  imgfile: "Preview",
};

// Which dock app a window belongs to (for running indicators).
export const windowToApp = {
  finder: "finder",
  safari: "safari",
  notes: "notes",
  photos: "photos",
  terminal: "terminal",
  vscode: "vscode",
  contact: "contact",
  resume: "resume",
  settings: "settings",
};

export const WINDOW_KEYS = Object.keys(windowTitles);

export const wallpapers = [
  {
    id: "default",
    name: "Ventura",
    light: "/images/wallpapers/wallpaper.webp",
    dark: "/images/wallpapers/dark-default.webp",
  },
  {
    id: "nature",
    name: "Nature",
    light: "/images/wallpapers/light1.webp",
    dark: "/images/wallpapers/dark1.webp",
  },
  {
    id: "tech",
    name: "Tech",
    light: "/images/wallpapers/light2.webp",
    dark: "/images/wallpapers/dark2.webp",
  },
  {
    id: "abstract",
    name: "Abstract",
    light: "/images/wallpapers/light3.webp",
    dark: "/images/wallpapers/dark3.webp",
  },
];
