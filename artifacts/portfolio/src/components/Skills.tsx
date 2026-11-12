import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";
import { skillMatrix } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-row-anim",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
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
      className="relative py-20 md:py-28 px-5 sm:px-8 border-b border-[#e4e2dd]"
      data-testid="skills-section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-kicker mb-2">04 · Technical Stack</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#141413]">
              Tools chosen by{" "}
              <span className="font-serif-editorial italic font-normal text-[#57534e]">
                constraint.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#57534e] max-w-md">
            Systems programming, backend APIs, applied AI guardrails, and modern frontend craft.
          </p>
        </div>

        {/* Clean 6-row specification table */}
        <div className="divide-y divide-[#e4e2dd] border-y border-[#e4e2dd]">
          {skillMatrix.map((row) => (
            <div
              key={row.label}
              className="skill-row-anim grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1.5 md:gap-8 py-4 sm:py-5 items-baseline"
            >
              <span className="font-mono text-xs font-medium text-[#2563eb]">
                {row.label}
              </span>
              <span className="text-sm sm:text-base text-[#141413] leading-relaxed">
                {row.items}
              </span>
            </div>
          ))}
        </div>

        {/* Clean 3-column proof cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <a
            href="https://leetcode.com/u/Sunny550/"
            target="_blank"
            rel="noreferrer"
            className="clean-card rounded-2xl p-6 hover:border-[#2563eb]/50 transition-colors group"
          >
            <div className="text-xs font-medium text-[#2563eb] mb-1.5">
              Algorithmic Practice
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              <CountUp to={350} />+
            </div>
            <p className="text-xs sm:text-sm text-[#57534e] mt-1.5">
              LeetCode problems solved (35 Hard, 150+ Medium)
            </p>
            <div className="mt-4 font-mono text-[11px] text-[#78716c] group-hover:text-[#2563eb] transition-colors">
              Verify Profile Sunny550 ↗
            </div>
          </a>

          <div className="clean-card rounded-2xl p-6">
            <div className="text-xs font-medium text-[#0f766e] mb-1.5">
              Production Practice
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              12+ mo
            </div>
            <p className="text-xs sm:text-sm text-[#57534e] mt-1.5">
              Across Darwix AI (Voice/Video AI), Caterworld.ai (CI/CD &amp; PWA) &amp; AIMaster.live
            </p>
          </div>

          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="clean-card rounded-2xl p-6 hover:border-[#2563eb]/50 transition-colors group"
          >
            <div className="text-xs font-medium text-[#4338ca] mb-1.5">
              Open Source Footprint
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              <CountUp to={45} />+
            </div>
            <p className="text-xs sm:text-sm text-[#57534e] mt-1.5">
              Public repositories across Go consensus, C++ protocols, Spring Boot &amp; AI workflows
            </p>
            <div className="mt-4 font-mono text-[11px] text-[#78716c] group-hover:text-[#4338ca] transition-colors">
              Browse saathvik-codes ↗
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
