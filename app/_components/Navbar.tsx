"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Navbar */}
            <nav id="navbar" className={isScrolled ? "scrolled" : ""}>
                <div className="container nav-inner">
                    <Link href="#hero" className="nav-logo" onClick={closeMenu}>
                        AM.
                    </Link>
                    <ul className="nav-links">
                        <li>
                            <Link href="#projects">Work</Link>
                        </li>
                        <li>
                            <Link href="#about">About</Link>
                        </li>
                        <li>
                            <Link href="#experience">Experience</Link>
                        </li>
                        <li>
                            <Link href="#contact">Contact</Link>
                        </li>
                    </ul>
                    <Link
                        href="#contact"
                        className="btn btn-primary nav-cta"
                        style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem" }}
                    >
                        Hire Me
                    </Link>
                    <button
                        className={`hamburger ${isOpen ? "open" : ""}`}
                        id="hamburger"
                        aria-label="Menu"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            <div className={`mobile-nav ${isOpen ? "open" : ""}`} id="mobile-nav">
                <Link href="#projects" className="mobile-nav-link" onClick={closeMenu}>
                    Work
                </Link>
                <Link href="#about" className="mobile-nav-link" onClick={closeMenu}>
                    About
                </Link>
                <Link href="#experience" className="mobile-nav-link" onClick={closeMenu}>
                    Experience
                </Link>
                <Link href="#contact" className="mobile-nav-link" onClick={closeMenu}>
                    Contact
                </Link>
                <Link
                    href="#contact"
                    className="btn btn-primary"
                    style={{ marginTop: "1rem" }}
                    onClick={closeMenu}
                >
                    Hire Me ↗
                </Link>
            </div>
        </>
    );
}
