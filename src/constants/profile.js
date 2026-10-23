// Single source of truth for who I am and how to reach me.
// Everything else (Notes, Contact, Terminal, Resume, meta tags) reads from here.

export const profile = {
  name: "Reza Abdollahi",
  firstName: "Reza",
  initials: "RA",
  photo: "/images/profile/reza.webp",
  role: "Software Engineer",
  headline: "Software Engineer | Full-stack & Product Development",
  location: "Tehran, Iran",
  timezone: "Asia/Tehran",
  email: "srezaabdollahi7@gmail.com",
  phone: "+98 921 981 1980",
  phoneHref: "tel:+989219811980",
  website: "https://srezadev.ir",
  resumeUrl: "/files/reza-abdollahi-resume.pdf",
  availability: "Open to freelance projects and full-time full-stack roles",
  education: "Software Engineering graduate",
  summary: [
    "I'm a Software Engineer focused on full-stack development and building practical, scalable software products.",
    "I work primarily with React, Next.js, TypeScript and Node.js, developing everything from modern web applications to SaaS platforms. I enjoy turning ideas into real products, designing clean architectures and solving problems that matter to users.",
    "I also founded NextApps, a small digital product studio. Lately we ship Persian-first products end to end, like Dofixo, a multi-tenant SaaS for repair workshops, and Finora, a self-hosted finance manager on the Jalali calendar.",
  ],
  // What I'm building and exploring right now.
  focus: [
    "Full-stack web applications and SaaS products",
    "AI-powered applications and developer workflows",
    "Scalable backend systems and APIs",
    "Open-source projects and product development",
  ],
  stack: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
  motto: "Always learning, building, and turning ideas into products.",
};

// Persian overrides, merged over `profile` when the site is in Persian.
export const profileFa = {
  name: "رضا عبداللهی",
  firstName: "رضا",
  role: "مهندس نرم‌افزار",
  headline: "مهندس نرم‌افزار | توسعه فول‌استک و ساخت محصول",
  location: "تهران، ایران",
  availability: "آماده همکاری فریلنس و تمام‌وقت در نقش فول‌استک",
  education: "دانش‌آموخته مهندسی نرم‌افزار",
  summary: [
    "مهندس نرم‌افزار هستم و روی توسعه فول‌استک و ساخت محصولات نرم‌افزاری کاربردی و مقیاس‌پذیر تمرکز دارم.",
    "بیشتر با React، Next.js، TypeScript و Node.js کار می‌کنم و از وب‌اپلیکیشن‌های مدرن تا پلتفرم‌های SaaS می‌سازم. از تبدیل ایده به محصول واقعی، طراحی معماری تمیز و حل مسئله‌هایی که برای کاربر مهم‌اند لذت می‌برم.",
    "بنیان‌گذار NextApps هم هستم؛ یک استودیوی کوچک توسعه محصولات دیجیتال. این روزها محصولات فارسی‌محور را از صفر تا انتشار می‌سازیم، مثل دوفیکسو، یک SaaS چندمستاجره برای تعمیرگاه‌ها، و Finora، برنامه مدیریت مالی‌ای که روی سرور خودتان اجرا می‌شود.",
  ],
  focus: [
    "وب‌اپلیکیشن‌های فول‌استک و محصولات SaaS",
    "اپلیکیشن‌های مبتنی بر هوش مصنوعی و جریان‌های کاری توسعه‌دهنده‌ها",
    "سیستم‌های بک‌اند و APIهای مقیاس‌پذیر",
    "پروژه‌های متن‌باز و توسعه محصول",
  ],
  motto: "همیشه در حال یادگیری، ساختن و تبدیل ایده به محصول.",
};

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@Rezaabdollahi7",
    href: "https://github.com/Rezaabdollahi7",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@rezaabdollahi7",
    href: "https://t.me/rezaabdollahi7",
  },
  {
    id: "email",
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
  },
];

export const skillCategoriesFa = {
  Frontend: "فرانت‌اند",
  Mobile: "موبایل",
  Styling: "استایل‌دهی",
  Motion: "انیمیشن",
  Backend: "بک‌اند",
  Database: "پایگاه داده",
  DevOps: "DevOps",
  Also: "سایر",
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "React Router"],
  },
  { category: "Mobile", items: ["React Native"] },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Material UI", "Radix UI", "Sass"],
  },
  { category: "Motion", items: ["GSAP", "Framer Motion", "Three.js"] },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Prisma", "TypeORM", "Socket.io", "Zod"],
  },
  { category: "Database", items: ["PostgreSQL", "Redis", "MongoDB"] },
  {
    category: "DevOps",
    items: ["Docker", "Nginx", "Caddy", "Git", "GitHub"],
  },
  { category: "Also", items: ["Astro", "Vite", "Firebase"] },
];

// Things I've actually said about myself (GitHub profile + old about-me).
export const funFacts = [
  "I refactor code because the indentation was slightly off, and somehow end up rewriting the whole component. Worth it.",
  "I believe the right mechanical keyboard switch can boost productivity by 200%.",
  "Most of my design inspiration happens in a rabbit hole at midnight.",
  "I'm always one VS Code extension away from the perfect setup.",
];

export const funFactsFa = [
  "کد را فقط به خاطر یک تورفتگی نامرتب ری‌فکتور می‌کنم و آخرش کل کامپوننت را از نو می‌نویسم. می‌ارزد.",
  "معتقدم سوییچ درست کیبورد مکانیکی می‌تواند بهره‌وری را ۲۰۰٪ بالا ببرد.",
  "بیشتر الهام‌های طراحی‌ام نیمه‌شب و وسط گشت‌وگذار بی‌پایان در اینترنت پیدا می‌شوند.",
  "همیشه فقط یک افزونه VS Code با ستاپ ایده‌آل فاصله دارم.",
];
