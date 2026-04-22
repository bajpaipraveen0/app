// Mock data for Praveen Bajpai's portfolio
// Will be replaced with backend integration later (contact form submissions)

export const personal = {
  name: "Praveen Bajpai",
  firstName: "Praveen",
  lastName: "Bajpai",
  titles: [
    "Senior Frontend Engineer",
    "Angular & TypeScript Specialist",
    "Enterprise UI Architect",
    "Healthcare Platform Builder",
  ],
  tagline:
    "I build scalable, high-performance Angular applications that power enterprise healthcare, mobility, and on-demand platforms — from pixel to production.",
  location: "Noida, India",
  email: "bajpaipraveen0@gmail.com",
  phone: "+91 7011792747",
  linkedin: "https://linkedin.com/in/bajpaipraveeno",
  github: "https://github.com/",
  resumeUrl: "#",
  yearsExperience: "6+",
  projectsShipped: "15+",
  companies: "2",
  domains: "4",
};

export const about = {
  summary: [
    "Results-driven Frontend Engineer with 6+ years of experience designing and building scalable, high-performance web applications using Angular and TypeScript.",
    "Currently at PureSoftware, I architect enterprise healthcare solutions for Medicare Advantage and Part D systems — shipping reusable UI systems, NgRx-powered state, and performant experiences for millions of members.",
    "I thrive at the intersection of elegant UI, clean architecture, and measurable performance — and I am an early adopter of AI-assisted workflows that compound my productivity.",
  ],
  strengths: [
    "Scalable, modular Angular architecture (v8 – v18)",
    "Reusable design-system components with Kendo UI & SCSS",
    "Predictable state with NgRx + RxJS",
    "Performance tuning: lazy loading, OnPush, bundle budgets",
    "REST API integration & JWT/OAuth flows",
    "Agile delivery, stakeholder collaboration, CI/CD with Jenkins",
  ],
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "Angular (v8 – v18)", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML5 / CSS3 / SCSS", level: 93 },
    ],
  },
  {
    category: "State & Reactive",
    items: [
      { name: "RxJS", level: 90 },
      { name: "NgRx", level: 85 },
      { name: "Angular Signals", level: 80 },
    ],
  },
  {
    category: "UI & APIs",
    items: [
      { name: "Kendo UI", level: 88 },
      { name: "Bootstrap", level: 85 },
      { name: "REST APIs / HttpClient", level: 92 },
      { name: "Socket.io", level: 78 },
    ],
  },
  {
    category: "Tooling & DevOps",
    items: [
      { name: "Git / SVN", level: 90 },
      { name: "Jenkins CI/CD", level: 80 },
      { name: "JIRA / Agile", level: 92 },
      { name: "Jasmine / Karma", level: 82 },
    ],
  },
];

export const tags = [
  "Angular", "TypeScript", "RxJS", "NgRx", "Kendo UI",
  "REST APIs", "SCSS", "Firebase", "Jenkins", "JIRA",
  "Jasmine", "Karma", "Socket.io", "PWA", "JWT", "OAuth",
  "AI-Assisted Dev", "Agile",
];

export const experiences = [
  {
    id: "exp-1",
    company: "PureSoftware Ltd.",
    role: "Software Engineer — Senior Frontend",
    duration: "Jun 2021 — Present",
    location: "Noida, India",
    domain: "Healthcare • Medicare Advantage & Part D",
    highlights: [
      "Engineered scalable web applications covering enrolment, member management, and billing workflows for Medicare Advantage & Part D.",
      "Shipped reusable, pixel-perfect Angular modules by translating Figma/mock-ups into production UI components.",
      "Integrated REST APIs via Angular HttpClient and implemented NgRx-based state for predictable data flow.",
      "Led requirement analysis and stakeholder syncs; drove sprint tasks & defect triage on JIRA in an Agile setup.",
      "Maintained Jenkins CI/CD pipelines, enabling reliable deploys and faster release cycles.",
    ],
    stack: ["Angular", "TypeScript", "NgRx", "RxJS", "Kendo UI", "SCSS", "Jenkins"],
  },
  {
    id: "exp-2",
    company: "TecOrb Technologies",
    role: "Frontend Developer",
    duration: "May 2019 — Jun 2021",
    location: "Noida, India",
    domain: "Mobility • Job Portals • On-Demand Services",
    highlights: [
      "Pioneered the Ejaro platform — GCC's first licensed peer-to-peer vehicle sharing app used across Saudi Arabia.",
      "Integrated Firebase, Google Maps, Socket.io and multiple Saudi Government APIs for live tracking & in-app chat.",
      "Led the Additional Notification epic and boosted app performance by 15% via lazy loading & OnPush strategies.",
      "Delivered Forfixer Admin (Oman) and JobsHola (Singapore) — multi-role portals with seamless API integration.",
    ],
    stack: ["Angular", "RxJS", "TypeScript", "Firebase", "Google APIs", "Socket.io", "Bootstrap"],
  },
];

export const projects = [
  {
    id: "proj-1",
    name: "MHK",
    tagline: "Enterprise healthcare suite for Medicare Advantage & Part D",
    description:
      "A large-scale Angular application powering enrolment, member management, claims and billing for Medicare Advantage & Part D plans. Built reusable UI modules, NgRx-driven state and Kendo UI data-grids for back-office workflows.",
    impact: [
      "Serves operations teams managing thousands of member records daily",
      "Reduced average screen load by ~30% via lazy-loaded feature modules",
      "Reusable component library adopted across multiple internal products",
    ],
    stack: ["Angular 16", "TypeScript", "NgRx", "Kendo UI", "RxJS", "SCSS", "Jenkins"],
    role: "Senior Frontend Engineer",
    year: "2021 — Present",
    client: "US Healthcare Client",
    demoUrl: null,
    codeUrl: null,
  },
  {
    id: "proj-2",
    name: "Ejaro — P2P Vehicle Sharing",
    tagline: "GCC's first licensed peer-to-peer vehicle sharing app",
    description:
      "Production platform used across Saudi Arabia. I integrated Firebase real-time DB, Google Maps live tracking, Socket.io chat, and multiple Saudi Government APIs for compliance. Led the Additional Notification epic end-to-end.",
    impact: [
      "First licensed P2P vehicle-sharing platform in the GCC",
      "Improved runtime performance by 15% via lazy loading & OnPush",
      "Seamless realtime chat & live-tracking across mobile + web",
    ],
    stack: ["Angular", "RxJS", "Firebase", "Google Maps", "Socket.io", "Bootstrap"],
    role: "Frontend Developer",
    year: "2020 — 2021",
    client: "Ejaro — Saudi Arabia",
    demoUrl: null,
    codeUrl: null,
  },
  {
    id: "proj-3",
    name: "Forfixer Admin",
    tagline: "On-demand technician dispatch platform — Oman",
    description:
      "Admin console for an on-demand technician service. Built request-assignment workflows, nearby technician allocation, and realtime status dashboards — slashing manual dispatch time across the ops team.",
    impact: [
      "Cut manual dispatch time significantly with smart assignment",
      "Clean, responsive admin UI consumed by non-technical operators",
      "Delivered on tight Agile cadence with cross-functional teams",
    ],
    stack: ["Angular", "SCSS", "Bootstrap", "Google APIs", "REST"],
    role: "Frontend Developer",
    year: "2020 — 2021",
    client: "Forfixer — Oman",
    demoUrl: null,
    codeUrl: null,
  },
  {
    id: "proj-4",
    name: "JobsHola — Job Portal",
    tagline: "Multi-role job portal for the Singapore market",
    description:
      "Naukri-style job portal supporting Seeker, Employer and Admin roles. Converted PSD designs into reusable Angular components and delivered responsive search, application and resume-builder flows.",
    impact: [
      "Three distinct user journeys unified in a single modular app",
      "Reusable component library sped up feature delivery",
      "Smooth job-matching flow from search to application",
    ],
    stack: ["Angular", "SCSS", "Bootstrap", "Socket.io", "REST"],
    role: "Frontend Developer",
    year: "2020 — 2021",
    client: "JobsHola — Singapore",
    demoUrl: null,
    codeUrl: null,
  },
];

export const services = [
  {
    title: "Angular UI Engineering",
    description:
      "Pixel-perfect, accessible Angular interfaces backed by reusable design systems and Kendo UI — built for scale from day one.",
    icon: "LayoutTemplate",
  },
  {
    title: "Performance Optimization",
    description:
      "Lazy loading, OnPush change detection, bundle budgets and runtime profiling — making heavy enterprise apps feel instant.",
    icon: "Gauge",
  },
  {
    title: "Scalable Architecture",
    description:
      "Modular feature folders, shared libraries, state design with NgRx/RxJS and clean API boundaries that your team will love six months later.",
    icon: "Layers",
  },
  {
    title: "AI-Assisted Delivery",
    description:
      "Shipping faster with ChatGPT/Claude in the loop — code generation, review, refactors and test coverage without sacrificing craft.",
    icon: "Sparkles",
  },
];

export const education = [
  { degree: "MCA — Master of Computer Applications", school: "IMS, Ghaziabad", year: "2018" },
  { degree: "BCA — Bachelor of Computer Applications", school: "MJPRU, Bareilly", year: "2015" },
];

export const certifications = [
  "Microsoft Technology Associate — Software Development Fundamentals",
  "AMCAT Certified",
  "BRAVO Award — Outstanding Performance (Jul 2022)",
  "BRAVO Award — Outstanding Performance (Oct 2023)",
  "Project Management Assessment — LearnTube.ai",
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];
