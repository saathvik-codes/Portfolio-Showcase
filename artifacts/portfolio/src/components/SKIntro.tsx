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
  const tagRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
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
    gsap.set(nameRef.current, { opacity: 0, y: 14 });
    gsap.set(tagRef.current, { opacity: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left" });

    const obj = { val: 0 };
    let done = false;

    const exitNow = () => {
      if (done) return;
      done = true;
      tl.kill();
      gsap
        .timeline({ onComplete })
        .to(overlay, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.55,
          ease: "power4.inOut",
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
    tl.to(
      obj,
      {
        val: 100,
        duration: 0.95,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.val).toString().padStart(3, "0");
          }
        },
      },
      0,
    );

    paths.forEach((p, i) => {
      tl.to(p, { strokeDashoffset: 0, duration: 0.45, ease: "power3.inOut" }, 0.05 + i * 0.06);
    });

    tl.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2.4)" }, 0.48);
    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.52);
    tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" }, 0.62);
    tl.to({}, { duration: 0.12 });

    return () => {
      tl.kill();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      data-testid="sk-intro"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(232,168,90,0.09), transparent 45%), radial-gradient(circle at 35% 65%, rgba(157,140,255,0.06), transparent 50%)",
        }}
      />

      <div className="flex flex-col items-center gap-7 relative z-10 px-6">
        <svg viewBox="0 0 172 140" width="176" height="142" fill="none" data-testid="sk-svg">
          <path
            ref={sPathRef}
            d="M 26 42 C 26 42 70 28 70 50 C 70 68 26 68 26 86 C 26 105 70 100 70 100"
            stroke="#e8a85a"
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path ref={kLineRef} d="M 96 28 L 96 108" stroke="#f2ede4" strokeWidth="4.6" strokeLinecap="round" />
          <path ref={kTop} d="M 96 68 L 144 28" stroke="#f2ede4" strokeWidth="4.6" strokeLinecap="round" />
          <path ref={kBot} d="M 96 68 L 144 108" stroke="#f2ede4" strokeWidth="4.6" strokeLinecap="round" />
          <circle ref={dotRef} cx="154" cy="108" r="5.5" fill="#9d8cff" />
        </svg>

        <div className="flex flex-col items-center gap-2 text-center">
          <p
            ref={nameRef}
            className="font-mono text-xs sm:text-sm tracking-[0.42em] text-[#f2ede4]/80 uppercase"
            data-testid="intro-name"
          >
            Saathvik Kalepu
          </p>
          <p ref={tagRef} className="font-mono text-[11px] tracking-[0.24em] text-[#e8a85a]/65 uppercase">
            Engineering Walkthrough · Systems &amp; Applied AI
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.08]" />
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#e8a85a] via-[#f2ede4] to-[#9d8cff]"
      />

      <div className="absolute bottom-6 left-8 font-mono text-xs text-white/35 tracking-[0.2em]">
        <span ref={counterRef} className="font-display text-xl text-[#e8a85a]/75">
          000
        </span>
        <span className="ml-1 text-[10px]">%</span>
      </div>

      <div className="hidden sm:block absolute top-8 left-8 font-mono text-[10px] tracking-[0.26em] text-white/30 uppercase">
        Theatre.js · Three.js Reel
      </div>

      <button
        type="button"
        onClick={() => skipRef.current()}
        className="absolute bottom-6 right-8 z-20 font-mono text-[11px] tracking-[0.22em] text-white/50 hover:text-[#e8a85a] uppercase transition-colors cursor-pointer"
        data-testid="intro-skip"
      >
        Skip ↦
      </button>
    </div>
  );
}
