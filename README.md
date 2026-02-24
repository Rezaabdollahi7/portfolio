<div align="center">

# 🖥️ macOS Portfolio

### A developer portfolio designed as a macOS desktop experience

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?logo=greensock)](https://greensap.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

[🌐 Live Demo](https://srezadev.ir)

</div>

---

## 📋 About

This portfolio is a fully interactive **macOS desktop simulation** built entirely with React. Instead of a traditional scroll-based portfolio, visitors experience a real desktop environment — complete with a dock, draggable windows, a menu bar, and multiple apps that each showcase a different aspect of my work and skills.

Every window is a real React component wrapped in a HOC that provides drag, focus, open/close animations powered by GSAP, and z-index management via Zustand.

---

## ✨ Features & Windows

### 🪟 Window System

- Draggable, focusable windows via GSAP Draggable
- Open/close animations (scale + fade)
- Z-index management (click to bring to front)
- macOS-style traffic light controls (close/minimize/maximize)

### 🧩 Applications

| App             | Description                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| 🌐 **Safari**   | Tabbed browser showing my projects with detail pages, screenshots lightbox, live demo & source links   |
| 💻 **VSCode**   | Simulated editor with file explorer, syntax-highlighted code about me & my skills, integrated terminal |
| 📁 **Finder**   | File explorer with sidebar navigation                                                                  |
| 📸 **Photos**   | Gallery viewer with image lightbox                                                                     |
| 🖥️ **Terminal** | Interactive terminal showing my tech stack                                                             |
| ⚙️ **Settings** | Theme switcher (dark/light) + 4 wallpaper options, persisted to localStorage                           |
| 📄 **Resume**   | PDF viewer of my CV                                                                                    |
| 📝 **Notes**    | Todo-style notes with completed/upcoming sections                                                      |
| 📅 **Calendar** | Interactive calendar with current date highlight                                                       |
| 📬 **Contact**  | Contact links (email, GitHub, LinkedIn)                                                                |

### 🎨 UI & UX

- macOS-style Dock with tooltip and hover effects
- Real-time clock & date in the menu bar
- Dark / Light theme toggle
- 4 switchable wallpapers
- Responsive — mobile shows full-screen windows
- Notch simulation on the menu bar

---

## 🛠️ Tech Stack

| Category             | Technology                            |
| -------------------- | ------------------------------------- |
| **Framework**        | React 18.3                            |
| **Build Tool**       | Vite 5.4                              |
| **Styling**          | TailwindCSS 4.0 (with CSS nesting)    |
| **Animations**       | GSAP 3.12 + Draggable plugin          |
| **State Management** | Zustand 5 + Immer middleware          |
| **Icons**            | Lucide React                          |
| **Font**             | Georama + Roboto Mono                 |
| **Path Aliases**     | jsconfig.json with `#` prefix aliases |

---

## 🏗️ Project Structure

```
portfolio/
├── public/
│   └── images/
│       ├── wallpapers/         # 4 light + 4 dark wallpapers (.webp)
│       ├── icons/              # Dock app icons
│       └── projects/           # Project screenshots & thumbnails
│
└── src/
    ├── components/
    │   ├── Safari/
    │   │   ├── ProjectsGrid.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── ProjectDetail.jsx
    │   │   ├── ProjectDetailTabs.jsx  # Screenshots lightbox, video, live demo
    │   │   └── SafariTabs.jsx
    │   ├── windowControlls.jsx        # macOS traffic light buttons
    │   └── index.js
    │
    ├── context/
    │   └── ThemeContext.jsx            # Dark/light + wallpaper state
    │
    ├── hoc/
    │   └── WindowWrapper.jsx           # Drag, animation, focus HOC
    │
    ├── store/
    │   └── window.js                   # Zustand window state (open/close/focus)
    │
    ├── constants/
    │   └── index.js                    # Projects data, gallery, dock config
    │
    ├── windows/
    │   ├── Safari.jsx
    │   ├── Vscode.jsx
    │   ├── Finder.jsx
    │   ├── Photos.jsx
    │   ├── Terminal.jsx
    │   ├── Setting.jsx
    │   ├── Resume.jsx
    │   ├── Note.jsx
    │   ├── Contact.jsx
    │   └── index.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css                       # All styles with Tailwind CSS nesting
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rezaabdollahi7/portfolio.git
cd portfolio

# 2. Install dependencies
pnpm install

# 3. Start dev server
pnpm dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
pnpm build
pnpm preview
```

---

## 🎛️ Window System Architecture

Each window follows this pattern:

```jsx
// 1. Create the component
const MyWindow = () => (
  <section id="mywindow">
    <div id="window-header">
      <WindowControlls target="mywindow" />
    </div>
    {/* content */}
  </section>
);

// 2. Wrap with HOC — this adds drag, animation & focus
const MyWindowWrapped = WindowWrapper(MyWindow, "mywindow");
export default MyWindowWrapped;
```

```js
// 3. Register in Zustand store (constants/index.js → WINDOW_CONFIG)
mywindow: {
  isOpen: false,
  zIndex: 10,
  data: null,
}
```

```jsx
// 4. Open from anywhere
const { openWindow } = useWindowStore();
openWindow("mywindow");
```

---

## 🎨 Theming & Wallpapers

Theme and wallpaper selection are managed through `ThemeContext` and persisted in `localStorage`.

Wallpapers are applied via CSS custom properties on `:root`:

```css
:root {
  --wallpaper-light: url("/images/wallpapers/wallpaper.webp");
  --wallpaper-dark: url("/images/wallpapers/dark-default.webp");
}

body {
  background-image: var(--wallpaper-light);
}
html.dark body {
  background-image: var(--wallpaper-dark);
}
```

Available wallpapers: `default`, `nature`, `tech`, `abstract`

---

## 📱 Responsive Design

| Breakpoint            | Behavior                                                            |
| --------------------- | ------------------------------------------------------------------- |
| Desktop (`> 1024px`)  | Full macOS desktop experience                                       |
| Tablet (`768–1024px`) | Windows open full-screen                                            |
| Mobile (`< 768px`)    | Windows full-screen, dock smaller, VSCode sidebar hidden by default |

---

## 🖼️ Screenshots

### Home

![Dashboard](/public/images/projects/Portfolio/shot1.webp)

### Notifications

![Task List](/public/images/projects/Portfolio/shot2.webp)

### Dark Mode

![Calendar](/public/images/projects/Portfolio/shot3.webp)

### Windows

![Calendar](/public/images/projects/Portfolio/shot4.webp)

### Projects

![Calendar](/public/images/projects/Portfolio/shot5.webp)

### Wallpapers (settings)

![Calendar](/public/images/projects/Portfolio/shot6.webp)

### Trash window

![Mobile](/public/images/projects/Portfolio/shot7.webp)

---

## 👨‍💻 Author

**Reza Abdollahi**

- 🌐 Website: [srezadev.ir](https://srezadev.ir)
- 📧 Email: srezaabdollahi7@gmail.com
- 🐙 GitHub: [@Rezaabdollahi7](https://github.com/Rezaabdollahi7)

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Version:** 1.0.0 &nbsp;|&nbsp; **Status:** ✅ Live

Made with ☕ and React

</div>
