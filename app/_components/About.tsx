"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { skillGroups, stats } from "@/lib/data";

export function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Reveal animations on mount (for this specific component if loaded directly)
        const reveals = document.querySelectorAll(".reveal");
        setTimeout(() => {
            reveals.forEach((r) => r.classList.add("visible"));
        }, 100);

        return () => { };
    }, []);

    return (
        <section id="about" className="section" ref={sectionRef}>
            <div className="container">
                <div className="about-grid">
                    {/* Left: Card */}
                    <div className="about-card reveal">
                        <div className="about-avatar" style={{ position: "relative", overflow: "hidden" }}>
                            <Image
                                src="/images/profile/adam.jpg"
                                alt="Adam Wondale"
                                fill
                                sizes="120px"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="about-name">Adam Wondale</div>
                        <div className="about-role-label">Full Stack Developer</div>


                        <div
                            className="tech-badges"
                            style={{ justifyContent: "center", marginTop: "1.5rem" }}
                        >
                            <span className="tag">React</span>
                            <span className="tag">Node.js</span>
                            <span className="tag">Python</span>
                            <span className="tag">PostgreSQL</span>
                            <span className="tag">Docker</span>
                            <span className="tag">AWS</span>
                        </div>
                    </div>

                    {/* Right: Bio + Skills */}
                    <div className="reveal delay-2">
                        <p className="section-label">// about me</p>
                        <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                            Building real products,
                            <br />
                            <span className="accent">figuring out the rest.</span>
                        </h2>

                        <div className="about-bio">
                            <p>
                                I just graduated and I&apos;m looking for my first full-time role. A lot of people build tutorial clones, but I wanted to understand how real products work, so I built a complete shoe e-commerce platform from scratch.
                            </p>
                            <p>
                                I spend most of my time wrestling with React and Node.js, trying to figure out how to make things faster and cleaner. I don&apos;t know everything yet, but I learn fast and I care about getting the details right.
                            </p>
                            <p>
                                Currently{" "}
                                <strong style={{ color: "var(--clr-accent-2)" }}>
                                    open to full-time junior roles
                                </strong>{" "}
                                — remote or on-site.
                            </p>
                        </div>

                        {/* Skills */}
                        <p className="skills-title">Core Skills</p>

                        {skillGroups.map((group) => (
                            <div key={group.group} className="skill-group" style={{ marginBottom: "1.5rem" }}>
                                <div className="skill-group-name" style={{ marginBottom: "1rem" }}>{group.group}</div>
                                <div className="tech-badges" style={{ justifyContent: "flex-start", marginTop: "0" }}>
                                    {group.skills.map((skill) => (
                                        <span key={skill} className="tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
