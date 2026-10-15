// Single source of truth for who I am and how to reach me.
// Everything else (Notes, Contact, Terminal, Resume, meta tags) reads from here.

export const profile = {
  name: "Reza Abdollahi",
  firstName: "Reza",
  initials: "RA",
  role: "Frontend Developer",
  headline: "Frontend developer building full-stack products with React, Next.js & Node.js",
  location: "Tehran, Iran",
  timezone: "Asia/Tehran",
  email: "srezaabdollahi7@gmail.com",
  phone: "+98 921 981 1980",
  phoneHref: "tel:+989219811980",
  website: "https://srezadev.ir",
  resumeUrl: "/files/reza-abdollahi-resume.pdf",
  availability: "Open to freelance projects and full-time frontend roles",
  education: "Software Engineering graduate",
  summary: [
    "I'm a frontend developer from Tehran who takes UI a little too seriously. I build fast, responsive, user-centric web apps with React, Next.js and TypeScript, and I go full-stack when the product needs it.",
    "I founded NextApps, a small digital product studio. Lately we ship Persian-first products end to end: Dofixo, a multi-tenant SaaS for repair workshops, and Finora, a self-hosted finance manager on the Jalali calendar.",
  ],
};

// Persian overrides, merged over `profile` when the site is in Persian.
export const profileFa = {
  name: "رضا عبداللهی",
  firstName: "رضا",
  role: "توسعه‌دهنده فرانت‌اند",
  headline: "توسعه‌دهنده فرانت‌اند؛ محصولات فول‌استک با React، Next.js و Node.js می‌سازم",
  location: "تهران، ایران",
  availability: "آماده همکاری فریلنس و تمام‌وقت در نقش فرانت‌اند",
  education: "دانش‌آموخته مهندسی نرم‌افزار",
  summary: [
    "توسعه‌دهنده فرانت‌اند هستم، ساکن تهران، و رابط کاربری را کمی بیش از حد جدی می‌گیرم. با React، Next.js و TypeScript وب‌اپ‌های سریع، واکنش‌گرا و کاربرمحور می‌سازم و هر وقت محصول لازم داشته باشد، فول‌استک کار می‌کنم.",
    "بنیان‌گذار NextApps هستم؛ یک استودیوی کوچک توسعه محصولات دیجیتال. این روزها محصولات فارسی‌محور را از صفر تا انتشار می‌سازیم: دوفیکسو، یک SaaS چندمستاجره برای تعمیرگاه‌ها، و Finora، برنامه مدیریت مالی‌ای که روی سرور خودتان اجرا می‌شود.",
  ],
};

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@Rezaabdollahi7",
    href: "https://github.com/Rezaabdollahi7",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "seyedreza-abdollahi",
    href: "https://www.linkedin.com/in/seyedreza-abdollahi",
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
    items: ["Node.js", "Express", "Prisma", "Socket.io", "Zod"],
  },
  { category: "Database", items: ["PostgreSQL", "MongoDB"] },
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
