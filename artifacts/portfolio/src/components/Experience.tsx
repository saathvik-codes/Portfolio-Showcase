import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Digital Marketing Intern",
    company: "AIMaster.live",
    period: "Oct 2025 – Jan 2026 · 4 months",
    location: "Hyderabad, India · Hybrid",
    type: "Internship",
    color: "#e879f9",
    points: [
      "Worked on data-driven marketing strategies and content optimization for the AI platform.",
      "Hands-on experience in digital imaging, affiliate marketing, and campaign analytics.",
      "Utilized analytics tools to track performance metrics and iterate on campaign results.",
      "Collaborated cross-functionally with engineering and design teams for product launches.",
    ],
    tags: ["Data Analytics", "Digital Marketing", "Content Strategy", "Campaign Analysis"],
  },
  {
    role: "Software Engineering Manager",
    company: "AIMaster.live",
    period: "Aug 2025 – Oct 2025 · 3 months",
    location: "Hyderabad, India · On-site",
    type: "Internship",
    color: "#a78bfa",
    points: [
      "Contributed to software development by building and improving web-based applications.",
      "Focused on backend logic, system efficiency, clean code principles, and debugging.",
      "Gained practical experience writing maintainable code following engineering best practices.",
      "Reviewed code submissions and provided technical guidance to junior team members.",
    ],
    tags: ["Bootstrap", "Python", "Backend Engineering", "System Design", "Code Review"],
  },
  {
    role: "Web Developer",
    company: "AIMaster.live",
    period: "Jul 2025 – Aug 2025 · 2 months",
    location: "Remote",
    type: "Internship",
    color: "#818cf8",
    points: [
      "Developed dynamic, reusable components using React.js to enhance user experience.",
      "Designed RESTful APIs with Node.js and Express.js for efficient server-side logic.",
      "Optimized database schemas and managed data pipelines for real-time platform needs.",
      "Implemented responsive UI patterns and integrated third-party APIs and services.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "AWS", "Web Design", "REST APIs"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(".exp-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
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
      {/* BG gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">02 — Experience</div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16">
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="experience-heading"
          >
            Where I've<br />
            <span className="gradient-text">grown.</span>
          </h2>
          <div className="md:ml-auto font-mono text-xs text-white/25 tracking-widest">
            AIMaster.live · 7 months total
          </div>
        </div>

        <div className="relative pl-10 md:pl-16">
          {/* Timeline line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-3 bottom-3 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(167,139,250,0.7), rgba(167,139,250,0.1))" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-card relative group" data-testid={`exp-card-${i}`}>
                {/* Timeline dot */}
                <div
                  className="absolute -left-10 md:-left-16 top-6 w-3 h-3 rounded-full border-2 bg-background transition-all duration-300 group-hover:scale-125"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 12px ${exp.color}60`,
                  }}
                />

                {/* Connector line to dot */}
                <div className="absolute -left-7 md:-left-13 top-[27px] w-6 md:w-10 h-px"
                  style={{ background: `linear-gradient(to right, ${exp.color}40, transparent)` }} />

                {/* Card */}
                <div
                  className="project-card p-7 rounded-lg bg-white/[0.025] hover:bg-white/[0.04] transition-all duration-400 group-hover:translate-x-1"
                  style={{ borderColor: `${exp.color}18` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="font-mono text-xs tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                        >
                          {exp.type}
                        </span>
                        <span className="font-mono text-xs text-white/20">{exp.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-violet-200 transition-colors duration-300"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {exp.role}
                      </h3>
                      <p style={{ color: exp.color }} className="font-mono text-sm mt-1 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="font-mono text-xs text-white/25 shrink-0 text-right leading-relaxed">
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/40 text-sm leading-relaxed">
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
