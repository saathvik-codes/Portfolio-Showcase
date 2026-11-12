import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";
import { skillMatrix } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const stackMarquee = [
  "Go · Raft · LSM",
  "C++ · Winsock2",
  "Python · FastAPI",
  "TypeScript · React · Next.js 16",
  "Three.js · Theatre.js · GSAP",
  "Vapi Voice AI · Deepgram · ElevenLabs",
  "PostgreSQL · DuckDB · Redis",
  "Spring Boot 3 · Java 21 · Docker",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-row-anim",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
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
      className="relative py-20 md:py-28 overflow-hidden border-t border-white/[0.08]"
      data-testid="skills-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-14 mb-10">
        <div className="section-index mb-3">04 — Technical Stack</div>
        <h2 className="text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[0.95] font-display font-bold text-[#f2ede4]">
          Tools chosen by{" "}
          <span className="font-serif-editorial italic font-normal text-[#e8a85a]">
            constraint.
          </span>
        </h2>
      </div>

      <div className="border-y border-white/[0.08] py-3 mb-12 overflow-hidden bg-[#0b0b0f]/70">
        <div className="marquee-track font-mono text-[11px] tracking-[0.24em] text-white/35 uppercase">
          {[...stackMarquee, ...stackMarquee].map((item, i) => (
            <span key={i} className="mx-5">
              {item}
              <span className="ml-5 text-[#e8a85a]/50">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-14 space-y-12">
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {skillMatrix.map((row) => (
            <div
              key={row.label}
              className="skill-row-anim grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5 items-baseline"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#e8a85a]/85">
                {row.label}
              </span>
              <span className="text-sm sm:text-base text-white/75 leading-relaxed">
                {row.items}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <a
            href="https://leetcode.com/u/Sunny550/"
            target="_blank"
            rel="noreferrer"
            className="studio-plate rounded-2xl p-6 hover:border-[#e8a85a]/50 transition-colors group"
            data-hover="true"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8a85a] mb-2">
              Algorithmic Practice
            </div>
            <div className="font-display text-4xl font-bold text-[#f2ede4]">
              <CountUp to={350} />+
            </div>
            <p className="text-xs sm:text-sm text-white/55 mt-1">
              LeetCode problems solved (35 Hard, 150+ Medium)
            </p>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/45 group-hover:text-[#e8a85a]">
              Verify Profile Sunny550 ↗
            </div>
          </a>

          <div className="studio-plate rounded-2xl p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9d8cff] mb-2">
              Production Practice
            </div>
            <div className="font-display text-4xl font-bold text-[#f2ede4]">12+ mo</div>
            <p className="text-xs sm:text-sm text-white/55 mt-1">
              Across Darwix AI (Voice/Video AI), Caterworld.ai (CI/CD &amp; PWA) &amp; AIMaster.live
            </p>
          </div>

          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="studio-plate rounded-2xl p-6 hover:border-[#9d8cff]/50 transition-colors group"
            data-hover="true"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7dd3fc] mb-2">
              Open Source Footprint
            </div>
            <div className="font-display text-4xl font-bold text-[#f2ede4]">
              <CountUp to={45} />+
            </div>
            <p className="text-xs sm:text-sm text-white/55 mt-1">
              Public repositories spanning Go consensus, C++ protocols, Spring Boot &amp; AI workflows
            </p>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/45 group-hover:text-[#7dd3fc]">
              Browse saathvik-codes ↗
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
