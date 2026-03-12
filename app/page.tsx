import { Navbar } from "./_components/Navbar";
import { Hero } from "./_components/Hero";
import { Projects } from "./_components/Projects";
import { About } from "./_components/About";
import { Experience } from "./_components/Experience";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
