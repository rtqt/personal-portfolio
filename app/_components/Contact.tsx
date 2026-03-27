"use client";

import { useState } from "react";
import Link from "next/link";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">(
        "idle"
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mvzvgdvl", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("idle");
                alert("Something went wrong with the submission. Please try again.");
            }
        } catch (error) {
            setStatus("idle");
            alert("Network error. Please try again later.");
        }
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <div className="contact-grid">
                    {/* Left: Info */}
                    <div className="reveal">
                        <p className="section-label">// get in touch</p>
                        <h2 className="section-title">
                            Let&apos;s work
                            <br />
                            <span className="accent">together.</span>
                        </h2>
                        <p
                            style={{
                                color: "var(--clr-text-muted)",
                                lineHeight: 1.8,
                                marginBottom: "2rem",
                            }}
                        >
                            Whether you have a role in mind, a project to build, or just want
                            to connect — my inbox is always open!
                        </p>

                        <a href="mailto:adambegizew@gmail.com" className="contact-item">
                            <div className="contact-icon">📧</div>
                            <span>adambegizew@gmail.com</span>
                        </a>
                        <a href="tel:+251967825821" className="contact-item">
                            <div className="contact-icon">📞</div>
                            <span>+251 9 67 82 58 21 </span>
                        </a>
                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <span>Addis Ababa Ethiopia · Open to Remote</span>
                        </div>

                        <div className="social-links">
                            <Link
                                href="https://github.com/rtqt"
                                className="social-link"
                                title="GitHub"
                                aria-label="GitHub"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/adam-begizew-212129395/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                title="LinkedIn"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.56V9H3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact-form-card reveal delay-2">
                        <form id="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="subject">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="Let's discuss a project..."
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-input"
                                    placeholder="Tell me about your project, role, or idea..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary form-submit"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? "Sending..." : "Send Message ↗"}
                            </button>
                        </form>

                        <div
                            className="form-success"
                            style={{ display: status === "success" ? "block" : "none" }}
                        >
                            ✅ Message sent! I&apos;ll get back to you soon.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
