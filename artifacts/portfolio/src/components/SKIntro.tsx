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
  const glowRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const paths = [sPathRef.current, kLineRef.current, kTop.current, kBot.current].filter(Boolean) as SVGPathElement[];

    // Init path dash
    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 300;
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });

    gsap.set(dotRef.current, { scale: 0, transformOrigin: "center", opacity: 0 });
    gsap.set(nameRef.current, { opacity: 0, y: 15 });
    gsap.set(tagRef.current, { opacity: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set(ring1Ref.current, { scale: 0.6, opacity: 0, transformOrigin: "86px 86px" });
    gsap.set(ring2Ref.current, { scale: 0.6, opacity: 0, transformOrigin: "86px 86px" });

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Dramatic exit: scale up glow, then sweep overlay
        const exitTl = gsap.timeline({ onComplete: () => onComplete() });
        exitTl
          .to(glowRef.current, { scale: 8, opacity: 0, duration: 0.7, ease: "power2.in" })
          .to(overlay, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
            ease: "power4.inOut",
          }, "-=0.4")
          .set(overlay, { display: "none" });
      },
    });

    // Progress bar
    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 2.8,
      ease: "power1.inOut",
    }, 0);

    // Counter
    tl.to(obj, {
      val: 100,
      duration: 2.8,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(obj.val).toString().padStart(3, "0");
      },
    }, 0);

    // Rings expand
    tl.to([ring1Ref.current, ring2Ref.current], {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
    }, 0.1);

    // Draw paths staggered
    paths.forEach((p, i) => {
      tl.to(p, { strokeDashoffset: 0, duration: 1.2, ease: "power3.inOut" }, 0.15 + i * 0.15);
    });

    // Glow pulse
    tl.to(glowRef.current, {
      scale: 1.3,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    }, 1.2);

    // Dot pop
    tl.to(dotRef.current, {
      scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)",
    }, 1.4);

    // Color shift
    tl.to(paths, {
      attr: { stroke: "#c4b5fd" },
      duration: 0.6,
      ease: "power2.out",
    }, 1.6);

    // Name
    tl.to(nameRef.current, {
      opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
    }, 1.7);

    // Tag
    tl.to(tagRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
    }, 1.9);

    // Hold
    tl.to({}, { duration: 0.8 });

    // Fade all content before exit
    tl.to([...paths, dotRef.current, nameRef.current, tagRef.current, ring1Ref.current, ring2Ref.current, progressBarRef.current], {
      opacity: 0, duration: 0.4, ease: "power2.in",
    });

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      data-testid="sk-intro"
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: "gridMove 8s linear infinite",
        }}
      />

      {/* Corner brackets */}
      {[
        "top-8 left-8 border-t border-l",
        "top-8 right-8 border-t border-r",
        "bottom-8 left-8 border-b border-l",
        "bottom-8 right-8 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 border-violet-500/20 ${cls}`}
        />
      ))}

      {/* Scanning line */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(167,139,250,0.5), transparent)",
          animation: "scanLine 2.8s linear forwards",
          top: 0,
        }}
      />

      {/* Radial glow behind logo */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
          borderRadius: "50%",
          opacity: 0.6,
        }}
      />

      {/* Center: SK Logo */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        <svg
          viewBox="0 0 172 172"
          width="200"
          height="200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="sk-svg"
        >
          {/* Orbit rings */}
          <circle
            ref={ring1Ref}
            cx="86" cy="86" r="80"
            stroke="rgba(167,139,250,0.12)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            ref={ring2Ref}
            cx="86" cy="86" r="66"
            stroke="rgba(192,132,252,0.08)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          {/* S — elegant, wide */}
          <path
            ref={sPathRef}
            d="M 26 46 C 26 46 70 30 70 54 C 70 73 26 73 26 92 C 26 111 70 106 70 106"
            stroke="#a78bfa"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* K — vertical */}
          <path
            ref={kLineRef}
            d="M 96 30 L 96 116"
            stroke="#a78bfa"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* K top arm */}
          <path
            ref={kTop}
            d="M 96 72 L 148 30"
            stroke="#a78bfa"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* K bottom arm */}
          <path
            ref={kBot}
            d="M 96 72 L 148 116"
            stroke="#a78bfa"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Accent dot */}
          <circle
            ref={dotRef}
            cx="156"
            cy="116"
            r="6"
            fill="#c084fc"
          />
        </svg>

        <div className="flex flex-col items-center gap-2">
          <p
            ref={nameRef}
            className="font-mono text-sm tracking-[0.5em] text-white/60 uppercase"
            data-testid="intro-name"
          >
            Saathvik Kalepu
          </p>
          <p
            ref={tagRef}
            className="font-mono text-xs tracking-[0.3em] text-violet-400/40 uppercase"
          >
            Software Developer
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-violet-500/10" />
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-violet-500/60 via-purple-400/80 to-fuchsia-500/60"
      />

      {/* Counter */}
      <div className="absolute bottom-6 left-10 font-mono text-xs text-violet-400/40 tracking-[0.2em]">
        <span ref={counterRef} className="text-2xl font-800 text-violet-400/20" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>000</span>
        <span className="ml-1 text-xs text-violet-500/30">%</span>
      </div>

      {/* Status top-right */}
      <div className="absolute top-10 right-10 font-mono text-xs tracking-[0.3em] text-white/10 uppercase flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-violet-400/30 animate-pulse" />
        Initializing
      </div>

      {/* Corner label */}
      <div className="absolute top-10 left-10 font-mono text-xs tracking-[0.2em] text-white/8 uppercase">
        v2.0 · 2025
      </div>

      <style>{`
        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 80px 80px; }
        }
        @keyframes scanLine {
          from { top: 0; opacity: 1; }
          to { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
