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

        // Skill Bar Fill & Counter Animation on Scroll using IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate Skill Bars
                        const skillFills =
                            entry.target.querySelectorAll<HTMLDivElement>(".skill-fill");
                        skillFills.forEach((fill) => {
                            const width = fill.getAttribute("data-width");
                            if (width) {
                                fill.style.width = `${width}%`;
                            }
                        });

                        // Animate Counters
                        const animateValue = (
                            obj: HTMLElement,
                            start: number,
                            end: number,
                            duration: number
                        ) => {
                            let startTimestamp: number | null = null;
                            const step = (timestamp: number) => {
                                if (!startTimestamp) startTimestamp = timestamp;
                                const progress = Math.min(
                                    (timestamp - startTimestamp) / duration,
                                    1
                                );
                                obj.innerHTML = Math.floor(
                                    progress * (end - start) + start
                                ).toString();
                                if (progress < 1) {
                                    window.requestAnimationFrame(step);
                                }
                            };
                            window.requestAnimationFrame(step);
                        };

                        const counterElements =
                            entry.target.querySelectorAll(".counter-value");
                        counterElements.forEach((el) => {
                            // Only animate once
                            if (el.innerHTML !== "0") return;
                            const endVal = parseInt(el.getAttribute("data-count") || "0", 10);
                            animateValue(el as HTMLElement, 0, endVal, 2000);
                        });

                        // Disconnect after animation
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current); // eslint-disable-line react-hooks/exhaustive-deps
        };
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

                        <div className="about-counters">
                            <div className="counter-item">
                                <div className="counter-value" data-count={stats.years}>
                                    0
                                </div>
                                <div className="counter-label">Years Exp.</div>
                            </div>
                            <div className="counter-item">
                                <div className="counter-value" data-count={stats.projects}>
                                    0
                                </div>
                                <div className="counter-label">Projects</div>
                            </div>
                            <div className="counter-item">
                                <div className="counter-value" data-count={stats.clients}>
                                    0
                                </div>
                                <div className="counter-label">Clients</div>
                            </div>
                            <div className="counter-item">
                                <div className="counter-value" data-count={stats.repos}>
                                    0
                                </div>
                                <div className="counter-label">GitHub ⭐</div>
                            </div>
                        </div>

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
                                I just graduated and I&apos;m looking for my first full-time role. A lot of people build tutorial clones, but I wanted to understand how real products work—so I built a complete shoe e-commerce platform from scratch.
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
                            <div key={group.group} className="skill-group">
                                <div className="skill-group-name">{group.group}</div>
                                {group.skills.map((skill) => (
                                    <div key={skill.name} className="skill-item">
                                        <div className="skill-header">
                                            <span>{skill.name}</span>
                                            <span className="skill-pct">{skill.pct}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-fill"
                                                data-width={skill.pct}
                                                style={{ width: "0%" }} // inline style for initial state
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
