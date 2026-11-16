import { useEffect, useRef } from "react";
import gsap from "gsap";

/** SK badge preloader (identity mark), light theme. Skippable with click, Esc, Enter or Space. */
export default function SKIntro({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<SVGPathElement>(null);
  const kLine = useRef<SVGPathElement>(null);
  const kTop = useRef<SVGPathElement>(null);
  const kBot = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const ring1 = useRef<SVGCircleElement>(null);
  const ring2 = useRef<SVGCircleElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onComplete(); return; }

    const paths = [sRef.current, kLine.current, kTop.current, kBot.current].filter(Boolean) as SVGPathElement[];
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });
    gsap.set(dotRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });
    gsap.set([ring1.current, ring2.current], { scale: 0.6, opacity: 0, transformOrigin: "86px 86px" });
    gsap.set([nameRef.current, tagRef.current], { opacity: 0, y: 12 });
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });

    const counter = { v: 0 };
    let done = false;
    const exit = () => {
      if (done) return;
      done = true;
      tl.kill();
      gsap.timeline({ onComplete })
        .to(overlay.querySelector("[data-content]"), { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" })
        .to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut" }, "-=0.05")
        .set(overlay, { display: "none" });
    };
    skipRef.current = exit;
    const onKey = (e: KeyboardEvent) => { if (["Escape", "Enter", " "].includes(e.key)) exit(); };
    window.addEventListener("keydown", onKey);

    const tl = gsap.timeline({ onComplete: exit });
    tl.to(barRef.current, { scaleX: 1, duration: 1.6, ease: "power1.inOut" }, 0)
      .to(counter, {
        v: 100, duration: 1.6, ease: "power1.inOut",
        onUpdate: () => { if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
      }, 0)
      .to([ring1.current, ring2.current], { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 }, 0.05);
    paths.forEach((p, i) => tl.to(p, { strokeDashoffset: 0, duration: 0.7, ease: "power3.inOut" }, 0.1 + i * 0.09));
    tl.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" }, 0.78)
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.95)
      .to(tagRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.08)
      .to({}, { duration: 0.45 });

    return () => { tl.kill(); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] grid place-items-center bg-paper" style={{ clipPath: "inset(0 0 0% 0)" }} role="presentation">
      {["top-8 left-8 border-t border-l", "top-8 right-8 border-t border-r", "bottom-8 left-8 border-b border-l", "bottom-8 right-8 border-b border-r"].map((c) => (
        <span key={c} aria-hidden className={`absolute h-10 w-10 border-hairline ${c}`} />
      ))}

      <div data-content className="relative flex flex-col items-center gap-7 px-6">
        <svg viewBox="0 0 172 172" width="190" height="190" fill="none" aria-label="SK">
          <circle ref={ring1} cx="86" cy="86" r="80" stroke="#d9d4c8" strokeWidth="1" strokeDasharray="4 8" />
          <circle ref={ring2} cx="86" cy="86" r="66" stroke="#e5e0d5" strokeWidth="1" strokeDasharray="2 6" />
          <path ref={sRef} d="M 26 46 C 26 46 70 30 70 54 C 70 73 26 73 26 92 C 26 111 70 106 70 106" stroke="#221d17" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path ref={kLine} d="M 96 30 L 96 116" stroke="#221d17" strokeWidth="5" strokeLinecap="round" />
          <path ref={kTop} d="M 96 72 L 148 30" stroke="#221d17" strokeWidth="5" strokeLinecap="round" />
          <path ref={kBot} d="M 96 72 L 148 116" stroke="#221d17" strokeWidth="5" strokeLinecap="round" />
          <circle ref={dotRef} cx="156" cy="116" r="6" fill="#b4532a" />
        </svg>
        <div className="flex flex-col items-center gap-2 text-center">
          <p ref={nameRef} className="font-mono text-sm uppercase tracking-[0.45em] text-ink">Saathvik Kalepu</p>
          <p ref={tagRef} className="font-mono text-[.7rem] uppercase tracking-[0.3em] text-faint">Software Engineer · Hyderabad, India</p>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-hairline" />
      <div ref={barRef} className="absolute bottom-0 left-0 h-[2px] w-full bg-accent" />
      <div className="absolute bottom-6 left-8 font-mono text-faint">
        <span ref={counterRef} className="font-serif text-2xl text-ink/30">000</span><span className="ml-1 text-xs">%</span>
      </div>
      <button type="button" onClick={() => skipRef.current()} className="absolute bottom-6 right-8 font-mono text-[.72rem] uppercase tracking-[0.2em] text-faint hover:text-ink">
        Skip
      </button>
    </div>
  );
}
