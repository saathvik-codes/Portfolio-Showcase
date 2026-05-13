import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import SKIntro from "@/components/SKIntro";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import AchievementsStrip from "@/components/AchievementsStrip";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

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
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />

      {!introComplete && (
        <SKIntro onComplete={() => setIntroComplete(true)} />
      )}

      <Navigation visible={introComplete} />

      <main>
        <Hero />
        <SectionDivider index="01" label="About" />
        <About />
        <SectionDivider index="02" label="Experience" accent />
        <Experience />
        <AchievementsStrip />
        <SectionDivider index="03" label="Projects" />
        <Projects />
        <SectionDivider index="04" label="Skills" accent />
        <Skills />
        <SectionDivider index="05" label="Credentials" />
        <Certifications />
        <SectionDivider index="06" label="Contact" accent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
