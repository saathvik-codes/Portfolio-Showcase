import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RollingTitle from "./RollingTitle";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "DevOps Engineer & UI/UX Designer",
    company: "Caterworld Technologies",
    period: "Mar 2026 – May 2026",
    location: "Hybrid",
    type: "Internship",
    color: "#e879f9",
    points: [
      "Streamlined deployment workflows and enhanced responsive UI/UX for core web application modules.",
      "Improved system reliability and modernized the frontend interface for enterprise clients.",
      "Reduced deployment times by optimizing CI/CD pipelines, accelerating product iterations.",
      "Designed intuitive user journeys to bridge the gap between complex backend systems and end-users."
    ],
    tags: ["DevOps", "UI/UX Design", "CI/CD", "Web Development", "System Reliability"],
  },
  {
    role: "Software Engineering & Data Intern",
    company: "AIMaster.live",
    period: "Aug 2024 – Feb 2025",
    location: "Remote",
    type: "Internship",
    color: "#a78bfa",
    points: [
      "Built full-stack features and REST APIs with React, Flask, and Node.js, and shipped cloud delivery pipelines for production workflows.",
      "Analyzed datasets to surface trends and built dashboards that tracked key metrics for the product team.",
      "Used SQL and Python to clean and process data, and optimized backend pipelines for better throughput.",
      "Worked directly with the product team to turn data into decisions, end to end.",
    ],
    tags: ["React", "Python", "Node.js", "REST APIs", "SQL", "Data Visualization"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        ".exp-card",
        { y: 34, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.68,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 md:py-32 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="experience-section"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">02 — Experience</div>

        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 mb-10 md:mb-16">
          <RollingTitle
            lines={[
              { text: "Where I've" },
              { text: "grown.", gradient: true },
            ]}
            className="font-serif text-[clamp(1.75rem,8.4vw,2.15rem)] md:text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.06] md:leading-[1.05] text-white"
            testId="experience-heading"
          />
          <div className="md:ml-auto font-mono text-[11px] sm:text-xs text-white/25 tracking-widest">
            AIMaster.live & Caterworld · Real-world Impact
          </div>
        </div>

        <div className="relative pl-5 sm:pl-10 md:pl-16">
          <div
            ref={lineRef}
            className="absolute left-0 top-3 bottom-3 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(167,139,250,0.7), rgba(167,139,250,0.1))" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-card relative group" data-testid={`exp-card-${i}`}>
                <div
                  className="absolute -left-5 sm:-left-10 md:-left-16 top-6 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 bg-background transition-all duration-300 group-hover:scale-125"
                  style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
                />
                <div className="absolute -left-3 sm:-left-7 md:-left-13 top-[27px] w-3 sm:w-6 md:w-10 h-px"
                  style={{ background: `linear-gradient(to right, ${exp.color}40, transparent)` }} />

                <div
                  className="project-card p-4 sm:p-5 md:p-7 rounded-lg bg-white/[0.053] hover:bg-white/[0.07] transition-all duration-400 group-hover:translate-x-1"
                  style={{ borderColor: `${exp.color}18` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4 mb-4 md:mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <span
                          className="font-mono text-xs tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                        >
                          {exp.type}
                        </span>
                        <span className="font-mono text-[11px] sm:text-xs text-white/20">{exp.location}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-violet-200 transition-colors duration-300"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {exp.role}
                      </h3>
                      <p style={{ color: exp.color }} className="font-mono text-sm mt-1 font-medium">{exp.company}</p>
                    </div>
                    <div className="font-mono text-[11px] sm:text-xs text-white/25 shrink-0 text-left md:text-right leading-relaxed">{exp.period}</div>
                  </div>

                  <ul className="space-y-2.5 mb-5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 sm:gap-3 text-white/40 text-xs sm:text-sm leading-relaxed">
                        <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: exp.color, opacity: 0.7 }} />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="skill-pill" data-testid={`exp-tag-${tag}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
