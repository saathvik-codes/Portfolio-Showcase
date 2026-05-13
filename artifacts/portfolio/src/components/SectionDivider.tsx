import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  label: string;
  index: string;
  accent?: boolean;
}

export default function SectionDivider({ label, index, accent = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 92%" },
      });
      tl.from(".sdiv-line-l", { scaleX: 0, transformOrigin: "right center", duration: 1.1, ease: "power3.out" }, 0)
        .from(".sdiv-line-r", { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.out" }, 0)
        .from(".sdiv-dot", { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(3)" }, 0.3)
        .from(".sdiv-label", { opacity: 0, y: 8, duration: 0.6, ease: "power3.out" }, 0.25);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative px-4 sm:px-8 md:px-16 py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div
          className="sdiv-line-l flex-1 h-px"
          style={{ background: accent ? "linear-gradient(to right, transparent, rgba(167,139,250,0.2))" : "linear-gradient(to right, transparent, rgba(255,255,255,0.06))" }}
        />
        <div className="sdiv-label flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] text-white/15 tracking-[0.2em]">{index}</span>
          <div
            className="sdiv-dot w-1.5 h-1.5 rounded-full"
            style={{ background: accent ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.12)" }}
          />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: accent ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.15)" }}>
            {label}
          </span>
        </div>
        <div
          className="sdiv-line-r flex-1 h-px"
          style={{ background: accent ? "linear-gradient(to left, transparent, rgba(167,139,250,0.2))" : "linear-gradient(to left, transparent, rgba(255,255,255,0.06))" }}
        />
      </div>
    </div>
  );
}
