"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { stats } from "@/lib/data";
import { DownloadCVButton } from "./DownloadCVButton";
import { defaultCVData } from "@/lib/cv-data";

export function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const typedRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Reveal animations on mount
        const reveals = document.querySelectorAll(".reveal");
        setTimeout(() => {
            reveals.forEach((r) => r.classList.add("visible"));
        }, 100);

        // Canvas Particles
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(245, 158, 11, 0.4)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Typed Animation
        const roles = [
            "Frontend Developer.",
            "Backend Engineer.",
            "UI Designer.",
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeTimeout: NodeJS.Timeout;

        const typeEffect = () => {
            const currentRole = roles[roleIndex];
            const typedText = typedRef.current;
            if (!typedText) return;

            if (isDeleting) {
                typedText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            typeTimeout = setTimeout(typeEffect, typeSpeed);
        };
        typeEffect();

        // Stats counter animation
        const animateValue = (
            obj: HTMLElement,
            start: number,
            end: number,
            duration: number
        ) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const statElements = document.querySelectorAll(".hero-stat-value");
        statElements.forEach((el) => {
            const endVal = parseInt(el.getAttribute("data-count") || "0", 10);
            animateValue(el as HTMLElement, 0, endVal, 2000);
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
            clearTimeout(typeTimeout);
        };
    }, []);

    return (
        <section id="hero">
            <canvas id="canvas-bg" ref={canvasRef}></canvas>
            <div className="hero-glow hero-glow-1"></div>
            <div className="hero-glow hero-glow-2"></div>

            <div className="container">
                <div className="hero-content">

                    <h1 className="hero-name reveal delay-1">
                        <span className="line-1">Adam</span>
                        <br />
                        <span className="line-2">Wondale.</span>
                    </h1>

                    <p className="hero-role reveal delay-2">
                        <span className="typed" id="typed-text" ref={typedRef}></span>
                        <span className="cursor"></span>
                    </p>

                    <p className="hero-tagline reveal delay-3">
                        I&apos;m a recent computer science graduate who loves building things that
                        actually work. I recently built a full-stack shoe e-commerce
                        platform, and now I&apos;m looking for my first developer role.
                    </p>

                    <div className="hero-cta reveal delay-4">
                        <Link href="#projects" className="btn btn-primary">
                            View My Work ↓
                        </Link>
                        <DownloadCVButton
                            data={defaultCVData}
                            label="Download CV (PDF)"
                        />
                    </div>

                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-mouse"></div>
                <span>scroll</span>
            </div>
        </section>
    );
}
