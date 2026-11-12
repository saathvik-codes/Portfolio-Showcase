import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";
import { education, profile } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
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

  const stats = [
    { num: 8.2, decimals: 1, label: "CGPA at IIITDM Kurnool", suffix: "" },
    { num: 350, decimals: 0, label: "LeetCode Solved (35 Hard)", suffix: "+" },
    { num: 3, decimals: 0, label: "Engineering Internships", suffix: "" },
    { num: 1500, decimals: 0, label: "Candidates Screened via AI", suffix: "+" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-28 px-5 sm:px-8 border-b border-[#e4e2dd]"
      data-testid="about-section"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="about-reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="section-kicker mb-2">01 · Background</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#141413]">
              Built for production,{" "}
              <span className="font-serif-editorial italic font-normal text-[#57534e]">
                explained clearly.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#57534e] max-w-md leading-relaxed">
            B.Tech CSE undergraduate focusing on where backend invariants meet dependable AI systems and clean interfaces.
          </p>
        </div>

        {/* Clean 4-column typographic metrics bar */}
        <div
          className="about-reveal grid grid-cols-2 lg:grid-cols-4 clean-card rounded-2xl divide-y lg:divide-y-0 lg:divide-x divide-[#e4e2dd]"
          data-testid="stats-grid"
        >
          {stats.map(({ num, decimals, label, suffix }) => (
            <div
              key={label}
              className="p-5 sm:p-6"
              data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
                <CountUp to={num} decimals={decimals} />
                <span className="text-[#2563eb]">{suffix}</span>
              </div>
              <div className="text-xs text-[#57534e] mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Narrative + Links */}
          <div className="about-reveal lg:col-span-6 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-[#57534e] leading-relaxed">
              <p>
                Most software breaks in the handoffs — between a webhook and a queue, between an LLM
                tool call and deterministic business state, or between a complex pricing dataset and
                a first-time user.
              </p>
              <p>
                Across internships at{" "}
                <span className="text-[#141413] font-medium">Darwix AI</span>,{" "}
                <span className="text-[#141413] font-medium">Caterworld.ai</span>, and{" "}
                <span className="text-[#141413] font-medium">AIMaster.live</span>, along with core
                projects in <span className="text-[#141413] font-medium">Go</span>,{" "}
                <span className="text-[#141413] font-medium">C++</span>, and{" "}
                <span className="text-[#141413] font-medium">Python / TypeScript</span>, I work from
                storage engines and sockets up through automated evals and web products.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href="https://github.com/saathvik-codes"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-full bg-white border border-[#dcd9d0] text-xs font-medium text-[#141413] hover:border-[#141413] transition-colors"
                data-testid="about-github"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/saathvik-kalepu-17041228b"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-full bg-white border border-[#dcd9d0] text-xs font-medium text-[#141413] hover:border-[#141413] transition-colors"
                data-testid="about-linkedin"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://leetcode.com/u/Sunny550/"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-full bg-white border border-[#dcd9d0] text-xs font-medium text-[#141413] hover:border-[#141413] transition-colors"
              >
                LeetCode Sunny550 ↗
              </a>
              <a
                href={profile.resumePath}
                download
                className="px-3.5 py-2 rounded-full bg-[#f3f1ec] border border-[#e4e2dd] text-xs font-medium text-[#2563eb] hover:bg-[#e8edf9] transition-colors"
                data-testid="about-resume"
              >
                Download Resume ↓
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="about-reveal lg:col-span-6 clean-card rounded-2xl p-6 sm:p-7 divide-y divide-[#eceae4]">
            {education.map((edu, i) => (
              <div key={edu.degree} className={i > 0 ? "pt-5 mt-5" : ""}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-semibold text-[#141413]">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-xs font-medium text-[#2563eb]">
                    {edu.metric}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534e] mt-1">
                  {edu.institution} · <span className="font-mono text-[11px]">{edu.period}</span>
                </p>
                <p className="text-xs text-[#78716c] mt-2 leading-relaxed">{edu.coursework}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
