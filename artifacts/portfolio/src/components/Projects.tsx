import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "Serenity",
    subtitle: "AI Mental Wellness Platform",
    description: "A full-stack mental wellness platform featuring user engagement interfaces and intuitive interaction designed for mental health tracking and support.",
    tags: ["TypeScript", "React", "Flask", "Python", "NLP", "Firebase"],
    year: "2025",
    type: "Full Stack",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 1,
    color: "#a78bfa",
    accent: "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(88,28,135,0.06) 100%)",
    border: "rgba(139,92,246,0.25)",
    github: "https://github.com/saathvik-codes/Serenity-Mental-Wellness-Platform",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="20" r="18" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5"/>
        <path d="M12 22 Q16 14 20 20 Q24 26 28 18" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="20" r="3" fill="rgba(167,139,250,0.6)"/>
        <path d="M20 10 Q22 12 20 14 Q18 12 20 10" fill="#a78bfa" opacity="0.5"/>
      </svg>
    ),
  },
  {
    index: "02",
    title: "TaskVise",
    subtitle: "Company Task Management System",
    description: "A task management tool built in TypeScript to help teams assign, track, and organize work with efficiency and clarity across departments.",
    tags: ["TypeScript", "React", "Node.js", "Express", "MongoDB"],
    year: "2025",
    type: "Full Stack",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 0,
    color: "#c084fc",
    accent: "linear-gradient(135deg, rgba(192,132,252,0.15) 0%, rgba(126,34,206,0.05) 100%)",
    border: "rgba(192,132,252,0.22)",
    github: "https://github.com/saathvik-codes/TaskVise-Company-Task-Manging-System",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <rect x="2" y="2" width="36" height="36" rx="8" fill="rgba(192,132,252,0.12)" stroke="rgba(192,132,252,0.25)" strokeWidth="1.5"/>
        <rect x="10" y="13" width="20" height="3" rx="1.5" fill="rgba(192,132,252,0.7)"/>
        <rect x="10" y="20" width="16" height="3" rx="1.5" fill="rgba(192,132,252,0.4)"/>
        <rect x="10" y="27" width="12" height="3" rx="1.5" fill="rgba(192,132,252,0.25)"/>
        <circle cx="30" cy="28.5" r="4" fill="rgba(192,132,252,0.3)" stroke="rgba(192,132,252,0.6)" strokeWidth="1"/>
        <path d="M28 28.5L29.5 30L32 27" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    index: "03",
    title: "CogniShield",
    subtitle: "Explainable Behavioral Security",
    description: "An explainable behavioral security platform that detects anomalous user activity on Windows systems using behavioral biometrics and provides human-readable explanations.",
    tags: ["Python", "ML", "SHAP/XAI", "Behavioral Biometrics", "scikit-learn"],
    year: "2025",
    type: "AI / Security",
    lang: "Python",
    langColor: "#3572A5",
    stars: 1,
    color: "#e879f9",
    accent: "linear-gradient(135deg, rgba(232,121,249,0.14) 0%, rgba(134,25,143,0.05) 100%)",
    border: "rgba(232,121,249,0.22)",
    github: "https://github.com/saathvik-codes/Explainable-Behavioral-Security-Platform",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <path d="M20 3 L34 9 L34 22 C34 29 27 35 20 38 C13 35 6 29 6 22 L6 9 Z" fill="rgba(232,121,249,0.1)" stroke="rgba(232,121,249,0.35)" strokeWidth="1.5"/>
        <circle cx="15" cy="18" r="2.5" fill="rgba(232,121,249,0.5)"/>
        <circle cx="25" cy="18" r="2.5" fill="rgba(232,121,249,0.5)"/>
        <circle cx="20" cy="26" r="2.5" fill="rgba(232,121,249,0.7)"/>
        <line x1="15" y1="18" x2="25" y2="18" stroke="rgba(232,121,249,0.3)" strokeWidth="1"/>
        <line x1="15" y1="18" x2="20" y2="26" stroke="rgba(232,121,249,0.3)" strokeWidth="1"/>
        <line x1="25" y1="18" x2="20" y2="26" stroke="rgba(232,121,249,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    index: "04",
    title: "Unicounsel",
    subtitle: "Student Counselling Platform",
    description: "A TypeScript-based front-end project for Unicounsel — a structured UI with clean component architecture and responsive layout patterns for university counselling.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Firebase"],
    year: "2025",
    type: "Internship",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 0,
    color: "#818cf8",
    accent: "linear-gradient(135deg, rgba(129,140,248,0.14) 0%, rgba(67,56,202,0.05) 100%)",
    border: "rgba(129,140,248,0.22)",
    github: "https://github.com/saathvik-codes/Unicounsel-flasknow",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="20" r="18" fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.25)" strokeWidth="1.5"/>
        <circle cx="20" cy="15" r="5" fill="rgba(129,140,248,0.3)" stroke="rgba(129,140,248,0.5)" strokeWidth="1"/>
        <path d="M10 32 C10 26 14 23 20 23 C26 23 30 26 30 32" stroke="rgba(129,140,248,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    index: "05",
    title: "Crowdfunding Platform",
    subtitle: "Secure Crowdfunding System",
    description: "A secure, scalable crowdfunding platform with role-based access control, JWT authentication, transaction consistency, and optimized REST APIs.",
    tags: ["React", "Node.js", "Express", "SQLite", "JWT"],
    year: "2024",
    type: "Academic",
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 0,
    color: "#fbbf24",
    accent: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(180,83,9,0.05) 100%)",
    border: "rgba(251,191,36,0.2)",
    github: null,
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <rect x="2" y="2" width="36" height="36" rx="8" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.25)" strokeWidth="1.5"/>
        <rect x="10" y="22" width="5" height="10" rx="1" fill="rgba(251,191,36,0.3)"/>
        <rect x="17.5" y="16" width="5" height="16" rx="1" fill="rgba(251,191,36,0.5)"/>
        <rect x="25" y="10" width="5" height="22" rx="1" fill="rgba(251,191,36,0.7)"/>
        <path d="M11 14 L17 10 L25 13 L32 8" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    index: "06",
    title: "Supply Chain Optimizer",
    subtitle: "Logistics Cost Optimization Engine",
    description: "Optimization models using linear programming (PuLP) for routing and demand allocation. Improved simulated logistics costs by up to 18% over baseline heuristics.",
    tags: ["Python", "PuLP", "NumPy", "Tableau", "Linear Programming"],
    year: "2024",
    type: "Academic",
    lang: "Python",
    langColor: "#3572A5",
    stars: 0,
    color: "#34d399",
    accent: "linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(4,120,87,0.04) 100%)",
    border: "rgba(52,211,153,0.2)",
    github: null,
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="8" cy="20" r="4" fill="rgba(52,211,153,0.3)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"/>
        <circle cx="32" cy="20" r="4" fill="rgba(52,211,153,0.5)" stroke="rgba(52,211,153,0.7)" strokeWidth="1.5"/>
        <circle cx="20" cy="10" r="3.5" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5"/>
        <circle cx="20" cy="30" r="3.5" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5"/>
        <line x1="12" y1="20" x2="28" y2="20" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5"/>
        <line x1="8" y1="20" x2="20" y2="10" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
        <line x1="8" y1="20" x2="20" y2="30" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
        <line x1="32" y1="20" x2="20" y2="10" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
        <line x1="32" y1="20" x2="20" y2="30" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 px-4 sm:px-8 md:px-16"
      data-testid="projects-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(139,92,246,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="section-index mb-6">03 — Projects</div>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <h2
            className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            Selected <span className="gradient-text">Work.</span>
          </h2>
          <a
            href="https://github.com/saathvik-codes"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-white/30 hover:text-violet-400 font-mono text-xs tracking-widest uppercase transition-colors duration-300 self-start sm:self-end"
            data-hover="true"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            All projects on GitHub
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">↗</span>
          </a>
        </div>

        {/* Gallery grid — 3 col on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="proj-card group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer flex flex-col"
              style={{
                background: "#111111",
                borderColor: p.border,
              }}
              data-hover="true"
              data-testid={`project-card-${i}`}
            >
              {/* Gradient top accent bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${p.color}80 0%, transparent 100%)` }} />

              {/* Card gradient bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: p.accent }} />

              <div className="relative p-5 flex flex-col h-full">
                {/* Top row: icon + type badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <span
                    className="font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}
                  >
                    {p.type}
                  </span>
                </div>

                {/* Title + subtitle */}
                <h3
                  className="text-base font-semibold mb-1 transition-colors duration-300"
                  style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.92)" }}
                  data-testid={`project-title-${i}`}
                >
                  {p.title}
                </h3>
                <p className="text-xs mb-3 font-mono" style={{ color: p.color + "90" }}>{p.subtitle}</p>

                {/* Description */}
                <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1 text-[13px]">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 rounded border"
                      style={{ borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.03)" }}
                    >
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="font-mono text-xs text-white/20">+{p.tags.length - 3}</span>
                  )}
                </div>

                {/* Bottom row: lang + stars + github */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-3">
                    {/* Language dot */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.langColor }} />
                      <span className="font-mono text-xs text-white/30">{p.lang}</span>
                    </div>
                    {/* Stars */}
                    {p.stars > 0 && (
                      <div className="flex items-center gap-1 text-white/25">
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
                        <span className="font-mono text-xs">{p.stars}</span>
                      </div>
                    )}
                  </div>

                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-xs flex items-center gap-1.5 transition-all duration-200 hover:translate-x-0.5"
                      style={{ color: p.color + "70" }}
                      data-hover="true"
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      View ↗
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-white/15">Academic</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <a
          href="https://github.com/saathvik-codes"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between px-6 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-violet-500/25 transition-all duration-300"
          data-hover="true"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/25 group-hover:text-violet-400 group-hover:border-violet-500/25 transition-all">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div>
              <div className="text-white/55 text-sm font-medium group-hover:text-white/80 transition-colors">View all repositories on GitHub</div>
              <div className="font-mono text-xs text-white/20 mt-0.5">github.com/saathvik-codes — more projects available</div>
            </div>
          </div>
          <div className="text-white/20 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all text-base">→</div>
        </a>
      </div>
    </section>
  );
}
