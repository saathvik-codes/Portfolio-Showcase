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
      "Full-stack mental wellness platform with NLP-powered mood analysis, journaling, and AI-driven recommendations. Real-time Firebase sync, TypeScript frontend, concurrent request handling in Flask.",
    tags: ["TypeScript", "React", "Flask", "Python", "NLP", "Firebase"],
    year: "2025",
    type: "Full Stack",
    color: "#a78bfa",
    github: "https://github.com/saathvik-codes/Serenity-Mental-Wellness-Platform",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&h=380&fit=crop&auto=format&q=80",
  },
  {
    index: "02",
    title: "TaskVise",
    subtitle: "Team Task Management System",
    description:
      "Enterprise-grade task management with RBAC, real-time status updates, deadline tracking, and priority queuing. Fully typed TypeScript codebase across frontend and backend.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MongoDB"],
    year: "2025",
    type: "Full Stack",
    color: "#c084fc",
    github: "https://github.com/saathvik-codes/TaskVise-Company-Task-Manging-System",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=700&h=380&fit=crop&auto=format&q=80",
  },
  {
    index: "03",
    title: "CogniShield",
    subtitle: "Explainable Behavioral Security",
    description:
      "AI-based anomalous user detection using behavioral biometrics — keystroke dynamics, mouse patterns. SHAP explainability produces auditable, human-readable security decisions.",
    tags: ["Python", "ML", "SHAP/XAI", "Behavioral Biometrics", "scikit-learn"],
    year: "2025",
    type: "AI / Security",
    color: "#e879f9",
    github: "https://github.com/saathvik-codes/Explainable-Behavioral-Security-Platform",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&h=380&fit=crop&auto=format&q=80",
  },
  {
    index: "04",
    title: "Unicounsel",
    subtitle: "Student Counselling Platform",
    description:
      "University student counselling platform with TypeScript component architecture, Firebase real-time notifications, scalable microservice backend, and agile team delivery.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Firebase"],
    year: "2025",
    type: "Internship",
    color: "#818cf8",
    github: "https://github.com/saathvik-codes/Unicounsel-flasknow",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=380&fit=crop&auto=format&q=80",
  },
  {
    index: "05",
    title: "Supply Chain Optimizer",
    subtitle: "Logistics Cost Engine",
    description:
      "Linear programming solution via PuLP for multi-node supply chain routing and demand allocation under cost and capacity constraints. Achieved 18% cost efficiency improvement over baseline heuristics.",
    tags: ["Python", "PuLP", "NumPy", "Linear Programming"],
    year: "2024",
    type: "Academic",
    color: "#34d399",
    github: null,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=380&fit=crop&auto=format&q=80",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.13,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 px-4 sm:px-8 md:px-16 overflow-hidden"
      data-testid="projects-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">03 — Projects</div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <h2
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-800 leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            data-testid="projects-heading"
          >
            Selected<br />
            <span className="gradient-text">Work.</span>
          </h2>
          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300 self-start md:self-end"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="group-hover:translate-x-0.5 inline-block transition-transform">More on GitHub ↗</span>
          </a>
        </div>

        {/* 2-col grid for top 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {projects.slice(0, 4).map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              i={i}
              active={hovered === i}
              onHover={setHovered}
            />
          ))}
        </div>

        {/* 5th project — wide */}
        <ProjectCard
          project={projects[4]}
          i={4}
          active={hovered === 4}
          onHover={setHovered}
          wide
        />

        {/* GitHub CTA banner */}
        <div className="mt-10">
          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-6 sm:px-8 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-violet-500/30 transition-all duration-400 group"
            data-hover="true"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/30 group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </div>
              <div>
                <div className="text-white/60 font-medium text-sm group-hover:text-white transition-colors">View all repositories on GitHub</div>
                <div className="font-mono text-xs text-white/20 mt-0.5">github.com/saathvik-codes · More projects available</div>
              </div>
            </div>
            <div className="text-white/20 group-hover:text-violet-400 group-hover:translate-x-1 transition-all text-lg">→</div>
          </a>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  i: number;
  active: boolean;
  onHover: (i: number | null) => void;
  wide?: boolean;
}

function ProjectCard({ project, i, active, onHover, wide }: ProjectCardProps) {
  return (
    <div
      className={`proj-card group rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.15] bg-[#0d0d0d] transition-all duration-500 cursor-pointer flex flex-col ${wide ? "md:flex-row" : ""}`}
      onMouseEnter={() => onHover(i)}
      onMouseLeave={() => onHover(null)}
      data-hover="true"
      data-testid={`project-card-${i}`}
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden shrink-0 ${wide ? "md:w-[340px] h-48 md:h-auto" : "h-48 sm:h-52"}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Color tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${project.color}22 0%, transparent 60%)` }}
        />

        {/* Index badge */}
        <div className="absolute top-3 left-4 font-mono text-xs text-white/40">{project.index}</div>

        {/* Type pill */}
        <div
          className="absolute top-3 right-4 font-mono text-xs px-3 py-1 rounded-full backdrop-blur-sm"
          style={{
            background: `${project.color}20`,
            color: project.color,
            border: `1px solid ${project.color}35`,
          }}
        >
          {project.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3
              className="text-lg sm:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Syne', sans-serif" }}
              data-testid={`project-title-${i}`}
            >
              {project.title}
            </h3>
            <p className="text-white/30 text-xs sm:text-sm font-mono mt-0.5">{project.subtitle}</p>
          </div>
          <span className="font-mono text-xs text-white/20 shrink-0 pt-1">{project.year}</span>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-pill text-xs">{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:translate-x-0.5"
              style={{ color: active ? project.color : "rgba(255,255,255,0.22)" }}
              onClick={(e) => e.stopPropagation()}
              data-hover="true"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View on GitHub ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-white/15 tracking-widest uppercase">Academic Project</span>
          )}
        </div>
      </div>
    </div>
  );
}
