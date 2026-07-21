import Image from "next/image";
import Link from "next/link";
import { projects as staticProjects, Project } from "@/lib/data";
import { db } from "@/lib/db";
import { projects as projectsTable } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export async function Projects() {
    // Fetch dynamic projects from Neon DB — fall back gracefully at build time
    let dynamicProjects: Project[] = [];
    try {
        const data = await db.select().from(projectsTable).orderBy(asc(projectsTable.id));
        // Cast to any to handle type slight differences, or rely on Drizzle's inference
        dynamicProjects = data as any;
    } catch (err) {
        console.warn("Neon DB unreachable, using static projects only:", err);
    }

    // Merge static and dynamic projects
    const allProjects = [...staticProjects, ...(dynamicProjects || [])];

    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="projects-header">
                    <p className="section-label reveal">&#47;&#47; selected work</p>
                    <h2 className="section-title reveal delay-1">
                        Work that <span className="accent">ships.</span>
                    </h2>
                    <p className="section-desc reveal delay-2">
                        Real projects solving real problems — built with care, shipped with
                        confidence.
                    </p>
                </div>

                <div className="projects-grid">
                    {allProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className={`project-card reveal delay-${(idx % 4) + 1}`}
                        >
                            <div className="project-thumb">
                                <Image
                                    src={project.image}
                                    alt={project.imageAlt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="project-thumb-overlay"></div>
                                <span className="project-num">{project.num}</span>
                            </div>
                            <div className="project-body">
                                <p className="project-impact">{project.impact}</p>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.desc}</p>
                                {project.bullets && project.bullets.length > 0 && (
                                    <ul className="project-bullets" style={{ paddingLeft: '20px', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                                        {project.bullets.map((bullet, i) => (
                                            <li key={i} style={{ marginBottom: '5px', fontSize: '0.9rem' }}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="project-tags">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.liveUrl && (
                                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                            Live Demo →
                                        </Link>
                                    )}
                                    {project.githubUrl && (
                                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                            GitHub →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
