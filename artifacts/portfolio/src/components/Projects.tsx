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
    gradient: "135deg, rgba(139,92,246,0.25) 0%, rgba(88,28,135,0.15) 50%, rgba(15,10,30,0.5) 100%",
    github: "https://github.com/saathvik-codes/Serenity-Mental-Wellness-Platform",
    ogImage: "https://opengraph.githubassets.com/v1/repository/image?full_name=saathvik-codes%2FSerenity-Mental-Wellness-Platform",
    // SVG visual representing mental wellness / waveform
    visual: (
      <svg viewBox="0 0 280 140" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice">
        <rect width="280" height="140" fill="url(#g1)"/>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(139,92,246,0.3)"/>
            <stop offset="100%" stopColor="rgba(88,28,135,0.1)"/>
          </linearGradient>
        </defs>
        {/* Mood graph line */}
        <path d="M 10 90 Q 40 40 70 80 Q 100 120 130 60 Q 160 20 190 70 Q 220 110 250 50 L 270 60" stroke="rgba(167,139,250,0.8)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 10 90 Q 40 40 70 80 Q 100 120 130 60 Q 160 20 190 70 Q 220 110 250 50 L 270 60 L 270 140 L 10 140 Z" fill="rgba(139,92,246,0.08)"/>
        {/* Dots on graph */}
        {[[70,80],[130,60],[190,70],[250,50]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#a78bfa" opacity="0.9"/>
        ))}
        {/* Journal lines */}
        <rect x="20" y="16" width="80" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="20" y="26" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.05)"/>
        <rect x="20" y="34" width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* AI badge */}
        <rect x="180" y="14" width="48" height="20" rx="10" fill="rgba(167,139,250,0.2)" stroke="rgba(167,139,250,0.4)" strokeWidth="1"/>
        <text x="204" y="28" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace">AI · NLP</text>
      </svg>
    ),
  },
  {
    index: "02",
    title: "TaskVise",
    subtitle: "Team Task Management",
    description:
      "Enterprise-grade task management with RBAC, real-time status updates, deadline tracking, and priority queuing. Fully typed TypeScript codebase across both frontend and backend.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MongoDB"],
    year: "2025",
    type: "Full Stack",
    color: "#c084fc",
    gradient: "135deg, rgba(192,132,252,0.2) 0%, rgba(126,34,206,0.12) 50%, rgba(15,10,30,0.5) 100%",
    github: "https://github.com/saathvik-codes/TaskVise-Company-Task-Manging-System",
    visual: (
      <svg viewBox="0 0 280 140" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice">
        <rect width="280" height="140" fill="rgba(126,34,206,0.08)"/>
        {/* Kanban columns */}
        {[20,105,190].map((x,col) => (
          <g key={col}>
            <rect x={x} y="10" width="75" height="16" rx="3" fill="rgba(192,132,252,0.15)"/>
            <rect x={x} y="34" width="75" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <rect x={x+6} y="40" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>
            <rect x={x+6} y="47" width="30" height="2" rx="1" fill="rgba(255,255,255,0.06)"/>
            <rect x={x} y="68" width="75" height="28" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <rect x={x+6} y="74" width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.10)"/>
            <rect x={x+6} y="81" width="25" height="2" rx="1" fill="rgba(255,255,255,0.05)"/>
            <rect x={x} y="102" width="75" height="28" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <rect x={x+6} y="108" width="35" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
          </g>
        ))}
        {/* Priority badge */}
        <rect x={20} y={34} width={16} height={8} rx="4" fill="rgba(239,68,68,0.4)" transform="translate(53,6)"/>
        <rect x={20} y={34} width={16} height={8} rx="4" fill="rgba(234,179,8,0.4)" transform="translate(53,40)"/>
        <rect x={20} y={34} width={16} height={8} rx="4" fill="rgba(34,197,94,0.4)" transform="translate(138,6)"/>
        {/* Column labels */}
        {["To Do","In Progress","Done"].map((label, i) => (
          <text key={i} x={57 + i*85} y={22} textAnchor="middle" fontSize="7" fill="rgba(192,132,252,0.8)" fontFamily="monospace">{label}</text>
        ))}
      </svg>
    ),
  },
  {
    index: "03",
    title: "CogniShield",
    subtitle: "Explainable Behavioral Security",
    description:
      "AI-based anomalous user detection using behavioral biometrics — keystroke dynamics, mouse patterns. SHAP explainability produces auditable, human-readable security decisions.",
    tags: ["Python", "ML", "SHAP/XAI", "Behavioral Biometrics", "scikit-learn"],
    year: "2025",
    type: "AI/Security",
    color: "#e879f9",
    gradient: "135deg, rgba(232,121,249,0.2) 0%, rgba(134,25,143,0.12) 50%, rgba(15,10,30,0.5) 100%",
    github: "https://github.com/saathvik-codes/Explainable-Behavioral-Security-Platform",
    visual: (
      <svg viewBox="0 0 280 140" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice">
        <rect width="280" height="140" fill="rgba(134,25,143,0.08)"/>
        {/* Neural network nodes */}
        {([[30,30],[30,70],[30,110],[100,20],[100,55],[100,90],[100,125],[170,40],[170,80],[170,120],[240,60],[240,100]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill={i > 9 ? "rgba(232,121,249,0.9)" : i > 6 ? "rgba(232,121,249,0.6)" : i > 2 ? "rgba(232,121,249,0.4)" : "rgba(232,121,249,0.25)"} />
        ))}
        {/* Connections */}
        {([[30,30,100,20],[30,30,100,55],[30,70,100,55],[30,70,100,90],[30,110,100,90],[30,110,100,125],[100,20,170,40],[100,55,170,40],[100,55,170,80],[100,90,170,80],[100,90,170,120],[100,125,170,120],[170,40,240,60],[170,80,240,60],[170,80,240,100],[170,120,240,100]] as number[][]).map((c,i) => (
          <line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke="rgba(232,121,249,0.15)" strokeWidth="1"/>
        ))}
        {/* Shield overlay */}
        <path d="M 220 20 L 260 30 L 260 55 C 260 68 250 78 240 82 C 230 78 220 68 220 55 Z" stroke="rgba(232,121,249,0.5)" strokeWidth="1.5" fill="rgba(232,121,249,0.06)"/>
        <path d="M 232 52 L 237 57 L 248 46" stroke="rgba(232,121,249,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* SHAP bar */}
        <text x="14" y="134" fontSize="7" fill="rgba(232,121,249,0.5)" fontFamily="monospace">SHAP Explainability Active</text>
      </svg>
    ),
  },
  {
    index: "04",
    title: "Unicounsel",
    subtitle: "Student Counselling Platform",
    description:
      "University student counselling platform with TypeScript component architecture, Firebase real-time notifications, scalable microservice backend, and agile team collaboration.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Firebase"],
    year: "2025",
    type: "Internship",
    color: "#818cf8",
    gradient: "135deg, rgba(129,140,248,0.2) 0%, rgba(67,56,202,0.12) 50%, rgba(15,10,30,0.5) 100%",
    github: "https://github.com/saathvik-codes/Unicounsel-flasknow",
    visual: (
      <svg viewBox="0 0 280 140" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice">
        <rect width="280" height="140" fill="rgba(67,56,202,0.06)"/>
        {/* Dashboard UI mockup */}
        {/* Sidebar */}
        <rect x="10" y="10" width="55" height="120" rx="6" fill="rgba(129,140,248,0.08)" stroke="rgba(129,140,248,0.12)" strokeWidth="1"/>
        {[25,45,65,85,105].map((y,i) => (
          <rect key={i} x="18" y={y} width="38" height="8" rx="4" fill={i===0 ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.05)"}/>
        ))}
        {/* Main panel */}
        <rect x="74" y="10" width="196" height="56" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <rect x="82" y="18" width="80" height="8" rx="2" fill="rgba(129,140,248,0.4)"/>
        <rect x="82" y="32" width="140" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="82" y="42" width="110" height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
        {/* Cards row */}
        {[74,140,206].map((x,i) => (
          <rect key={i} x={x} y="74" width="56" height="52" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        ))}
        <rect x="82" y="82" width="30" height="4" rx="2" fill="rgba(129,140,248,0.4)"/>
        <rect x="82" y="91" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
        {/* Online indicator */}
        <circle cx="256" cy="16" r="4" fill="rgba(34,197,94,0.8)"/>
        <text x="248" y="38" textAnchor="middle" fontSize="7" fill="rgba(129,140,248,0.6)" fontFamily="monospace">Live</text>
      </svg>
    ),
  },
  {
    index: "05",
    title: "Supply Chain Optimizer",
    subtitle: "Logistics Cost Engine",
    description:
      "Linear programming solution (via PuLP) for multi-node supply chain routing and demand allocation. Achieved 18% cost efficiency improvement over baseline heuristics.",
    tags: ["Python", "PuLP", "NumPy", "Linear Programming"],
    year: "2024",
    type: "Academic",
    color: "#34d399",
    gradient: "135deg, rgba(52,211,153,0.18) 0%, rgba(4,120,87,0.1) 50%, rgba(15,10,30,0.5) 100%",
    github: null,
    visual: (
      <svg viewBox="0 0 280 140" width="100%" height="100%" fill="none" preserveAspectRatio="xMidYMid slice">
        <rect width="280" height="140" fill="rgba(4,120,87,0.06)"/>
        {/* Network nodes */}
        {([[50,70],[130,25],[130,115],[210,50],[210,95],[260,70]] as [number,number][]).map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i===0||i===5 ? 10 : 7} fill={i===0 ? "rgba(52,211,153,0.4)" : i===5 ? "rgba(52,211,153,0.6)" : "rgba(52,211,153,0.2)"} stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"/>
          </g>
        ))}
        {/* Edges with weights */}
        {([[50,70,130,25],[50,70,130,115],[130,25,210,50],[130,25,210,95],[130,115,210,50],[130,115,210,95],[210,50,260,70],[210,95,260,70]] as number[][]).map((e,i) => (
          <line key={i} x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]} stroke={i<2 ? "rgba(52,211,153,0.6)" : "rgba(52,211,153,0.2)"} strokeWidth={i<2 ? "2" : "1"}/>
        ))}
        {/* Node labels */}
        <text x="50" y="73" textAnchor="middle" fontSize="8" fill="rgba(52,211,153,0.9)" fontFamily="monospace">SRC</text>
        <text x="260" y="73" textAnchor="middle" fontSize="8" fill="rgba(52,211,153,0.9)" fontFamily="monospace">DST</text>
        {/* Improvement badge */}
        <rect x="180" y="10" width="90" height="22" rx="11" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
        <text x="225" y="24" textAnchor="middle" fontSize="8" fill="rgba(52,211,153,0.9)" fontFamily="monospace">↓18% Cost</text>
        {/* Chart bars */}
        {[50,70,40,80,55,65].map((h,i) => (
          <rect key={i} x={14 + i*8} y={130-h*0.5} width="5" height={h*0.5} rx="1" fill={i===3 ? "rgba(52,211,153,0.7)" : "rgba(52,211,153,0.2)"}/>
        ))}
      </svg>
    ),
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
            className="group flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white/25 hover:text-violet-400 transition-colors duration-300 self-start md:self-end"
            data-hover="true"
          >
            <span>More projects on GitHub</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>
        </div>

        {/* 2-col grid, top 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

        {/* 5th full width */}
        <ProjectCard
          project={projects[4]}
          i={4}
          active={hovered === 4}
          onHover={setHovered}
          wide
        />

        {/* GitHub CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/40 hover:text-violet-300 hover:border-violet-500/40 hover:bg-violet-500/5 font-mono text-sm tracking-widest uppercase transition-all duration-300 group"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="group-hover:text-violet-400 transition-colors">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View all projects on GitHub
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
  const isActive = active;

  return (
    <div
      className={`proj-card group rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] bg-[#0d0d0d] transition-all duration-500 cursor-pointer flex flex-col ${wide ? "md:flex-row" : ""}`}
      onMouseEnter={() => onHover(i)}
      onMouseLeave={() => onHover(null)}
      data-hover="true"
      data-testid={`project-card-${i}`}
    >
      {/* Visual area */}
      <div
        className={`relative overflow-hidden ${wide ? "md:w-80 shrink-0 min-h-[180px] md:min-h-0" : "h-44 sm:h-52"}`}
        style={{ background: `linear-gradient(${project.gradient})` }}
      >
        {/* SVG illustration */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          {project.visual}
        </div>

        {/* Shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
          }}
        />

        {/* Index */}
        <div className="absolute top-3 left-4 font-mono text-xs text-white/20">{project.index}</div>

        {/* Type badge */}
        <div
          className="absolute top-3 right-4 font-mono text-xs px-2.5 py-1 rounded-full"
          style={{
            background: `${project.color}18`,
            color: project.color,
            border: `1px solid ${project.color}30`,
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
              className="text-lg sm:text-xl font-semibold text-white group-hover:text-violet-200 transition-colors duration-300"
              style={{ fontFamily: "'Syne', sans-serif" }}
              data-testid={`project-title-${i}`}
            >
              {project.title}
            </h3>
            <p className="text-white/30 text-xs sm:text-sm font-mono mt-0.5">{project.subtitle}</p>
          </div>
          <span className="font-mono text-xs text-white/20 shrink-0 pt-1">{project.year}</span>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1" data-testid={`project-desc-${i}`}>
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
              style={{ color: isActive ? project.color : "rgba(255,255,255,0.25)" }}
              onClick={(e) => e.stopPropagation()}
              data-hover="true"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
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
