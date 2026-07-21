export interface Project {
    id: string;
    num: string;
    title: string;
    impact: string;
    desc: string;
    bullets?: string[];
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
    url?: string;
    badge: "Work" | "Education";
    desc: string;
    side: "left" | "right";
}

export const stats = {
    years: 0,
    projects: 4,
    clients: 0,
    repos: 15,
};

export const projects: Project[] = [
    {
        id: "p1",
        num: "01",
        title: "Community Issue Crowdsourcing Platform",
        impact: "Backend Engineer & PM",
        desc: "Platform for community members to report local issues. Final year university project.",
        bullets: [
            "Led backend dev and managed project lifecycle from ideation to delivery.",
            "Implemented scalable RESTful APIs and optimized DB queries for concurrent reports.",
            "Collaborated with frontend team for seamless API integration."
        ],
        tags: ["Node.js", "Express", "PostgreSQL", "REST API"],
        image: "/images/projects/aw-logo.svg",
        imageAlt: "Community Crowdsourcing",
        liveUrl: "",
        githubUrl: "",
    },
    {
        id: "p2",
        num: "02",
        title: "Shoe Store E-Commerce Platform",
        impact: "Full Stack Developer",
        desc: "Digital catalog and ordering web app for a local shoe store.",
        bullets: [
            "Built custom cart, product filtering, and secure admin dashboard.",
            "Integrated Supabase for real-time data syncing and auth."
        ],
        tags: ["React", "Next.js", "Node.js", "Supabase"],
        image: "/images/profile/aynawj.jpg",
        imageAlt: "Shoe Store Platform",
        liveUrl: "https://aynawaj.vercel.app/?v=3",
        githubUrl: "https://github.com/rtqt/aynawaj",
    },
    {
        id: "p3",
        num: "03",
        title: "AI-Powered Exit Exam Tool",
        impact: "Developer",
        desc: "Educational platform generating targeted exit exam prep questions via AI.",
        bullets: [
            "Implemented filtering and mock data rendering with Drizzle ORM and PostgreSQL.",
            "AI-generated step-by-step explanations for incorrect answers."
        ],
        tags: ["React", "Express", "Drizzle", "PostgreSQL"],
        image: "/images/projects/exit-exam.png",
        imageAlt: "Exit Exam Tool",
        liveUrl: "https://exitexam-six.vercel.app/",
        githubUrl: "https://github.com/rtqt/exit-exam",
    },
    {
        id: "p4",
        num: "04",
        title: "Interactive Developer Portfolio",
        impact: "Frontend Developer",
        desc: "Modern, responsive portfolio using Next.js to showcase projects and skills.",
        bullets: [
            "Implemented micro-animations and responsive layout without generic templates.",
            "Scored 100 on Lighthouse performance by optimizing images, fonts, and scripts."
        ],
        tags: ["React", "Next.js", "CSS Animations"],
        image: "/images/projects/aw-logo.svg",
        imageAlt: "Developer Portfolio",
        liveUrl: "https://adamwondale.dev",
        githubUrl: "https://github.com/rtqt/personal-portfolio",
    },
];

export const skillGroups: SkillGroup[] = [
    {
        group: "Frontend & Mobile",
        skills: ["Next.js", "React", "TailwindCSS", "TypeScript", "HTML/CSS", "React Native", "Flutter", "Redux"],
    },
    {
        group: "Backend & Databases",
        skills: ["Node.js", "Express.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "GraphQL", "Supabase", "Neon", "Convex"],
    },
    {
        group: "Tools & DevOps",
        skills: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Postman", "CI/CD"],
    },
    {
        group: "Soft Skills",
        skills: ["Project Management", "Team Leadership", "Communication", "Fast Learner", "Problem Solving"],
    },
    {
        group: "Languages",
        skills: ["Amharic (Native)", "English (C1)"],
    }
];

export const timeline: TimelineItem[] = [
    {
        date: "May — Jul 2026",
        role: "Data Encoder (Volunteer)",
        company: "CAWEE",
        url: "https://cawee-ethiopia.org/",
        badge: "Work",
        desc: "Managed data entry, ensured data integrity, and maintained digital records. Streamlined data collection processes and improved accuracy with team.",
        side: "left",
    }
];
