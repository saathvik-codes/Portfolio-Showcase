import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeBackground from "./ThreeBackground";
import RollingTitle from "./RollingTitle";

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
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="hero-section"
    >
      <ThreeBackground />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl">
        {/* Top tagline */}
        <div
          ref={lineDecRef}
          className="flex items-center gap-4 mb-10"
        >
          <div className="glow-dot" />
          <div ref={taglineRef}>
            <span className="font-mono text-xs tracking-[0.25em] text-violet-400/70 uppercase">
              Software Developer · Full Stack · AI Enthusiast
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
          className="mt-6 max-w-lg text-white/40 text-base md:text-lg leading-relaxed font-light"
          data-testid="hero-sub"
        >
          Building elegant software at the intersection of full-stack
          engineering, AI, and cloud — currently at{" "}
          <span className="text-violet-400/70">IITDM Kurnool</span>.
        </p>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap gap-3 mt-10">
          {["TypeScript", "React", "Node.js", "Python", "AI/ML", "Cloud"].map((tag) => (
            <span key={tag} className="skill-pill" data-testid={`hero-tag-${tag}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-6 mt-10 md:mt-12">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 font-mono text-sm tracking-wider uppercase text-white hover:text-violet-400 transition-colors duration-300"
            data-hover="true"
            data-testid="hero-cta-work"
          >
            <span>View Work</span>
            <span className="w-10 h-px bg-current transition-all duration-500 group-hover:w-20" />
          </a>
          <a
            href="mailto:saathvikk202@gmail.com"
            className="font-mono text-sm tracking-wider uppercase text-white/30 hover:text-white/70 transition-colors duration-300"
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
        className="absolute bottom-8 md:bottom-12 left-4 sm:left-8 md:left-16 flex flex-col items-center gap-4"
        data-testid="scroll-indicator"
      >
        <div className="scroll-indicator" />
        <span className="font-mono text-xs tracking-[0.2em] text-white/20 uppercase">Scroll</span>
      </div>

      {/* Location */}
      <div className="hidden sm:block absolute bottom-8 md:bottom-12 right-4 sm:right-8 md:right-16 font-mono text-xs text-white/15 tracking-widest">
        Hyderabad, India
      </div>
    </section>
  );
}
