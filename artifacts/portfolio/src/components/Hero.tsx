import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCinemaPlate from "./AnimatedCinemaPlate";
import { magneticMove, magneticLeave } from "@/lib/utils";
import { heroConvo, profile } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate?: (href: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0 });

      tl.from(".hero-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.42,
        ease: "power3.out",
      });

      tl.from(
        ".hero-title-word",
        {
          y: "108%",
          duration: 0.5,
          stagger: 0.06,
          ease: "power4.out",
        },
        0.03,
      );

      tl.fromTo(
        ".hero-stagger",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "transform",
        },
        0.08,
      );

      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { y: 18, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out", delay: 0.06 },
        );

        gsap.to(frameRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-svh flex flex-col justify-between pt-24 md:pt-28 pb-6 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Top editorial rule */}
      <div className="px-5 sm:px-10 md:px-14">
        <div className="hero-rule flex items-center justify-between border-b border-white/[0.1] pb-3.5 font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase">
          <span>00 — Opening Scene · Systems &amp; Applied AI</span>
          <span className="hidden sm:inline-flex items-center gap-2 text-emerald-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
            {profile.availability}
          </span>
        </div>
      </div>

      {/* Asymmetric two-column opening */}
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-10 md:px-14 my-auto py-8 md:py-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left editorial typography + convo beat */}
        <div className="lg:col-span-6 space-y-6">
          <div className="hero-stagger font-mono text-[11px] tracking-[0.22em] uppercase text-[#e8a85a]">
            {profile.university} · {profile.location}
          </div>

          <h1 className="leading-[0.92] tracking-[-0.025em]" aria-label={profile.name}>
            <span className="clip-line-wrap">
              <span className="hero-title-word inline-block font-display font-extrabold text-[clamp(1.95rem,7.1vw,3.65rem)] lg:text-[clamp(2.35rem,3.95vw,3.85rem)] text-[#f2ede4] whitespace-nowrap">
                SAATHVIK
              </span>
            </span>
            <span className="clip-line-wrap mt-1">
              <span className="hero-title-word inline-block font-serif-editorial italic font-normal text-[clamp(2.6rem,9vw,4.6rem)] lg:text-[clamp(3.15rem,5.2vw,5.15rem)] text-[#e8a85a]">
                Kalepu<span className="text-[#9d8cff] not-italic">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-stagger text-base sm:text-lg text-[#f2ede4]/78 leading-relaxed max-w-xl">
            <span className="text-[#f2ede4] font-medium">{profile.headlineRole}</span> working on{" "}
            <span className="text-[#e8a85a]/90">distributed storage in Go &amp; C++</span>, production{" "}
            <span className="text-[#9d8cff]">voice &amp; retrieval AI pipelines</span>, and clear product interfaces.
          </p>

          {/* Opening conversation exchange */}
          <div className="hero-stagger studio-plate rounded-2xl p-4 sm:p-5 space-y-3 max-w-xl">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
              <span>Prologue · Table Walkthrough</span>
              <span className="text-[#e8a85a]/80">Scroll-Driven 3D Camera</span>
            </div>
            <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed">
              {heroConvo.map((beat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border mt-0.5 ${
                      beat.speaker === "Saathvik"
                        ? "border-[#e8a85a]/45 text-[#e8a85a] bg-[#e8a85a]/10"
                        : "border-white/15 text-white/55 bg-white/[0.03]"
                    }`}
                  >
                    {beat.speaker}
                  </span>
                  <p className={beat.speaker === "Saathvik" ? "text-[#f2ede4]/88" : "text-white/55 italic"}>
                    &ldquo;{beat.line}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary actions */}
          <div className="hero-stagger flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("#projects");
                else document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseMove={(e) => magneticMove(e, 0.22)}
              onMouseLeave={magneticLeave}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#e8a85a] text-[#08080a] font-mono text-[11px] font-medium tracking-[0.18em] uppercase hover:bg-[#f2ede4] transition-colors"
              data-hover="true"
              data-testid="hero-cta-work"
            >
              Start Walkthrough <span>↓</span>
            </a>

            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.16] font-mono text-[11px] tracking-[0.16em] uppercase text-[#f2ede4]/80 hover:border-[#e8a85a]/60 hover:text-[#e8a85a] transition-colors"
              data-hover="true"
            >
              Resume PDF ↓
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("#contact");
                else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white underline underline-offset-8 decoration-white/20 hover:decoration-[#e8a85a] px-2 py-2 transition-colors"
              data-hover="true"
              data-testid="hero-cta-contact"
            >
              Get in Touch ↗
            </a>
          </div>
        </div>

        {/* Right Cinema Frame: Animated Editorial Conversational Scene */}
        <div ref={frameRef} className="lg:col-span-6">
          <AnimatedCinemaPlate
            src="/illustrations/hero-convo.jpg"
            alt="Saathvik discussing system design architecture with a founder over sketches in an evening studio"
            badgeLeft="Scene 01 · Studio Convo"
            badgeRight="Hyderabad · 35mm Matte"
            kenBurnsDirection="zoom"
            priority
          >
            <div className="flex items-end justify-between gap-4 pt-12">
              <p className="text-xs sm:text-sm text-[#f2ede4]/90 max-w-sm leading-snug drop-shadow">
                &ldquo;Before touching any framework, sketch what breaks when the network splits.&rdquo;
              </p>
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/60 shrink-0">
                Darwix · Go · Python
              </span>
            </div>
          </AnimatedCinemaPlate>
        </div>
      </div>

      {/* Bottom studio ticker */}
      <div className="border-y border-white/[0.08] py-2.5 overflow-hidden bg-[#08080a]/55 backdrop-blur-sm">
        <div className="marquee-track font-mono text-[10px] tracking-[0.28em] text-white/35 uppercase">
          <span>{profile.marqueeText}&nbsp;&nbsp;</span>
          <span>{profile.marqueeText}&nbsp;&nbsp;</span>
        </div>
      </div>
    </section>
  );
}
