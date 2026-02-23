const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.webp",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "setting",
    name: "setting", // was "setting"
    icon: "settings.png",
    canOpen: true,
  },
  {
    id: "vscode",
    name: "vscode", // was "vscode"
    icon: "microsoft_visual_studio_code.png",
    canOpen: true,
  },
  {
    id: "github",
    name: "github", // was "github"
    icon: "github.webp",
    canOpen: true,
    type: "external",
    url: "https://github.com/Rezaabdollahi7",
  },
  {
    id: "telegram",
    name: "telegram", // was "telegram"
    icon: "telegram.png",
    canOpen: true,
    type: "external",
    url: "https://t.me/rezaabdollahi7",
  },
  {
    id: "note",
    name: "note", // was "notes"
    icon: "Notes.png",
    canOpen: true,
  },
  {
    id: "mail",
    name: "mail", // was "mail"
    icon: "mail.webp",
    canOpen: true,
    type: "external",
    url: "mailto:srezaabdollahi7@gmail.com",
  },
  {
    id: "trash",
    name: "Trash", // was "Trash"
    icon: "trash.png",
    canOpen: true,
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Rezaabdollahi7",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://jsmastery.com/",
  },
  {
    id: 3,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

const wallpapers = [
  {
    id: "default",
    name: "Default",
    lightPreview: "/images/wallpapers/wallpaper.webp",
    darkPreview: "/images/wallpapers/dark-default.webp",
  },
  {
    id: "nature",
    name: "Nature",
    lightPreview: "/images/wallpapers/light1.webp",
    darkPreview: "/images/wallpapers/dark1.webp",
  },
  {
    id: "tech",
    name: "Tech",
    lightPreview: "/images/wallpapers/light2.webp",
    darkPreview: "/images/wallpapers/dark2.webp",
  },
  {
    id: "abstract",
    name: "Abstract",
    lightPreview: "/images/wallpapers/light3.webp",
    darkPreview: "/images/wallpapers/dark3.webp",
  },
];
export {
  navLinks,
  navIcons,
  dockApps,
  techStack,
  socials,
  photosLinks,
  gallery,
  wallpapers,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Nike Ecommerce Website Application",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[45vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Nike Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
            "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
            "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
            "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
          ],
        },
        {
          id: 2,
          name: "nike.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "demo",
          href: "https://nike-ecommerce-demo.vercel.app",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "nike.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "AI Resume Analyzer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[58vh] left-7",
      children: [
        {
          id: 1,
          name: "AI Resume Analyzer Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
            "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
            "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
            "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
          ],
        },
        {
          id: 2,
          name: "ai-resume-analyzer.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "ai-resume-analyzer.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Food Delivery App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[70vh] left-7",
      children: [
        {
          id: 1,
          name: "Food Delivery App Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
            "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
            "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
            "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
          ],
        },
        {
          id: 2,
          name: "food-delivery-app.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "food-delivery-app.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://google.com",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/adrian.jpg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/adrian-2.jpg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/adrian-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/adrian.jpg",
      description: [
        "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  note: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  github: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mail: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  vscode: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  setting: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  telegram: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };

export const wheather = {
  city: "Dubai",
  degre: "12°",
  img: "/images/weather.webp",
  text: "Party Cloudy",
  minMax: "H:13° L:10°",
};

export const noteTasks = [
  { id: 1, text: "macOS-style portfolio website", completed: true },
  { id: 2, text: "Finder window for project navigation", completed: true },
  { id: 3, text: "Project demo preview inside Safari window", completed: true },
  { id: 4, text: "Interactive resume viewer", completed: true },

  { id: 5, text: "Add personal developer blog", completed: false },
  { id: 6, text: "Mobile responsiveness optimization", completed: false },
  { id: 7, text: "Implement new color themes", completed: false },
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with real-time inventory management and payment processing.",
    thumbnail: "/images/projects/ecommerce-thumbnail.jpg",
    screenshots: [
      "/images/projects/ecommerce-1.jpg",
      "/images/projects/ecommerce-2.jpg",
      "/images/projects/ecommerce-3.jpg",
      "/images/projects/ecommerce-4.jpg",
    ],
    videoUrl: "/videos/ecommerce-demo.mp4",
    techStack: [
      { name: "React", icon: "/images/techstack/react.png" },
      { name: "TypeScript", icon: "/images/techstack/typescript.png" },
      { name: "Node.js", icon: "/images/techstack/nodejs.png" },
      { name: "MongoDB", icon: "/images/techstack/mongodb.png" },
      { name: "Tailwind CSS", icon: "/images/techstack/tailwind.png" },
    ],
    demoUrl: "https://ecommerce-demo.netlify.app",
    sourceUrl: "https://github.com/yourusername/ecommerce-platform",
    challenges: [
      "Real-time inventory synchronization",
      "Payment gateway integration",
      "Mobile-first responsive design",
    ],
    results: [
      "+40% conversion rate increase",
      "Reduced page load time by 2.5s",
      "95% customer satisfaction score",
    ],
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with drag-and-drop interface and team collaboration features.",
    thumbnail: "/images/projects/taskapp-thumbnail.jpg",
    screenshots: [
      "/images/projects/taskapp-1.jpg",
      "/images/projects/taskapp-2.jpg",
      "/images/projects/taskapp-3.jpg",
    ],
    videoUrl: "/videos/taskapp-demo.mp4",
    techStack: [
      { name: "React", icon: "/images/techstack/react.png" },
      { name: "TypeScript", icon: "/images/techstack/typescript.png" },
      { name: "Node.js", icon: "/images/techstack/nodejs.png" },
      { name: "MongoDB", icon: "/images/techstack/mongodb.png" },
      { name: "Tailwind CSS", icon: "/images/techstack/tailwind.png" },
    ],
    demoUrl: "https://taskapp-demo.vercel.app",
    sourceUrl: "https://github.com/yourusername/task-management",
    challenges: [
      "Real-time data synchronization",
      "Drag-and-drop performance optimization",
      "Role-based access control",
    ],
    results: [
      "+60% team productivity",
      "Zero downtime deployment",
      "500+ active daily users",
    ],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A weather forecasting application with real-time data, location tracking, and beautiful visualizations.",
    thumbnail: "/images/projects/weather-thumbnail.jpg",
    screenshots: [
      "/images/projects/weather-1.jpg",
      "/images/projects/weather-2.jpg",
      "/images/projects/weather-3.jpg",
      "/images/projects/weather-4.jpg",
    ],
    videoUrl: "/videos/weather-demo.mp4",
    techStack: [
      { name: "React", icon: "/images/techstack/react.png" },
      { name: "TypeScript", icon: "/images/techstack/typescript.png" },
      { name: "Node.js", icon: "/images/techstack/nodejs.png" },
      { name: "MongoDB", icon: "/images/techstack/mongodb.png" },
      { name: "Tailwind CSS", icon: "/images/techstack/tailwind.png" },
    ],
    demoUrl: "https://weather-dashboard.netlify.app",
    sourceUrl: "https://github.com/yourusername/weather-app",
    challenges: [
      "API rate limiting handling",
      "Geolocation accuracy",
      "Responsive chart rendering",
    ],
    results: [
      "99.9% API uptime",
      "Sub-second load times",
      "Featured on Product Hunt",
    ],
  },
];

// ─── Vscode Data ────────────────────────────────────────────────────────────────────

const FILE_TREE = [
  {
    name: "portfolio",
    type: "folder",
    open: true,
    children: [
      {
        name: "src",
        type: "folder",
        open: true,
        children: [
          { name: "about.tsx", type: "file", lang: "tsx" },
          { name: "skills.ts", type: "file", lang: "ts" },
          { name: "projects.ts", type: "file", lang: "ts" },
          { name: "contact.tsx", type: "file", lang: "tsx" },
        ],
      },
      { name: "README.md", type: "file", lang: "md" },
      { name: "package.json", type: "file", lang: "json" },
    ],
  },
];

const FILE_CONTENTS = {
  "about.tsx": {
    lang: "tsx",
    lines: [
      {
        tokens: [
          { t: "keyword", v: "const" },
          { t: "space", v: " " },
          { t: "fn", v: "Developer" },
          { t: "plain", v: " = () => ({" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "name" },
          { t: "plain", v: ": " },
          { t: "string", v: '"Reza Abdollahi"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "role" },
          { t: "plain", v: ": " },
          { t: "string", v: '"Frontend Developer"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "location" },
          { t: "plain", v: ": " },
          { t: "string", v: '"Tehran, Iran 🇮🇷"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "passion" },
          { t: "plain", v: ": " },
          { t: "string", v: '"Building beautiful experiences"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "available" },
          { t: "plain", v: ": " },
          { t: "keyword", v: "true" },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "coffee" },
          { t: "plain", v: ": " },
          { t: "string", v: '"required ☕"' },
          { t: "plain", v: "," },
        ],
      },
      { tokens: [{ t: "plain", v: "});" }] },
      { tokens: [] },
      { tokens: [{ t: "comment", v: "// I turn coffee into code." }] },
      { tokens: [{ t: "comment", v: "// And ideas into interfaces." }] },
      { tokens: [] },
      {
        tokens: [
          { t: "keyword", v: "export default" },
          { t: "plain", v: " Developer;" },
        ],
      },
    ],
  },
  "skills.ts": {
    lang: "ts",
    lines: [
      {
        tokens: [
          { t: "keyword", v: "type" },
          { t: "plain", v: " " },
          { t: "fn", v: "SkillLevel" },
          { t: "plain", v: " = " },
          { t: "string", v: '"expert"' },
          { t: "plain", v: " | " },
          { t: "string", v: '"advanced"' },
          { t: "plain", v: " | " },
          { t: "string", v: '"intermediate"' },
          { t: "plain", v: ";" },
        ],
      },
      { tokens: [] },
      {
        tokens: [
          { t: "keyword", v: "const" },
          { t: "plain", v: " " },
          { t: "prop", v: "skills" },
          { t: "plain", v: ": Record<string, SkillLevel> = {" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "comment", v: "// Frontend" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"React"' },
          { t: "plain", v: ":        " },
          { t: "string", v: '"expert"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"TypeScript"' },
          { t: "plain", v: ":   " },
          { t: "string", v: '"advanced"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"TailwindCSS"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"expert"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"GSAP"' },
          { t: "plain", v: ":        " },
          { t: "string", v: '"advanced"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "comment", v: "// Backend" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"Node.js"' },
          { t: "plain", v: ":     " },
          { t: "string", v: '"advanced"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"PostgreSQL"' },
          { t: "plain", v: ":  " },
          { t: "string", v: '"intermediate"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "comment", v: "// Tools" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"Git"' },
          { t: "plain", v: ":         " },
          { t: "string", v: '"expert"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "string", v: '"Vite"' },
          { t: "plain", v: ":        " },
          { t: "string", v: '"expert"' },
          { t: "plain", v: "," },
        ],
      },
      { tokens: [{ t: "plain", v: "};" }] },
    ],
  },
  "projects.ts": {
    lang: "ts",
    lines: [
      {
        tokens: [
          { t: "keyword", v: "interface" },
          { t: "plain", v: " " },
          { t: "fn", v: "Project" },
          { t: "plain", v: " {" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "name" },
          { t: "plain", v: ": string;" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "stack" },
          { t: "plain", v: ": string[];" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "status" },
          { t: "plain", v: ": " },
          { t: "string", v: '"live"' },
          { t: "plain", v: " | " },
          { t: "string", v: '"wip"' },
          { t: "plain", v: ";" },
        ],
      },
      { tokens: [{ t: "plain", v: "}" }] },
      { tokens: [] },
      {
        tokens: [
          { t: "keyword", v: "const" },
          { t: "plain", v: " " },
          { t: "prop", v: "projects" },
          { t: "plain", v: ": Project[] = [" },
        ],
      },
      { tokens: [{ t: "plain", v: "  {" }] },
      {
        tokens: [
          { t: "plain", v: "    " },
          { t: "prop", v: "name" },
          { t: "plain", v: ": " },
          { t: "string", v: '"MacOS Portfolio"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "    " },
          { t: "prop", v: "stack" },
          { t: "plain", v: ": [" },
          { t: "string", v: '"React"' },
          { t: "plain", v: ", " },
          { t: "string", v: '"GSAP"' },
          { t: "plain", v: ", " },
          { t: "string", v: '"Zustand"' },
          { t: "plain", v: "]," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "    " },
          { t: "prop", v: "status" },
          { t: "plain", v: ": " },
          { t: "string", v: '"live"' },
          { t: "plain", v: "," },
        ],
      },
      { tokens: [{ t: "plain", v: "  }," }] },
      { tokens: [{ t: "plain", v: "];" }] },
    ],
  },
  "contact.tsx": {
    lang: "tsx",
    lines: [
      {
        tokens: [
          { t: "keyword", v: "const" },
          { t: "plain", v: " " },
          { t: "fn", v: "Contact" },
          { t: "plain", v: " = () => ({" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "email" },
          { t: "plain", v: ": " },
          { t: "string", v: '"srezadev.ir"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "github" },
          { t: "plain", v: ": " },
          { t: "string", v: '"github.com/Rezaabdollahi7"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: "openTo" },
          { t: "plain", v: ": " },
          { t: "string", v: '"freelance & full-time"' },
          { t: "plain", v: "," },
        ],
      },
      { tokens: [{ t: "plain", v: "});" }] },
    ],
  },
  "README.md": {
    lang: "md",
    lines: [
      { tokens: [{ t: "md-h1", v: "# 👋 Hey, I'm Reza Abdollahi" }] },
      { tokens: [] },
      { tokens: [{ t: "md-h2", v: "## About" }] },
      { tokens: [{ t: "plain", v: "Frontend developer who loves crafting" }] },
      {
        tokens: [{ t: "plain", v: "pixel-perfect UIs and smooth animations." }],
      },
      { tokens: [] },
      { tokens: [{ t: "md-h2", v: "## Tech Stack" }] },
      { tokens: [{ t: "md-li", v: "- React / TypeScript / TailwindCSS" }] },
      { tokens: [{ t: "md-li", v: "- GSAP / Framer Motion" }] },
      { tokens: [{ t: "md-li", v: "- Node.js / PostgreSQL" }] },
      { tokens: [] },
      { tokens: [{ t: "md-h2", v: "## Get in touch" }] },
      {
        tokens: [
          { t: "md-link", v: "[Email](mailto:Srezaabdollahi7@gmail.com)" },
        ],
      },
    ],
  },
  "package.json": {
    lang: "json",
    lines: [
      { tokens: [{ t: "plain", v: "{" }] },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: '"name"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"portfolio"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: '"version"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"1.0.0"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: '"author"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"Reza Abdollahi"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "  " },
          { t: "prop", v: '"dependencies"' },
          { t: "plain", v: ": {" },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "    " },
          { t: "prop", v: '"react"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"^18.3.0"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "    " },
          { t: "prop", v: '"gsap"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"^3.12.0"' },
          { t: "plain", v: "," },
        ],
      },
      {
        tokens: [
          { t: "plain", v: "    " },
          { t: "prop", v: '"zustand"' },
          { t: "plain", v: ": " },
          { t: "string", v: '"^5.0.0"' },
          { t: "plain", v: "," },
        ],
      },
      { tokens: [{ t: "plain", v: "  }" }] },
      { tokens: [{ t: "plain", v: "}" }] },
    ],
  },
};

const TERMINAL_LINES = [
  { type: "dir", text: "portfolio on  main [✓]" },
  { type: "cmd", text: "npm run dev" },
  { type: "info", text: "" },
  { type: "info", text: "  VITE v5.4.0  ready in 312 ms" },
  { type: "info", text: "" },
  { type: "success", text: "  ➜  Local:   http://localhost:5173/" },
  { type: "info", text: "  ➜  Network: use --host to expose" },
  { type: "info", text: "" },
  { type: "dir", text: "portfolio on  main [✓]" },
  { type: "cmd", text: "git log --oneline -5" },
  { type: "info", text: "a3f2c1d feat: add VSCode window" },
  { type: "info", text: "9b1e4f2 feat: settings with theme & wallpaper" },
  { type: "info", text: "c72a881 feat: safari with projects grid" },
  { type: "info", text: "1d9e3b5 feat: terminal window" },
  { type: "info", text: "08fca44 init: macOS portfolio" },
];

export { FILE_TREE, FILE_CONTENTS, TERMINAL_LINES };
