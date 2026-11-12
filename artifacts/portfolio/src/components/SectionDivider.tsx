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
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          end: "bottom 8%",
          toggleActions: "play reverse play reverse",
        },
      });
      tl.fromTo(
        ".sdiv-line-l",
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "right center", duration: 1.0, ease: "power3.out" },
        0,
      )
        .fromTo(
          ".sdiv-line-r",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 1.0, ease: "power3.out" },
          0,
        )
        .fromTo(
          ".sdiv-dot",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(3)" },
          0.25,
        )
        .fromTo(
          ".sdiv-label",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
          0.2,
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative px-4 sm:px-8 md:px-16 py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div
          className="sdiv-line-l flex-1 h-px"
          style={{
            background: accent
              ? "linear-gradient(to right, transparent, rgba(232,168,90,0.28))"
              : "linear-gradient(to right, transparent, rgba(242,237,228,0.1))",
          }}
        />
        <div className="sdiv-label flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] text-white/30 tracking-[0.2em]">{index}</span>
          <div
            className="sdiv-dot w-1.5 h-1.5 rounded-full"
            style={{
              background: accent ? "rgba(232,168,90,0.7)" : "rgba(157,140,255,0.4)",
            }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{
              color: accent ? "rgba(232,168,90,0.68)" : "rgba(242,237,228,0.34)",
            }}
          >
            {label}
          </span>
        </div>
        <div
          className="sdiv-line-r flex-1 h-px"
          style={{
            background: accent
              ? "linear-gradient(to left, transparent, rgba(232,168,90,0.28))"
              : "linear-gradient(to left, transparent, rgba(242,237,228,0.1))",
          }}
        />
      </div>
    </div>
  );
}
