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
  const counterRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const paths = [sPathRef.current, kLineRef.current, kTop.current, kBot.current].filter(Boolean);

    // Set initial strokeDasharray on all paths
    paths.forEach((p) => {
      if (!p) return;
      const len = p.getTotalLength ? p.getTotalLength() : 300;
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });

    if (dotRef.current) {
      gsap.set(dotRef.current, { scale: 0, transformOrigin: "center", opacity: 0 });
    }
    if (nameRef.current) gsap.set(nameRef.current, { opacity: 0, y: 10 });

    // Counter
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide overlay away
        gsap.to(overlay, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => onComplete(),
        });
      },
    });

    // Animate counter
    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(obj.val) + "%";
      },
    }, 0);

    // Draw paths with CSS transition approach via gsap
    paths.forEach((p, i) => {
      if (!p) return;
      tl.to(p, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power3.inOut",
      }, i * 0.12);
    });

    // Dot appear
    tl.to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(2)",
    }, 1.2);

    // Glow effect on paths
    tl.to(paths, {
      attr: { stroke: "#c4b5fd" },
      duration: 0.5,
      ease: "power2.out",
    }, 1.6);

    // Name fade in
    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 1.5);

    // Pause
    tl.to({}, { duration: 0.7 });

    // Fade out contents
    tl.to([...paths, dotRef.current, nameRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={overlayRef} className="intro-overlay" data-testid="sk-intro">
      {/* Background grid */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow behind logo */}
      <div
        className="absolute"
        style={{
          width: 300,
          height: 300,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Counter */}
      <div className="absolute bottom-10 left-10 font-mono text-xs tracking-[0.2em] text-violet-400/50">
        <span ref={counterRef}>0%</span>
      </div>

      {/* Status */}
      <div className="absolute bottom-10 right-10 font-mono text-xs tracking-[0.2em] text-white/15 uppercase">
        Loading
      </div>

      {/* Center: SK Logo */}
      <div className="flex flex-col items-center gap-8">
        <svg
          viewBox="0 0 200 120"
          width="220"
          height="132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="sk-svg"
        >
          {/* S */}
          <path
            ref={sPathRef}
            d="M 18 28 C 18 28 58 14 58 38 C 58 58 18 58 18 78 C 18 98 58 92 58 92"
            stroke="#a78bfa"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* K vertical */}
          <path
            ref={kLineRef}
            d="M 88 18 L 88 92"
            stroke="#a78bfa"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* K top arm */}
          <path
            ref={kTop}
            d="M 88 56 L 144 18"
            stroke="#a78bfa"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* K bottom arm */}
          <path
            ref={kBot}
            d="M 88 56 L 144 92"
            stroke="#a78bfa"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Accent dot */}
          <circle
            ref={dotRef}
            cx="158"
            cy="92"
            r="5"
            fill="#c084fc"
          />
        </svg>

        <p
          ref={nameRef}
          className="font-mono text-xs tracking-[0.4em] text-white/35 uppercase"
          data-testid="intro-name"
        >
          Saathvik Kalepu
        </p>
      </div>
    </div>
  );
}
