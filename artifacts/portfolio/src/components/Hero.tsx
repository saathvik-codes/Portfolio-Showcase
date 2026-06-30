import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeBackground from "./ThreeBackground";
import RollingTitle from "./RollingTitle";
import { magneticMove, magneticLeave } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineDecRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(lineDecRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(taglineRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3");

      tl.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      tl.from(badgesRef.current?.children ?? [], {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      }, "-=0.4");

      tl.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3");

      tl.from(scrollRef.current, {
        opacity: 0,
        duration: 0.8,
      }, "-=0.2");

      // Parallax on scroll
      gsap.to(heroRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92svh] md:min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-20 pb-16 md:py-0 overflow-hidden"
      data-testid="hero-section"
    >
      <ThreeBackground />

      {/* Ambient glow blobs */}
      <div className="ambient-blobs">
        <div className="ambient-blob" style={{ width: 520, height: 520, top: "-8%", left: "8%", background: "#8b5cf6" }} />
        <div className="ambient-blob" style={{ width: 460, height: 460, top: "20%", right: "-6%", background: "#c084fc", animationDelay: "-6s" }} />
        <div className="ambient-blob" style={{ width: 380, height: 380, bottom: "-10%", left: "38%", background: "#f0abfc", animationDelay: "-12s", opacity: 0.1 }} />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl">
        {/* Top tagline */}
        <div
          ref={lineDecRef}
          className="flex items-center gap-3 mb-6 md:gap-4 md:mb-10"
        >
          <div className="glow-dot" />
          <div ref={taglineRef}>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.25em] text-violet-400/70 uppercase">
              Software Engineer · Backend & Data · AI/ML
            </span>
          </div>
        </div>

        <RollingTitle
          lines={[
            { text: "Saathvik" },
            { text: "Kalepu.", gradient: true },
          ]}
          className="hero-rolling-title font-serif leading-[0.88] tracking-tight"
          testId="hero-headline"
        />

        {/* Sub */}
        <p
          ref={subRef}
          className="mt-5 max-w-lg text-white/68 text-sm sm:text-base md:text-lg leading-relaxed font-light"
          data-testid="hero-sub"
        >
          Software engineer focused on backend systems, data, and AI.
          Currently studying at{" "}
          <span className="text-violet-300">IITDM Kurnool</span>.
        </p>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap gap-2 sm:gap-3 mt-7 md:mt-10">
          {["TypeScript", "React", "Node.js", "Python", "AI/ML", "Cloud"].map((tag) => (
            <span key={tag} className="skill-pill" data-testid={`hero-tag-${tag}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-5 mt-8 md:gap-6 md:mt-12">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 font-mono text-xs sm:text-sm tracking-wider uppercase text-white hover:text-violet-400 transition-colors duration-300 will-change-transform"
            style={{ transition: "transform 0.2s ease, color 0.3s ease" }}
            onMouseMove={(e) => magneticMove(e, 0.3)}
            onMouseLeave={magneticLeave}
            data-hover="true"
            data-testid="hero-cta-work"
          >
            <span>View Work</span>
            <span className="w-10 h-px bg-current transition-all duration-500 group-hover:w-20" />
          </a>
          <a
            href="mailto:saathvikk202@gmail.com"
            className="font-mono text-xs sm:text-sm tracking-wider uppercase text-white/45 hover:text-white/80 transition-colors duration-300"
            data-hover="true"
            data-testid="hero-cta-contact"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="hidden sm:flex absolute bottom-8 md:bottom-12 left-4 sm:left-8 md:left-16 flex-col items-center gap-4"
        data-testid="scroll-indicator"
      >
        <div className="scroll-indicator" />
        <span className="font-mono text-xs tracking-[0.2em] text-white/35 uppercase">Scroll</span>
      </div>

      {/* Location */}
      <div className="hidden sm:flex absolute bottom-8 md:bottom-12 right-4 sm:right-8 md:right-16 flex-col items-end gap-2 font-mono text-xs text-white/30 tracking-widest">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          Open to work
        </span>
        <span>Hyderabad, India</span>
      </div>
    </section>
  );
}
