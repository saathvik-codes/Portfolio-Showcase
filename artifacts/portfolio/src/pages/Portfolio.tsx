import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
import ScrollProgress from "@/components/ScrollProgress";

export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(rafCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [introComplete]);

  return (
    <div className="relative" data-testid="portfolio-root">
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      {introComplete && <ScrollProgress />}

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
