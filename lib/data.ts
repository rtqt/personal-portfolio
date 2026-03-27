export interface Project {
    id: string;
    num: string;
    title: string;
    impact: string;
    desc: string;
    tags: string[];
    image: string;
    imageAlt: string;
    liveUrl: string;
    githubUrl: string;
}

export interface SkillGroup {
    group: string;
    skills: string[];
}

export interface TimelineItem {
    date: string;
    role: string;
    company: string;
    badge: "Work" | "Education";
    desc: string;
    side: "left" | "right";
}

export const stats = {
    years: 0,
    projects: 2,
    clients: 0,
    repos: 15,
};

export const projects: Project[] = [
    {
        id: "p1",
        num: "01",
        title: "Aynawaj Shoes",
        impact: "Fully functional custom storefront and checkout",
        desc: "A full-stack e-commerce platform for selling shoes. Built from scratch with a custom cart management system, product filtering, and admin dashboard instead of using Shopify.",
        tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
        image: "/images/profile/aynawj.jpg",
        imageAlt: "Aynawaj Shoe E-Commerce",
        liveUrl: "https://aynawaj.vercel.app/?v=3",
        githubUrl: "https://github.com/rtqt/aynawaj",
    },
    {
        id: "p2",
        num: "02",
        title: "Interactive Developer Portfolio",
        impact: "Scored 100 on Lighthouse performance audit",
        desc: "This very website. Designed and built to showcase my projects with engaging micro-animations and a clean, responsive layout without relying on generic templates.",
        tags: ["React", "Next.js", "CSS Animations"],
        image: "/images/projects/aw-logo.svg",
        imageAlt: "Developer Portfolio",
        liveUrl: "https://adamwondale.dev",
        githubUrl: "https://github.com/rtqt/personal-portfolio",
    },
];

export const skillGroups: SkillGroup[] = [
    {
        group: "Frontend",
        skills: ["React / Next.js", "TypeScript", "CSS / Animation"],
    },
    {
        group: "Backend",
        skills: ["Node.js / Express", "Python / FastAPI", "PostgreSQL / MongoDB"],
    },
    {
        group: "DevOps & Tools",
        skills: ["Docker / AWS", "Git / CI/CD"],
    },
];

export const timeline: TimelineItem[] = [
    {
        date: "2024 — Present",
        role: "Full Stack Developer (Self-Employed)",
        company: "Independent Projects",
        badge: "Work",
        desc: "Designed, developed, and launched a custom e-commerce solution for a shoe business. Handled everything from database design to frontend animations and checkout flows.",
        side: "left",
    },
    {
        date: "2022 — 2026",
        role: "BSc Computer Science",
        company: "Unity University",
        badge: "Education",
        desc: "Graduated with a focus on web technologies and software engineering. Constantly built side projects to apply theoretical concepts to real-world applications.",
        side: "right",
    },
];
