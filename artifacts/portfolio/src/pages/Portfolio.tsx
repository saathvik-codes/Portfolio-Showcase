import { useCallback, useEffect, useRef, useState } from "react";
import SKIntro from "@/components/SKIntro";
import Lenis from "lenis";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PaperTear } from "@/components/primitives";
import { ChapterProvider, ChapterRail, WalkthroughDock } from "@/components/walkthrough";

const seenIntro = () => {
  try { return sessionStorage.getItem("sk-intro") === "1"; } catch { return false; }
};

export default function Portfolio() {
  const lenisRef = useRef<Lenis | null>(null);
  const [intro, setIntro] = useState(() => !seenIntro());
  const endIntro = useCallback(() => {
    try { sessionStorage.setItem("sk-intro", "1"); } catch { /* storage blocked */ }
    setIntro(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Honour deep links like /#projects on first load.
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => { const el = document.getElementById(hash); if (el) lenis.scrollTo(el, { offset: -64, immediate: true }); }, 50);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    history.replaceState(null, "", id === "prologue" ? window.location.pathname : `#${id}`);
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -64 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <ChapterProvider go={go}>
      {intro && <SKIntro onComplete={endIntro} />}
      <div className="min-h-screen bg-paper text-ink overflow-x-clip">
        <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <ChapterRail />
        <main>
          <Hero onNavigate={go} />
          <PaperTear />
          <About />
          <Experience />
          <Projects />
          <Credentials />
          <PaperTear />
          <Contact />
        </main>
        <Footer />
        <WalkthroughDock />
      </div>
    </ChapterProvider>
  );
}
