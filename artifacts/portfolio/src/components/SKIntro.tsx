import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SKIntroProps {
  onComplete: () => void;
}

export default function SKIntro({ onComplete }: SKIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sPathRef = useRef<SVGPathElement>(null);
  const kLineRef = useRef<SVGPathElement>(null);
  const kTop = useRef<SVGPathElement>(null);
  const kBot = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const paths = [sPathRef.current, kLineRef.current, kTop.current, kBot.current].filter(
      Boolean,
    ) as SVGPathElement[];

    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 280;
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });

    gsap.set(dotRef.current, { scale: 0, transformOrigin: "center", opacity: 0 });
    gsap.set(nameRef.current, { opacity: 0, y: 8 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left" });

    let done = false;
    const exitNow = () => {
      if (done) return;
      done = true;
      tl.kill();
      gsap
        .timeline({ onComplete })
        .to(overlay, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        })
        .set(overlay, { display: "none" });
    };

    skipRef.current = exitNow;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") exitNow();
    };
    window.addEventListener("keydown", onKeyDown);

    const tl = gsap.timeline({ onComplete: exitNow });

    tl.to(progressBarRef.current, { scaleX: 1, duration: 0.95, ease: "power1.inOut" }, 0);
    paths.forEach((p, i) => {
      tl.to(p, { strokeDashoffset: 0, duration: 0.45, ease: "power3.inOut" }, 0.05 + i * 0.07);
    });
    tl.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2.2)" }, 0.45);
    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.5);
    tl.to({}, { duration: 0.2 });

    return () => {
      tl.kill();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="intro-overlay" data-testid="sk-intro">
      <div className="flex flex-col items-center gap-5 relative z-10 px-6">
        <svg viewBox="0 0 172 140" width="132" height="108" fill="none" data-testid="sk-svg">
          <path
            ref={sPathRef}
            d="M 26 42 C 26 42 70 28 70 50 C 70 68 26 68 26 86 C 26 105 70 100 70 100"
            stroke="#141413"
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path ref={kLineRef} d="M 96 28 L 96 108" stroke="#141413" strokeWidth="4.6" strokeLinecap="round" />
          <path ref={kTop} d="M 96 68 L 144 28" stroke="#141413" strokeWidth="4.6" strokeLinecap="round" />
          <path ref={kBot} d="M 96 68 L 144 108" stroke="#141413" strokeWidth="4.6" strokeLinecap="round" />
          <circle ref={dotRef} cx="154" cy="108" r="5.5" fill="#2563eb" />
        </svg>

        <p
          ref={nameRef}
          className="font-mono text-xs tracking-[0.32em] text-[#57534e] uppercase"
          data-testid="intro-name"
        >
          Saathvik Kalepu
        </p>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#e4e2dd]" />
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-[2px] w-full bg-[#2563eb]"
      />

      <button
        type="button"
        onClick={() => skipRef.current()}
        className="absolute bottom-6 right-8 z-20 font-mono text-[11px] tracking-[0.2em] text-[#78716c] hover:text-[#141413] uppercase transition-colors cursor-pointer"
        data-testid="intro-skip"
      >
        Skip →
      </button>
    </div>
  );
}
