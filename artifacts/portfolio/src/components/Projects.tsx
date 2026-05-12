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
      "Full-stack mental wellness platform with NLP-powered mood analysis, journaling, and AI-driven recommendations. Real-time Firebase sync across client and server with type-safe TypeScript architecture.",
    tags: ["TypeScript", "React", "Flask", "Python", "NLP", "Firebase"],
    year: "2025",
    type: "Personal · Full Stack",
    color: "#a78bfa",
    gradient: "from-violet-900/40 via-purple-900/20 to-fuchsia-900/10",
    patternColor: "rgba(167,139,250,0.12)",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 12 20 Q 16 12 20 20 Q 24 28 28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    index: "02",
    title: "TaskVise",
    subtitle: "Team Task Management System",
    description:
      "Enterprise-grade task management with RBAC, real-time status updates, deadline tracking, and priority queuing. Fully typed TypeScript codebase across both frontend and backend.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "REST APIs"],
    year: "2025",
    type: "Personal · Full Stack",
    color: "#c084fc",
    gradient: "from-purple-900/40 via-fuchsia-900/20 to-pink-900/10",
    patternColor: "rgba(192,132,252,0.12)",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <rect x="6" y="8" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 12 16 L 16 20 L 24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 12 24 L 28 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    index: "03",
    title: "CogniShield",
    subtitle: "Explainable Behavioral Security",
    description:
      "AI-based anomalous user detection using behavioral biometrics — keystroke dynamics, mouse patterns. SHAP-based explainability produces auditable, human-readable security decisions for security teams.",
    tags: ["Python", "Machine Learning", "SHAP/XAI", "Behavioral Biometrics", "scikit-learn"],
    year: "2025",
    type: "Personal · AI/Security",
    color: "#e879f9",
    gradient: "from-fuchsia-900/40 via-pink-900/20 to-rose-900/10",
    patternColor: "rgba(232,121,249,0.12)",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <path d="M 20 6 L 32 11 L 32 22 C 32 29 26 34 20 36 C 14 34 8 29 8 22 L 8 11 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none"/>
        <path d="M 14 20 L 18 24 L 26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    index: "04",
    title: "Unicounsel",
    subtitle: "Student Counselling Platform",
    description:
      "University student counselling platform with clean TypeScript component architecture, Firebase real-time notifications, scalable microservice backend, and agile team collaboration.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Firebase"],
    year: "2025",
    type: "Internship · Full Stack",
    color: "#818cf8",
    gradient: "from-indigo-900/40 via-blue-900/20 to-violet-900/10",
    patternColor: "rgba(129,140,248,0.12)",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 8 34 C 8 28 13 24 20 24 C 27 24 32 28 32 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M 24 20 L 30 26 M 30 20 L 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
  },
  {
    index: "05",
    title: "Supply Chain Optimizer",
    subtitle: "Logistics Cost Engine",
    description:
      "Linear programming solution (via PuLP) for multi-node supply chain routing and demand allocation under cost and capacity constraints. Achieved 18% cost efficiency improvement over baseline heuristics.",
    tags: ["Python", "PuLP", "NumPy", "Linear Programming", "Optimization"],
    year: "2024",
    type: "Academic · Engineering",
    color: "#34d399",
    gradient: "from-emerald-900/40 via-teal-900/20 to-green-900/10",
    patternColor: "rgba(52,211,153,0.12)",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <path d="M 8 30 L 16 20 L 22 26 L 30 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
        <circle cx="30" cy="14" r="3" fill="currentColor" opacity="0.6"/>
        <path d="M 8 34 L 34 34" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M 8 10 L 8 34" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card-item", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
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
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />

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
          <p className="text-white/25 text-sm max-w-xs leading-relaxed font-mono">
            5 full-stack &amp; AI/ML projects — independently built and shipped.
          </p>
        </div>

        {/* Card grid: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {projects.slice(0, 4).map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              i={i}
              active={activeProject === i}
              onHover={(v) => setActiveProject(v ? i : null)}
            />
          ))}
        </div>
        {/* Fifth project — full width */}
        <ProjectCard
          project={projects[4]}
          i={4}
          active={activeProject === 4}
          onHover={(v) => setActiveProject(v ? 4 : null)}
          wide
        />
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  i: number;
  active: boolean;
  onHover: (v: boolean) => void;
  wide?: boolean;
}

function ProjectCard({ project, i, active, onHover, wide }: ProjectCardProps) {
  return (
    <div
      className={`project-card-item project-card rounded-lg overflow-hidden bg-white/[0.02] cursor-pointer group transition-all duration-500 ${wide ? "lg:flex lg:gap-0" : ""}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      data-hover="true"
      data-testid={`project-card-${i}`}
    >
      {/* Image / Visual area */}
      <div
        className={`relative flex items-center justify-center overflow-hidden ${wide ? "lg:w-64 shrink-0" : "h-52"}`}
        style={{ minHeight: wide ? "auto" : undefined }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-500`} />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle, ${project.patternColor} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Animated geometric shape */}
        <div
          className="absolute right-6 top-6 opacity-10 transition-all duration-700 group-hover:opacity-25 group-hover:scale-110"
          style={{ color: project.color }}
        >
          <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="0.5"/>
            {[0,45,90,135,180,225,270,315].map((deg) => {
              const r = Math.PI * deg / 180;
              return <line key={deg} x1="40" y1="40" x2={40 + 38 * Math.cos(r)} y2={40 + 38 * Math.sin(r)} stroke="currentColor" strokeWidth="0.4" />;
            })}
          </svg>
        </div>

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110"
          style={{ color: project.color }}>
          {project.icon}
        </div>

        {/* Index */}
        <div className="absolute top-4 left-4 font-mono text-xs text-white/20">
          {project.index}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-xs tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
              >
                {project.type.split(" · ")[1]}
              </span>
            </div>
            <h3
              className="text-xl font-semibold text-white group-hover:text-violet-200 transition-colors duration-300"
              style={{ fontFamily: "'Syne', sans-serif" }}
              data-testid={`project-title-${i}`}
            >
              {project.title}
            </h3>
            <p className="text-white/30 text-sm font-mono mt-0.5">{project.subtitle}</p>
          </div>
          <div className="font-mono text-xs text-white/20 shrink-0">{project.year}</div>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-5 flex-1" data-testid={`project-desc-${i}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-pill" data-testid={`project-tag-${tag}`}>{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5">
          <span
            className="font-mono text-xs tracking-widest uppercase transition-colors duration-300"
            style={{ color: active ? project.color : "rgba(255,255,255,0.2)" }}
          >
            View on GitHub ↗
          </span>
        </div>
      </div>
    </div>
  );
}
