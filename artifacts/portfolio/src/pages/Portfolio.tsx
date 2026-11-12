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
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import WalkthroughHud from "@/components/WalkthroughHud";
import { WALKTHROUGH_ACTS } from "@/theatre/portfolioStage";

const CinematicStage3D = lazy(() => import("@/components/CinematicStage3D"));

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);
  const [theatreTime, setTheatreTime] = useState(0);
  const [activeActIndex, setActiveActIndex] = useState(0);
  const scrollProgressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!introDone) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const updateProgress = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const ratio = Math.min(Math.max(window.scrollY / max, 0), 1);
      scrollProgressRef.current = ratio;

      // Determine active walkthrough act nearest viewport top
      let bestIdx = 0;
      let bestDist = Infinity;
      WALKTHROUGH_ACTS.forEach((act, idx) => {
        const el = document.querySelector(act.selector);
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top - window.innerHeight * 0.25);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      setActiveActIndex(bestIdx);
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
    <div className="relative min-h-screen bg-[#08080a] text-[#f2ede4] overflow-x-clip">
      {!introDone && <SKIntro onComplete={() => setIntroDone(true)} />}

      {/* Persistent Theatre.js + Three.js 3D architectural backdrop */}
      <Suspense fallback={null}>
        <CinematicStage3D
          scrollProgressRef={scrollProgressRef}
          onTimeUpdate={(sec) => setTheatreTime(sec)}
        />
      </Suspense>

      {/* Subtle 35mm cinema grain overlay */}
      <div className="cinema-grain" aria-hidden="true" />

      {introDone && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navigation visible={introDone} onNavigate={scrollToTarget} />

          <main className="relative z-10 pb-14">
            <Hero onNavigate={scrollToTarget} />
            <SectionDivider index="01" label="Philosophy" accent />
            <About />
            <SectionDivider index="02" label="Experience" />
            <Experience />
            <SectionDivider index="03" label="Case Walkthrough" accent />
            <Projects />
            <SectionDivider index="04" label="Technical Arsenal" />
            <Skills />
            <SectionDivider index="05" label="Credentials" accent />
            <Certifications />
            <SectionDivider index="06" label="Conversation" />
            <Contact />
          </main>

          <Footer onNavigate={scrollToTarget} />
          <WalkthroughHud
            currentTime={theatreTime}
            activeActIndex={activeActIndex}
            onJumpToAct={scrollToTarget}
          />
        </>
      )}
    </div>
  );
}
