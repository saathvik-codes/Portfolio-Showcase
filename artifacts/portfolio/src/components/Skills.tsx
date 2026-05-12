import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 3L4 12L8 21M16 3L20 12L16 21M4 12H20"/>
      </svg>
    ),
  },
  {
    category: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21L16 21M12 17V21"/>
      </svg>
    ),
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Flask", "Django", "REST APIs", "Microservices"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="4" rx="1"/>
        <rect x="2" y="10" width="20" height="4" rx="1"/>
        <rect x="2" y="17" width="20" height="4" rx="1"/>
        <circle cx="18" cy="5" r="1" fill="currentColor"/>
        <circle cx="18" cy="12" r="1" fill="currentColor"/>
        <circle cx="18" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    category: "AI / ML",
    skills: ["NLP", "Behavioral Biometrics", "Explainable AI (SHAP)", "scikit-learn"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 3C12 3 8 7 8 12S12 21 12 21"/>
        <path d="M12 3C12 3 16 7 16 12S12 21 12 21"/>
        <path d="M3 12H21"/>
      </svg>
    ),
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Firebase"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 10C18.7 8.5 19 7 19 5.5C19 3 17 2 15 2C13.5 2 12 3 11.5 4.5"/>
        <path d="M6 10C5.3 8.5 5 7 5 5.5C5 3 7 2 9 2C10.5 2 12 3 12.5 4.5"/>
        <path d="M5 17C3.5 16.5 2 15 2 13C2 11 3.5 9.5 5 9"/>
        <path d="M19 17C20.5 16.5 22 15 22 13C22 11 20.5 9.5 19 9"/>
        <path d="M8 17L8 22M12 15V22M16 17V22"/>
        <ellipse cx="12" cy="13" rx="6" ry="4"/>
      </svg>
    ),
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5V19C3 20.7 7 22 12 22C17 22 21 20.7 21 19V5"/>
        <path d="M3 12C3 13.7 7 15 12 15C17 15 21 13.7 21 12"/>
      </svg>
    ),
  },
  {
    category: "Testing",
    skills: ["Unit Testing (xUnit)", "Integration Testing", "Mocking", "Debugging"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 11L12 14L20 6"/>
        <path d="M20 12V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4H15"/>
      </svg>
    ),
  },
  {
    category: "Tools",
    skills: ["Git", "Linux", "Windows API", "VS Code"],
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17"/>
        <path d="M2 12L12 17L22 12"/>
      </svg>
    ),
  },
];

const marqueeItems = [
  "TypeScript", "React", "Node.js", "Python", "Flask", "Django",
  "MongoDB", "PostgreSQL", "Docker", "AWS", "Firebase", "scikit-learn",
  "NLP", "SHAP/XAI", "Express", "CI/CD", "Kubernetes", "Java", "C++", "Git",
];

const achievements = [
  {
    num: "200+",
    label: "LeetCode Problems",
    desc: "Consistent competitive programming practice strengthening DSA and algorithmic proficiency.",
    color: "#a78bfa",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
  },
  {
    num: "5+",
    label: "Production Projects",
    desc: "Built and shipped full-stack and AI/ML projects independently on GitHub and in production.",
    color: "#c084fc",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 11.08V12C21.99 17.05 18.31 21.5 13.35 22.71C8.39 23.92 3.27 21.64 1.05 17.07C-1.17 12.5 0.22 6.99 4.39 3.99C8.57 0.99 14.26 1.47 17.89 5.01"/>
        <path d="M22 4L12 14.01L9 11.01"/>
      </svg>
    ),
  },
  {
    num: "7mo",
    label: "Industry Experience",
    desc: "Hands-on internship at AIMaster.live across software engineering, management, and marketing roles.",
    color: "#818cf8",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7"/>
        <path d="M12 12V17"/>
        <path d="M9.5 14.5L12 12L14.5 14.5"/>
      </svg>
    ),
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-group", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".skill-grid", start: "top 80%" },
      });

      gsap.from(".achievement-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".achievement-row", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 overflow-hidden"
      data-testid="skills-section"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="px-8 md:px-16 max-w-7xl mx-auto mb-14">
        <div className="section-index mb-6">04 — Skills</div>
        <h2
          className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight text-white"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          data-testid="skills-heading"
        >
          Technical<br />
          <span className="gradient-text">Arsenal.</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="marquee py-5 mb-14 border-y border-white/[0.04]">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 font-mono text-sm text-white/15 tracking-widest uppercase">
              {item}
              <span className="ml-6 text-violet-500/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="skill-grid px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="skill-group project-card p-5 rounded-lg bg-white/[0.025] hover:bg-white/[0.04] transition-all duration-300 group"
              data-testid={`skill-group-${group.category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="text-violet-400/50 group-hover:text-violet-400 transition-colors duration-300">
                  {group.icon}
                </div>
                <div className="font-mono text-xs tracking-widest uppercase text-white/30 group-hover:text-violet-400/80 transition-colors duration-300">
                  {group.category}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-pill text-xs" data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements row */}
        <div className="achievement-row mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <div
              key={i}
              className="achievement-card relative overflow-hidden p-7 rounded-lg border transition-all duration-400 group hover:scale-[1.02]"
              style={{
                borderColor: `${item.color}18`,
                background: `linear-gradient(135deg, ${item.color}08 0%, transparent 60%)`,
              }}
              data-testid={`achievement-${i}`}
            >
              {/* Glow */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: `radial-gradient(circle, ${item.color}, transparent)` }} />

              <div className="relative z-10">
                <div className="mb-4" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div
                  className="font-serif text-4xl font-800 mb-1 transition-colors duration-300"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: item.color }}
                >
                  {item.num}
                </div>
                <div className="font-semibold text-white text-sm mb-3">{item.label}</div>
                <div className="text-white/35 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
