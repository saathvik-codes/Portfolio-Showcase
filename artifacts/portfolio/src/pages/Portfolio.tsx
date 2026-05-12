import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import SKIntro from "@/components/SKIntro";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [introComplete]);

  return (
    <div className="relative" data-testid="portfolio-root">
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* SK Intro overlay — renders above everything, z-index 1000 */}
      {!introComplete && (
        <SKIntro onComplete={() => setIntroComplete(true)} />
      )}

      {/* Navigation */}
      <Navigation visible={introComplete} />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
