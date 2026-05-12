import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "Serenity",
    subtitle: "AI Mental Wellness Platform",
    description:
      "Full-stack mental wellness platform with NLP-powered mood analysis, journaling, and AI-driven recommendations. Real-time Firebase sync across client and server.",
    tags: ["TypeScript", "React", "Flask", "Python", "NLP", "Firebase"],
    year: "2025",
    type: "Personal · Full Stack",
    color: "#a78bfa",
    accent: "from-violet-600/10 to-purple-900/5",
    icon: "⚡",
  },
  {
    index: "02",
    title: "TaskVise",
    subtitle: "Company Task Management System",
    description:
      "Team task assignment and tracking platform with RBAC, real-time status updates, deadline tracking, and priority queuing. Fully typed TypeScript on both frontend and backend.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "REST APIs"],
    year: "2025",
    type: "Personal · Full Stack",
    color: "#c084fc",
    accent: "from-purple-600/10 to-fuchsia-900/5",
    icon: "◆",
  },
  {
    index: "03",
    title: "CogniShield",
    subtitle: "Explainable Behavioral Security Platform",
    description:
      "Explainable AI-based anomalous user activity detection using behavioral biometrics — keystroke dynamics, mouse patterns, SHAP-based explainability for auditable security decisions.",
    tags: ["Python", "Machine Learning", "SHAP/XAI", "Behavioral Biometrics", "Windows API"],
    year: "2025",
    type: "Personal · AI/Security",
    color: "#e879f9",
    accent: "from-fuchsia-600/10 to-pink-900/5",
    icon: "⬡",
  },
  {
    index: "04",
    title: "Unicounsel",
    subtitle: "Student Counselling Platform",
    description:
      "TypeScript-based frontend for university student counselling with clean component architecture, Firebase real-time notifications, and scalable microservice-style backend components.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Firebase"],
    year: "2025",
    type: "Internship · Full Stack",
    color: "#a78bfa",
    accent: "from-violet-600/10 to-indigo-900/5",
    icon: "◈",
  },
  {
    index: "05",
    title: "Supply Chain Optimizer",
    subtitle: "Logistics Cost Optimization Engine",
    description:
      "Applied linear programming via PuLP to optimize multi-node supply chain routing and demand allocation. Improved simulated logistics cost efficiency by 18% over baseline heuristics.",
    tags: ["Python", "PuLP", "NumPy", "Optimization", "Linear Programming"],
    year: "2024",
    type: "Academic · Engineering",
    color: "#818cf8",
    accent: "from-indigo-600/10 to-blue-900/5",
    icon: "▲",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
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
      id="projects"
      className="relative py-32 px-8 md:px-16 overflow-hidden"
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">03 — Projects</div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="projects-heading"
          >
            Selected<br />
            <span className="gradient-text">Work.</span>
          </h2>
          <p className="text-white/30 text-sm max-w-xs leading-relaxed font-mono">
            5 full-stack and AI/ML projects — independently built and published on GitHub.
          </p>
        </div>

        {/* Project list — horizontal separators */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-item border-t border-white/5 py-8 group cursor-pointer relative overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-testid={`project-item-${i}`}
              data-hover="true"
            >
              {/* Hover BG */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.accent} transition-opacity duration-500 ${hovered === i ? "opacity-100" : "opacity-0"}`}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                {/* Index */}
                <div className="font-mono text-xs text-white/20 shrink-0 w-8 transition-colors duration-300 group-hover:text-violet-400">
                  {project.index}
                </div>

                {/* Icon */}
                <div
                  className="text-2xl shrink-0 w-8 text-center transition-all duration-300"
                  style={{ color: hovered === i ? project.color : "rgba(255,255,255,0.2)" }}
                >
                  {project.icon}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                    <h3
                      className="text-2xl md:text-3xl font-semibold text-white transition-colors duration-300 group-hover:text-violet-200"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                      data-testid={`project-title-${i}`}
                    >
                      {project.title}
                    </h3>
                    <span className="text-white/30 text-sm font-mono shrink-0">
                      — {project.subtitle}
                    </span>
                  </div>

                  <p
                    className={`text-white/35 text-sm leading-relaxed mt-3 max-w-2xl transition-all duration-500 ${hovered === i ? "opacity-100 max-h-20" : "opacity-0 max-h-0"} overflow-hidden`}
                    data-testid={`project-desc-${i}`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="skill-pill" data-testid={`project-tag-${tag}`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="skill-pill opacity-50">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="text-right shrink-0 space-y-1">
                  <div className="font-mono text-xs text-white/20">{project.year}</div>
                  <div className="font-mono text-xs text-white/15">{project.type}</div>
                  <div
                    className="font-mono text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    style={{ color: project.color }}
                  >
                    View Details ↗
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-white/5" />
        </div>
      </div>
    </section>
  );
}
