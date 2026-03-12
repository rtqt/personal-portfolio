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

export interface SkillItem {
    name: string;
    pct: number;
}

export interface SkillGroup {
    group: string;
    skills: SkillItem[];
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
        title: "SoleMate E-Commerce",
        impact: "Fully functional custom storefront and checkout",
        desc: "A full-stack e-commerce platform for selling shoes. Built from scratch with a custom cart management system, product filtering, and admin dashboard instead of using Shopify.",
        tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
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
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
        imageAlt: "Developer Portfolio",
        liveUrl: "#",
        githubUrl: "#",
    },
];

export const skillGroups: SkillGroup[] = [
    {
        group: "Frontend",
        skills: [
            { name: "React / Next.js", pct: 90 },
            { name: "TypeScript", pct: 85 },
            { name: "CSS / Animation", pct: 88 },
        ],
    },
    {
        group: "Backend",
        skills: [
            { name: "Node.js / Express", pct: 88 },
            { name: "Python / FastAPI", pct: 82 },
            { name: "PostgreSQL / MongoDB", pct: 80 },
        ],
    },
    {
        group: "DevOps & Tools",
        skills: [
            { name: "Docker / AWS", pct: 75 },
            { name: "Git / CI/CD", pct: 85 },
        ],
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
        date: "2020 — 2024",
        role: "BSc Computer Science",
        company: "University Name",
        badge: "Education",
        desc: "Graduated with a focus on web technologies and software engineering. Constantly built side projects to apply theoretical concepts to real-world applications.",
        side: "right",
    },
];
