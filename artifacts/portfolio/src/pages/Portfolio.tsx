import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const CinematicStage3D = lazy(() => import("@/components/CinematicStage3D"));

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const lastUiRatioRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!introDone) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const updateProgress = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const ratio = Math.min(Math.max(window.scrollY / max, 0), 1);
      scrollProgressRef.current = ratio;
      if (Math.abs(ratio - lastUiRatioRef.current) >= 0.005 || ratio === 0 || ratio === 1) {
        lastUiRatioRef.current = ratio;
        setScrollProgress(ratio);
      }
    };

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      updateProgress();
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    updateProgress();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [introDone]);

  const scrollToTarget = useCallback((selector: string) => {
    const target = document.querySelector(selector);
    if (!target) return;
    if (lenisRef.current && target instanceof HTMLElement) {
      lenisRef.current.scrollTo(target, { offset: -20 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf9f6] text-[#141413] overflow-x-clip">
      {!introDone && <SKIntro onComplete={() => setIntroDone(true)} />}

      {/* Whisper-quiet Theatre.js + Three.js light architectural background */}
      <Suspense fallback={null}>
        <CinematicStage3D scrollProgressRef={scrollProgressRef} />
      </Suspense>

      {introDone && (
        <>
          <Navigation
            visible={introDone}
            scrollProgress={scrollProgress}
            onNavigate={scrollToTarget}
          />

          <main className="relative z-10">
            <Hero onNavigate={scrollToTarget} />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
          </main>

          <Footer onNavigate={scrollToTarget} />
        </>
      )}
    </div>
  );
}
