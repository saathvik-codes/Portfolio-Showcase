import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { value: "500+", label: "LeetCode Problems Solved", color: "#a78bfa" },
  { value: "Top 10%", label: "LeetCode Global Rank", color: "#c084fc" },
  { value: "8.2", label: "CGPA at IITDM Kurnool", color: "#818cf8" },
  { value: "6 mo", label: "Industry Internship", color: "#e879f9" },
  { value: "5+", label: "Full-Stack Projects", color: "#a78bfa" },
  { value: "10+", label: "Certifications Earned", color: "#34d399" },
  { value: "3×", label: "Hackathon Participant", color: "#fbbf24" },
  { value: "Expert", label: "GitHub Campus Expert", color: "#f97316" },
];

const Dot = ({ color }: { color: string }) => (
  <span className="inline-block w-1 h-1 rounded-full mx-6 opacity-40" style={{ background: color }} />
);

const ticker = [...items, ...items];

export default function AchievementsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth / 2;
        tweenRef.current = gsap.to(trackRef.current, {
          x: -totalWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    const el = sectionRef.current;
    const handleEnter = () => tweenRef.current?.timeScale(0.4);
    const handleLeave = () => tweenRef.current?.timeScale(1);
    el?.addEventListener("mouseenter", handleEnter);
    el?.addEventListener("mouseleave", handleLeave);

    return () => {
      ctx.revert();
      el?.removeEventListener("mouseenter", handleEnter);
      el?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 overflow-hidden"
      aria-label="Achievements"
    >
      {/* Top/bottom edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(167,139,250,0.12), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(167,139,250,0.12), transparent)" }} />

      {/* Left / right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

      <div className="flex items-center gap-0" style={{ whiteSpace: "nowrap" }}>
        <div ref={trackRef} className="flex items-center" style={{ whiteSpace: "nowrap" }}>
          {ticker.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="inline-flex items-center gap-3 px-4">
                <span
                  className="font-serif text-2xl font-800 leading-none"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: item.color }}
                >
                  {item.value}
                </span>
                <span className="font-mono text-xs text-white/30 tracking-wide leading-none">
                  {item.label}
                </span>
              </span>
              <Dot color={item.color} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
