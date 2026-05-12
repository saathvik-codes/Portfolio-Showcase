import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import SKIntro from "@/components/SKIntro";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Prevent scroll during intro
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [introComplete]);

  return (
    <div className="relative" data-testid="portfolio-root">
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* SK Intro overlay */}
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
