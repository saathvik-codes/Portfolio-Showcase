import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Software Engineering Intern (AI & Full Stack)",
    company: "aimaster.live",
    period: "6 Months · 2025",
    type: "Internship",
    color: "#a78bfa",
    points: [
      "Developed backend services and APIs following OOP design and clean code principles.",
      "Implemented unit tests with xUnit-style frameworks and performed debugging for production reliability.",
      "Worked on CI/CD pipelines and version control with Git to support rapid development cycles.",
      "Participated in code reviews to ensure adherence to best practices and style guidelines.",
      "Self-learned new technologies to support evolving platform requirements.",
    ],
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Firebase", "CI/CD"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-8 md:px-16 overflow-hidden"
      data-testid="experience-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">02 — Experience</div>

        <h2
          className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white mb-16"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          data-testid="experience-heading"
        >
          Where I've<br />
          <span className="gradient-text">worked.</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, rgba(167,139,250,0.6), rgba(167,139,250,0.1))",
            }}
          />

          <div className="space-y-12 pl-16">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-card relative"
                data-testid={`exp-card-${i}`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-12 top-2 w-3 h-3 rounded-full border-2 border-violet-400 bg-background"
                  style={{ boxShadow: "0 0 12px rgba(167,139,250,0.6)" }}
                />

                {/* Card */}
                <div className="project-card p-8 rounded-sm bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="font-mono text-xs tracking-widest uppercase px-2 py-1 rounded-sm"
                          style={{
                            background: "rgba(167,139,250,0.1)",
                            color: "#a78bfa",
                            border: "1px solid rgba(167,139,250,0.2)",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-semibold text-white"
                        data-testid={`exp-role-${i}`}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-violet-400 font-mono text-sm mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="font-mono text-xs text-white/30 tracking-wide shrink-0">
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-white/40 text-sm leading-relaxed"
                        data-testid={`exp-point-${i}-${j}`}
                      >
                        <span className="text-violet-500/50 mt-1 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="skill-pill text-xs" data-testid={`exp-tag-${tag}`}>
                        {tag}
                      </span>
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
