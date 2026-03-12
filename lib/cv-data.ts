// ─────────────────────────────────────────────────────────────────────────────
//  cv-data.ts — Type definitions & default data for the CV
// ─────────────────────────────────────────────────────────────────────────────

import { nanoid } from "./nanoid";
// ─────────────────────────────────────────────
//  CV Data — single source of truth for the PDF
// ─────────────────────────────────────────────

export interface CVPersonal {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    /** path inside /public, e.g. "/photo.jpg", or empty string */
    photoPath: string;
    summary: string;
}

export interface CVExperience {
    id: string;
    company: string;
    role: string;
    dates: string;
    /** Each bullet point as a separate string */
    bullets: string[];
}

export interface CVProject {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    bullets?: string[];
}

export interface CVEducation {
    id: string;
    institution: string;
    degree: string;
    dates: string;
    notes?: string;
}

export interface CVSkillGroup {
    id: string;
    category: string;
    skills: string[];
}

export interface CVData {
    personal: CVPersonal;
    experience: CVExperience[];
    projects: CVProject[];
    education: CVEducation[];
    skillGroups: CVSkillGroup[];
}

// ─────────────────────────────────────────────
//  Default data — edit freely
// ─────────────────────────────────────────────

export const defaultCVData: CVData = {
    personal: {
        name: "Adam Wondale",
        title: "Aspiring Software Engineer | Seeking Internship at IE Networks Solutions",
        email: "adam.wondale@example.com", // Placeholder
        phone: "+251 911 000 000",        // Placeholder
        location: "Addis Ababa, Ethiopia",
        linkedin: "linkedin.com/in/adamwondale",
        github: "github.com/adamwondale",
        website: "adamwondale.dev",
        photoPath: "/images/profile/adam.jpg",
        summary:
            "Recent Computer Science graduate with a passion for leveraging technology to solve real-world problems, particularly in smart infrastructure and community engagement. Developed a crowdsourcing platform during my final year project using React Native, React.js, and MySQL, enabling citizens to report issues and authorities to resolve them efficiently. Eager to join IE Networks Solutions as a Software Engineering Intern to contribute to innovative enterprise solutions, cloud services, and smart city initiatives that transform businesses across Africa.",
    },
    experience: [], // Fresh graduate, emphasizing projects and education instead
    projects: [
        {
            id: nanoid(),
            name: "CivicConnect — Community Crowdsourcing Platform",
            description:
                "Final Year Project: A comprehensive platform empowering citizens to report local infrastructure issues directly to municipal authorities for resolution.",
            technologies: ["React Native", "React.js", "Node.js", "Express", "MySQL", "Google Maps API"],
            liveUrl: "https://demo.civicconnect.et",
            githubUrl: "https://github.com/adamwondale/civic-connect",
            bullets: [
                "Built a cross-platform mobile app (React Native) for citizens to accurately report and geolocate civic issues with photo evidence.",
                "Developed a secure, responsive web dashboard (React.js) for local authorities to triage, assign, and track reported incidents to completion.",
                "Designed and implemented a normalized relational database schema in MySQL to handle high volumes of spatial data and user reports.",
                "Integrated real-time status updates and notifications, creating a transparent feedback loop between the community and government.",
            ]
        },
        {
            id: nanoid(),
            name: "Portfolio Website & CV Builder",
            description: "Personal developer portfolio and interactive CV generator.",
            liveUrl: "https://adamwondale.dev",
            githubUrl: "https://github.com/adamwondale/portfolio",
            technologies: ["Next.js 14", "TypeScript", "React-PDF", "Zod", "Tailwind CSS"],
            bullets: [
                "Developed a highly performant static portfolio site showcasing projects and technical skills.",
                "Engineered a custom, client-side CV builder that generates dynamic, downloadable PDF resumes instantly in the browser.",
            ]
        }
    ],

    education: [
        {
            id: "edu1",
            institution: "State University of Technology",
            degree: "BSc Computer Science",
            dates: "Sep 2022 — May 2026",
            notes:
                "First Class Honours. Specialised in distributed systems & HCI. Best Final Year Project Award.",
        },
    ],

    skillGroups: [
        {
            id: "sg1",
            category: "Frontend",
            skills: ["React / Next.js", "TypeScript", "CSS / Animation", "Vue.js"],
        },
        {
            id: "sg2",
            category: "Backend",
            skills: ["Node.js / Express", "Python / FastAPI", "MySQL", "MongoDB"],
        },
        {
            id: "sg3",
            category: "DevOps & Tools",
            skills: ["Docker", "AWS", "Git", "CI/CD"],
        },
    ],
};
