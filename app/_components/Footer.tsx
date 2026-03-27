import Link from "next/link";

export function Footer() {
    return (
        <footer id="footer">
            <div className="container footer-inner">
                <p className="footer-copy">
                    © {new Date().getFullYear()}{" "}
                    <Link href="#hero">Adam Wondale</Link>.
                </p>
                <nav className="footer-nav">
                    <Link href="#projects">Work</Link>
                    <Link href="#about">About</Link>
                    <Link href="#experience">Experience</Link>
                    <Link href="#contact">Contact</Link>
                </nav>
            </div>
        </footer>
    );
}
