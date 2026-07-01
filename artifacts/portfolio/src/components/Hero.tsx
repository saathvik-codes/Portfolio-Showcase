import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { magneticMove, magneticLeave } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/* ── Velocity-aware scrolling marquee ── */
function VelocityMarquee({ text }: { text: string }) {
  const baseX      = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel        = useVelocity(scrollY);
  const smooth     = useSpring(vel, { damping: 50, stiffness: 400 });
  const factor     = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x          = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const dir        = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * -2.5 * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-white/[0.12] uppercase py-3"
        style={{ x }}
      >
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="pr-6">{text}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Name line — individual letters clipped for slide-up reveal ── */
function SplitLine({ text, gradient = false }: { text: string; gradient?: boolean }) {
  return (
    <div className="whitespace-nowrap leading-[0.9]" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
          <span className={`name-letter inline-block${gradient ? " hero-letter-gradient" : ""}`}>
            {ch}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-top-rule", {
        scaleX: 0, transformOrigin: "left", duration: 0.75, ease: "power3.out",
      });

      tl.from(".name-letter", {
        y: "115%", duration: 0.82, stagger: 0.034, ease: "power4.out",
      }, "-=0.3");

      tl.from(".hero-meta-left", {
        y: 14, opacity: 0, duration: 0.5, ease: "power3.out",
      }, "-=0.35");

      tl.from(".hero-meta-right > *", {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.09, ease: "power3.out",
      }, "-=0.45");

      tl.from(".hero-bottom-rule", {
        scaleX: 0, transformOrigin: "left", duration: 0.75, ease: "power3.out",
      }, "-=0.3");

      gsap.to(heroRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", end: "bottom top", scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const marquee =
    "SAATHVIK KALEPU · SOFTWARE ENGINEER · BACKEND & DATA · AI/ML · HYDERABAD, INDIA · B.TECH CSE · IIITDM · 2027 ·";

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-svh flex flex-col overflow-hidden bg-[#050412]"
      data-testid="hero-section"
    >
      {/* CSS gradient atmosphere */}
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />
      <div className="hero-blob hero-blob-3" aria-hidden="true" />

      <div className="relative z-10 flex flex-col flex-1">

        {/* ── Top rule ── */}
        <div className="px-6 sm:px-10 md:px-16 pt-[5.5rem] md:pt-24">
          <div className="hero-top-rule h-px bg-white/[0.09] relative">
            <span className="absolute left-0 -top-[18px] font-mono text-[9px] tracking-[0.28em] text-white/[0.18] uppercase">
              Portfolio · 2025
            </span>
            <span className="absolute right-0 -top-[18px] font-mono text-[9px] tracking-[0.28em] text-white/[0.18] uppercase hidden sm:block">
              ● Open to work · Hyderabad, India
            </span>
          </div>
        </div>

        {/* ── FULL-WIDTH name — pushes to bottom of flex space ── */}
        <div className="flex-1 flex flex-col justify-end px-6 sm:px-10 md:px-16 pt-10 md:pt-14 pb-5 md:pb-7">
          <h1
            className="hero-name-v3 font-serif tracking-[-0.025em]"
            aria-label="Saathvik Kalepu"
          >
            <SplitLine text="SAATHVIK" />
            <SplitLine text="KALEPU." gradient />
          </h1>
        </div>

        {/* ── Meta row: left label + right role/desc/ctas ── */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 px-6 sm:px-10 md:px-16 pb-8 md:pb-10">

          {/* Left: sub-label */}
          <div className="hero-meta-left flex items-center gap-3 self-end">
            <div className="w-7 h-px bg-white/[0.18]" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-white/[0.28] uppercase">
              B.Tech CSE · IIITDM Kurnool · Expected 2027
            </span>
          </div>

          {/* Right: identity + description + CTAs */}
          <div className="hero-meta-right flex flex-col gap-5 md:pl-8 lg:pl-16">

            <div>
              <p className="font-mono text-[9px] tracking-[0.32em] text-violet-400/55 uppercase mb-2">
                Role
              </p>
              <p className="text-white/75 text-lg font-light leading-snug">
                Software Engineer
              </p>
              <p className="font-mono text-[11px] text-white/30 mt-0.5 tracking-wide">
                Backend · Data Pipelines · AI/ML
              </p>
            </div>

            <p className="text-white/38 text-[13px] leading-[1.8] max-w-[22rem]">
              Building intelligent systems from the ground up — APIs,
              data pipelines, and AI applications that run reliably
              in production.
            </p>

            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.22em] uppercase text-white hover:text-violet-400 transition-colors duration-300"
                onMouseMove={(e) => magneticMove(e, 0.3)}
                onMouseLeave={magneticLeave}
                data-hover="true"
                data-testid="hero-cta-work"
              >
                <span className="w-6 h-px bg-white/45 group-hover:w-12 group-hover:bg-violet-400 transition-all duration-500" />
                View Work
              </a>

              <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-emerald-400/60 tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Open to work
              </span>

              <a
                href="mailto:saathvikk202@gmail.com"
                className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/[0.2] hover:text-white/55 transition-colors duration-300"
                data-hover="true"
                data-testid="hero-cta-contact"
              >
                Get in Touch
              </a>
            </div>

          </div>
        </div>

        {/* ── Bottom rule ── */}
        <div className="px-6 sm:px-10 md:px-16">
          <div className="hero-bottom-rule h-px bg-white/[0.07]" />
        </div>

        {/* ── Velocity marquee ── */}
        <VelocityMarquee text={marquee} />

      </div>
    </section>
  );
}
