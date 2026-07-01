import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

const skillRows = [
  { label: "Languages", items: "Java · Python · TypeScript · JavaScript · C++ · SQL" },
  { label: "Frameworks", items: "React · Next.js · Node.js · Express · Flask · FastAPI · Django" },
  { label: "AI / ML", items: "PyTorch · HuggingFace · LangChain · scikit-learn · FAISS · Ollama · pandas" },
  { label: "Databases", items: "PostgreSQL · MongoDB · SQLite · DuckDB · Firebase · Redis" },
  { label: "DevOps & Cloud", items: "Docker · AWS · GitHub Actions · CI/CD · Linux · Pytest · Postman" },
  { label: "CS Fundamentals", items: "Data Structures · Algorithms · OOP · System Design · Distributed Systems · REST" },
];

const marqueeItems = [
  "TypeScript", "React", "Node.js", "Python", "FastAPI", "Flask",
  "MongoDB", "PostgreSQL", "Docker", "AWS", "Firebase", "scikit-learn",
  "LangChain", "PyTorch", "Express", "CI/CD", "Java", "C++", "DuckDB", "FAISS",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row reveal — staggered line wipe
      const rows = rowsRef.current?.querySelectorAll(".skill-row");
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Stats reveal
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-28 overflow-hidden"
      data-testid="skills-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 60%, rgba(139,92,246,0.04) 0%, transparent 70%)" }}
      />

      <div className="px-8 md:px-16 max-w-7xl mx-auto mb-10">
        <div className="section-index mb-6 opacity-60">04 — Skills</div>
        <h2
          className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-black text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Technical<br />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Arsenal.
          </span>
        </h2>
      </div>

      {/* Running marquee */}
      <div className="marquee py-3.5 mb-12 border-y border-white/[0.055]">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-5 font-mono text-[11px] text-white/12 tracking-widest uppercase">
              {item}
              <span className="ml-5 text-violet-500/20">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Clean skill table */}
      <div ref={rowsRef} className="px-8 md:px-16 max-w-7xl mx-auto mb-16">
        <div className="divide-y divide-white/[0.065]">
          {skillRows.map((row, i) => (
            <div
              key={i}
              className="skill-row grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-5 md:items-baseline group transition-colors duration-200 hover:bg-white/[0.018] -mx-4 px-4 rounded-lg"
            >
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/28 group-hover:text-violet-400/60 transition-colors duration-300">
                {row.label}
              </span>
              <span className="text-white/60 text-sm sm:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {row.items}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div
        ref={statsRef}
        className="px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <a
          href="https://leetcode.com/u/Sunny550/"
          target="_blank"
          rel="noreferrer"
          className="stat-item group relative overflow-hidden border rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1"
          style={{ borderColor: "rgba(250,204,21,0.15)", background: "rgba(250,204,21,0.035)" }}
          data-hover="true"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-yellow-300/45 mb-3">Problem Solving</div>
          <div
            className="text-5xl font-black text-white mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <CountUp to={200} />+
          </div>
          <div className="text-white/35 text-xs sm:text-sm">LeetCode problems — DSA · DP · Graphs</div>
          <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-yellow-200/50 group-hover:text-yellow-100 transition-colors">
            LeetCode Sunny550 ↗
          </div>
        </a>

        <div
          className="stat-item border rounded-2xl p-6"
          style={{ borderColor: "rgba(139,92,246,0.15)", background: "rgba(139,92,246,0.03)" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-400/45 mb-3">Industry</div>
          <div
            className="text-5xl font-black text-white mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            7mo
          </div>
          <div className="text-white/35 text-xs sm:text-sm">Real-world engineering internship experience</div>
        </div>

        <div
          className="stat-item border rounded-2xl p-6"
          style={{ borderColor: "rgba(240,171,252,0.15)", background: "rgba(240,171,252,0.03)" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fuchsia-300/45 mb-3">Projects Shipped</div>
          <div
            className="text-5xl font-black text-white mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            6+
          </div>
          <div className="text-white/35 text-xs sm:text-sm">Production-grade AI/ML + full-stack builds</div>
        </div>
      </div>
    </section>
  );
}
